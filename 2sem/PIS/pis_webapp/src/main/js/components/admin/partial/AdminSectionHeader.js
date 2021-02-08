import React from "react";
import {Link} from "react-router-dom";

class AdminSectionHeader extends React.Component {
    
    render() {
        const createURL = window.location.pathname + "/create";
        return(
            <div className="rowC admin-section-header">
                <h1>{this.props.pageTitle}</h1>
                { this.props.create &&
                <Link to={createURL} className="btn btn-primary">
                    Pridať
                </Link>
                }
            </div>
        );
    }
    
}

export default AdminSectionHeader;