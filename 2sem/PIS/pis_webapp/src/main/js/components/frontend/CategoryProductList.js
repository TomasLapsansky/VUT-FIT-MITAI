import React from "react";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {connect} from "react-redux";
import ProductList from "./partial/ProductList";
import {loadProductList, updateCategory} from "../../redux/actions/adminActions";

class CategoryProductList extends React.Component {

    static mapStateToProps = state => {
        return {
            category: state.category.category
        }
    }

    async componentWillReceiveProps(newProps, newContext) {
        const ProductList = await fetch('/api/categories/'+newProps.match.params.id+'/products');
        const body = await ProductList.json();
        this.props.loadProductList(body);
        const categoryBody = await fetch('/api/categories/'+newProps.match.params.id);
        const category = await categoryBody.json();
        this.props.updateCategory(category);
    }

    async componentDidMount() {
        const ProductList = await fetch('/api/categories/'+this.props.match.params.id+'/products');
        const body = await ProductList.json();
        this.props.loadProductList(body);
        const categoryBody = await fetch('/api/categories/'+this.props.match.params.id);
        const category = await categoryBody.json();
        this.props.updateCategory(category);
    }

    render() {
        return(
            <div>
                <Header/>
                <div id="main-content">
                    <div id="content-holder">
                        <Sidebar/>
                        <div id="category-product-list">
                            <h2>
                                {this.props.category.name}
                            </h2>
                            <p className="description">
                                {this.props.category.description}
                            </p>
                            <ProductList/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

export default connect(
    CategoryProductList.mapStateToProps,
    { loadProductList, updateCategory }
)(CategoryProductList)