import React from "react";
import {connect} from "react-redux";
import {userLogin} from "../../redux/actions/commonActions";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import MyAccountSidebar from "./partial/MyAccountSidebar";
import {Form} from "react-bootstrap";
import Button from 'react-bootstrap/Button'
import {updateUser} from "../../redux/actions/adminActions";

class MyAccount extends React.Component {

    static mapStateToProps = (state) => {
        return {
            activeUser: state.activeUser.user
        }
    }

    handleChange(event) {
        let user = this.props.activeUser;
        switch (event.target.id) {
            case 'name':
                user.name = event.target.value;
                this.props.userLogin(user);
                break;
            case 'surname':
                user.surname = event.target.value;
                this.props.userLogin(user);
                break;
            case 'password':
                user.password = event.target.value;
                this.props.userLogin(user);
                break;
            case 'email':
                user.email = event.target.value;
                this.props.userLogin(user);
                break;
            case 'address':
                user.address = event.target.value;
                this.props.userLogin(user);
                break;
            case 'city':
                user.city = event.target.value;
                this.props.userLogin(user);
                break;
            case 'code':
                user.code = event.target.value;
                this.props.userLogin(user);
                break;
            case 'role':
                user.role = event.target.value;
                this.props.userLogin(user);
                break;
            default:
                break;
        }

        this.forceUpdate();

    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/admin/users/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.activeUser),
        }).then(
            response => {console.log(response)}
        );
    }

    render() {
        if (!this.props.activeUser.id) {
            return(
                <div>
                    <Header/>
                    <div id="main-content">
                        <div id="content-holder">
                            <div id="my-account">
                                <span>Pre zobrazenie užívateľského účtu sa prosím prihláste.</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            <div>
                <Header/>
                <div id="main-content">
                    <div id="content-holder">
                        <MyAccountSidebar active={0} />
                        <div id="my-account">
                            <h2>Moje údaje</h2>
                            <Form onSubmit={ (e) => {this.handleSubmit(e)}}>
                                <div className="row-no-gutters">
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Meno</Form.Label>
                                        <Form.Control type="text"
                                                      name="name"
                                                      id="name"
                                                      value={this.props.activeUser.name || ''}
                                                      onChange={ (e) => {this.handleChange(e)}}
                                                      autoComplete="name"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Priezvisko</Form.Label>
                                        <Form.Control type="text"
                                                      name="surname"
                                                      id="surname"
                                                      value={this.props.activeUser.surname || ''}
                                                      onChange={ (e) => {this.handleChange(e)}}
                                                      autoComplete="surname"/>
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control type="text"
                                                  name="password"
                                                  id="password"
                                                  value={this.props.activeUser.password || ''}
                                                  onChange={ (e) => {this.handleChange(e)}}
                                                  autoComplete="password"/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                                  name="email"
                                                  id="email"
                                                  value={this.props.activeUser.email || ''}
                                                  onChange={ (e) => {this.handleChange(e)}}
                                                  autoComplete="email"/>
                                </Form.Group>
                                <div className="row no-gutters">
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Ulica</Form.Label>
                                        <Form.Control type="text"
                                                      name="address"
                                                      id="address"
                                                      value={this.props.activeUser.address || ''}
                                                      onChange={(e) => {this.handleChange(e)}}
                                                      autoComplete="address-level1"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Obec / Mesto</Form.Label>
                                        <Form.Control type="text"
                                                      name="city"
                                                      id="city"
                                                      value={this.props.activeUser.city || ''}
                                                      onChange={(e) => {this.handleChange(e)}}
                                                      autoComplete="address-level2"/>
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>PSČ</Form.Label>
                                        <Form.Control type="number"
                                                      name="code"
                                                      id="code"
                                                      value={this.props.activeUser.code || ''}
                                                      onChange={(e) => {this.handleChange(e)}}
                                                      autoComplete="address-level3"/>
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Uložiť</Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    MyAccount.mapStateToProps,
    { userLogin, updateUser }
)(MyAccount)