import { useState, useEffect } from "react";
import { CompanyCard } from "../../CompanyCard/CompanyCard";
import { CompanyModel } from "../../../Model/CompanyModel";
import { getAllCompaniesApi } from "../../../Service/AdminService";
import notificationService from "../../../Service/NotificationService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./CompanyList.css";
import { adminStore, getAllCompaniesAction } from "../../../Redux/AdminStore";

export function CompanyList(): JSX.Element {
    const [companies, setCompanies] = useState<CompanyModel[]>(adminStore.getState().companies);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (companies.length === 0) {
            getAllCompaniesApi()
                .then((data) => {
                    setCompanies(data);
                    adminStore.dispatch(getAllCompaniesAction(data));
                    notificationService.successPlainText("Companies loaded successfully.");
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

        const unsubscribe = adminStore.subscribe(() => {
            setCompanies(adminStore.getState().companies);
        });

        return () => {
            unsubscribe();
        };
    }, [companies.length]);

    if (loading) {
        return (
            <Box className="Loading" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/admin/companies/add")}
                >
                    Add Company
                </Button>
            </Box>
            <div className="CompanyList">
                {companies.map((company) => (
                    <CompanyCard key={company.id} company={company} />
                ))}
            </div>
        </>
    );
}