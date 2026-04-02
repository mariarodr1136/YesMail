

import { Box, Button, Tooltip, Typography, styled } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom';
import { emptyProfilePic } from '../constants/constant';
import { ArrowBack, Delete, MarkEmailUnread, Star, StarBorder } from '@mui/icons-material';
import { useState, useContext, useRef, useEffect } from 'react';
import { API_URLS } from '../services/api.urls';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';

const IconWrapper = styled(Box)({
    padding: 15
});

const Subject = styled(Typography)({
    fontSize: 18,
    margin: '10px 0 20px 75px',
    display: 'flex'
})

const Indicator = styled(Box)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-left: 6px;
    padding: 2px 4px;
    align-self: center;
`;

const Image = styled('img')({
    borderRadius: '50%',
    width: 40,
    height: 40,
    margin: '5px 10px 0 10px',
    backgroundColor: '#cccccc'
});

const Container = styled(Box)({
    marginLeft: 15,
    width: '100%',
    paddingRight: 32,
    '& > div': {
        display: 'flex',
        '& > p > span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }
});

const Date = styled(Typography)({
    margin: '0',
    fontSize: 13,
    color: '#5E5E5E'
})

const DateRow = styled(Box)`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
    margin-right: 20px;
`;

const ActionBar = styled(Box)`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const ActionButton = styled(Button)`
    text-transform: none;
    font-size: 14px;
    padding: 6px 18px;
    min-height: 34px;
`;

const AcceptButton = styled(ActionButton)`
    border-color: #1e8e3e;
    color: #1e8e3e;
    &:hover {
        background: #e6f4ea;
        border-color: #188038;
    }
`;

const RejectButton = styled(ActionButton)`
    border-color: #d93025;
    color: #d93025;
    &:hover {
        background: #fce8e6;
        border-color: #c5221f;
    }
`;

const BottomActions = styled(Box)`
    display: flex;
    justify-content: center;
    gap: 12px;
    margin: 24px 0 16px;
`;

const StatusChip = styled(Box)`
    border-radius: 12px;
    padding: 6px 20px;
    font-size: 13px;
    font-weight: 600;
    color: #fff;
    background: ${({ status }) => (status === 'accepted' ? '#0f9d58' : '#d93025')};
    text-transform: uppercase;
    letter-spacing: 0.2px;
`;


const ConfettiLayer = styled(Box)`
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 3000;
`;

const ConfettiPiece = styled(Box)`
    position: absolute;
    width: var(--w);
    height: var(--h);
    background: #1a73e8;
    opacity: var(--o);
    border-radius: var(--r);
    animation: confettiBurst var(--t) ease-out forwards;

    @keyframes confettiBurst {
        0% { transform: translate(0, 0) rotate(var(--rot)); opacity: 1; }
        100% { transform: translate(var(--dx), var(--dy)) rotate(calc(var(--rot) + var(--spin))); opacity: 0; }
    }
`;

const PageShell = styled(Box)`
    background: #ffffff;
    border-radius: 28px;
    margin: 12px 12px 0 12px;
    padding-bottom: 16px;
    overflow: hidden;
    min-height: 75vh;
`;

