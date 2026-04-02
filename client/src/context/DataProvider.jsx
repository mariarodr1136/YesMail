import { createContext, useCallback, useMemo, useState } from 'react';
import { VIEWS } from '../constants/constant';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
    const [view, setView] = useState(VIEWS.inbox);
    const [mailboxTick, setMailboxTick] = useState(0);
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [toasts, setToasts] = useState([]);
    const [acceptedCount, setAcceptedCount] = useState(0);
    const [rejectedCount, setRejectedCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');

    const bumpMailbox = useCallback(() => setMailboxTick((value) => value + 1), []);

    const addToast = useCallback((email) => {
        if (!email) return;
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        setToasts((prev) => [...prev, { id, email }]);
        return id;
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const value = useMemo(() => ({
        view,
        setView,
        role,
        setRole,
        name,
        setName,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
        mailboxTick,
        bumpMailbox,
        acceptedCount,
        rejectedCount,
        incrementAcceptedCount: () => setAcceptedCount((c) => c + 1),
        incrementRejectedCount: () => setRejectedCount((c) => c + 1)
    }), [view, role, name, searchQuery, acceptedCount, rejectedCount, mailboxTick, toasts, bumpMailbox, addToast, removeToast]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;
