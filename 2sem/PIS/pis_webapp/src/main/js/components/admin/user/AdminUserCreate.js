import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import UserForm from "./partial/UserForm";
import {connect} from "react-redux";
import {updateUser} from "../../../redux/actions/adminActions";

class AdminUserCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        const user = Object.assign({}, {
            name: null,
            surname: null,
            password: null,
            email: null,
            address: null,
            city: null,
            code: null,
            role: null
        });
        this.props.updateUser(user);
    }

    static mapStateToProps = state => {
        return {
            user: state.user.user
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/admin/users/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.user),
        }).then(
            response => {console.log(response)}
        );
    }

    handleChange(event) {
        let user = this.props.user;

        switch (event.target.id) {
            case 'name':
                user.name = event.target.value;
                this.props.updateUser(user);
                break;
            case 'surname':
                user.surname = event.target.value;
                this.props.updateUser(user);
                break;
            case 'password':
                user.password = event.target.value;
                this.props.updateUser(user);
                break;
            case 'email':
                user.email = event.target.value;
                this.props.updateUser(user);
                break;
            case 'address':
                user.address = event.target.value;
                this.props.updateUser(user);
                break;
            case 'city':
                user.city = event.target.value;
                this.props.updateUser(user);
                break;
            case 'code':
                user.code = event.target.value;
                this.props.updateUser(user);
                break;
            case 'role':
                user.role = event.target.value;
                this.props.updateUser(user);
                break;
            default:
                break;
        }

        this.forceUpdate();

    }

    render() {
        return(
            <div id="admin-user-create" className="admin">
                <Sidebar activeItem={0}/>
                <div className="admin-content user-create">
                    <AdminSectionHeader pageTitle="Pridať používateľa" create={false} />
                    <UserForm  user={this.props.user}
                               handleChange={this.handleChange}
                               handleSubmit={this.handleSubmit}
                               isCreate={true}/>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminUserCreate.mapStateToProps,
    { updateUser }
)(AdminUserCreate);