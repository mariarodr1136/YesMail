

import { AppBar, Toolbar, Box, InputBase, Typography, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, Search } from '@mui/icons-material'

import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import GmailIcon from '../assets/Gmail.webp';
import ProfilePic from '../assets/profpic.png';

const StyledAppBar = styled(AppBar)`
    background: #F8FAFD;
    box-shadow: none;
    top: 0;
    z-index: 2000;
`;

const SearchWrapper = styled(Box)`
    background: #E9EEF6;
    margin-left: 80px;
    border-radius: 24px;
    min-width: 680px;
    max-width: 880px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
`

const Header = ({ toggleDrawer }) => {
    const { name, role, searchQuery, setSearchQuery, acceptedCount, rejectedCount } = useContext(DataContext);

    return (
        <StyledAppBar
            position="fixed"
            elevation={0}
            sx={!role ? {
                filter: 'none',
                backgroundColor: '#F8FAFD',
                overflow: 'hidden',
                boxShadow: 'none',
                borderBottom: 'none',
                zIndex: 1100
            } : { filter: 'none', boxShadow: 'none', borderBottom: 'none', zIndex: 2000 }}
        >
            <Toolbar>
                <MenuIcon
                    color="action"
                    onClick={role ? toggleDrawer : undefined}
                    sx={{ cursor: role ? 'pointer' : 'default', opacity: role ? 1 : 0.6, pointerEvents: role ? 'auto' : 'none' }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, marginLeft: 2 }}>
                    <img src={GmailIcon} alt="YesMail logo" style={{ width: 30, height: 30, objectFit: 'contain' }} />
                    <Typography sx={{ fontSize: 20, fontWeight: 400, letterSpacing: 0.2, color: '#454746', fontFamily: "'Product Sans','Google Sans','Segoe UI','Arial',sans-serif" }}>
                        YesMail
                    </Typography>
                </Box>
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase
                        placeholder="Ask YesMail"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        sx={{
                            marginLeft: 1,
                            color: '#61666c',
                            '& input::placeholder': { color: '#61666c', opacity: 1 }
                        }}
                        inputProps={{ style: { color: '#61666c', WebkitTextFillColor: '#61666c' } }}
                    />
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                            <Box sx={{ background: '#0b6623', borderRadius: 8, minWidth: 120, minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', fontSize: 12, color: '#fff', fontWeight: 600, letterSpacing: 0.3, boxShadow: '0 3px 10px rgba(11, 102, 35, 0.25)' }}>
                                <Typography sx={{ fontSize: 11, marginRight: 3, color: '#d1f3cc' }}>Offers Accepted:</Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{acceptedCount}</Typography>
                            </Box>
                            <Box sx={{ background: '#b91c1c', borderRadius: 8, minWidth: 120, minHeight: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 10px', fontSize: 12, color: '#fff', fontWeight: 600, letterSpacing: 0.3, boxShadow: '0 3px 10px rgba(185, 28, 28, 0.25)' }}>
                                <Typography sx={{ fontSize: 11, marginRight: 3, color: '#ffd5d5' }}>Offers Rejected:</Typography>
                                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>{rejectedCount}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ textAlign: 'right' }}>
                                {name && (
                                    <Typography sx={{ fontSize: 13, color: '#4b5563', fontWeight: 600 }}>
                                        {name}
                                    </Typography>
                                )}
                                {role && (
                                    <Typography sx={{ fontSize: 12, color: '#6b7280', fontWeight: 500 }}>
                                        {role}
                                    </Typography>
                                )}
                            </Box>
                            <Box sx={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                                <Box
                                    component="img"
                                    src={ProfilePic}
                                    alt="Profile"
                                    sx={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.2)' }}
                                />
                            </Box>
                        </Box>
                    </Box>
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;
