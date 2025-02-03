import { useState, useEffect } from "react";
import { getAllCustomersApi } from "../../../Service/AdminService";
import notificationService from "../../../Service/NotificationService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { adminStore, getAllCustomersAction } from "../../../Redux/AdminStore";
import { CustomerModel } from "../../../Model/CustomerModel";
import { CustomerCard } from "../../CustomerCard/CustomerCard";

export function CustomerList(): JSX.Element {
    const [customers, setCustomers] = useState<CustomerModel[]>(adminStore.getState().customers);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (customers.length === 0) {
            getAllCustomersApi()
                .then((data) => {
                    setCustomers(data);
                    adminStore.dispatch(getAllCustomersAction(data));
                    notificationService.successPlainText("Customers loaded successfully.");
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

        const unsubscribe = adminStore.subscribe(() => {
            setCustomers(adminStore.getState().customers);
        });

        return () => {
            unsubscribe();
        };
    }, [customers.length]);

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/admin/customers/add")}
                >
                    Add Customer
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {customers.map(customer => (
                    <CustomerCard key={customer.id} customer={customer} />
                ))}
            </Box>
        </>
    );
}