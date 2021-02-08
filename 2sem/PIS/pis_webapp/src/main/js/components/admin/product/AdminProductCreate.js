import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {clearImages, updateImage, updateProduct} from "../../../redux/actions/adminActions";
import ProductForm from "./partial/ProductForm";

class AdminProductCreate extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        const product = Object.assign({}, {
            name: null,
            price: null,
            description: null,
            specification: null,
            available: false
        });
        this.props.updateProduct(product);
        this.filesToUpload = [];
    }

    static mapStateToProps = state => {
        return {
            product: state.product.product,
            category: state.category.category,
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/admin/products/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.product),
        }).then(
            response => {
                response.json().then(
                    data => {
                        let product = this.props.product;
                        product.id = data.id;
                        this.props.updateProduct(product);
                    }
                )
            }
        );

        this.filesToUpload.map((file) => {

            const formData = new FormData;

            formData.append('file', file);

            fetch('api/upload', {
                method: 'post',
                body: formData
            }).then(res => {
                if(res.ok) {
                    console.log(res);
                    let photo = Object.assign({},{
                        productId: this.props.product.id,
                        file: "/data/"+file.name,
                        name: file.name,
                        description: file.name
                    });
                    fetch('/api/admin/products/photos/create', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(photo),
                    }).then(
                        response => {
                            console.log(response);
                            this.props.updateImage(photo);
                        }
                    );

                }
                else {
                    console.log(res);
                }
            });

        });

        this.filesToUpload = [];

        if (this.props.category.id != -1) {

            const categoryConnector = Object.assign({}, {
                categoryId: this.props.category.id,
                productId: this.props.product.id
            });

            fetch('/api/admin/categories/addproduct', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryConnector)
            }).then(
                response => {
                    console.log(response)}
            );

        }

    }

    componentWillUnmount() {
        this.props.clearImages();
        this.filesToUpload = [];
    }

    render() {
        return(
            <div id="admin-product-create" className="admin">
                <Sidebar activeItem={1}/>
                <div className="admin-content product-create">
                    <AdminSectionHeader pageTitle="Pridať produkt" create={false} />
                    <ProductForm
                               filesToUpload={this.filesToUpload}
                               handleSubmit={this.handleSubmit}/>
                </div>
            </div>
        );
    }
}

export default connect(
    AdminProductCreate.mapStateToProps,
    { updateProduct, updateImage, clearImages }
)(AdminProductCreate);