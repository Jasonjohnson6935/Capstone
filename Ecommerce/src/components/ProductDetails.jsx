import { useParams, useNavigate } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api";

function ProductDetails({ token }) {
    let { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useProductDetailsQuery({ token, id });

    const goToEditForm = () => {
        navigate(`/products/:id`);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Something went wrong!</p>;
    }

    /**
     * API data response 
     *  {
        id:1,
        title:'...',
        price:'...',
        category:'...',
        description:'...',
        image:'...'
        }
     */

    return (
        <section>
            <h2>Product Details</h2>
            {data && <>
            <img src={data.image} />
            <h3>Name: {data.title}</h3>
            <p>Category: {data.category}</p>
            <h4>Description: {data.description}</h4>
            <p>Price: {data.price}</p>
            <button onClick={goToEditForm}>Edit product</button>
            </>}
        </section>
    );
}

export default ProductDetails;