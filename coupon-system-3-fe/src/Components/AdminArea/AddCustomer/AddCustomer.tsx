import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { addCustomerApi } from "../../../Service/AdminService";
import notificationService from "../../../Service/NotificationService";
import { addCustomerAction, adminStore } from "../../../Redux/AdminStore";
import { useNavigate } from "react-router-dom";
import { CustomerModel } from "../../../Model/CustomerModel";

const addCustomerSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});


export function AddCustomer(): JSX.Element {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CustomerModel>({
        resolver: zodResolver(addCustomerSchema),
    });

    function onSubmit(data: CustomerModel) {
        addCustomerApi(data).then((response) => {
            adminStore.dispatch(addCustomerAction(response));
            notificationService.successPlainText("Customer added successfully");
            navigate("/admin/customers");
        }).catch((error) => {
            notificationService.errorAxiosApiCall(error);
        }
        );
    };

    return (
        <Container maxWidth="sm">
            <Box className="AddCustomer" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Customer
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="firstName"
                        {...register("firstName")}
                        fullWidth
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        required
                    />
                    <TextField
                        label="lastName"
                        {...register("lastName")}
                        fullWidth
                        margin="normal"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        required
                    />
                    <TextField
                        label="email"
                        type="email"
                        {...register("email")}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        required
                    />
                    <TextField
                        label="password"
                        type="password"
                        {...register("password")}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Add Customer
                    </Button>
                </form>
            </Box>
        </Container>
    );
}