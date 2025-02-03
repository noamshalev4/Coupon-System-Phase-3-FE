import { Container, Box, Typography, Grid, Paper, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./About.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text,
}));

export function About(): JSX.Element {
    return (
        <Container maxWidth="lg" className="About">
            <Box sx={{ my: 4 }}>
                <Typography variant="h3" component="h1" gutterBottom align="center">
                    About Our Coupon Website
                </Typography>
                <Typography variant="h6" component="p" gutterBottom align="center">
                    Welcome to the best place to find amazing deals and discounts on your favorite products and services.
                </Typography>
                <Typography variant="body1" component="p" gutterBottom align="center">
                    Our mission is to help you save money and enjoy great offers from top brands. Whether you're looking for discounts on electronics, fashion, travel, or dining, we've got you covered.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Wide Range of Coupons
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Discover a variety of coupons across different categories. We update our collection regularly to bring you the latest deals.
                        </Typography>
                        <Button variant="contained" color="primary">
                            Explore Coupons
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Easy to Use
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Our website is designed to be user-friendly, making it easy for you to find and use coupons. Start saving with just a few clicks.
                        </Typography>
                        <Button variant="contained" color="primary">
                            Get Started
                        </Button>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledPaper>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Trusted by Thousands
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            Join our community of satisfied users who have saved money using our coupons. We are committed to providing you with the best deals.
                        </Typography>
                        <Button variant="contained" color="primary">
                            Join Now
                        </Button>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
}