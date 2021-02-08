import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

class ProductList extends React.Component {

    static mapStateToProps = state => {
        return {
            productList: state.productList.products
        }
    }

    render() {
        return(
            <div className="product-list">
                {this.props.productList.map((product) => {
                    return(
                        <div className="product-box" key={product.id}>
                            {product.primaryPhoto && <div className="img-holder"><img src={product.primaryPhoto.file} alt=""/></div>}
                            {!product.primaryPhoto && <div className="img-placeholder"/>}
                            <Link to={"/product/"+product.id}>
                                {product.name}
                            </Link>
                            <span>{product.price}</span>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default connect(
    ProductList.mapStateToProps,
    null
)(ProductList)