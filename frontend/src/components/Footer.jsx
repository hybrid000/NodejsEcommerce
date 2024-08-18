import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footerPart1">
                <div className="column logo">
                    <img src="/resources/logofooter.png" className="logoimg" alt="logo of site" />
                </div>
                <div className="column contact">
                    <h4>Contact</h4>
                    <p>Address: Rudrapur, Udham Singh Nagar,<br />Uttrakhand-263153, India</p>
                    <p>Phone: 696969696</p>
                </div>
                <div className="column social">
                    <h4>Social</h4>
                    <ul className="footer-links">
                        <li><Link to="#"><i className="fa-brands fa-instagram fa-lg"></i> Instagram</Link></li>
                        <li><Link to="#"><i className="fa-brands fa-facebook fa-lg"></i> Facebook</Link></li>
                        <li><Link to="#"><i className="fa-brands fa-twitter fa-lg"></i> Twitter</Link></li>
                    </ul>
                </div>
                <div className="column about">
                    <h4>About</h4>
                    <ul className="footer-links">
                        <li><Link to="#">About us</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li><Link to="#">Terms & Condition</Link></li>
                    </ul>
                </div>
                <div className="column app">
                    <h4>Install our App</h4>
                    <div className="app-store">
                        <Link to="#"><img src="/resources/gpay.png" className="store-links" alt="Google Play Store" /></Link>
                        <Link to="#"><img src="/resources/appstore.png" className="store-links" alt="Apple App Store" /></Link>
                    </div>
                    <div className="pay">
                        <img src="/resources/pay.png" alt="Payment methods" />
                    </div>
                </div>
            </div>
            <div className="footerPart2">
                <div className="copyright">
                    <p>&copy; justbuy 2023. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
