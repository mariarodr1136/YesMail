import Email from "../model/email.js";

const useMemoryStore = process.env.NO_DB === 'true';
const memoryEmails = globalThis.__MEMORY_EMAILS__ || (globalThis.__MEMORY_EMAILS__ = []);

const matchesType = (email, type) => {
    if (type === 'starred') return email.starred === true && email.bin === false;
    if (type === 'bin') return email.bin === true;
    if (type === 'allmail') return true;
    if (type === 'inbox') return email.type === 'inbox';
    return email.type === type;
};

export const saveSendEmails = async (request, response) => {
    try {
        if (useMemoryStore) {
            const email = {
                _id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                ...request.body,
                starred: request.body.starred ?? false,
                bin: request.body.bin ?? false
            };
            memoryEmails.push(email);
            return response.status(200).json('email saved successfully');
        }

        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getEmails = async (request, response) => {
    try {
        if (useMemoryStore) {
            const emails = memoryEmails.filter((email) => matchesType(email, request.params.type));
            return response.status(200).json(emails);
        }

        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const toggleStarredEmail = async (request, response) => {
    try {   
        if (useMemoryStore) {
            const email = memoryEmails.find((item) => item._id === request.body.id);
            if (email) email.starred = request.body.value;
            return response.status(201).json('Value is updated');
        }

        await Email.updateOne({ _id: request.body.id }, { $set: { starred: request.body.value }})
        response.status(201).json('Value is updated');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const deleteEmails = async (request, response) => {
    try {
        if (useMemoryStore) {
            const ids = new Set(request.body);
            const remaining = memoryEmails.filter((item) => !ids.has(item._id));
            memoryEmails.length = 0;
            memoryEmails.push(...remaining);
            return response.status(200).json('emails deleted successfully');
        }

        await Email.deleteMany({ _id: { $in: request.body }})
        response.status(200).json('emails deleted successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        if (useMemoryStore) {
            const ids = new Set(request.body);
            memoryEmails.forEach((item) => {
                if (ids.has(item._id)) {
                    item.bin = true;
                    item.starred = false;
                    item.type = '';
                }
            });
            return response.status(200).json('moved to bin');
        }

        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
        response.status(200).json('moved to bin');
    } catch (error) {
        response.status(500).json(error.message);   
    }
}
