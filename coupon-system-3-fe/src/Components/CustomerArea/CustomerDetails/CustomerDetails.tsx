import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress } from "@mui/material";
import { getOneCustomerApi } from "../../../Service/CustomerService";
import { customerStore, getCustomerAction } from "../../../Redux/CustomerStore";
import notificationService from "../../../Service/NotificationService";
import { CustomerModel } from "../../../Model/CustomerModel";
import "./CustomerDetails.css";

export function CustomerDetails(): JSX.Element {
    const [customer, setCustomer] = useState<CustomerModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getOneCustomerApi()
            .then((data) => {
                customerStore.dispatch(getCustomerAction(data));
                setCustomer(data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                notificationService.errorAxiosApiCall(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!customer) {
        return (
            <Container maxWidth="sm">
                <Box className="CustomerDetails" sx={{ mt: 8 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Customer Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        No customer details available.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box className="CustomerDetails" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Customer Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>First Name:</strong> {customer.firstName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Last Name:</strong> {customer.lastName}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Email:</strong> {customer.email}
                </Typography>
            </Box>
        </Container>
    );
}