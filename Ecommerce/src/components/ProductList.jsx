import { useState } from "react";
import { Link } from "react-router-dom";
import { useProductListQuery, useAddToCartMutation } from "../redux/api";

function ProductList({ token }) {
    const { data, error, isLoading } = useProductListQuery(token);
    const [searchTerm, setSearchTerm] = useState("");
    const [addToCart, { isLoading: isAddingToCart }] = useAddToCartMutation();

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (error) {
        return <p>Something went wrong</p>;
    }

    const filteredProducts = data.filter(product => {
        // Filter products based on title or category containing the search term
        return product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
               product.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleAddToCart = (productId) => {
        // Call the mutation to add the product to the cart
        addToCart({ token, body: { productId, quantity: 1 } });
    };

    return (
        <div>
            <h2>Product List</h2>
            <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm} 
                onChange={handleSearch} 
            />
            {filteredProducts.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>Category: {product.category}</h2>
                        <img src={product.image} alt={product.title} />
                        <Link to={`/product/${product.id}`}>
                            See More Details
                        </Link>
                        <button onClick={() => handleAddToCart(product.id)} disabled={isAddingToCart}>
                            Add to Cart
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;
