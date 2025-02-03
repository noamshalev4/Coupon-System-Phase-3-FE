import { Container, Box, Typography, Grid, Card, CardContent, CardActions, Button } from "@mui/material";
import { styled } from "@mui/system";
import "./Home.css";

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text,
}));

export function Home(): JSX.Element {
    return (
        <Container maxWidth="lg" className="Home">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Welcome to My Coupon System Website
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    On This Website You Can Find The Best Coupons
                </Typography>
                <Typography variant="body1" component="p" gutterBottom>
                    Admins, Companies and Customers can use this website to find the best coupons for their needs.
                </Typography>
                <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                    Learn More
                </Button>
            </Box>
            <Grid container spacing={4} sx={{ mt: 4 }}>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Exclusive Offers
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Get access to exclusive offers and discounts that you won't find anywhere else. Save big on your favorite products and services.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                View Offers
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                User-Friendly Interface
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Our website is designed with you in mind. Enjoy a seamless and intuitive experience as you browse and find the best deals.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                Start Now
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <StyledCard>
                        <CardContent>
                            <Typography variant="h5" component="div" gutterBottom>
                                Customer Support
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Have questions or need help? Our dedicated customer support team is here to assist you with any inquiries you may have.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                Contact Us
                            </Button>
                        </CardActions>
                    </StyledCard>
                </Grid>
            </Grid>
        </Container>
    );
}