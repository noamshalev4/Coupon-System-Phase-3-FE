import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { MainContent } from "../MainContent/MainContent";
import { SideMenu } from "../SideMenu/SideMenu";
import "./LayOut.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function LayOut(): JSX.Element {
    return (
        <div className="LayOut">
            <Header />
            <div className="Content">
                <SideMenu />
                <MainContent />
            </div>
            <Footer />
            <ToastContainer
                position="top-right"
                autoClose={2000}
            />
        </div>
    );
}

