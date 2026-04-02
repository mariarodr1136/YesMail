import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';
const LOCAL_MODE = process.env.REACT_APP_LOCAL_MODE === 'true';

const memoryStore = window.__LOCAL_EMAILS__ || (window.__LOCAL_EMAILS__ = []);

const matchesType = (email, type) => {
    if (type === 'starred') return email.starred === true && email.bin === false;
    if (type === 'bin') return email.bin === true;
    if (type === 'allmail') return true;
    if (type === 'inbox') return email.type === 'inbox';
    if (type === 'accepted') return email.status === 'accepted';
    if (type === 'rejected') return email.status === 'rejected';
    return email.type === type;
};

const localApi = async (urlObject, payload, type) => {
    switch (urlObject.endpoint) {
        case 'save':
        case 'save-draft': {
            const email = {
                _id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
                ...payload,
                starred: payload?.starred ?? false,
                bin: payload?.bin ?? false,
                read: payload?.read ?? false
            };
            memoryStore.push(email);
            return { data: 'email saved successfully' };
        }
        case 'emails': {
            const emails = memoryStore.filter((email) => matchesType(email, type));
            return { data: emails };
        }
        case 'starred': {
            const email = memoryStore.find((item) => item._id === payload?.id);
            if (email) email.starred = payload?.value;
            return { data: 'Value is updated' };
        }
        case 'delete': {
            const ids = new Set(payload || []);
            const remaining = memoryStore.filter((item) => !ids.has(item._id));
            memoryStore.length = 0;
            memoryStore.push(...remaining);
            return { data: 'emails deleted successfully' };
        }
        case 'bin': {
            const ids = new Set(payload || []);
            memoryStore.forEach((item) => {
                if (ids.has(item._id)) {
                    item.bin = true;
                    item.starred = false;
                    item.type = '';
                }
            });
            return { data: 'moved to bin' };
        }
        case 'read-all': {
            memoryStore.forEach((item) => {
                item.read = true;
            });
            return { data: 'all marked read' };
        }
        case 'accept': {
            const email = memoryStore.find((item) => item._id === payload?.id);
            if (email) {
                email.status = 'accepted';
                email.read = true;
            }
            return { data: 'accepted' };
        }
        case 'reject': {
            const email = memoryStore.find((item) => item._id === payload?.id);
            if (email) {
                email.status = 'rejected';
                email.read = true;
            }
            return { data: 'rejected' };
        }
        case 'mark-unread': {
            const email = memoryStore.find((item) => item._id === payload?.id);
            if (email) {
                email.read = false;
            }
            return { data: 'marked unread' };
        }
        default:
            return { data: null };
    }
};

const API_GMAIL = async (urlObject, payload, type) => {
    if (LOCAL_MODE) {
        return await localApi(urlObject, payload, type);
    }

    return await axios({
        method: urlObject.method,
        url: `${API_URL}/${urlObject.endpoint}/${type}`,
        data: payload
    });
};

export default API_GMAIL;
export const clearLocalStore = () => {
    if (!LOCAL_MODE) return;
    memoryStore.length = 0;
};
