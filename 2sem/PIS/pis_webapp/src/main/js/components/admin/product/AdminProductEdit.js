import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {clearImages, updateImage, updateProduct} from "../../../redux/actions/adminActions";
import ProductForm from "./partial/ProductForm";


class AdminProductEdit extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.filesToUpload = [];
    }

    static mapStateToProps = state => {
        return {
            product: state.product.product,
            category: state.category.category
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        await fetch('/api/admin/products/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.props.product),
        }).then(
            response => {console.log(response)}
        );

        this.props.clearImages();

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

                    this.componentDidMount();
                }
                else {
                    console.log(res);
                }
            });

        });

        this.filesToUpload=[];

        let url = '/api/admin/categories/addproduct';
        let method = 'POST';

        if (this.props.category.id == -1) {
            method = 'DELETE';
            url = '/api/admin/categories/deleteproduct';
        }

        const categoryConnector = Object.assign({}, {
            categoryId: this.props.category.id,
            productId: this.props.product.id
        });

        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(categoryConnector)
        }).then(
            response => {
                console.log(response)}
        );


        this.forceUpdate();
    }

    async componentDidMount() {
        // TODO handle fetch error
        this.filesToUpload = [];
        const response = await fetch('/api/admin/products/'+this.props.match.params.id);
        const body = await response.json();
        this.props.updateProduct(body);
        const imagesReq = await fetch('/api/admin/products/'+this.props.match.params.id+'/photos');
        const images = await imagesReq.json();
        images.map((image) => {
            this.props.updateImage(image);
        });
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
                    <AdminSectionHeader pageTitle="Upraviť produkt" create={false} />
                    <ProductForm filesToUpload={this.filesToUpload}
                                 handleSubmit={this.handleSubmit}
                                 onFileChangeHandler={this.onFileChangeHandler}/>
                </div>
            </div>
        );
    }

}

export default connect(
    AdminProductEdit.mapStateToProps,
    { updateProduct, updateImage, clearImages }
)(AdminProductEdit);