import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, Paper, TextField, Typography, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataProvider';
import { gmailLogo } from '../constants/constant';
import { routes } from '../routes/routes';

const Page = styled(Box)`
    min-height: 100vh;
    background: radial-gradient(circle at 20% 20%, #fef6e4 0%, #f3f7ff 45%, #ffffff 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 16px;
`;

const Card = styled(Paper)`
    max-width: 460px;
    width: 100%;
    padding: 32px;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(11, 87, 208, 0.12);
`;

const Logo = styled('img')({
    width: 120,
    display: 'block',
    margin: '0 auto 16px'
});

const Actions = styled(Box)`
    display: flex;
    gap: 12px;
    margin-top: 16px;
`;

const Toggle = styled(Button)`
    text-transform: none;
`;

const Login = () => {
    const navigate = useNavigate();
    const { user, login, register } = useContext(DataContext);
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({ email: '', password: '', jobTitle: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        if (user) {
            navigate(`${routes.emails.path}/inbox`, { replace: true });
        }
    }, [user, navigate]);

    const headerText = useMemo(() => (
        mode === 'login' ? 'Welcome back' : 'Create your feel-good inbox'
    ), [mode]);

    const helperText = useMemo(() => (
        mode === 'login'
            ? 'Log in to your simulation and start collecting good news.'
            : 'Create a mock account and tell us the role you want to land next.'
    ), [mode]);

    const onChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!form.email || !form.password || (mode === 'create' && !form.jobTitle)) {
            setError('Please fill in all fields.');
            return;
        }

        if (mode === 'login') {
            const result = login({ email: form.email, password: form.password });
            if (!result.ok) {
                setError(result.message);
            }
        } else {
            register({ email: form.email, password: form.password, jobTitle: form.jobTitle });
        }
    };

    return (
        <Page>
            <Card>
                <Logo src={gmailLogo} alt="Gmail logo" />
                <Typography variant="h5" align="center" sx={{ fontWeight: 600 }}>
                    {headerText}
                </Typography>
                <Typography align="center" sx={{ color: '#5f6368', mt: 1 }}>
                    {helperText}
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3, display: 'grid', gap: 2 }}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={onChange}
                        fullWidth
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={onChange}
                        fullWidth
                    />
                    {mode === 'create' && (
                        <TextField
                            label="Dream job role"
                            name="jobTitle"
                            value={form.jobTitle}
                            onChange={onChange}
                            fullWidth
                        />
                    )}
                    {error && (
                        <Typography sx={{ color: '#c62828', fontSize: 14 }}>
                            {error}
                        </Typography>
                    )}
                    <Button type="submit" variant="contained" sx={{ textTransform: 'none', mt: 1 }}>
                        {mode === 'login' ? 'Log in' : 'Create account'}
                    </Button>
                </Box>
                <Actions>
                    <Toggle onClick={() => setMode(mode === 'login' ? 'create' : 'login')}>
                        {mode === 'login' ? 'Create a new account' : 'I already have an account'}
                    </Toggle>
                </Actions>
            </Card>
        </Page>
    );
};

export default Login;
