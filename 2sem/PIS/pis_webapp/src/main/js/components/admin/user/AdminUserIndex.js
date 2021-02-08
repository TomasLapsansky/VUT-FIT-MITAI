import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {loadUserList} from "../../../redux/actions/adminActions";

class AdminUserIndex extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static mapStateToProps = state => {
        return {
            userList: state.userList.users
        }
    }

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/users');
        const body = await response.json();
        this.props.loadUserList(body);
    }

    async handleDelete(event, id) {
        event.preventDefault();

        await fetch('/api/users/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    render() {
        return(
            <div id="admin-index" className="admin">
                <Sidebar activeItem={0}/>
                <div className="admin-content user-index">
                    <AdminSectionHeader pageTitle="Používatelia" create={true} />
                    <div className="admin-content-list">
                        <table>
                            <thead>
                            <tr>
                                <th>Priezvisko</th>
                                <th>Meno</th>
                                <th>Email</th>
                                <th>Ulica</th>
                                <th>Mesto</th>
                                <th>PSČ</th>
                                <th>Rola</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.userList.map((user, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{user.surname}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.address}</td>
                                        <td>{user.city}</td>
                                        <td>{user.code}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <a href={'admin/users/edit/'+user.id}><i className="fas fa-edit"></i></a>
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
    AdminUserIndex.mapStateToProps,
    { loadUserList }
)(AdminUserIndex);