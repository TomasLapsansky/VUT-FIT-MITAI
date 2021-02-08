import React from "react";
import {connect} from "react-redux";
import Sidebar from "../Sidebar";
import AdminSectionHeader from "../partial/AdminSectionHeader";
import {loadOrder} from "../../../redux/actions/commonActions";
import {Form} from "react-bootstrap";

class AdminOrderDetail extends React.Component {

    constructor(props) {
        super(props);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    static mapStateToProps = state => {
        return {
            order: state.userOrder.order,
            activeUser: state.activeUser.user
        }
    }

    getTotals() {
        let subTotal = 0;
        this.props.order.orderItemsDto.map(item => {
            subTotal += (item.productDto.price * item.amount);
        });
        return subTotal;
    }

    handleStateChange(event) {
        event.preventDefault();

        let order = this.props.order;
        order.state = event.target.value;
        this.props.loadOrder(order);

        order = Object.assign({}, {
            id: this.props.order.id,
            status: event.target.value
        });

        console.log(order);

        fetch('/api/admin/orders/updatestatus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        }).then( response => {
            console.log(response)
        });

    }

    async componentDidMount() {
        const response = await fetch('/api/admin/orders/'+this.props.match.params.id);
        const body = await response.json();
        console.log(body);
        this.props.loadOrder(body);
    }

    render() {
        return(
            <div id="admin-index" className="admin">
                <Sidebar activeItem={4}/>
                <div className="admin-content order-detail">
                    <AdminSectionHeader pageTitle="Detail objednávky" create={false} />
                    <div className="admin-content-list">
                        <span>Číslo objednávky: {this.props.order.id || ''}</span>
                        <Form>
                            <Form.Group>
                                <Form.Label>Stav objednávky</Form.Label>
                                <Form.Control as="select"
                                              onChange={ (e) => this.handleStateChange(e) }
                                              value={this.props.order.status}>
                                    <option value={1}>Nová</option>
                                    <option value={2}>Zaplatená</option>
                                    <option value={3}>Vybavená</option>
                                    <option value={4}>Zrušená</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <h4>Detail zákazníka:</h4>
                        <span>{this.props.order.user.name + ' ' + this.props.order.user.surname}</span>
                        <span>{this.props.order.user.email}</span>
                        <span>{this.props.order.address + ' , ' + this.props.order.city + ',' + this.props.order.code}</span>
                        <h4>Poznámka k objednávke</h4>
                        <span>{this.props.order.note}</span>
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
        );
    }

}

export default connect(
    AdminOrderDetail.mapStateToProps,
    { loadOrder }
)(AdminOrderDetail)