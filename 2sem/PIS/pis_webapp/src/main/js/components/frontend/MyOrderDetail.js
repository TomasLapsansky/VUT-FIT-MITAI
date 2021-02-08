import React from "react";
import Header from "./partial/Header";
import MyAccountSidebar from "./partial/MyAccountSidebar";
import {connect} from "react-redux";
import {loadOrder} from "../../redux/actions/commonActions";

class MyOrderDetail extends React.Component {

    static mapStateToProps = state => {
        return {
            order: state.userOrder.order,
            activeUser: state.activeUser.user
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/user/orders/'+this.props.match.params.id);
        const body = await response.json();
        console.log(body);
        this.props.loadOrder(body);
    }

    getTotals() {
        let subTotal = 0;
        this.props.order.orderItemsDto.map(item => {
            subTotal += (item.productDto.price * item.amount);
        });
        return subTotal;
    }

    render() {
        if (!this.props.activeUser.id) {
            return(
                <div>
                    <Header/>
                    <div id="main-content">
                        <div id="content-holder">
                            <div id="my-account">
                                <span>Pre zobrazenie užívateľského účtu sa prosím prihláste.</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <Header/>
                <div id="main-content">
                    <div id="content-holder">
                        <MyAccountSidebar active={1} />
                        <div id="my-account">
                            <h2>Detail objednávky</h2>
                            <span>Číslo objednávky: {this.props.order.id || ''}</span>
                            <span>Stav objednávky: {this.props.order.status || ''}</span>
                            <table>
                                <thead>
                                <tr>
                                    <th>Názov</th>
                                    <th>Množstvo</th>
                                    <th>Cena/ks</th>
                                    <th>Cena celkom</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.props.order.orderItemsDto.map(item => {
                                        return(
                                            <tr className="order-item" key={item.id}>
                                                <td><span>{item.productDto.name}</span></td>
                                                <td><span>{item.amount}</span></td>
                                                <td><span>{item.productDto.price}</span></td>
                                                <td><span>{item.productDto.price * item.amount}</span></td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            <span>Cena celkom: {this.getTotals()}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    MyOrderDetail.mapStateToProps,
    { loadOrder }
)(MyOrderDetail)