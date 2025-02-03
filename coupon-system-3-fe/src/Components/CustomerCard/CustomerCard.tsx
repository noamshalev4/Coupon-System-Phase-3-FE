import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CustomerModel } from "../../Model/CustomerModel";

interface CustomerCardProps {
    customer: CustomerModel;
}

export function CustomerCard({ customer }: CustomerCardProps): JSX.Element {

    return (
        <Card className="CustomerCard" sx={{ maxWidth: 345, margin: '20px auto' }}>
            <CardMedia
                component="img"
                height="140"
                image="https://codedesign.org/storage/app/media/uploaded-files/customer%20base%202.png" // Replace with actual logo URL if available
                alt={`${customer.firstName} ${customer.lastName} Logo`}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {customer.firstName} {customer.lastName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {customer.email}
                </Typography>
            </CardContent>
        </Card>
    );
}