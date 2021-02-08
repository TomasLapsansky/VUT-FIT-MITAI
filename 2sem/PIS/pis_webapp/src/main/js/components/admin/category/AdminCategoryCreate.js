import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import { updateCategory } from "../../../redux/actions/adminActions";
import CategoryForm from "./partial/CategoryForm";

class AdminCategoryCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        const category = Object.assign({}, {
            name: null,
            description: null,
            parentCategoryId: null
        });
        this.props.updateCategory(category);
    }

    static mapStateToProps = state => {
        return {
            category: state.category.category
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        let category = this.props.category;

        if (this.props.category.parentCategoryId == -1) {
            category.parentCategoryId = null;
        }

        await fetch('/api/admin/categories/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(category),
        }).then(
            response => {console.log(response)}
        );
    }

    render() {
        return(
            <div id="admin-product-create" className="admin">
                <Sidebar activeItem={2}/>
                <div className="admin-content category-create">
                    <AdminSectionHeader pageTitle="Pridať kategóriu" create={false} />
                    <CategoryForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

export default connect(
    AdminCategoryCreate.mapStateToProps,
    { updateCategory }
)(AdminCategoryCreate);