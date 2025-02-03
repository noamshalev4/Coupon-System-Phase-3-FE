import { Routes, Route } from "react-router-dom";
import "./Routing.css";
import { LayOut } from "../LayOut/LayOut";
import { Home } from "../Home/Home";
import { NotFound } from "../NotFound/NotFound";
import { Login } from "../Login/Login";
import { About } from "../About/About";
import { Logout } from "../Logout/Logout";
import { CompanyList } from "../AdminArea/CompanyList/CompanyList";
import { authStore } from "../../Redux/AuthStore";
import { AddCompany } from "../AdminArea/AddCompany/AddCompany";
import { useEffect, useState } from "react";
import { UpdateCompany } from "../AdminArea/UpdateCompany/UpdateCompany";
import { AddCoupon } from "../CompanyArea/AddCoupon/AddCoupon";
import { UpdateCoupon } from "../CompanyArea/UpdateCoupon/UpdateCoupon";
import { AllCouponList } from "../CustomerArea/AllCouponList/AllCouponList";
import { MyCouponList } from "../CustomerArea/MyCouponList/MyCouponList";
import { CustomerDetails } from "../CustomerArea/CustomerDetails/CustomerDetails";
import { CompanyDetails } from "../CompanyArea/CompanyDetails/CompanyDetails";
import { CouponsList } from "../CompanyArea/CouponsList/CouponsList";
import { CustomerList } from "../AdminArea/CustomerList/CustomerList";
import { AddCustomer } from "../AdminArea/AddCustomer/AddCustomer";
import { Contact } from "../Contact/Contact";

export function Routing(): JSX.Element {
    const [clientType, setClientType] = useState(authStore.getState().user.clientType);

    useEffect(() => {
        const unsubscribe = authStore.subscribe(() => {
            setClientType(authStore.getState().user.clientType);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <div className="Routing">
            <Routes>
                <Route path="/" element={<LayOut />} />
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/* Admin Area */}
                {clientType === "ADMIN" &&
                    <>
                        <Route path="/admin/companies" element={<CompanyList />} />
                        <Route path="/admin/companies/add" element={<AddCompany />} />
                        <Route path="/admin/companies/update/:id" element={<UpdateCompany />} />
                        <Route path="/admin/customers" element={<CustomerList />} />
                        <Route path="/admin/customers/add" element={<AddCustomer />} />
                    </>
                }

                {/* Company Area*/}
                {clientType === "COMPANY" &&
                    <>
                        <Route path="/company/coupons" element={<CouponsList />} />
                        <Route path="/company/coupons/add" element={<AddCoupon />} />
                        <Route path="/company/coupons/update/:id" element={<UpdateCoupon />} />
                        <Route path="/company/details" element={<CompanyDetails />} />
                    </>
                }

                {/* Customer Area*/}
                {clientType === "CUSTOMER" &&
                    <>
                        <Route path="/customer/all-coupons" element={<AllCouponList />} />
                        <Route path="/customer/my-coupons" element={<MyCouponList />} />
                        <Route path="/customer/details" element={<CustomerDetails />} />
                    </>
                }

                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
