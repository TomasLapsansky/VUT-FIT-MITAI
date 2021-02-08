import React from "react";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {clearCart, clearOrder, createOrder} from "../../redux/actions/frontendActions";
import AddressForm from "./partial/AddressForm";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";

class Checkout extends React.Component {

    constructor(props) {
        super(props);
        this.getProductThumbnail = this.getProductThumbnail.bind(this);
        this.handleOrderCreate = this.handleOrderCreate.bind(this);
        this.redirectToReferrer = false;
        this.redirectReferrerId = null;
        const order = Object.assign({}, {
           address: this.props.activeUser.address,
           city: this.props.activeUser.city,
           code: this.props.activeUser.code,
           note: null,
        });
        this.props.createOrder(order);
    }

    static mapStateToProps = (state) => {
        return {
            order: state.order.order,
            cartItemList: state.userCart.cartItemList,
            activeUser: state.activeUser.user
        }
    }

    getTotals() {
        let subTotal = 0;
        this.props.cartItemList.map(item => {
            subTotal += (item.productDto.price * item.amount);
        });
        return subTotal;
    }

    getProductThumbnail(event, id) {
        event.preventDefault();
    }

    async handleOrderCreate(event) {
        event.preventDefault();

        await fetch('/api/order/checkout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.order),
        }).then(
            response => {
                response.json().then(
                    data => {
                        let order = this.props.order;
                        order = Object.assign({}, order, {id: data.id});
                        this.props.createOrder(order);
                    }
                )
            }
        );

        console.log(this.props.order);

        this.props.clearCart();

        this.redirectToReferrer = true;

    }

    componentWillUnmount() {
        this.props.clearOrder();
    }

    render() {
        if (this.redirectToReferrer) {
            return <Redirect to={"/order-detail/" + this.props.order.id} />
        }
        if (!this.props.activeUser.id) {
            return(
                <div>
                    <Header/>
                    <div id="main-content">
                        <div id="content-holder">
                            <Sidebar />
                            <div id="cart">
                                <span>Pre zobrazenie pokladne sa prosím prihláste.</span>
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
                        <Sidebar />
                        <div id="checkout">
                            <h2>Pokladňa</h2>
                            <div className="row no-gutters">
                                <div className="col-md-6">
                                    <table className="cart-list">
                                        <thead>
                                        <tr>
                                            <th></th>
                                            <th>Názov</th>
                                            <th>Množstvo</th>
                                            <th>Cena/ks</th>
                                            <th>Cena celkom</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.props.cartItemList.map(item => {
                                            return(
                                                <tr className="cart-item" key={item.id}>
                                                    <td>
                                                        {item.productDto.primaryPhoto && <img src={item.productDto.primaryPhoto.file} alt=""/>}
                                                        {!item.productDto.primaryPhoto && <div className="img-placeholder"/>}
                                                    </td>
                                                    <td><Link  to={'/product/'+item.productDto.id}>{item.productDto.name}</Link></td>
                                                    <td><span>{item.amount}</span></td>
                                                    <td><span>{item.productDto.price}</span></td>
                                                    <td><span>{item.productDto.price * item.amount}</span></td>
                                                    <td><a onClick={(e) => {this.handleDelete(e, item.id)}}><i className="fas fa-trash-alt"/></a></td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </table>
                                    <span>Cena celkom: {this.getTotals()}</span>
                                </div>
                                <div className="col-md-6">
                                    <h3>Adresa doručenia</h3>
                                    <AddressForm handleSubmit={this.handleOrderCreate}/>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    Checkout.mapStateToProps,
    { clearCart, createOrder, clearOrder }
)(Checkout)
