import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import "./AddCompany.css";
import { CompanyModel } from "../../../Model/CompanyModel";
import { addCompanyApi } from "../../../Service/AdminService";
import notificationService from "../../../Service/NotificationService";
import { addCompanyAction, adminStore } from "../../../Redux/AdminStore";
import { useNavigate } from "react-router-dom";

const addCompanySchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
});


export function AddCompany(): JSX.Element {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CompanyModel>({
        resolver: zodResolver(addCompanySchema),
    });

    function onSubmit(data: CompanyModel) {
        addCompanyApi(data).then((response) => {
            adminStore.dispatch(addCompanyAction(response));
            notificationService.successPlainText("Company added successfully");
            navigate("/admin/companies");
        }).catch((error) => {
            notificationService.errorAxiosApiCall(error);
        }
        );
    };

    return (
        <Container maxWidth="sm">
            <Box className="AddCompany" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Company
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        type="password"
                        {...register("password")}
                        fullWidth
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        required
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Add Company
                    </Button>
                </form>
            </Box>
        </Container>
    );
}