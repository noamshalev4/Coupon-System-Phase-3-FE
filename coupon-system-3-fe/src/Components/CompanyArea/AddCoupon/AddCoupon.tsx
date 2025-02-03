import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Container, Box, MenuItem } from "@mui/material";
import { CouponModel } from "../../../Model/CouponModel";
import notificationService from "../../../Service/NotificationService";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../Enums/Category";
import "./AddCoupon.css";
import { addCouponAction, companyStore } from "../../../Redux/CompanyStore";
import { addCouponApi } from "../../../Service/CompanyService";

const addCouponSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.nativeEnum(Category, { errorMap: () => ({ message: "Category is required" }) }),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
    amount: z.string().refine((val) => !isNaN(Number(val)), { message: "Amount must be a number" }),
    price: z.string().refine((val) => !isNaN(Number(val)), { message: "Price must be a number" }),
    image: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export function AddCoupon(): JSX.Element {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<CouponModel>({
        resolver: zodResolver(addCouponSchema),
    });

    const onSubmit: SubmitHandler<CouponModel> = (data: CouponModel) => {
        const couponData: CouponModel = {
            ...data,
            amount: Number(data.amount),
            price: Number(data.price),
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate),
            id: 0, 
            company: companyStore.getState().company!,
        };
        console.log(couponData);
        addCouponApi(couponData).then((response: any) => {
            companyStore.dispatch(addCouponAction(response));
            notificationService.successPlainText("Coupon added successfully");
            navigate("/company/coupons");
        }).catch((error: any) => {
            notificationService.errorAxiosApiCall(error);
        });
    };

    return (
        <Container maxWidth="sm">
            <Box className="AddCoupon" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Add Coupon
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Title"
                        {...register("title")}
                        fullWidth
                        margin="normal"
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        required
                    />
                    <TextField
                        label="Description"
                        {...register("description")}
                        fullWidth
                        margin="normal"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        required
                    />
                    <TextField
                        label="Category"
                        select
                        {...register("category")}
                        fullWidth
                        margin="normal"
                        error={!!errors.category}
                        helperText={errors.category?.message}
                        required
                    >
                        {Object.values(Category).map((category) => (
                            <MenuItem key={category} value={category}>
                                {category}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Start Date"
                        type="date"
                        {...register("startDate")}
                        fullWidth
                        margin="normal"
                        error={!!errors.startDate}
                        helperText={errors.startDate?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        label="End Date"
                        type="date"
                        {...register("endDate")}
                        fullWidth
                        margin="normal"
                        error={!!errors.endDate}
                        helperText={errors.endDate?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        {...register("amount")}
                        fullWidth
                        margin="normal"
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                        required
                    />
                    <TextField
                        label="Price"
                        type="number"
                        {...register("price")}
                        fullWidth
                        margin="normal"
                        error={!!errors.price}
                        helperText={errors.price?.message}
                        required
                    />
                    <TextField
                        label="Image URL"
                        {...register("image")}
                        fullWidth
                        margin="normal"
                        error={!!errors.image}
                        helperText={errors.image?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Add Coupon
                    </Button>
                </form>
            </Box>
        </Container>
    );
}