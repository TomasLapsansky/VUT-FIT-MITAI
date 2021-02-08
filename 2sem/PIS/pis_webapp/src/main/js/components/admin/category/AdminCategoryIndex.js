import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {loadCategoryList, loadUserList, updateCategory} from "../../../redux/actions/adminActions";

class AdminCategoryIndex extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static mapStateToProps = state => {
        return {
            categoryList: state.categoryList.categories,
            category: state.category.category
        }
    }

    //TODO translate category ID to name

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/categories');
        const body = await response.json();
        this.props.loadCategoryList(body);
    }

    async handleDelete(event, id) {
        event.preventDefault();

        await fetch('/api/admin/categories/'+id, {
            method: 'DELETE',
        });
    }

    /*async categoryIdToName(id) {
        const response = await fetch('/api/admin/categories');
        const body = await response.json();
        body.filter( category => {
            if (category.id === id) {
                return category
            }
        });
        this.props.updateCategory(body[0]);
        return this.props.category.name;
    }*/

    render() {
        return(
            <div id="admin-index" className="admin">
                <Sidebar activeItem={2}/>
                <div className="admin-content user-index">
                    <AdminSectionHeader pageTitle="Kategórie" create={true} />
                    <div className="admin-content-list">
                        <table>
                            <thead>
                            <tr>
                                <th>Názov</th>
                                <th>Popis</th>
                                <th>Nadradená kat.</th>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.categoryList.map((category, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{category.name}</td>
                                        <td>{category.description}</td>
                                        <td>{this.props.parentCategoryId}</td>
                                        <td>
                                            <a href={'admin/categories/edit/'+category.id}><i className="fas fa-edit"/></a>
                                            <a onClick={(e) => {this.handleDelete(e, category.id)}}><i className="fas fa-trash-alt"/></a>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminCategoryIndex.mapStateToProps,
    { loadCategoryList, updateCategory }
)(AdminCategoryIndex);