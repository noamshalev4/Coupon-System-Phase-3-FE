import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, CircularProgress, Container, MenuItem, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Category } from "../../../Enums/Category";
import { CompanyModel } from "../../../Model/CompanyModel";
import { CouponModel } from "../../../Model/CouponModel";
import { companyStore, updateCouponAction } from "../../../Redux/CompanyStore";
import { getOneCouponApi, updateCouponApi } from "../../../Service/CompanyService";
import notificationService from "../../../Service/NotificationService";
import "./UpdateCoupon.css";

const schema = z.object({
    id: z.number().min(1, { message: "ID is required" }),
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    startDate: z.string().min(1, { message: "Start date is required" }),
    endDate: z.string().min(1, { message: "End date is required" }),
    amount: z
        .union([z.string(), z.number()])
        .refine(val => !isNaN(Number(val)) && Number(val) >= 1, { message: "Amount must be a valid number and at least 1" })
        .transform(val => Number(val)),

    price: z
        .union([z.string(), z.number()])
        .refine(val => !isNaN(Number(val)) && Number(val) >= 0, { message: "Price must be a valid number and at least 0" })
        .transform(val => Number(val)),

    image: z.string().url({ message: "Invalid URL" }).optional().or(z.literal("")),
    category: z.nativeEnum(Category, { message: "Invalid category" })
});

export function UpdateCoupon(): JSX.Element {
    const [coupon, setCoupon] = useState<CouponModel | null>(null);
    const [currentCompany, setCurrentCompany] = useState<CompanyModel | null>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CouponModel>({
        resolver: zodResolver(schema),
        mode: "onChange"
    });

    useEffect(() => {
        if (id) {
            getOneCouponApi(Number(id))
                .then((data) => {
                    setCoupon(data);
                    setCurrentCompany(data.company);
                    setLoading(false);
                    setValue("id", data.id);
                    setValue("title", data.title);
                    setValue("description", data.description);
                    setValue("startDate", data.startDate);
                    setValue("endDate", data.endDate);
                    setValue("amount", data.amount);
                    setValue("price", data.price);
                    setValue("image", data.image || "");
                    setValue("category", data?.category);
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                    setLoading(false);
                });
        }
    }, [id, setValue]);

    const onSubmit: SubmitHandler<CouponModel> = (data) => {
        const amount = Number(data.amount);
        const price = Number(data.price);
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);

        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            notificationService.errorPlainText("Invalid date format.");
            return;
        }

        const defaultImageUrl = "https://via.placeholder.com/250x150";
        const imageUrl = data.image || defaultImageUrl;
        const couponData: CouponModel = {
            ...data,
            id: data.id,
            startDate,
            endDate,
            amount: Number(amount),
            price: Number(price),
            company: currentCompany!,
            image: imageUrl
        };

        updateCouponApi(couponData)
            .then(() => {
                companyStore.dispatch(updateCouponAction(couponData));
                notificationService.successPlainText("Coupon updated successfully.");
                navigate("/company/coupons");
            })
            .catch((error) => {
                console.log(error);
                notificationService.errorAxiosApiCall(error);
            });
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
            <Box className="UpdateCoupon" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Update Coupon
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
                        defaultValue={coupon?.category}
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
                        InputLabelProps={{ shrink: true }}
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
                        InputLabelProps={{ shrink: true }}
                        required
                    />
                    <TextField
                        label="Amount"
                        type="number"
                        {...register("amount")}
                        margin="normal"
                        fullWidth
                        error={!!errors.amount}
                        helperText={errors.amount?.message}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        {...register("price")}
                        margin="normal"
                        fullWidth
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        label="Image URL"
                        {...register("image")}
                        fullWidth
                        margin="normal"
                        error={!!errors.image}
                        helperText={errors.image?.message}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }} disabled={loading}>
                        Update Coupon
                    </Button>
                </form>
            </Box>
        </Container>
    );
}