import './Layout.scss';
import HeaderMenu from '../components/Header/Header';
import SideMenu from '../components/SideMenu/SideMenu';

const Layout = ({children}) => {
    return (
        <>
            <HeaderMenu />
            <div className="body">
                <SideMenu />
                <div className="content">
                    {children}
                    <span className="copy">Modern Stream 2021</span>
                </div>
            </div>
        </>
    );
}
 
export default Layout;