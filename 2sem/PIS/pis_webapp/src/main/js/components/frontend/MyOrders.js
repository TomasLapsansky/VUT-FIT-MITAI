import React from "react";
import Header from "./partial/Header";
import MyAccountSidebar from "./partial/MyAccountSidebar";
import {connect} from "react-redux";
import {loadOrderList} from "../../redux/actions/commonActions";

class MyOrders extends React.Component {

    static mapStateToProps = state => {
        return {
            activeUser: state.activeUser.user,
            orderList: state.orderList.orders
        }
    }

    showDetail(event, id) {
        event.preventDefault();

        window.location = '/my-account/orders/detail/'+id;
    }
    
    async componentDidMount() {
        const response = await fetch('/api/user/orders');
        const body = await response.json();
        console.log(body);
        this.props.loadOrderList(body);
    }

    render() {
        return(
        <div>
            <Header/>
            <div id="main-content">
                <div id="content-holder">
                    <MyAccountSidebar active={1} />
                    <div id="my-orders">
                        <h2>Moje objednávky</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Číslo objednávky</th>
                                    <th>Stav</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.orderList.map( order => {
                                    console.log(order);
                                    return(
                                        <tr onClick={ (e) => this.showDetail(e, order.id) } key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.status}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default connect(
    MyOrders.mapStateToProps,
    { loadOrderList }
)(MyOrders)