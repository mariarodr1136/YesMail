import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
import { Box, IconButton, List, Checkbox, Menu, MenuItem, Tooltip, Typography, styled } from '@mui/material';
import Email from './Email';
import { DeleteOutline, Inbox, LocalOffer, PeopleOutline, InfoOutlined, Refresh, MoreVert, Markunread } from '@mui/icons-material';
import NoMails from './common/NoMails';
import { EMPTY_TABS } from '../constants/constant';
import { DataContext } from '../context/DataProvider';
import API from '../services/api';
import { getNextOffer } from '../data/offerLibrary';

const PageShell = styled(Box)`
    background: #ffffff;
    border-radius: 28px;
    margin: 12px 12px 0 12px;
    padding-bottom: 8px;
    overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const StickyHeader = styled(Box)`
    position: sticky;
    top: 0;
    background: #ffffff;
    z-index: 5;
`;

const TabsRow = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px 0 10px;
    border-bottom: 1px solid #eceff3;
`;

const TabItem = styled(Box)`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 8px 12px 8px;
    font-size: 14px;
    color: #5f6368;
    flex: 1;
    justify-content: flex-start;
    border-radius: 0;
    transition: background 0.15s ease-in-out;
    cursor: pointer;
    &:hover {
        background: #f1f3f4;
    }
`;

const ActiveTab = styled(TabItem)`
    color: #1a73e8;
    border-bottom: 2px solid #1a73e8;
    font-weight: 600;
`;

const MailList = styled(List)`
    background: #ffffff;
`;

