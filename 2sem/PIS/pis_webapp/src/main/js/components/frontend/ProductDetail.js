import React from "react";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {connect} from "react-redux";
import {clearImages, updateImage, updateProduct} from "../../redux/actions/adminActions";
import {addCartItem, clearCart, setActiveProductImage} from "../../redux/actions/frontendActions";
import Button from 'react-bootstrap/Button';
import {OverlayTrigger, Tooltip} from "react-bootstrap";

class ProductDetail extends React.Component {

    constructor(props) {
        super(props);
        this.changePhoto = this.changePhoto.bind(this);
        this.addToCartHandler = this.addToCartHandler.bind(this);
    }

    static mapStateToProps = state => {
        return {
            images: state.images.images,
            product: state.product.product,
            activeImage: state.activeProductImage.image,
            activeUser: state.activeUser.user
        }
    }

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/products/'+this.props.match.params.id);
        const body = await response.json();
        this.props.updateProduct(body);
        const imagesReq = await fetch('/api/admin/products/'+this.props.match.params.id+'/photos');
        const images = await imagesReq.json();
        images.map((image) => {
            this.props.updateImage(image);
        });

        this.props.setActiveProductImage(images[0]);
    }

    componentWillUnmount() {
        this.props.clearImages();
        this.props.clearCart();
    }

    getImageIdxById(id) {
        for(let i = 0; i < this.props.images.length; i++) {
            if(this.props.images[i].id === id) {
                return i;
            }
        }
    }

    changePhoto(event, direction) {
        event.preventDefault();
        const imageCount = this.props.images.length;
        const imgIndex = this.getImageIdxById(this.props.activeImage.id);
        if (direction === 'left') {
            if (imgIndex === 0) {
                this.props.setActiveProductImage(this.props.images[imageCount-1]);
            }
            else {
                this.props.setActiveProductImage(this.props.images[imgIndex-1]);
            }
        }
        else {
            if (imgIndex === imageCount-1) {
                this.props.setActiveProductImage(this.props.images[0]);
            }
            else {
                this.props.setActiveProductImage(this.props.images[imgIndex+1]);
            }
        }

    }

    async addToCartHandler(event) {
        event.preventDefault();
        let cartItem = Object.assign({}, {
            amount: 1,
            productId: this.props.product.id,
            userId: this.props.activeUser.id
        });
        await fetch('/api/cartitems/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItem),
        }).then(
            response => {
                console.log(response);
            }
        );

        cartItem = Object.assign({}, cartItem, {productDto: { id: this.props.product.id, primaryPhoto: null}});

        this.props.addCartItem(cartItem);

    }

    render() {
        return(
            <div>
                <Header />
                <div id="main-content">
                    <div id="content-holder">
                        <Sidebar />
                        <div id="product-detail" className="content-area">
                            <div className="row no-gutters">
                                <div className="col-md-6 image-section">
                                    <div className="image-holder">
                                        <i onClick={ (e) => this.changePhoto(e, 'left')} className="fas fa-chevron-left"/>
                                        {this.props.activeImage && <img src={this.props.activeImage.file} alt={this.props.activeImage.name}/>}
                                        <i onClick={ (e) => this.changePhoto(e, 'right')} className="fas fa-chevron-right"/>
                                    </div>
                                </div>
                                <div className="col-md-6 description-section">
                                    <h1>{this.props.product.name}</h1>
                                    <span className="price">{this.props.product.price}</span>
                                    <p className="description">{this.props.product.description}</p>
                                    {this.props.activeUser.id && <Button onClick={this.addToCartHandler} variant="success"><i className="fas fa-cart-plus"/> Vložiť do košíka</Button> }
                                    {!this.props.activeUser.id &&
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Nie ste prihlásený</Tooltip>}>
                                        <Button disabled onClick={this.addToCartHandler} variant="success"><i className="fas fa-cart-plus"/> Vložiť do košíka</Button>
                                    </OverlayTrigger>}
                                </div>
                            </div>
                            <div className="specification-section">
                                <span>Špecifikácie:</span>
                                <p>{this.props.product.specification}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    ProductDetail.mapStateToProps,
    { updateImage, updateProduct, setActiveProductImage, clearImages, addCartItem, clearCart }
)(ProductDetail);