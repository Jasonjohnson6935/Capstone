import React, { useState, useEffect } from 'react';
import {useGetCartListQuery} from '../redux/api';
import {useGetCartQuery} from '../redux/api';
import {useAddToCartMutation} from '../redux/api';
import {useUpdateCartMutation} from '../redux/api'
import {useDeleteCartMutation} from '../redux/api'


function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getAllCarts = async () => {
            try {
                const response = await fetch('https://fakestoreapi.com/carts');
                if (!response.ok) {
                    throw new Error('Failed to fetch carts');
                }
                const data = await response.json();
                setCartItems(data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setError('Something went wrong');
                setIsLoading(false);
            }
        };

        getAllCarts();

    }, []);

    const handleDelete = async (cartId) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete cart');
            }
            const deletedCart = await response.json();
            console.log('Deleted cart:', deletedCart);
            setCartItems(cartItems.filter(cart => cart.id !== cartId));
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to delete cart');
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.map(cart => (
                <div key={cart.id}>
                    <h3>Cart ID: {cart.id}</h3>
                    <button onClick={() => handleDelete(cart.id)}>Delete Cart</button>
                    <ul>
                        {cart.products.map(product => (
                            <li key={product.productId}>
                                Product ID: {product.productId}, Quantity: {product.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}

export default Cart;