const ViewEmail = () => {

    const { openDrawer } = useOutletContext();
    
    const { state } = useLocation();
    const { email } = state;
    const isInbox = email.type === 'inbox';
    const category = email.category || 'primary';
    const isOfferEmail = isInbox && category === 'primary';
    const navigate = useNavigate();
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });
    const { incrementAcceptedCount, incrementRejectedCount } = useContext(DataContext);
    const [isStarred, setIsStarred] = useState(email.starred);
    const confettiTimeout = useRef(null);

    const acceptOffer = async (event) => {
        await API(API_URLS.acceptOffer, { id: email._id });
        incrementAcceptedCount();
        if (event?.clientX && event?.clientY) {
            setConfettiOrigin({ x: event.clientX, y: event.clientY });
        }
        setShowConfetti(true);
        if (confettiTimeout.current) {
            clearTimeout(confettiTimeout.current);
        }
        const CELEBRATION_MS = 9000;
        confettiTimeout.current = setTimeout(() => {
            setShowConfetti(false);
            confettiTimeout.current = null;
        }, CELEBRATION_MS);
        email.status = 'accepted';
    };

    const rejectOffer = async () => {
        await API(API_URLS.rejectOffer, { id: email._id });
        incrementRejectedCount();
        email.status = 'rejected';
    };

    const moveToBin = async () => {
        await API(API_URLS.moveEmailsToBin, [email._id]);
        navigate('/emails/inbox');
    };

    const toggleStar = async () => {
        await API(API_URLS.toggleStarredMails, { id: email._id, value: !isStarred });
        email.starred = !isStarred;
        setIsStarred(!isStarred);
    };

    const markUnread = async () => {
        await API(API_URLS.markUnread, { id: email._id });
        navigate(-1);
    };

    useEffect(() => {
        return () => {
            if (confettiTimeout.current) {
                clearTimeout(confettiTimeout.current);
            }
        };
    }, []);

    return (
        <Box
            style={openDrawer ? { marginLeft: 250, width: '100%' } : { width: '100%' } }
            sx={{
                background: '#F8FAFD',
                minHeight: 'calc(100vh - 64px)',
                padding: '64px 0 16px',
                overflow: 'auto'
            }}
        >
            {showConfetti && (
                <ConfettiLayer>
                    {Array.from({ length: 420 }).map((_, idx) => {
                        const angle = Math.random() * Math.PI * 2;
                        const distance = 260 + Math.random() * 420;
                        const dx = Math.cos(angle) * distance;
                        const dy = Math.sin(angle) * distance;
                        const colors = ['#1a73e8', '#34a853', '#fbbc04', '#ea4335'];
                        const size = 6 + Math.random() * 10;
                        const height = size + Math.random() * 8;
                        const duration = 3.5 + Math.random() * 2.5;
                        const spin = `${180 + Math.random() * 540}deg`;
                        const rot = `${Math.random() * 180}deg`;
                        const opacity = 0.65 + Math.random() * 0.35;
                        const radius = Math.random() > 0.7 ? '50%' : '2px';
                        return (
                            <ConfettiPiece
                                key={idx}
                                style={{
                                    left: `${confettiOrigin.x + (Math.random() * 120 - 60)}px`,
                                    top: `${confettiOrigin.y + (Math.random() * 120 - 60)}px`,
                                    background: colors[idx % colors.length],
                                    '--dx': `${dx}px`,
                                    '--dy': `${dy}px`,
                                    '--w': `${size}px`,
                                    '--h': `${height}px`,
                                    '--t': `${duration}s`,
                                    '--spin': spin,
                                    '--rot': rot,
                                    '--o': opacity,
                                    '--r': radius
                                }}
                            />
                        );
                    })}
                </ConfettiLayer>
            )}
            <PageShell>
                <IconWrapper>
                    <ActionBar>
                        <Tooltip title="Back" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                            <Button onClick={() => navigate(-1)} sx={{ minWidth: 0, padding: 0, color: 'inherit' }}>
                                <ArrowBack fontSize='small' color="action" />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Trash" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                            <Button onClick={moveToBin} sx={{ minWidth: 0, padding: 0, color: 'inherit' }}>
                                <Delete fontSize='small' color="action" />
                            </Button>
                        </Tooltip>
                        <Tooltip title="Mark as unread" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                            <Button onClick={markUnread} sx={{ minWidth: 0, padding: 0, color: 'inherit' }}>
                                <MarkEmailUnread fontSize="small" color="action" />
                            </Button>
                        </Tooltip>
                    </ActionBar>
                </IconWrapper>
                <Subject>
                    {email.subject}{' '}
                    {isInbox ? (
                        <Indicator component="span">{category.charAt(0).toUpperCase() + category.slice(1)}</Indicator>
                    ) : null}
                </Subject>
                <Box style={{ display: 'flex' }}>
                    <Image src={email.image || emptyProfilePic} alt="profile" />
                    <Container>
                        <Box>
                        <Typography>
                            {isInbox ? (email.name || email.from.split('@')[0]) : email.to.split('@')[0]}
                            <Box component="span">&nbsp;&#60;{isInbox ? email.from : email.to}&#62;</Box>
                        </Typography>
                        <DateRow>
                            <Date>
                                {new window.Date(email.date).toLocaleString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: 'numeric',
                                    hour: 'numeric',
                                    minute: '2-digit'
                                })}
                            </Date>
                            {isStarred ? (
                                <Star sx={{ fontSize: 20, color: '#f6b400', cursor: 'pointer', position: 'relative', top: -1 }} onClick={toggleStar} />
                            ) : (
                                <StarBorder sx={{ fontSize: 20, cursor: 'pointer', position: 'relative', top: -1 }} onClick={toggleStar} />
                            )}
                        </DateRow>
                        </Box>
                        <Typography style={{ marginTop: 20, whiteSpace: 'pre-line', fontSize: 13 }}>
                            {email.body}
                        </Typography>
                        {isOfferEmail && (
                            <BottomActions>
                                {email.status === 'accepted' ? (
                                    <StatusChip status="accepted">Accepted</StatusChip>
                                ) : email.status === 'rejected' ? (
                                    <StatusChip status="rejected">Rejected</StatusChip>
                                ) : (
                                    <>
                                        <AcceptButton variant="outlined" size="small" onClick={acceptOffer}>
                                            Accept
                                        </AcceptButton>
                                        <RejectButton variant="outlined" size="small" onClick={rejectOffer}>
                                            Decline
                                        </RejectButton>
                                    </>
                                )}
                            </BottomActions>
                        )}
                    </Container>
                </Box>
            </PageShell>
        </Box>
    )
}

export default ViewEmail;
