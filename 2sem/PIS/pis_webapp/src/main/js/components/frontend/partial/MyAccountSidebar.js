import {Link} from "react-router-dom";
import React from "react";

class MyAccountSidebar extends React.Component {
    
    render() {
        return(
            <aside id="menu-sidebar">
                <ul>
                    <li className={this.props.active === 0 ? "active" : ''}><Link to="/my-account">Moje údaje</Link></li>
                    <li className={this.props.active === 1 ? "active" : ''}><Link to="/my-account/orders">Moje objednávky</Link></li>
                </ul>
            </aside>
        );
    }
    
}

export default MyAccountSidebar;