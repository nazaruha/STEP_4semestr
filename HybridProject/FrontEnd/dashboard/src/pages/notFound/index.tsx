import * as React from "react"
import { Container, Grid, Button, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { ThemeContext } from "@emotion/react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  }));

const NotFound: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%', maxWidth: '600px' }}>
                <h1>404 page not found.</h1>
                <StyledButton variant="contained"><Link to="dashboard">Get Back Home</Link></StyledButton>
                {/* <Button variant="contained" href="dashboard" sx={{":hover": {backgroundColor: "green"}}}>Get Back Home</Button> */}
            </Container>
        </Box>
    )
}

export default NotFound;