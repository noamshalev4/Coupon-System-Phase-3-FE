import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getOneCustomerApi, updateCustomerApi } from "../../../Service/AdminService";
import { useParams, useNavigate } from "react-router-dom";
import notificationService from "../../../Service/NotificationService";
import { adminStore, updateCustomerAction } from "../../../Redux/AdminStore";
import "./UpdateCustomer.css";
import { CustomerModel } from "../../../Model/CustomerModel";

const updateCustomerSchema = z.object({
    id: z.number().min(1, "ID is required"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});

export function UpdateCustomer(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CustomerModel>({
        resolver: zodResolver(updateCustomerSchema),
    });

    useEffect(() => {
        if (id) {
            getOneCustomerApi(Number(id))
                .then((data) => {
                    setValue("id", data.id);
                    setValue("firstName", data.firstName);
                    setValue("lastName", data.lastName);
                    setValue("email", data.email);
                    setValue("password", data.password);
                    setLoading(false);
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                    setLoading(false);
                });
        }
    }, [id, setValue]);

    const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
        updateCustomerApi(data).then(() => {
            adminStore.dispatch(updateCustomerAction(data));
            notificationService.successPlainText("Customer updated successfully.");
            navigate("/admin/customers");
        }).catch((error) => {
            notificationService.errorAxiosApiCall(error);
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box className="UpdateCustomer" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Customer
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="ID"
                        type="number"
                        {...register("id")}
                        fullWidth
                        margin="normal"
                        error={!!errors.id}
                        helperText={errors.id?.message}
                        required
                        disabled
                    />
                    <TextField
                        label="First Name"
                        {...register("firstName")}
                        fullWidth
                        margin="normal"
                        error={!!errors.firstName}
                        helperText={errors.firstName?.message}
                        required
                    />
                    <TextField
                        label="Last Name"
                        {...register("lastName")}
                        fullWidth
                        margin="normal"
                        error={!!errors.lastName}
                        helperText={errors.lastName?.message}
                        required
                    />
                    <TextField
                        label="Email"
                        {...register("email")}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        required
                    />
                    <TextField
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        {...register("password")}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Update Customer
                    </Button>
                </form>
            </Box>
        </Container>
    );
}