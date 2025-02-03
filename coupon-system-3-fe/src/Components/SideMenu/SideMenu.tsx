import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { useNavigate } from "react-router-dom";
import { VscOrganization } from "react-icons/vsc";
import { authStore } from "../../Redux/AuthStore";
import { IoIosContacts } from "react-icons/io";
import "./SideMenu.css";
import { BsInfoSquareFill } from "react-icons/bs";
import { ListItemButton } from "@mui/material";
import { RiCoupon3Fill, RiCoupon3Line } from "react-icons/ri";

export function SideMenu(): JSX.Element {
    const navigate = useNavigate();
    const menuItems = [
        { text: "Home", icon: <HomeIcon />, path: "/home" },
        { text: "About", icon: <InfoIcon />, path: "/about" },
        { text: "Contact", icon: <ContactMailIcon />, path: "/contact" },
    ];

    const adminMenuItems = [
        { text: "Companies", icon: <VscOrganization style={{ fontSize: '1.5em' }} />, path: "/admin/companies" },
        { text: "Customers", icon: <IoIosContacts style={{ fontSize: '1.7em' }} />, path: "/admin/customers" },
    ];

    const companyMenuItems = [
        { text: "Coupons", icon: <RiCoupon3Fill style={{ fontSize: '1.5em' }} />, path: "/company/coupons" },
        { text: "Details", icon: <BsInfoSquareFill style={{ fontSize: '1.3em' }} />, path: "/company/details" },
    ];

    const customerMenuItems = [
        { text: "AllCoupons", icon: <RiCoupon3Fill style={{ fontSize: '1.5em' }} />, path: "/customer/all-coupons" },
        { text: "MyCoupons", icon: <RiCoupon3Line style={{ fontSize: '1.5em' }} />, path: "/customer/my-coupons" },
        { text: "Details", icon: <BsInfoSquareFill style={{ fontSize: '1.3em' }} />, path: "/customer/details" },
    ];

    return (
        <div className="SideMenu">
            <List>
                {menuItems.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={() => navigate(item.path)}
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                backgroundColor: "#f0f0f0",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItemButton>
                ))}
            </List>
            {authStore.getState().user.clientType === "ADMIN" && (
                <List>
                    {adminMenuItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => navigate(item.path)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            )}
            {authStore.getState().user.clientType === "COMPANY" && (
                <List>
                    {companyMenuItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => navigate(item.path)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            )}
            {authStore.getState().user.clientType === "CUSTOMER" && (
                <List>
                    {customerMenuItems.map((item, index) => (
                        <ListItemButton
                            key={index}
                            onClick={() => navigate(item.path)}
                            sx={{
                                cursor: "pointer",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 30 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    ))}
                </List>
            )}
        </div>
    );
}