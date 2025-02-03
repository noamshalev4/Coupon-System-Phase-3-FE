import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box, CircularProgress, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CompanyModel } from "../../../Model/CompanyModel";
import { getOneCompanyApi, updateCompanyApi } from "../../../Service/AdminService";
import { useParams, useNavigate } from "react-router-dom";
import notificationService from "../../../Service/NotificationService";
import "./UpdateCompany.css";
import { adminStore, updateCompanyAction } from "../../../Redux/AdminStore";

const updateCompanySchema = z.object({
    id: z.number().min(1, "ID is required"),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});

export function UpdateCompany(): JSX.Element {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CompanyModel>({
        resolver: zodResolver(updateCompanySchema),
    });

    useEffect(() => {
        if (id) {
            getOneCompanyApi(Number(id))
                .then((data) => {
                    setValue("id", data.id);
                    setValue("name", data.name);
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

    const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
        updateCompanyApi(data).then(() => {
            adminStore.dispatch(updateCompanyAction(data));
            notificationService.successPlainText("Company updated successfully.");
            navigate("/admin/companies");
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
            <Box className="UpdateCompany" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Company
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
                        label="Name"
                        {...register("name")}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name?.message}
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
                        Update Company
                    </Button>
                </form>
            </Box>
        </Container>
    );
}