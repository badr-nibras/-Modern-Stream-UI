import Login from './Login/Login';
import Banners from './Banners/Banners';
import HotStreams from './HotStreams/HotStreams';
import CommingEvents from './CommingEvents/CommingEvents';
import Games from './Games/Games';
import AboutUs from './AboutUs/AboutUs';
import NavBar from './Navbar/Navbar'
const Portfolio = () => {
    return ( 
        <div>
            <header>
                <Login />
                <Banners />
            </header>
            <NavBar/>

            <main>
                <HotStreams />
                <CommingEvents />
                <Games />
                <AboutUs />
            </main>
        </div>
    );
}
 
export default Portfolio;