const ScrollArea = styled(Box)`
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
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

const Emails = () => {
    const [starredEmail, setStarredEmail] = useState(false);
    const [selectedEmails, setSelectedEmails] = useState([]);

    const { openDrawer } = useOutletContext();
    const { type } = useParams();
    const { mailboxTick, role, name, bumpMailbox, addToast, removeToast, searchQuery, incrementAcceptedCount, incrementRejectedCount } = useContext(DataContext);
    const [activeTab, setActiveTab] = useState('primary');
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [confettiOrigin, setConfettiOrigin] = useState({ x: 0, y: 0 });

    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const deleteEmailsService = useApi(API_URLS.deleteEmails);
    const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
    const readAllService = useApi(API_URLS.readAll);
    const markUnreadService = useApi(API_URLS.markUnread);
    const acceptOfferService = useApi(API_URLS.acceptOffer);
    const rejectOfferService = useApi(API_URLS.rejectOffer);
    const [menuAnchor, setMenuAnchor] = useState(null);
    const getEmailsCall = getEmailsService.call;
    const emailsResponse = getEmailsService.response;

    useEffect(() => {
        getEmailsCall({}, type);
    }, [type, starredEmail, mailboxTick, getEmailsCall])

    const visibleEmails = useMemo(() => {
        const emails = emailsResponse ? [...emailsResponse] : [];
        const sorted = emails.sort((a, b) => new Date(b.date) - new Date(a.date));
        const filteredByTab = (() => {
            if (type !== 'inbox') return sorted;
            const category = (email) => (email.category || 'primary');
            if (activeTab === 'primary') return sorted.filter((email) => category(email) === 'primary');
            return sorted.filter((email) => category(email) === activeTab);
        })();

        const query = searchQuery.trim().toLowerCase();
        if (!query) return filteredByTab;

        return filteredByTab.filter((email) => {
            const haystack = [
                email.name,
                email.from,
                email.to,
                email.subject,
                email.body
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase();

            return haystack.includes(query);
        });
    }, [emailsResponse, type, activeTab, searchQuery]);

    useEffect(() => {
        const isAllSelected = selectedEmails.length > 0 && selectedEmails.length === visibleEmails.length;
        setSelectAllChecked(isAllSelected);
    }, [selectedEmails, visibleEmails.length]);

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = visibleEmails.map(email => email._id);
            setSelectedEmails(emails);
            setSelectAllChecked(true);
        } else {
            setSelectedEmails([]);
            setSelectAllChecked(false);
        }
    }

    const deleteSelectedEmails = () => {
        setSelectedEmails([]);
        setSelectAllChecked(false);
        if (type === 'bin') {
            deleteEmailsService.call(selectedEmails);
        } else {
            moveEmailsToBin.call(selectedEmails);
        }
        setStarredEmail(prevState => !prevState);
    }

    const refreshEmails = async () => {
        const payload = getNextOffer({ name, role });
        if (payload) {
            payload.isNew = true;
            await API(API_URLS.saveSentEmails, payload);
            bumpMailbox();
            const toastId = addToast(payload);
            if (toastId) {
                setTimeout(() => {
                    removeToast(toastId);
                }, 5000);
            }
        }
        getEmailsService.call({}, type);
    };

    const addNewOffer = async () => {
        const payload = getNextOffer({ name, role });
        if (payload) {
            payload.isNew = true;
            await API(API_URLS.saveSentEmails, payload);
            bumpMailbox();
            const toastId = addToast(payload);
            if (toastId) {
                setTimeout(() => {
                    removeToast(toastId);
                }, 5000);
            }
        }
        closeMenu();
        getEmailsService.call({}, type);
    };

    const openMenu = (event) => {
        setMenuAnchor(event.currentTarget);
    };

    const closeMenu = () => {
        setMenuAnchor(null);
    };

    const markAllRead = async () => {
        await readAllService.call();
        closeMenu();
        refreshEmails();
    };

    const acceptOffer = async (emailId, event) => {
        await acceptOfferService.call({ id: emailId });
        incrementAcceptedCount();
        setStarredEmail(prevState => !prevState);
        if (event?.clientX && event?.clientY) {
            setConfettiOrigin({ x: event.clientX, y: event.clientY });
        }
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 1600);
    };

    const rejectOffer = async (emailId) => {
        await rejectOfferService.call({ id: emailId });
        incrementRejectedCount();
        setStarredEmail(prevState => !prevState);
    };

    return (
        <Box
            style={openDrawer ? { marginLeft: 250, width: '100%' } : { width: '100%' } }
            sx={{ background: '#F8FAFD', height: 'calc(100vh - 64px)', padding: '64px 0 16px', overflow: 'hidden' }}
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
                        const duration = 1.1 + Math.random() * 0.9;
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
                <ScrollArea>
                    <StickyHeader>
                        <Box style={{ padding: '12px 10px 0 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Checkbox
                        size="small"
                        checked={selectAllChecked}
                        indeterminate={selectedEmails.length > 0 && selectedEmails.length < visibleEmails.length}
                        onChange={(e) => selectAllEmails(e)}
                    />
                    {selectedEmails.length > 0 && (
                        <>
                            <Tooltip title="Trash" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                                <IconButton size="small" onClick={(e) => deleteSelectedEmails(e)}>
                                    <DeleteOutline fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Mark all as unread" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                                <IconButton
                                    size="small"
                                onClick={async () => {
                                    const ids = [...selectedEmails];
                                    setSelectedEmails([]);
                                    setSelectAllChecked(false);
                                    await Promise.all(ids.map((id) => markUnreadService.call({ id })));
                                    setStarredEmail(prevState => !prevState);
                                }}
                            >
                                    <Markunread fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </>
                    )}
                    <Tooltip title="Refresh" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                        <IconButton size="small" onClick={refreshEmails}>
                            <Refresh fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="More" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                        <IconButton size="small" onClick={openMenu}>
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        anchorEl={menuAnchor}
                        open={Boolean(menuAnchor)}
                        onClose={closeMenu}
                        PaperProps={{
                            sx: {
                                borderRadius: 2,
                                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
                                minWidth: 220
                            }
                        }}
                    >
                        <MenuItem
                            onClick={markAllRead}
                            sx={{
                                gap: 1.5,
                                paddingY: 1,
                                background: '#f1f3f4',
                                '&:hover': { background: '#e8eaed' }
                            }}
                        >
                            <Markunread fontSize="small" />
                            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                                Mark all as read
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={addNewOffer}
                            sx={{
                                gap: 1.5,
                                paddingY: 1,
                                '&:hover': { background: '#e8eaed' }
                            }}
                        >
                            <Inbox fontSize="small" />
                            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
                                Add a new offer
                            </Typography>
                        </MenuItem>
                    </Menu>
                        </Box>
                        {type === 'inbox' && (
                            <TabsRow>
                                {activeTab === 'primary' ? (
                                    <ActiveTab onClick={() => setActiveTab('primary')}>
                                        <Inbox fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Primary</Typography>
                                    </ActiveTab>
                                ) : (
                                    <TabItem onClick={() => setActiveTab('primary')}>
                                        <Inbox fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Primary</Typography>
                                    </TabItem>
                                )}
                                {activeTab === 'promotions' ? (
                                    <ActiveTab onClick={() => setActiveTab('promotions')}>
                                        <LocalOffer fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Promotions</Typography>
                                    </ActiveTab>
                                ) : (
                                    <TabItem onClick={() => setActiveTab('promotions')}>
                                        <LocalOffer fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Promotions</Typography>
                                    </TabItem>
                                )}
                                {activeTab === 'social' ? (
                                    <ActiveTab onClick={() => setActiveTab('social')}>
                                        <PeopleOutline fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Social</Typography>
                                    </ActiveTab>
                                ) : (
                                    <TabItem onClick={() => setActiveTab('social')}>
                                        <PeopleOutline fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Social</Typography>
                                    </TabItem>
                                )}
                                {activeTab === 'updates' ? (
                                    <ActiveTab onClick={() => setActiveTab('updates')}>
                                        <InfoOutlined fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Updates</Typography>
                                    </ActiveTab>
                                ) : (
                                    <TabItem onClick={() => setActiveTab('updates')}>
                                        <InfoOutlined fontSize="small" />
                                        <Typography sx={{ fontSize: 14 }}>Updates</Typography>
                                    </TabItem>
                                )}
                            </TabsRow>
                        )}
                    </StickyHeader>
                    <MailList>
                        {
                            visibleEmails.map(email => (
                            <Email 
                                email={email} 
                                key={email._id}
                                setStarredEmail={setStarredEmail} 
                                selectedEmails={selectedEmails}
                                setSelectedEmails={setSelectedEmails}
                                onAccept={acceptOffer}
                                onReject={rejectOffer}
                            />
                        ))
                        }
                    </MailList> 
                    {
                        visibleEmails.length === 0 && (
                            <NoMails message={type === 'inbox' ? EMPTY_TABS[activeTab] : EMPTY_TABS[type]} />
                        )
                    }
                </ScrollArea>
            </PageShell>
        </Box>
    )
}

export default Emails;
