import "./MyCouponList.css";
import { useState, useEffect } from "react";
import notificationService from "../../../Service/NotificationService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { CouponModel } from "../../../Model/CouponModel";
import { CouponCard } from "../../CouponCard/CouponCard";
import { customerStore, getMyCouponsAction } from "../../../Redux/CustomerStore";
import { getAllCouponsOfCustomerApi } from "../../../Service/CustomerService";

export function MyCouponList(): JSX.Element {
    const [coupons, setCoupons] = useState<CouponModel[]>(customerStore.getState().myCoupons);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (coupons.length === 0) {
            getAllCouponsOfCustomerApi()
                .then((data) => {
                    setCoupons(data);
                    customerStore.dispatch(getMyCouponsAction(data));
                    notificationService.successPlainText("My coupons loaded successfully.");
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

        return () => {
        };
    }, [coupons.length]);

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <div className="CouponList">
                {coupons.map((coupon) => (
                    <CouponCard key={coupon.id} coupon={coupon} isCompany={false} isPurchasable={false} />
                ))}
            </div>
        </>
    );
}