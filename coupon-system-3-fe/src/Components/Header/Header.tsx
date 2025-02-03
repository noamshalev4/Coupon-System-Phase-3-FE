import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./Header.css";
import { RiCoupon3Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { authStore } from "../../Redux/AuthStore";

export function Header(): JSX.Element {
    const navigate = useNavigate();

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <RiCoupon3Line style={{ fontSize: '2rem', color: 'white', marginRight: '16px' }} />
                    {/* <img src="/path/to/logo.png" alt="Logo" style={{ height: '40px', marginRight: '16px' }} /> */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        My Application
                    </Typography>
                    {authStore.getState().user.clientType === "GUEST"
                        ?
                        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
                        :
                        <Button color="inherit" onClick={() => navigate("/logout")}>Logout</Button>
                    }
                </Toolbar>
            </AppBar>
        </>
    );
}