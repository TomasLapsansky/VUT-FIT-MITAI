import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {addCartItem, clearCart} from "../../../redux/actions/frontendActions";
import {userLogin, userLogout} from "../../../redux/actions/commonActions";

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.logoutUser = this.logoutUser.bind(this);
    }

    static mapStateToProps = state => {
        return {
            cartItemList: state.userCart.cartItemList,
            activeUser: state.activeUser.user
        }
    }

    async componentDidMount() {
        this.props.clearCart();
        this.props.userLogout();

        const userResponse = await fetch('/api/user/details');
        const user = await userResponse.json();
        this.props.userLogin(user);

        const response = await fetch('/api/cartitems/'+user.id);
        const body = await response.json();
        if (body) {
            body.map( item => {
                this.props.addCartItem(item);
            });
        }

    }

    async logoutUser(event) {
        event.preventDefault();

        await fetch('/logout')
            .then( response => {
                console.log(response);
                if (response.redirected) window.location = response.url;
                }
            );

        this.props.userLogout();
    }

    render() {
        return(
            <header>
                <Link to="/">
                    <img src="/data/logo.png" alt="shop-logo"/>
                </Link>
                <div className="user-zone">
                    <div className="cart-controls">
                        <Link to="/cart">
                            <i className="fas fa-shopping-cart"/>
                            <span>{this.props.cartItemList.length}</span>
                        </Link>
                    </div>
                    {this.props.activeUser.id &&
                    <div className="user">
                        <span>Ahoj<Link to="/my-account">{' ' + this.props.activeUser.name + ' '}</Link></span>
                        <Link onClick={ (e) => {this.logoutUser(e)}}>Odhlásiť</Link>
                    </div>
                    }
                    {!this.props.activeUser.id &&
                    <div className="user">
                        <span><Link to="/login" >Prihlásenie</Link> / <Link to="/register">Registrácia</Link></span>
                    </div>
                    }
                </div>
            </header>
        );

    }

}

export default connect(
    Header.mapStateToProps,
    { clearCart, addCartItem, userLogout, userLogin }
)(Header);