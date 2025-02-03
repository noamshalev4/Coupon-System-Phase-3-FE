import { useEffect, useState } from "react";
import { Typography, Container, Box, CircularProgress } from "@mui/material";
import { getOneCompanyApi } from "../../../Service/CompanyService";
import { companyStore, getCompanyAction } from "../../../Redux/CompanyStore";
import notificationService from "../../../Service/NotificationService";
import { CompanyModel } from "../../../Model/CompanyModel";
import "./CompanyDetails.css";

export function CompanyDetails(): JSX.Element {
    const [company, setCompany] = useState<CompanyModel | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getOneCompanyApi()
            .then((data) => {
                companyStore.dispatch(getCompanyAction(data));
                setCompany(data);
                setLoading(false);
            })
            .catch((error) => {
                notificationService.errorAxiosApiCall(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (!company) {
        return (
            <Container maxWidth="sm">
                <Box className="CompanyDetails" sx={{ mt: 8 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Company Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        No company details available.
                    </Typography>
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm">
            <Box className="CompanyDetails" sx={{ mt: 8 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Company Details
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Name:</strong> {company.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    <strong>Email:</strong> {company.email}
                </Typography>
            </Box>
        </Container>
    );
}