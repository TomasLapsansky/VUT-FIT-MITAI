import AdminProductCreate from "./components/admin/product/AdminProductCreate";

const React = require('react');
const ReactDOM = require('react-dom');
import { Provider } from 'react-redux'
import store from './redux/store';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import AdminIndex from './components/admin/AdminIndex';
import AdminUserIndex from "./components/admin/user/AdminUserIndex";
import AdminUserCreate from "./components/admin/user/AdminUserCreate";
import AdminUserEdit from "./components/admin/user/AdminUserEdit";
import AdminProductIndex from "./components/admin/product/AdminProductIndex";
import AdminProductEdit from "./components/admin/product/AdminProductEdit";
import LandingPage from "./components/frontend/LandingPage";
import ProductDetail from "./components/frontend/ProductDetail";
import Cart from "./components/frontend/Cart";
import Checkout from "./components/frontend/Checkout";
import OrderSummary from "./components/frontend/OrderSummary";
import CategoryProductList from "./components/frontend/CategoryProductList";
import AdminCategoryIndex from "./components/admin/category/AdminCategoryIndex";
import AdminCategoryEdit from "./components/admin/category/AdminCategoryEdit";
import AdminCategoryCreate from "./components/admin/category/AdminCategoryCreate";
import LoginPage from "./components/frontend/LoginPage";
import RegisterPage from "./components/frontend/RegisterPage";
import MyAccount from "./components/frontend/MyAccount";
import MyOrders from "./components/frontend/MyOrders";
import MyOrderDetail from "./components/frontend/MyOrderDetail";
import AdminOrderIndex from "./components/admin/order/AdminOrderIndex";
import AdminOrderDetail from "./components/admin/order/AdminOrderDetail";


class App extends React.Component { // <1>


    render() { // <3>
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path="/admin/categories/edit/:id"
                               render = {props => <AdminCategoryEdit {...props} /> } />
                        <Route exact path="/admin/categories/create">
                            <AdminCategoryCreate />
                        </Route>
                        <Route exact path="/admin/categories/">
                            <AdminCategoryIndex />
                        </Route>
                        <Route exact path="/admin/users/edit/:id"
                               render = {props => <AdminUserEdit {...props} /> } />
                       <Route exact path="/admin/users/create/">
                            <AdminUserCreate />
                        </Route>
                        <Route exact path="/admin/users/">
                            <AdminUserIndex />
                        </Route>
                        <Route exact path="/admin/products/edit/:id"
                               render = {props => <AdminProductEdit {...props} /> } />
                        <Route exact path="/admin/products/create">
                            <AdminProductCreate />
                        </Route>
                        <Route exact path="/admin/products/">
                            <AdminProductIndex />
                        </Route>
                        <Route exact path="/admin/orders/:id"
                               render = {props => <AdminOrderDetail {...props} /> } />
                        <Route exact path="/admin/orders/">
                            <AdminOrderIndex />
                        </Route>
                        <Route path="/admin">
                            <AdminIndex/>
                        </Route>
                        <Route exact path="/product/:id"
                               render = {props => <ProductDetail {...props} /> } />
                        <Route exact path="/checkout">
                            <Checkout />
                        </Route>
                        <Route exact path="/order-detail/:id"
                               render = {props => <OrderSummary {...props} /> } />
                        <Route exact path="/category/:id"
                               render = {props => <CategoryProductList {...props} /> } />
                       <Route exact path="/cart">
                            <Cart/>
                        </Route>
                        <Route exact path="/my-account/orders/detail/:id"
                               render = {props => <MyOrderDetail {...props} /> } />>
                        <Route exact path="/my-account/orders">
                            <MyOrders />
                        </Route>
                        <Route exact path="/my-account">
                            <MyAccount />
                        </Route>
                        <Route exact path="/register">
                            <RegisterPage />
                        </Route>
                        <Route exact path="/login">
                            <LoginPage />
                        </Route>
                        <Route exact path="/">
                            <LandingPage />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(
<App/>,
    document.getElementById('react')
)