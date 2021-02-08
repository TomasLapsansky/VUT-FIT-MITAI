import React from "react";
import Sidebar from '../Sidebar';
import AdminSectionHeader from '../partial/AdminSectionHeader';
import {connect} from "react-redux";
import {loadProductList, removeProductFromList} from "../../../redux/actions/adminActions";
import Badge from 'react-bootstrap/Badge';

class AdminProductIndex extends React.Component {

    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
    }

    static mapStateToProps = state => {
        return {
            productList: state.productList.products
        }
    }

    async componentDidMount() {
        // TODO handle fetch error
        const response = await fetch('/api/admin/products');
        const body = await response.json();
        this.props.loadProductList(body);
    }

    async handleDelete(event, id) {
        event.preventDefault();

        await fetch('/api/admin/products/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        this.props.removeProductFromList(id);
    }

    render() {
        return(
            <div id="admin-index" className="admin">
                <Sidebar activeItem={1}/>
                <div className="admin-content product-index">
                    <AdminSectionHeader pageTitle="Produkty" create={true} />
                    <div className="admin-content-list">
                        <table>
                            <thead>
                            <tr>
                                <th>Názov</th>
                                <th>Cena</th>
                                <th>Zľava</th>
                                <th>Dostupný</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.props.productList.map((product, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>
                                            {product.inDiscount && <Badge variant="info">zľavnený</Badge>}
                                            {!product.inDiscount && <Badge variant="secondary">nezľavnený</Badge>}
                                        </td>
                                        <td>
                                            {product.available && <Badge variant="success">dostupný</Badge>}
                                            {!product.available && <Badge variant="secondary">nedostupný</Badge>}
                                        </td>
                                        <td>
                                            <a href={'admin/products/edit/'+product.id}><i className="fas fa-edit"/></a>
                                            <a onClick={(e) => {this.handleDelete(e, product.id)}}><i className="fas fa-trash-alt"/></a>
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }

}

export default  connect(
    AdminProductIndex.mapStateToProps,
    { loadProductList, removeProductFromList }
)(AdminProductIndex);