import React from "react";
import {connect} from "react-redux";
import Sidebar from "../Sidebar";
import AdminSectionHeader from "../partial/AdminSectionHeader";
import {Link} from "react-router-dom";
import {loadOrderList} from "../../../redux/actions/commonActions";
import Button from 'react-bootstrap/Button'

class AdminOrderIndex extends React.Component {

    static mapStateToProps = state => {
        return {
            activeUser: state.activeUser.user,
            orderList: state.orderList.orders
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/admin/orders');
        const body = await response.json();
        console.log(body);
        this.props.loadOrderList(body);
    }

    render() {
        return(
            <div id="admin-index" className="admin">
                <Sidebar activeItem={4}/>
                <div className="admin-content order-index">
                    <AdminSectionHeader pageTitle="Objednávky" create={false} />
                    <div className="admin-content-list">
                        <table>
                            <thead>
                            <tr>
                                <th>Číslo objednávky</th>
                                <th>Stav</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.orderList.map( order => {
                                return(
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.status}</td>
                                        <td><Link to={"/admin/orders/"+order.id}><Button>Detail</Button></Link></td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminOrderIndex.mapStateToProps,
    { loadOrderList }
)(AdminOrderIndex)