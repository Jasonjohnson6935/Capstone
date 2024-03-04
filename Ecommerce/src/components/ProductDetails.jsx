import { useParams, useNavigate } from "react-router-dom";
import { useProductDetailsQuery } from "../redux/api";

function ProductDetails({ token }) {
    let { id } = useParams();
    const navigate = useNavigate();

    const { data, error, isLoading } = useProductDetailsQuery({ token, id });

    const goToEditForm = () => {
        navigate(`/product/${id}`);
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
            <h2>product Details</h2>
            <img src={data.product.img_url} />
            <h3>Name: {data.product.name}</h3>
            <p>Category: {data.product.category}</p>
            <h4>Description: {data.product.description}</h4>
            <button onClick={goToEditForm}>Edit product</button>
        </section>
    );
}

export default ProductDetails;