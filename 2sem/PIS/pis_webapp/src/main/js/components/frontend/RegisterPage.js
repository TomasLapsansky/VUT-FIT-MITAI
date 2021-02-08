import React from "react";
import {connect} from "react-redux";
import {updateLoginUser} from "../../redux/actions/frontendActions";
import Header from "./partial/Header";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {Redirect} from "react-router-dom";

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);
        const user = Object.assign({}, {
            name: null,
            surname: null,
            password: null,
            email: null,
            address: null,
            city: null,
            code: null
        });
        this.props.updateLoginUser(user);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static mapStateToProps = state => {
        return {
            user: state.userLogin.user,
            activeUser: state.activeUser.user
        }
    }

    handleChange(event) {
        event.preventDefault();

        let user = this.props.user;

        switch (event.target.id) {
            case 'name':
                user.name = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'surname':
                user.surname = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'password':
                user.password = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'email':
                user.email = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'address':
                user.address = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'city':
                user.city = event.target.value;
                this.props.updateLoginUser(user);
                break;
            case 'code':
                user.code = event.target.value;
                this.props.updateLoginUser(user);
                break;
            default:
                break;
        }

        this.forceUpdate();
    }

    async handleSubmit(event) {
        event.preventDefault();

        await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.user),
        }).then(
            response => {
                console.log(response);
            })
            .catch( e => {
                console.warn(e);
                return;
            });


        window.alert("Registrácia úspešná");
        window.location = "/login";

    }

    render() {
        if (this.props.activeUser.id) {
            return(
                <Redirect to="/"/>
            );
        }
        return(
            <div>
                <Header />
                <div id="main-content">
                    <div id="content-holder">
                        <div id="registration-page">
                            <Form onSubmit={ (e) => this.handleSubmit(e)} ref={fm => {this.form=fm}} >
                                <div className="row no-gutters">
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Meno</Form.Label>
                                        <Form.Control type="text"
                                                      id="name"
                                                      name="name"
                                                      onChange={ (e) => this.handleChange(e)}
                                                      value={this.props.user.name || ''} />
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <Form.Label>Priezvisko</Form.Label>
                                        <Form.Control type="text"
                                                      id="surname"
                                                      name="surame"
                                                      onChange={ (e) => this.handleChange(e)}
                                                      value={this.props.user.surname || ''} />
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email"
                                                  id="email"
                                                  name="email"
                                                  onChange={ (e) => this.handleChange(e)}
                                                  value={this.props.user.email || ''} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Heslo</Form.Label>
                                    <Form.Control type="password"
                                                  id="password"
                                                  name="password"
                                                  onChange={ (e) =>  this.handleChange(e)}
                                                  value={this.props.user.password || ''} />
                                </Form.Group>
                                <div className="row no-gutters">
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Ulica</Form.Label>
                                        <Form.Control type="text"
                                                      id="address"
                                                      name="address"
                                                      onChange={ (e) =>  this.handleChange(e)}
                                                      value={this.props.user.address || ''} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>Mesto</Form.Label>
                                        <Form.Control type="text"
                                                      id="city"
                                                      name="city"
                                                      onChange={ (e) =>  this.handleChange(e)}
                                                      value={this.props.user.city || ''} />
                                    </Form.Group>
                                    <Form.Group className="col-md-4">
                                        <Form.Label>PSČ</Form.Label>
                                        <Form.Control type="number"
                                                      id="code"
                                                      name="code"
                                                      onChange={ (e) =>  this.handleChange(e)}
                                                      value={this.props.user.code || ''} />
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <Button variant="primary" type="submit">Registrovať</Button>
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
    RegisterPage.mapStateToProps,
    { updateLoginUser }
)(RegisterPage)