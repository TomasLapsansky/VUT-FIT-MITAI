import React from "react";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form'
import {loadCategoryList, updateCategory} from "../../../../redux/actions/adminActions";
import {connect} from "react-redux";

class CategoryForm extends React.Component {

    constructor(props) {
        super(props);
    }

    static mapStateToProps = state => {
        return {
            category: state.category.category,
            categoryList: state.categoryList.categories
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/admin/categories/');
        const body = await response.json();
        this.props.loadCategoryList(body);
    }

    handleChange(event) {
        let category = this.props.category;
        switch (event.target.id) {
            case 'name':
                category.name = event.target.value;
                this.props.updateCategory(category);
                break;
            case 'description':
                category.description = event.target.value;
                this.props.updateCategory(category);
                break;
            case 'parentCategoryId':
                category.parentCategoryId = event.target.value;
                this.props.updateCategory(category);
                break;
            default:
                break;
        }

        this.forceUpdate();

    }

    render() {
        return(
            <Form onSubmit={ (e) => {this.props.handleSubmit(e)}}>
                <FormGroup>
                    <Label for="name">Názov</Label>
                    <Input type="text" name="name" id="name" value={this.props.category.name || ''}
                           onChange={ (e) => {this.handleChange(e)}} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Popis</Label>
                    <Input type="text" name="description" id="description" value={this.props.category.description || ''}
                           onChange={ (e) => {this.handleChange(e)}} autoComplete="description"/>
                </FormGroup>
                <Form.Group>
                    <Label for="parentCategoryId">Nadradená kategória</Label>
                    <Form.Control name="parentCategoryId"
                    id="parentCategoryId"
                    onChange={ (e) => {this.handleChange(e)}}
                    as="select"
                    value={this.props.category.parentCategoryId || ''}>
                        <option key="-1" value="-1">Žiadna</option>
                        {this.props.categoryList.map( category => {
                            return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/admin/categories">Cancel</Button>
                </FormGroup>
            </Form>
        );
    }

}

export default connect(
    CategoryForm.mapStateToProps,
    { updateCategory, loadCategoryList }
)(CategoryForm);