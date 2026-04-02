import { useContext, useEffect, useRef, useState, Suspense } from 'react';

import { Header, SideBar } from '../components';
import { Box, Button, Dialog, TextField, Typography, styled } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { API_URLS } from '../services/api.urls';
import { DataContext } from '../context/DataProvider';
import API, { clearLocalStore } from '../services/api';
import { getNextOffer, resetOfferPool } from '../data/offerLibrary';

const Wrapper = styled(Box)`
    display: flex;
`;

const BlurLayer = styled(Box)`
    filter: blur(6px);
    pointer-events: none;
    user-select: none;
`;

const RoleCard = styled(Box)`
    padding: 32px;
    min-width: 420px;
    text-align: center;
    background: #ffffff;
`;

const RoleActions = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
`;

const PrimaryButton = styled(Button)`
    text-transform: none;
    background: #1a73e8;
    border-radius: 18px;
    padding: 6px 18px;
    &:hover {
        background: #1967d2;
    }
`;

const Toast = styled(Box)`
    position: fixed;
    top: 16px;
    right: 16px;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    border-radius: 12px;
    padding: 12px 16px;
    width: 280px;
    z-index: 2000;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: toastSlide 5s ease-in-out both;
    &:hover .toast-close {
        opacity: 1;
    }

    @keyframes toastSlide {
        0% {
            opacity: 0;
            transform: translateX(20px);
        }
        12% {
            opacity: 1;
            transform: translateX(0);
        }
        85% {
            opacity: 1;
            transform: translateX(0);
        }
        100% {
            opacity: 0;
            transform: translateX(20px);
        }
    }
`;

const ToastButton = styled(Button)`
    text-transform: none;
    padding: 0;
    min-width: 0;
`;

const CloseToast = styled(Button)`
    min-width: 0;
    width: 18px;
    height: 18px;
    min-width: 18px;
    padding: 0;
    text-transform: none;
    color: #5f6368;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.15s ease-in-out;
    border-radius: 999px;
    min-height: 20px;
    &:hover {
        background: #e6e7e9;
    }
`;

const Main = () => {

    const [openDrawer, setOpenDrawer] = useState(true);
    const { role, setRole, name, setName, bumpMailbox, toasts, addToast, removeToast } = useContext(DataContext);
    const [seedComplete, setSeedComplete] = useState(false);
    const hasSeeded = useRef(false);
    const timeoutRef = useRef(null);
    const navigate = useNavigate();
    const [roleInput, setRoleInput] = useState('');
    const [nameInput, setNameInput] = useState('');
    const NEW_EMAIL_INTERVAL_MS = 8000;

    const makeOfferEmail = () => getNextOffer({ name, role });

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }

    useEffect(() => {
        if (!role) return;

        let isMounted = true;

        const sendOffer = async ({ notify } = { notify: true }) => {
            const payload = makeOfferEmail();
            if (!payload) return;
            payload.isNew = true;
            await API(API_URLS.saveSentEmails, payload);
            if (isMounted) {
                bumpMailbox();
                if (notify) {
                    const toastId = addToast(payload);
                    if (toastId) {
                        setTimeout(() => {
                            removeToast(toastId);
                        }, 5000);
                    }
                }
            }
        };

        const seedInbox = async () => {
            const seedCount = 13;

            for (let i = 0; i < seedCount; i += 1) {
                const payload = makeOfferEmail();
                if (!payload) break;
                if (i === 2 || i === 3) payload.read = true;
                if (i === 1 || i === 3) payload.starred = true;
                const latestPosition = seedCount - i;
                if (latestPosition === 4) payload.read = true;
                if (latestPosition === 2 || latestPosition === 6) payload.starred = true;
                payload.isNew = false;
                await API(API_URLS.saveSentEmails, payload);
                if (isMounted) bumpMailbox();
            }
        };

        const scheduleNext = (delayMs) => {
            timeoutRef.current = setTimeout(async () => {
                await sendOffer();
                const nextDelay = NEW_EMAIL_INTERVAL_MS;
                scheduleNext(nextDelay);
            }, delayMs);
        };

        if (!hasSeeded.current) {
            clearLocalStore();
            hasSeeded.current = true;
            setSeedComplete(false);
            seedInbox().then(() => {
                setSeedComplete(true);
                scheduleNext(NEW_EMAIL_INTERVAL_MS);
            });
        } else {
            scheduleNext(NEW_EMAIL_INTERVAL_MS);
        }

        return () => {
            isMounted = false;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [role, bumpMailbox, addToast, removeToast, NEW_EMAIL_INTERVAL_MS]);

    const confirmRole = () => {
        if (!roleInput.trim() || !nameInput.trim()) return;
        setSeedComplete(false);
        resetOfferPool();
        setRole(roleInput.trim());
        setName(nameInput.trim());
    };
    
    return (
        <>
            <Header toggleDrawer={toggleDrawer} />
            {toasts.map((toast, index) => (
                <Toast key={toast.id} style={{ top: 16 + index * 84 }}>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 12, color: '#5f6368' }}>New mail</Typography>
                        <Typography sx={{ fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {toast.email.name || 'New offer'}
                        </Typography>
                        {toast.email.subject && (
                            <Typography sx={{ fontSize: 12, color: '#5f6368', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {toast.email.subject.length > 46 ? `${toast.email.subject.slice(0, 46)}…` : toast.email.subject}
                            </Typography>
                        )}
                    </Box>
                    <Box sx={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                        <ToastButton onClick={() => {
                            removeToast(toast.id);
                            navigate('/view', { state: { email: toast.email } });
                        }}>
                            Open
                        </ToastButton>
                    </Box>
                    <CloseToast className="toast-close" onClick={() => removeToast(toast.id)} style={{ position: 'absolute', top: 2, right: 6 }}>
                        ×
                    </CloseToast>
                </Toast>
            ))}
            {role && seedComplete ? (
                <Wrapper>
                    <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
                    <Suspense fallback={<SuspenseLoader />} >
                        <Outlet context={{ openDrawer }} />
                    </Suspense>
                </Wrapper>
            ) : (
                <BlurLayer>
                    <Wrapper>
                        <SideBar toggleDrawer={toggleDrawer} openDrawer={openDrawer} />
                        <Suspense fallback={<SuspenseLoader />} >
                            <Outlet context={{ openDrawer }} />
                        </Suspense>
                    </Wrapper>
                </BlurLayer>
            )}
            {!role && (
                <Box
                    sx={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.10)',
                        zIndex: 1250,
                        pointerEvents: 'none'
                    }}
                />
            )}

            <Dialog
                open={!role}
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.16)',
                        border: '1px solid #e0e3e7'
                    }
                }}
            >
                <RoleCard>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        What’s your dream role?
                    </Typography>
                    <Typography sx={{ color: '#5f6368', mt: 1 }}>
                        We’ll personalize your offer emails around it.
                    </Typography>
                    <TextField
                        autoFocus
                        fullWidth
                        label="Your name"
                        placeholder="Jordan, Sam, Alex..."
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        fullWidth
                        label="Dream role"
                        placeholder="Product Designer, Software Engineer, etc."
                        value={roleInput}
                        onChange={(e) => setRoleInput(e.target.value)}
                        sx={{ mt: 2 }}
                    />
                    <RoleActions>
                        <PrimaryButton variant="contained" onClick={confirmRole}>
                            Start inbox
                        </PrimaryButton>
                    </RoleActions>
                </RoleCard>
            </Dialog>
        </>
    )
}

export default Main;
