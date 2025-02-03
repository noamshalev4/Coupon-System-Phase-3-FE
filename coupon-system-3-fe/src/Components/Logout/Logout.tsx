import "./Logout.css";
import { useEffect } from "react";
import { authStore, logoutAction } from "../../Redux/AuthStore";
import { useNavigate } from "react-router-dom";
import { clearCompanyStateAction, companyStore } from "../../Redux/CompanyStore";
import { clearCustomerStateAction, customerStore } from "../../Redux/CustomerStore";

export function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        authStore.dispatch(logoutAction());
        companyStore.dispatch(clearCompanyStateAction());
        customerStore.dispatch(clearCustomerStateAction());
        navigate("/home");
    }, []);

    return (
        <div className="Logout">
        </div>
    );
}
