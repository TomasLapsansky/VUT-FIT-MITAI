import React from "react";
import {Button, FormGroup, Input, Label} from "reactstrap";
import {Link} from "react-router-dom";
import Form from 'react-bootstrap/Form'
import {connect} from "react-redux";
import {
    deleteImage,
    loadCategoryList,
    updateCategory,
    updateImage,
    updateProduct
} from "../../../../redux/actions/adminActions";

class ProductForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onFileChangeHandler = this.onFileChangeHandler.bind(this);
    }

    static mapStateToProps = state => {
        return {
            images: state.images.images,
            product: state.product.product,
            categoryList: state.categoryList.categories,
            category: state.category.category
        }
    }

    async componentDidMount() {
        const response = await fetch('/api/admin/categories/');
        const body = await response.json();
        this.props.loadCategoryList(body);
    }

    handleChange(event) {
        let product = this.props.product;

        switch (event.target.id) {
            case 'name':
                product.name = event.target.value;
                this.props.updateProduct(product);
                break;
            case 'price':
                product.price = event.target.value;
                this.props.updateProduct(product);
                break;
            case 'description':
                product.description = event.target.value;
                this.props.updateProduct(product);
                break;
            case 'specification':
                product.specification = event.target.value;
                this.props.updateProduct(product);
                break;
            case 'available':
                product.available = event.target.checked;
                this.props.updateProduct(product);
                break;
            case 'categoryId':
                const category = Object.assign({}, {id: event.target.value});
                this.props.updateCategory(category);
                break;
            default:
                break;
        }

        this.forceUpdate();
    }

    onFileChangeHandler = (e) => {
        e.preventDefault();
        let image = e.target.files[0];

        let photo = Object.assign({},{
            productId: this.props.product.id,
            file: URL.createObjectURL(image),
            name: image.name,
            description: image.name
        });

        this.props.filesToUpload.push(image);

        this.props.updateImage(photo);

    };

    removePhoto(e, id) {

        this.props.deleteImage(id);

        fetch('/api/admin/products/photos/'+id, {
            method: 'DELETE',
        }).then(
            response => {console.log(response)}
        );

    }

    render() {
        return(
            <Form onSubmit={ (e) => {this.props.handleSubmit(e)}}>
                <FormGroup>
                    <Label for="name">Názov</Label>
                    <Input type="text" name="name" id="name" value={this.props.product.name || ''}
                           onChange={ (e) => {this.handleChange(e)}} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="price">Cena</Label>
                    <Input type="number" name="price" id="price" value={this.props.product.price || ''}
                           onChange={ (e) => {this.handleChange(e)}} autoComplete="price"/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Popis</Label>
                    <Form.Control name="description" id="description" as="textarea" rows="3"
                              onChange={ (e) => {this.handleChange(e)}}
                              value={this.props.product.description || ''}/>
                </FormGroup>
                <FormGroup>
                    <Label for="specification">Špecifikácia</Label>
                    <Form.Control name="specification" id="specification" as="textarea" rows="3"
                                  onChange={ (e) => {this.handleChange(e)}}
                                  value={this.props.product.specification || ''}/>
                </FormGroup>
                <Form.Group>
                    <Form.Check
                        defaultChecked={this.props.product.available}
                        type="switch"
                        name="available"
                        id="available"
                        label="Produkt je dostupný"
                        onChange={ (e) => {this.handleChange(e)}}
                    />
                </Form.Group>
                <Form.Group>
                    <Label for="categoryId">Kategória</Label>
                    <Form.Control name="categoryId"
                                  id="categoryId"
                                  onChange={ (e) => {this.handleChange(e)}}
                                  as="select"
                                  value={this.props.category.id || ''}>
                        <option key="-1" value="-1">Žiadna</option>
                        {this.props.categoryList.map( category => {
                            return(
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        })}
                    </Form.Control>
                </Form.Group>
                <div className="row no-gutters">
                    {this.props.images.map((image, i) => {
                        return (
                            <img src={image.file}
                                 alt=""
                                 onClick={ (e) => this.removePhoto(e, image.id) }
                                 key={i}/>
                        )
                    })}
                    <Form.Group>
                        <Input type="file" name="file"
                               onChange={ (e) => { this.onFileChangeHandler(e) }}/>
                    </Form.Group>
                </div>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/admin/products">Cancel</Button>
                </FormGroup>
            </Form>
        );
    }

}

export default connect(
    ProductForm.mapStateToProps,
    { updateProduct, updateImage, deleteImage, loadCategoryList, updateCategory }
)(ProductForm);