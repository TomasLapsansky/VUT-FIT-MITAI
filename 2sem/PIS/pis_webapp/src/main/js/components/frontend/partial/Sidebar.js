import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {loadCategories} from "../../../redux/actions/frontendActions";

class Sidebar extends React.Component {

    static mapStateToProps = state => { return {categories: state.categoryListSidebar.categories} }

    async componentDidMount() {
        const categoryList = await fetch('/api/categories/main');
        const body = await categoryList.json();
        this.props.loadCategories(body);
    }

    render() {
        return(
            <aside id="menu-sidebar">
                <ul>
                    {this.props.categories.map( (category, i) => {
                        return(
                            <li key={i}>
                                <Link to={"/category/"+category.id}>
                                    {category.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </aside>
        );
    }

}

export default connect(
    Sidebar.mapStateToProps,
    { loadCategories }
)(Sidebar);