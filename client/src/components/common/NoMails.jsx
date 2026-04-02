
import { Box, Typography, styled, Divider } from '@mui/material';

const Component = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    marginTop: 8,
    opacity: .8,
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10
})

const NoMails = ({ message }) => {
    return (
        <Component>
            <Typography sx={{ fontWeight: 600 }}>{message.heading}</Typography>
            <Typography sx={{ maxWidth: 520, textAlign: 'center', whiteSpace: 'pre-line' }}>
                {message.subHeading}
            </Typography>
            <StyledDivider />
        </Component>
    )
}

export default NoMails;
