import "./AllCouponList.css";
import { useState, useEffect } from "react";
import notificationService from "../../../Service/NotificationService";
import { Container, Box, CircularProgress, Typography, MenuItem, Select, FormControl, InputLabel, Slider, SelectChangeEvent } from "@mui/material";
import { CouponModel } from "../../../Model/CouponModel";
import { CouponCard } from "../../CouponCard/CouponCard";
import { customerStore, getAllCouponsAction, getMyCouponsAction } from "../../../Redux/CustomerStore";
import { getAllCouponsApi, getAllCouponsOfCustomerApi } from "../../../Service/CustomerService";
import { Category } from "../../../Enums/Category";

export function AllCouponList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>(customerStore.getState().allCoupons);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [priceFilter, setPriceFilter] = useState<number>(Math.max(...customerStore.getState().allCoupons.map(coupon => coupon.price)));

    useEffect(() => {
        if (coupons.length === 0) {
            getAllCouponsApi()
                .then((data) => {
                    setCoupons(data);
                    customerStore.dispatch(getAllCouponsAction(data));
                    notificationService.successPlainText("Coupons loaded successfully.");
                    setPriceFilter(Math.max(...data.map(coupon => coupon.price)));
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

        if (coupons.length === 0) {
            getAllCouponsOfCustomerApi()
                .then((data) => {
                    setCoupons(data);
                    customerStore.dispatch(getMyCouponsAction(data));
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }

        const unsubscribe = customerStore.subscribe(() => {
            setCoupons(customerStore.getState().allCoupons);
        });

        return () => {
            unsubscribe();
        };
    }, [coupons]);

    const handleCategoryChange = (event: SelectChangeEvent<string>) => {
        setSelectedCategory(event.target.value as string);
    };

    const handlePriceChange = (_event: Event, newValue: number | number[]) => {
        setPriceFilter(newValue as number);
    };

    const filteredCoupons = coupons.filter(coupon => {
        const categoryMatch = selectedCategory === "All" || coupon.category === selectedCategory;
        const priceMatch = coupon.price <= priceFilter;
        return categoryMatch && priceMatch;
    });

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Container maxWidth="md">
                <Box className="AllCouponList" sx={{ mt: 8 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        All Coupons
                    </Typography>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select value={selectedCategory} onChange={handleCategoryChange}>
                            <MenuItem value="All">All</MenuItem>
                            {Object.values(Category).map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <Typography gutterBottom>Price Filter: Up to ${priceFilter}</Typography>
                        <Slider
                            value={priceFilter}
                            onChange={handlePriceChange}
                            aria-labelledby="price-slider"
                            valueLabelDisplay="auto"
                            min={0}
                            max={Math.max(...coupons.map(coupon => coupon.price))}
                        />
                    </FormControl>
                    <Box className="CouponsGrid" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                        {filteredCoupons.map(coupon => (
                            <CouponCard
                                key={coupon.id}
                                coupon={coupon}
                                isCompany={false}
                                isPurchasable={true}
                            />
                        ))}
                    </Box>
                </Box>
            </Container>
        </>
    );
}