import "./CouponCard.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { useNavigate } from "react-router-dom";
import notificationService from "../../Service/NotificationService";
import { CouponModel } from "../../Model/CouponModel";
import { companyStore, deleteCouponAction } from "../../Redux/CompanyStore";
import { deleteCouponApi } from "../../Service/CompanyService";
import { purchaseCouponApi } from "../../Service/CustomerService";
import { customerStore, purchaseCouponAction } from "../../Redux/CustomerStore";

interface CouponCardProps {
    coupon: CouponModel;
    isCompany: boolean;
    isPurchasable: boolean;
}

export function CouponCard({ coupon, isCompany, isPurchasable }: CouponCardProps): JSX.Element {

    const navigate = useNavigate();

    function handleDelete(): void {
        if (window.confirm("Are You Sure You Want To Delete This Coupon?")) {
            deleteCouponApi(coupon.id)
                .then(() => {
                    companyStore.dispatch(deleteCouponAction(coupon.id));
                    notificationService.successPlainText("Coupon deleted successfully.");
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                });
        } else {
            notificationService.errorPlainText("Coupon deletion cancelled.");
        }
    }

    function handlePurchase(): void {
        purchaseCouponApi(coupon.id).
            then((data) => {
                customerStore.dispatch(purchaseCouponAction(data));
                notificationService.successPlainText("Coupon purchased successfully.");
            })
            .catch((error) => {
                notificationService.errorAxiosApiCall(error);
            });
    }

    const isExpired = new Date(coupon.endDate) < new Date();
    const isOutOfStock = coupon.amount <= 0;

    return (
        <Card className="CouponCard" sx={{ maxWidth: 345, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="140"
                image={"https://bulknaturaloils.com/media/wysiwyg/couponGraphic.gif"} // Replace with actual image URL if available
                alt={`${coupon.title} Image`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {coupon.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {coupon.description}
                </Typography>
                {
                    !isCompany && !isPurchasable ?
                        <></>
                        :
                        <Typography variant="body2" color="text.secondary">
                            Amount: {coupon.amount}
                        </Typography>
                }
                <Typography variant="body2" color="text.secondary">
                    Price: ${coupon.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Category: {coupon.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Expiry Date: {new Date(coupon.endDate).toLocaleDateString()}
                </Typography>
            </CardContent>
            <CardActions>
                {isCompany ? (
                    <>
                        <Button size="small" color="primary" onClick={() => navigate(`/company/coupons/update/${coupon.id}`)}>
                            EDIT
                        </Button>
                        <Button size="small" color="primary" onClick={handleDelete}>
                            DELETE
                        </Button>
                    </>
                ) : isPurchasable ? (
                    isOutOfStock ? (
                        <Button size="small" color="primary" disabled>
                            OUT OF STOCK
                        </Button>
                    ) : isExpired ? (
                        <Button size="small" color="primary" disabled>
                            EXPIRED
                        </Button>
                    ) : (
                        <Button size="small" color="primary" onClick={handlePurchase}>
                            PURCHASE
                        </Button>
                    )
                ) : null}
            </CardActions>
        </Card>
    );
}



