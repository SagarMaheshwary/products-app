import React, { Component } from 'react'
import { updateProduct, getProduct } from '../../actions/productActions'
import { connect } from 'react-redux'

class ProductEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            price: '',
            quantity: ''
        }

        this.handleOnChange = this.handleOnChange.bind(this);
        this.updateProduct = this.updateProduct.bind(this);
    }

    async UNSAFE_componentWillMount() {
        const { id } = this.props.match.params;

        await this.props.getProduct(id);
        const { product } = this.props.products;

        this.setState({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity
        });
    }

    handleOnChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    async updateProduct(e) {
        e.preventDefault();

        const { name, description, price, quantity } = this.state;

        const product = new FormData();
        product.append('name', name);
        product.append('description', description);
        product.append('price', price);
        product.append('quantity', quantity);
        product.append('_method', 'PUT');

        const productImage = this.productImage.files[0];

        if (productImage) {
            product.append('image', this.productImage.files[0]);
        }

        const { id } = this.props.match.params;

        const response = await this.props.updateProduct(id, product);

        if (response) {
            this.props.history.push('/products');
        }
    }

    render() {
        const { errors } = this.props.products;
        const { name, description, price, quantity } = this.state;

        return (
            <div className="container">
                <h1 className="mt-5 text-center">Edit Product</h1>
                <form onSubmit={this.updateProduct}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${errors.name.length > 0 ? 'is-invalid' : ''}`}
                            value={name}
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
                            value={description}
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
                            value={price}
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
                            value={quantity}
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
                        <button type="submit" className="btn btn-outline-primary">Update Product</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products
});

export default connect(mapStateToProps, { updateProduct, getProduct })(ProductEdit)