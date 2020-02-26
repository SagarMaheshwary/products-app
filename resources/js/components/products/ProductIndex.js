import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProducts, deleteProduct } from '../../actions/productActions'
import { Link } from 'react-router-dom'

class ProductIndex extends Component {
    constructor(props) {
        super(props);

        this.deleteProduct = this.deleteProduct.bind(this);
    }

    async UNSAFE_componentWillMount() {
        await this.props.getProducts();
    }

    async deleteProduct(id) {
        const response = await this.props.deleteProduct(id);

        if (response) {
            //show flash message.
        }
    }

    render() {
        const { products } = this.props.products;
        return (
            <div className="container my-5">
                <h1 className="text-center">All Products</h1>
                <div className="row">
                    {products.length > 0 ? products.map(product => (
                        <div className="col-lg-3" key={product.id}>
                            <div className="card my-3">
                                <img className="card-img-top" src={'storage/products/' + product.image} alt={product.name} height="200px" />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <strong className="float-right">Price: ${product.price}</strong>
                                    <div className="clearfix"></div>
                                    <hr />
                                    <div>
                                        <Link to={`/products/${product.id}/edit`} className="btn btn-primary float-left">Edit</Link>
                                        <button onClick={this.deleteProduct.bind(this, product.id)} className="btn btn-danger float-right">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : <h5 className="text-center col mt-4">No Products Available!</h5>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps, {
    getProducts,
    deleteProduct
})(ProductIndex)