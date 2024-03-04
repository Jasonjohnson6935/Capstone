import { useParams, useNavigate } from "react-router-dom";
import { useProductListQuery } from "../redux/api";

function ProductList({ token }) {
    const { data, error, isLoading } = useProductListQuery;

    if (isLoading) {
        return <p>Loading</p>;
    }

    if (error) {
        return <p>Something went wrong</p>;
    }

    // [
    //     {
    //         id:1,
    //         title:'...',
    //         price:'...',
    //         category:'...',
    //         description:'...',
    //         image:'...'
    //     },
    //     /*...*/
    //     {
    //         id:30,
    //         title:'...',
    //         price:'...',
    //         category:'...',
    //         description:'...',
    //         image:'...'
    //     }
    // ]

    return (
        <div>
            <h2>Product List</h2>
            {data.product.map((product) => {
                return (
                    <div key={product.product_id}>
                        <h2>Category: {product.category}</h2>
                        <img src={product.img_url} />
                        <Link to={`/productdetails/${id}`}>
                            See More Details
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}

export default ProductList;
