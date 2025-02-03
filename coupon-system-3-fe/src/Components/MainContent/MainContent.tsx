import { Outlet } from "react-router-dom";
import { Routing } from "../Routing/Routing";
import "./MainContent.css";

export function MainContent(): JSX.Element {
    return (
        <div className="MainContent">
            <Routing />
            <Outlet />
        </div>
    );
}
