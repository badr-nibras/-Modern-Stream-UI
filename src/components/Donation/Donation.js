import React from "react";
import "./Donation.scss";
import { FaPaypal } from 'react-icons/fa';
import Layout from '../../Layouts/Layout';


class Donation extends React.Component {

    render() {
        return (
            <Layout>
                <div className="donation padding">
                    <div className="card main text-white  border-info text-center " >
                        <div className="card-body mt-4 container">
                            <FaPaypal className="paypal" />
                            <h5 className="card-title">Donate to User</h5>
                            <p className="card-text">Support your streamer by giving them donations.</p>
                            <div className="row justify-content-center">
                                <div className="card mt-3   border-info  col-5 col-sm-4 col-md-3 box "><h5>1$</h5></div>
                                <div className="card mt-3  border-info  col-5 col-sm-4 col-md-3 box"><h5>5$</h5></div>
                                <div className="card mt-3   border-info  col-5 col-sm-4 col-md-3 box"><h5>10$</h5></div>
                                <div className="card mt-3  border-info  col-5 col-sm-4 col-md-3 box"><h5>10$</h5></div>
                                <div className="card mt-3   border-info col-5 col-sm-4 col-md-3 box"><h5>50$</h5></div>
                                <div className="card mt-3   border-info  col-5 col-sm-4 col-md-3 box"><h5>100$</h5></div>
                                <input type="text" placeholder="Or enter your price $" className="input-dark card border-info text-center col-8 col-md-10 col-sm-10 mt-3 mb-3" />
                            </div>
                            <input type="button" value="Donate" className="button button--small" />
                            <br />
                        </div>
                    </div>
                </div>
            </Layout>






        )
    }
}
export default Donation;