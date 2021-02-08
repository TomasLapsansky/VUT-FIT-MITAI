import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class Sidebar extends React.Component {

    static mapStateToProps = state => { return {sidebar: state.sidebar} }

    render() {
        return(
            <aside>
                <Link to="/admin">
                    <img src="/data/logo.png" alt="shop-logo"/>
                </Link>
                <ul>
                    <li className={(this.props.activeItem === 0) ? 'active' : ''}>
                        <Link to="/admin/users">Používatelia</Link>
                    </li>
                    <li className={(this.props.activeItem === 1) ? 'active' : ''}>
                        <Link to="/admin/products">Produkty</Link>
                    </li>
                    <li className={(this.props.activeItem === 2) ? 'active' : ''}>
                        <Link to="/admin/categories">Kategórie</Link>
                    </li>
                    <li className={(this.props.activeItem === 4) ? 'active' : ''}>
                        <Link to="/admin/orders">Objednávky</Link>
                    </li>
                </ul>
            </aside>
        );
    }

}

export default connect(
    Sidebar.mapStateToProps,
    null
)(Sidebar);