import { Container, Box, Typography, Grid, TextField, Button, Paper } from "@mui/material";
import { styled } from "@mui/system";
import "./Contact.css";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text,
}));

export function Contact(): JSX.Element {
    return (
        <Container maxWidth="md" className="Contact">
            <Box sx={{ my: 4, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                <Typography variant="h6" component="p" gutterBottom>
                    We'd love to hear from you! Please fill out the form below to get in touch with us.
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            <strong>Email:</strong> support@couponwebsite.com
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            <strong>Phone:</strong> +1 (123) 456-7890
                        </Typography>
                        <Typography variant="body1" component="p" gutterBottom>
                            <strong>Address:</strong> 123 Coupon St, Discount City, CO 12345
                        </Typography>
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledPaper>
                        <form noValidate autoComplete="off">
                            <TextField
                                fullWidth
                                label="Name"
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                margin="normal"
                                variant="outlined"
                                multiline
                                rows={4}
                                required
                            />
                            <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
                                Send Message
                            </Button>
                        </form>
                    </StyledPaper>
                </Grid>
            </Grid>
        </Container>
    );
}