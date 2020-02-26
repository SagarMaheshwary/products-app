import React, { Component } from 'react'
import { addProduct } from '../../actions/productActions'
import { connect } from 'react-redux'

class ProductCreate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            quantity: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }

    handleOnChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    async addProduct(e) {
        e.preventDefault();

        const product = new FormData();
        product.append('name', this.state.name);
        product.append('description', this.state.description);
        product.append('price', this.state.price);
        product.append('quantity', this.state.quantity);
        product.append('image', this.productImage.files[0]);

        const response = await this.props.addProduct(product);

        if (response) {
            this.props.history.push('/products');
        }
    }

    render() {
        const errors = this.props.products.errors;

        return (
            <div className="container">
                <h1 className="mt-5 text-center">Create a Product</h1>
                <form onSubmit={this.addProduct}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name.length > 0 ? 'is-invalid' : ''}`}
                            value={this.state.name}
                            placeholder="Enter Product Name"
                            onChange={this.handleOnChange}
                        />
                        {errors.name.length > 0 ?
                            <div className="invalid-feedback">
                                {errors.name[0]}
                            </div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            className={`form-control ${errors.description.length > 0 ? 'is-invalid' : ''}`}
                            value={this.state.description}
                            placeholder="Enter Product Description"
                            onChange={this.handleOnChange}
                        />
                        {errors.description.length > 0 ?
                            <div className="invalid-feedback">
                                {errors.description[0]}
                            </div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className={`form-control ${errors.price.length > 0 ? 'is-invalid' : ''}`}
                            value={this.state.price}
                            placeholder="Enter Product Price"
                            onChange={this.handleOnChange}
                        />
                        {errors.price.length > 0 ?
                            <div className="invalid-feedback">
                                {errors.price[0]}
                            </div> : null}
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            className={`form-control ${errors.quantity.length > 0 ? 'is-invalid' : ''}`}
                            value={this.state.quantity}
                            placeholder="Enter Product Quantity"
                            onChange={this.handleOnChange}
                        />
                        {errors.quantity.length > 0 ?
                            <div className="invalid-feedback">
                                {errors.quantity[0]}
                            </div> : null}
                    </div>
                    <div className="form-group">
                        <div className="custom-file">
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                ref={file => this.productImage = file}
                            />
                            <label className="custom-file-label" htmlFor="image">Choose an image</label>
                        </div>
                        {errors.image.length > 0 ?
                            <div className="invalid-feedback">
                                {errors.image[0]}
                            </div> : null}
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-outline-primary">Save Product</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps, { addProduct })(ProductCreate)