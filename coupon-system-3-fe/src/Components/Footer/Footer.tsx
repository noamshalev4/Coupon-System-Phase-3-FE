import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import "./Footer.css";

export function Footer(): JSX.Element {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <AppBar position="relative" >
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    © {currentYear} My Application
                </Typography>
                <Button color="inherit">Settings</Button>
                <Button color="inherit">Conditions</Button>
                <Button color="inherit">Privacy</Button>
                <IconButton edge="end" color="inherit" aria-label="scroll up" onClick={scrollToTop}>
                    <ArrowUpwardIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
}