import { Outlet } from 'react-router-dom';

import Nav from "./Nav";
import Footer from "./Footer";
import Body from "./Body";

const Layout = () => {
    return (
        <div>
            <Nav />
            <Body>
                <Outlet />
            </Body>
            <Footer />
        </div>
   );
}

export default Layout;