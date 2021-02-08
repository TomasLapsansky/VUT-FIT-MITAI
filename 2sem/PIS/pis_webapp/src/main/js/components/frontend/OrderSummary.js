import React from "react";
import Header from "./partial/Header";
import {clearOrder} from "../../redux/actions/frontendActions";
import {connect} from "react-redux";
import Sidebar from "./partial/Sidebar";

class OrderSummary extends React.Component {

    render() {
        return(
            <div>
                <Header/>
                <div id="main-content">
                    <div id="content-holder">
                        <div id="order-summary">
                            <h1>Vašu objednávku sme prijali !</h1>
                            <span>Číslo vašej objednávky : {this.props.match.params.id}</span>
                            <span>Ďakujeme !</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    OrderSummary.mapStateToProps,
    { clearOrder }
)(OrderSummary)