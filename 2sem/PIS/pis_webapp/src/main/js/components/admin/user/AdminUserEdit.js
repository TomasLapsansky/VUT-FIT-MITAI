import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {updateUser} from "../../../redux/actions/adminActions";
import UserForm from "./partial/UserForm";

class AdminUserEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static mapStateToProps = state => {
        return {
            user: state.user.user
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/admin/users/update', {
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

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/users/'+this.props.match.params.id);
        const body = await response.json();
        this.props.updateUser(body);
    }

    render() {
        return(
            <div id="admin-user-create" className="admin">
                <Sidebar activeItem={0}/>
                <div className="admin-content user-index">
                    <AdminSectionHeader pageTitle="Upraviť používateľa" create={false} />
                    <UserForm  user={this.props.user}
                               handleChange={this.handleChange}
                               handleSubmit={this.handleSubmit}
                               isCreate={false}/>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminUserEdit.mapStateToProps,
    { updateUser }
)(AdminUserEdit);