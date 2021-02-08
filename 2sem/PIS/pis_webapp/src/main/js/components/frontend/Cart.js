import React from "react";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {connect} from "react-redux";
import {addCartItem, clearCart, removeCartItem} from "../../redux/actions/frontendActions";
import {Link} from "react-router-dom";


class Cart extends React.Component {

    constructor(props) {
        super(props);
        this.getTotals = this.getTotals.bind(this);
    }

    static mapStateToProps = (state) => {
        return {
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

    /*async componentDidMount() {
        this.props.clearCart();
        const response = await fetch('/api/cartitems/'+2);
        const body = await response.json();
        console.log(body);
        body.map( item => {
            this.props.addCartItem(item);
        });
    }*/

    handleDelete(event, id) {
        event.preventDefault();
        fetch('/api/cartitems/delete/'+id, {
            method: 'DELETE'
        }).then(
            response => {
                console.log(response);
            }
        );
        this.props.removeCartItem(id);
    }

    render() {
        if (!this.props.activeUser.id) {
            return(
                <div>
                    <Header/>
                    <div id="main-content">
                        <div id="content-holder">
                            <Sidebar />
                            <div id="cart">
                                <span>Pre zobrazenie košíka sa prosím prihláste.</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <Header />
                <div id="main-content">
                    <div id="content-holder">
                        <Sidebar />
                        <div id="cart">
                            <h2>Košík</h2>
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
                            <span className="price-total">Cena celkom: {this.getTotals()}</span>
                            <Link to="/checkout" className="btn btn-success"><i className="fas fa-cart-arrow-down"/> Pokladňa</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    Cart.mapStateToProps,
    { clearCart, addCartItem, removeCartItem }
)(Cart)