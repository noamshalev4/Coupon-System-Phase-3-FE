import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import { CompanyModel } from "../../Model/CompanyModel";
import "./CompanyCard.css";
import { useNavigate } from "react-router-dom";
import { adminStore, deleteCompanyAction } from "../../Redux/AdminStore";
import { deleteCompanyApi } from "../../Service/AdminService";
import notificationService from "../../Service/NotificationService";

interface CompanyCardProps {
    company: CompanyModel;
}

export function CompanyCard({ company }: CompanyCardProps): JSX.Element {
    const navigate = useNavigate();
    const handleDelete = () => {
        if (window.confirm("Are You Sure You Want To Delete This Company?")) {
            deleteCompanyApi(company.id)
                .then(() => {
                    adminStore.dispatch(deleteCompanyAction(company.id));
                    notificationService.successPlainText("Company deleted successfully.");
                })
                .catch((error) => {
                    notificationService.errorAxiosApiCall(error);
                });
        } else {
            notificationService.errorPlainText("Company deletion cancelled.");
        }
    };

    return (
        <>
            <Card className="CompanyCard" sx={{ maxWidth: 345, margin: '20px auto' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://www.azernews.az/media/pictures/company_picture.jpg" // Replace with actual logo URL if available
                    alt={`${company.name} Logo`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {company.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {company.email}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => navigate(`/admin/companies/update/${company.id}`)}>
                        EDIT
                    </Button>
                    <Button size="small" color="primary" onClick={handleDelete}>
                        DELETE
                    </Button>
                </CardActions>
            </Card>
        </>
    );
}