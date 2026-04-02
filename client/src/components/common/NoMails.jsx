
import { Box, Typography, styled, Divider } from '@mui/material';

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    opacity: 0.82
});

const Content = styled(Box)({
    width: '100%',
    maxWidth: 520,
    textAlign: 'left'
});

const StyledDivider = styled(Divider)({
    width: '100%',
    maxWidth: 520,
    marginTop: 26,
    marginBottom: 10
})

const NoMails = ({ message }) => {
    return (
        <Component>
            <Content>
                <Typography sx={{ fontWeight: 400, color: '#3c4043' }}>
                    {message.heading}
                </Typography>
                <Typography sx={{ fontWeight: 300, color: '#5f6368', whiteSpace: 'pre-line', marginTop: 0.5 }}>
                    {message.subHeading}
                </Typography>
            </Content>
            <StyledDivider />
        </Component>
    )
}

export default NoMails;
