import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import { updateCategory } from "../../../redux/actions/adminActions";
import CategoryForm from "./partial/CategoryForm";

class AdminCategoryEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        console.log(this.props.category);
        await fetch('/api/admin/categories/update', {
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

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/categories/'+this.props.match.params.id);
        const body = await response.json();
        this.props.updateCategory(body);
    }

    render() {
        return(
            <div id="admin-category-edit" className="admin">
                <Sidebar activeItem={2}/>
                <div className="admin-content category-edit">
                    <AdminSectionHeader pageTitle="Upraviť kategóriu" create={false} />
                    <CategoryForm handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminCategoryEdit.mapStateToProps,
    { updateCategory }
)(AdminCategoryEdit);