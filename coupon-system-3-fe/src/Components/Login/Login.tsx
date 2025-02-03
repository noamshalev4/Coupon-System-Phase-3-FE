import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { ClientType } from "../../Enums/ClientType";
import "./Login.css";
import { loginApi } from "../../Service/LoginService";
import notificationService from "../../Service/NotificationService";
import { useNavigate } from "react-router-dom";
import { LoginRequestModel } from "../../Model/LoginRequestModel";
import { authStore, loginAction } from "../../Redux/AuthStore";
import { SubmitHandler, useForm } from "react-hook-form";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(4, "Password is required"),
    clientType: z.nativeEnum(ClientType, { errorMap: () => ({ message: "Client type is required" }) }),
});

export function Login(): JSX.Element {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<LoginRequestModel>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<LoginRequestModel> = (data) => {
        loginApi(data).then((response) => {
            notificationService.successPlainText("Login successful");
            authStore.dispatch(loginAction(response))
            navigate("/home");
        }
        ).catch((error) => {
            notificationService.errorAxiosApiCall(error);
        }
        );
    };

    return (
        <Container maxWidth="sm">
            <Box className="Login" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        type="password"
                        {...register("password")}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.clientType}>
                        <InputLabel id="clientType-label">Client Type</InputLabel>
                        <Select
                            labelId="clientType-label"
                            label="Client Type"
                            {...register("clientType")}
                            defaultValue=""
                            onChange={(e) => setValue("clientType", e.target.value as ClientType)}
                        >
                            <MenuItem value={ClientType.ADMIN}>Admin</MenuItem>
                            <MenuItem value={ClientType.COMPANY}>Company</MenuItem>
                            <MenuItem value={ClientType.CUSTOMER}>Customer</MenuItem>
                        </Select>
                        <FormHelperText>{errors.clientType?.message}</FormHelperText>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    );
}