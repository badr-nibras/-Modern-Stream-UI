import './AboutUs.scss';
import logo from '../../../assets/images/logo.png';

const AboutUs = () => {
    return ( 
        <section className="about section" id="about">
            <h2 className="section_title">About Us</h2>
            <p className="section_subtitle">Get to know us !</p>
            <div className="about_container container grid">
                <div className="infos">
                    <img width="150px" src={logo} alt="Logo"/>
                    <h1>Modern Stream</h1>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, ad quas. Temporibus nemo odit minus pariatur nobis sapiente dolore labore fuga quo cum fugit, aliquam quidem voluptates rem cupiditate laudantium.</p>
                </div>
                <div className="contact">
                    <p>Please if you have any observtion do not hesitate to contact us</p>
                    <input type="text" placeholder="Email address"/>
                    <textarea cols="0" rows="7" placeholder="Your message"></textarea>
                    <input type="submit" className="button button--small" value="Send"/> 
                </div>
            </div>
            <hr/>
            <p className="copy">Modern-Stream.com 2021. All Rights Reserved.</p>
        </section>
    );
}
 
export default AboutUs;