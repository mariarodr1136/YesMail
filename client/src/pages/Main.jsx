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

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }

    useEffect(() => {
        if (!role) return;

        let isMounted = true;

        const makeOfferEmail = () => getNextOffer({ name, role });
        const makePromoAvatar = (label) => {
            const safe = encodeURIComponent(label);
            return `https://ui-avatars.com/api/?name=${safe}&background=FFF4E5&color=5F4339&size=64`;
        };

        const makePromotionsSeed = () => {
            const safeName = (name || '').trim() || 'there';
            const now = Date.now();

            return [
                {
                    to: 'you@dreamrole.com',
                    from: 'platinum@yesmail.fake',
                    name: 'YesMail Monetization Team',
                    subject: '👑 Introducing YesMail Platinum (Please don\'t buy this)',
                    body: `Hi ${safeName},

Are you tired of just getting digital validation every 8 seconds? Do you want to take your completely fabricated career success into the physical realm?

Enter YesMail Platinum.

For the completely reasonable price of $49,999 a month, our new premium tier includes:

Physical Confetti Cannons: We will mail an actual, spring-loaded glitter bomb to your house every time you click "Accept."

The "Reverse Uno" Button: Automatically sends a fake rejection letter back to the last real company that rejected you. (e.g., "Unfortunately, ${safeName} has decided to move forward with a company that actually responds to emails.")

A Real Marching Band: They will stand on your lawn and play "We Are The Champions" on a loop until your neighbors call the authorities.

Upgrade today! (Disclaimer: Please do not upgrade today, we do not have a marching band).

Warmly,
The YesMail Monetization Team`,
                    date: new Date(now - 1000 * 60 * 9),
                    image: makePromoAvatar('YesMail'),
                    starred: false,
                    read: false,
                    category: 'promotions',
                    type: 'inbox',
                    bin: false
                },
                {
                    to: 'you@dreamrole.com',
                    from: 'product@yesmail.fake',
                    name: 'YesMail Product Team',
                    subject: '🆕 New Update: Choose your Hiring Manager\'s personality!',
                    body: `Hi ${safeName},

We noticed you’ve been getting a lot of offers lately. But who are they coming from?

Today, we’re thrilled to announce Boss Personas! You can now customize the tone of the fictional hiring managers begging you to work for them.

New Personas include:

The Desperate Startup Bro: "Bro. Bro please. We have cold brew on tap and beanbag chairs. I will give you 40% equity in a company that makes smart-socks. Pls."

The Weeping Fortune 500 CEO: "I am literally crying right now looking at your resume. I fired the board of directors so you can have their chairs."

A Golden Retriever in a Tie: "BARK! (You are hired) BARK! (Good boy/girl!)"

Log in now to update your preferences and let the aggressively weird validation wash over you.

Cheers,
The YesMail Product Team`,
                    date: new Date(now - 1000 * 60 * 6),
                    image: makePromoAvatar('YesMail'),
                    starred: true,
                    read: true,
                    category: 'promotions',
                    type: 'inbox',
                    bin: false
                },
                {
                    to: 'you@dreamrole.com',
                    from: 'engineering@yesmail.fake',
                    name: 'YesMail Engineering',
                    subject: '⚡ FLASH SALE: Get 500% More Fake Job Offers!',
                    body: `Hi ${safeName},

We’re having a massive, unprecedented, once-in-a-lifetime FLASH SALE!

Normally, YesMail delivers a life-changing, high-paying, incredibly flattering job offer to your inbox every 8 seconds. But for the next 24 hours? We are slashing our prices to ZERO SECONDS.

That's right. If you click the link below, we will temporarily remove the rate limit on our server. You will receive 4,000 job offers per minute. Your browser will crash. Your fan will sound like a jet engine taking off. You will have so much momentum that you will transcend the concept of employment entirely.

Are you ready to break your computer with positivity?

[Click Here to Unleash the Offer Avalanche]

Best of luck,
YesMail Engineering`,
                    date: new Date(now - 1000 * 60 * 3),
                    image: makePromoAvatar('YesMail'),
                    starred: false,
                    read: false,
                    category: 'promotions',
                    type: 'inbox',
                    bin: false
                }
            ];
        };

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

            // Seed a few promo emails so the Promotions tab isn't empty on first load.
            const promos = makePromotionsSeed();
            for (const promo of promos) {
                promo.isNew = false;
                await API(API_URLS.saveSentEmails, promo);
                if (isMounted) bumpMailbox();
            }

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
    }, [role, name, bumpMailbox, addToast, removeToast]);

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
