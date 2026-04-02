

import { ListItem, Checkbox, Typography, Box, Button, IconButton, styled } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import { useEffect, useState } from 'react';
import { StarBorder, Star, DeleteOutline, MarkEmailUnread } from '@mui/icons-material';
import useApi from '../hooks/useApi';
import { API_URLS } from "../services/api.urls";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

const Wrapper = styled(ListItem, {
    shouldForwardProp: (prop) => prop !== 'animate'
})`
    padding: 0 0 0 10px;
    background: #f2f6fc;
    border-bottom: 1px solid #eceff3;
    cursor: pointer;
    will-change: transform, opacity;
    max-width: 100%;
    overflow: hidden;
    animation: ${props => props.animate ? 'slideIn 0.45s ease-in-out' : 'none'};
    & > div {
        display: flex;
        width: 100%
    }
    & > div > p {
        font-size: 14px;
    }
    .row-actions {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
    }
    &:hover .row-actions {
        opacity: 1;
    }
    @keyframes slideIn {
        0% {
            opacity: 0;
            transform: translateY(-10px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const Actions = styled(Box)`
    margin-left: auto;
    display: flex;
    gap: 6px;
    align-items: center;
    flex-shrink: 0;
`;

const StatusTag = styled(Box)`
    border-radius: 12px;
    padding: 4px 14px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 0.3px;
    min-width: 90px;
    text-align: center;
    background: ${({ type }) => (type === 'accepted' ? '#0f9d58' : '#d93025')};
`;

const ActionButton = styled(Button)`
    text-transform: none;
    font-size: 12px;
    padding: 2px 10px;
    min-height: 24px;
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

const Date = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368'
})

const Email = ({ email, setStarredEmail, selectedEmails, setSelectedEmails, onAccept, onReject }) => {
    const toggleStarredEmailService = useApi(API_URLS.toggleStarredMails);
    const moveToBinService = useApi(API_URLS.moveEmailsToBin);
    const markUnreadService = useApi(API_URLS.markUnread);
    
    const navigate = useNavigate();
    const isInboxLike = email.bin === true || ['inbox', 'accepted', 'rejected'].includes(email.type);
    const fromName = email.name || email.from?.split('@')[0] || 'Recruiter';
    const category = email.category || 'primary';
    const isOfferEmail = email.type === 'inbox' && category === 'primary';
    const [animate, setAnimate] = useState(Boolean(email.isNew));
    const isUnread = !email.read;
    const preview = (email.body || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 80);

    useEffect(() => {
        if (email.isNew) {
            email.isNew = false;
            setAnimate(true);
            const timer = setTimeout(() => setAnimate(false), 500);
            return () => clearTimeout(timer);
        }
    }, [email]);

    const openEmail = () => {
        if (!email.read) {
            email.read = true;
            setStarredEmail(prevState => !prevState);
        }
        navigate(routes.view.path, { state: { email: email }});
    };

    const toggleStarredEmail = () => {
        toggleStarredEmailService.call({ id: email._id, value: !email.starred });
        setStarredEmail(prevState => !prevState);
    }

    const handleTrash = async (e) => {
        e.stopPropagation();
        await moveToBinService.call([email._id]);
        setStarredEmail(prevState => !prevState);
    };

    const handleMarkUnread = async (e) => {
        e.stopPropagation();
        await markUnreadService.call({ id: email._id });
        setStarredEmail(prevState => !prevState);
    };

    const handleChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }

    const listBackground = email.status === 'accepted'
        ? '#e8f5ea'
        : email.status === 'rejected'
            ? '#fcebea'
            : email.read
                ? '#f2f6fc'
                : '#ffffff';

    return (
        <Wrapper animate={animate} style={{ background: listBackground }}>
            <Checkbox 
                size="small" 
                checked={selectedEmails.includes(email._id)}
                onChange={() => handleChange()} 
            />
            { 
                email.starred ? 
                    <Star fontSize="small" style={{ marginRight: 10, color: '#f6b400' }} onClick={() => toggleStarredEmail()} />
                : 
                    <StarBorder fontSize="small" style={{ marginRight: 10 }} onClick={() => toggleStarredEmail()} /> 
            }
            <Box
                onClick={openEmail}
                sx={{ display: 'flex', width: '100%', alignItems: 'center', minWidth: 0, overflow: 'hidden' }}
            >
                <Typography
                    sx={{
                        width: 190,
                        flexShrink: 0,
                        fontWeight: isUnread ? 700 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {isInboxLike ? fromName : `To:${email.to.split('@')[0]}`}
                </Typography>
                <Typography
                    sx={{
                        minWidth: 0,
                        flex: 1,
                        fontWeight: isUnread ? 700 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {email.subject}
                    {preview && (
                        <Box component="span" sx={{ fontWeight: 400, color: '#5f6368' }}>
                            {` — ${preview}${(email.body || '').trim().length > 80 ? '…' : ''}`}
                        </Box>
                    )}
                </Typography>
                <Actions className="row-actions" onClick={(e) => e.stopPropagation()}>
                    {(email.status === 'accepted' || email.status === 'rejected') ? (
                        <StatusTag type={email.status}>
                            {email.status === 'accepted' ? 'Accepted' : 'Rejected'}
                        </StatusTag>
                    ) : isOfferEmail ? (
                        <>
                            <AcceptButton variant="outlined" size="small" onClick={(e) => onAccept?.(email._id, e)}>
                                Accept
                            </AcceptButton>
                            <RejectButton variant="outlined" size="small" onClick={(e) => onReject?.(email._id, e)}>
                                Decline
                            </RejectButton>
                        </>
                    ) : null}
                    <Tooltip title="Trash" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                        <IconButton size="small" onClick={handleTrash}>
                            <DeleteOutline fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Mark as unread" arrow componentsProps={{ tooltip: { sx: { borderRadius: '5px' } } }}>
                        <IconButton size="small" onClick={handleMarkUnread}>
                            <MarkEmailUnread fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Date>
                        {(new window.Date(email.date)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Date>
                </Actions>
            </Box>
        </Wrapper>
    )
}

export default Email;
