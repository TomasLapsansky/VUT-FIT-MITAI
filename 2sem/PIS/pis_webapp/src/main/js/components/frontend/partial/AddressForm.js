import React from "react";
import Form from "react-bootstrap/Form";
import {Input, Label} from "reactstrap";
import {connect} from "react-redux";
import {clearOrder, createOrder} from "../../../redux/actions/frontendActions";
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

class AddressForm extends React.Component {

    static mapStateToProps = (state) => {
        return {
            order: state.order.order,
            activeUser: state.activeUser.user
        }
    }

    handleChange(event) {
        let order = this.props.order;

        switch (event.target.id) {
            case 'address':
                order.address = event.target.value;
                this.props.createOrder(order);
                break;
            case 'city':
                order.city = event.target.value
                this.props.createOrder(order);
                break;
            case 'code':
                order.code = event.target.value;
                this.props.createOrder(order);
                break;
            case 'note':
                order.note = event.target.value;
                this.props.createOrder(order);
                break;
            default:
                break;
        }

        this.forceUpdate();

    }

    render() {
        return(
            <Form onSubmit={ (e) => {this.props.handleSubmit(e)}}>
                <Form.Group>
                    <Label for="address">Ulica</Label>
                    <Input type="text" name="address" id="address"
                           onChange={(e) => {this.handleChange(e)}} autoComplete="address-level1"
                           defaultValue={this.props.activeUser.address} />
                </Form.Group>
                <div className="row no-gutters">
                    <Form.Group className="col-md-6">
                        <Label for="city">Obec / Mesto</Label>
                        <Input type="text" name="city" id="city"
                               onChange={(e) => {this.handleChange(e)}} autoComplete="address-level2"
                               defaultValue={this.props.activeUser.city} />
                    </Form.Group>
                    <Form.Group className="col-md-6">
                        <Label for="code">PSČ</Label>
                        <Input type="text" name="code" id="code"
                               onChange={(e) => {this.handleChange(e)}} autoComplete="address-level3"
                               defaultValue={this.props.activeUser.code} />
                    </Form.Group>
                </div>
                <Form.Group>
                    <Label for="note">Poznámka</Label>
                    <Form.Control name="note" id="note" as="textarea" rows="3"
                                  onChange={ (e) => {this.handleChange(e)}} />
                </Form.Group>
                <Form.Group>
                    <Button variant="success" type="submit">Dokončiť objednávku</Button>
                </Form.Group>
            </Form>
        );
    }

}

export default connect(
    AddressForm.mapStateToProps,
    { createOrder, clearOrder }
)(AddressForm)