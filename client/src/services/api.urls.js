export const API_URLS = {
    saveSentEmails: {
        endpoint: 'save',
        method: 'POST'
    },
    saveDraftEmails: {
        endpoint: 'save-draft',
        method: 'POST'
    },
    getEmailFromType: {
        endpoint: 'emails',
        method: 'GET'
    },
    toggleStarredMails: {
        endpoint: 'starred',
        method: 'POST'
    },
    deleteEmails: {
        endpoint: 'delete',
        method: 'DELETE'
    },
    moveEmailsToBin: {
        endpoint: 'bin',
        method: 'POST'
    },
    readAll: {
        endpoint: 'read-all',
        method: 'POST'
    },
    acceptOffer: {
        endpoint: 'accept',
        method: 'POST'
    },
    rejectOffer: {
        endpoint: 'reject',
        method: 'POST'
    },
    markUnread: {
        endpoint: 'mark-unread',
        method: 'POST'
    }
}
