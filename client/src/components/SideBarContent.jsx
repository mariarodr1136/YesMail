import { useState } from 'react';
import { Button, List, ListItem, Box, Typography, styled, Dialog } from '@mui/material';
import { SIDEBAR_DATA } from '../config/sidebar.config';
import { CreateOutlined, LabelOutlined, Add, CloseRounded } from '@mui/icons-material';
import { NavLink, useParams } from 'react-router-dom';
import { routes } from '../routes/routes';

const Container = styled(Box)`
    padding: 8px 0;
    & > ul {
        padding: 10px 0 0 0;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        & > a {
            display: block;
            text-decoration: none;
            color: inherit;
        }
        & > a > li > svg {
            margin-right: 20px;
        }
    }
`

const MenuItem = styled(ListItem)`
    width: 100%;
    box-sizing: border-box;
    padding-left: 24px;
`;

const LabelsHeader = styled(Box)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 18px 6px 18px;
    margin-top: 14px;
    color: #4b5563;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.8px;
`;

const LabelItem = styled(MenuItem)`
    color: #3c4043;
`;

const LabelIcon = styled(LabelOutlined)`
    margin-right: 20px;
    color: #5f6368;
`;
const ComposeButton = styled(Button)`
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 140px;
    text-transform: none;
    margin-left: 8px;
`

const ComposeDialog = styled(Dialog)`
    .MuiPaper-root {
        border-radius: 20px;
        padding: 24px;
        max-width: 420px;
    }
`;

const ComposeDialogHeader = styled(Box)`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
`;

const ComposeDialogTitle = styled(Typography)`
    font-size: 22px;
    font-weight: 700;
    color: #1f2937;
`;

const ComposeDialogBody = styled(Typography)`
    margin-top: 12px;
    color: #4b5563;
    line-height: 1.6;
    font-size: 15px;
`;

const ComposeDialogActions = styled(Box)`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
`;

const KeepBrowsingButton = styled(Button)`
    text-transform: none;
    border-radius: 999px;
    padding: 8px 16px;
`;

const SideBarContent = () => {

    const [composeBlockedOpen, setComposeBlockedOpen] = useState(false);

    const { type } = useParams();

    const onComposeClick = () => {
        setComposeBlockedOpen(true);
    }

    return (
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined style={{ marginRight: 10 }} />Compose
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                            <MenuItem style={ type === data.name.toLowerCase() ? {
                                backgroundColor: '#d3e3fd',
                                borderRadius: '0 16px 16px 0'
                            } : {}}><data.icon fontSize="small" />{data.title}</MenuItem>
                        </NavLink>
                    ))
                }
            </List>
            <LabelsHeader>
                <Typography sx={{ fontSize: 12, letterSpacing: 0.8, fontWeight: 600 }}>Labels</Typography>
                <Add fontSize="small" />
            </LabelsHeader>
            <List>
                <NavLink to={`${routes.emails.path}/accepted`}>
                    <LabelItem style={ type === 'accepted' ? {
                        backgroundColor: '#d3e3fd',
                        borderRadius: '0 16px 16px 0'
                    } : {}}>
                        <LabelIcon fontSize="small" sx={{ color: '#1e8e3e' }} />
                        Offers Accepted
                    </LabelItem>
                </NavLink>
                <NavLink to={`${routes.emails.path}/rejected`}>
                    <LabelItem style={ type === 'rejected' ? {
                        backgroundColor: '#d3e3fd',
                        borderRadius: '0 16px 16px 0'
                    } : {}}>
                        <LabelIcon fontSize="small" sx={{ color: '#d93025' }} />
                        Offers Rejected
                    </LabelItem>
                </NavLink>
            </List>
            <ComposeDialog open={composeBlockedOpen} onClose={() => setComposeBlockedOpen(false)}>
                <ComposeDialogHeader>
                    <Box>
                        <ComposeDialogTitle>
                            Why send an email?
                        </ComposeDialogTitle>
                        <ComposeDialogBody>
                            You’ve already got a whole line of offers ahead. No need to send one when your inbox is already full of good news.
                        </ComposeDialogBody>
                    </Box>
                    <CloseRounded
                        sx={{ color: '#6b7280', cursor: 'pointer' }}
                        onClick={() => setComposeBlockedOpen(false)}
                    />
                </ComposeDialogHeader>
                <ComposeDialogActions>
                    <KeepBrowsingButton variant="contained" onClick={() => setComposeBlockedOpen(false)}>
                        Back to offers
                    </KeepBrowsingButton>
                </ComposeDialogActions>
            </ComposeDialog>
        </Container>
    )
}

export default SideBarContent;
