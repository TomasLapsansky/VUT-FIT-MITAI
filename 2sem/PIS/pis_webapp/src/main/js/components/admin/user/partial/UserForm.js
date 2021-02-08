import React from "react";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";

class UserForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Form onSubmit={ (e) => {this.props.handleSubmit(e)}}>
                <div className="row no-gutters">
                    <FormGroup className="col-md-6">
                        <Label for="name">Meno</Label>
                        <Input type="text" name="name" id="name" value={this.props.user.name || ''}
                               onChange={ (e) => {this.props.handleChange(e)}} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup className="col-md-6">
                        <Label for="surname">Priezvisko</Label>
                        <Input type="text" name="surname" id="surname" value={this.props.user.surname || ''}
                               onChange={ (e) => {this.props.handleChange(e)}} autoComplete="surname"/>
                    </FormGroup>
                </div>
                { this.props.isCreate && (
                    <FormGroup>
                        <Label for="password">Heslo</Label>
                        <Input type="password" name="password" id="password" value={this.props.user.password || ''}
                               onChange={ (e) => {this.props.handleChange(e)}} autoComplete="password"/>
                    </FormGroup>
                )}
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="email" name="email" id="email" value={this.props.user.email || ''}
                           onChange={ (e) => {this.props.handleChange(e)}} autoComplete="email"/>
                </FormGroup>
                <div className="row no-gutters">
                    <FormGroup className="col-md-4">
                        <Label for="address">Ulica</Label>
                        <Input type="text" name="address" id="address" value={this.props.user.address || ''}
                               onChange={(e) => {this.props.handleChange(e)}} autoComplete="address-level1"/>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                        <Label for="city">Obec / Mesto</Label>
                        <Input type="text" name="city" id="city" value={this.props.user.city || ''}
                               onChange={(e) => {this.props.handleChange(e)}} autoComplete="address-level2"/>
                    </FormGroup>
                    <FormGroup className="col-md-4">
                        <Label for="code">PSČ</Label>
                        <Input type="text" name="code" id="code" value={this.props.user.code || ''}
                               onChange={(e) => {this.props.handleChange(e)}} autoComplete="address-level3"/>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button color="primary" type="submit">Uložiť</Button>{' '}
                    <Button color="secondary" tag={Link} to="/admin/users">Zrušiť</Button>
                </FormGroup>
            </Form>
        );
    }

}

export default UserForm;