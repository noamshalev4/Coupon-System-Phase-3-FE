import { useEffect, useState } from "react";
import { Container, Box, CircularProgress, Typography, MenuItem, Select, FormControl, InputLabel, Slider, SelectChangeEvent, Button } from "@mui/material";
import { CouponModel } from "../../../Model/CouponModel";
import { getAllCouponsApi, getOneCompanyApi } from "../../../Service/CompanyService";
import { companyStore, getAllCouponsAction, getCompanyAction } from "../../../Redux/CompanyStore";
import notificationService from "../../../Service/NotificationService";
import { Category } from "../../../Enums/Category";
import "./CouponsList.css";
import { CouponCard } from "../../CouponCard/CouponCard";
import { useNavigate } from "react-router-dom";

export function CouponsList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>(companyStore.getState().coupons);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [priceFilter, setPriceFilter] = useState<number>(Math.max(...companyStore.getState().coupons.map(coupon => coupon.price)));
    const navigate = useNavigate();

    useEffect(() => {
        if (coupons.length === 0) {
            getAllCouponsApi()
                .then((data) => {
                    setCoupons(data);
                    companyStore.dispatch(getAllCouponsAction(data));
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

        getOneCompanyApi().then((data) => {
            companyStore.dispatch(getCompanyAction(data));
        }).catch((error) => {
            notificationService.errorAxiosApiCall(error);
        });

        const unsubscribe = companyStore.subscribe(() => {
            setCoupons(companyStore.getState().coupons);
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
        <Container maxWidth="md">
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/company/coupons/add")}
                >
                    Add Coupon
                </Button>
            </Box>
            <Box className="CouponsList" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
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
                            isCompany={true}
                            isPurchasable={false}
                        />
                    ))}
                </Box>
            </Box>
        </Container>
    );
}















