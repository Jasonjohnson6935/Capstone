import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useEditProductMutation, useProductDetailsQuery } from "../redux/api";

function EditProduct({token}) {
    let { id } = useParams();
    const navigate = useNavigate();
    const [editProduct] = useEditProductMutation();
    const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    img_url: "",
    category: "",
  });
  const [error, setError] = useState(null);
  
  const [addProduct] = useProductDetailsQuery({ token, id });

  useEffect(() => {
    setForm(data?.product);
  }, []);

  const handleChange = ({ target }) => {
    setError(null);
    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await editProduct({
      token: token,
      body: form,
      id: id,
    });

    if (error) {
      setError("Something went wrong! Please try again.");
    } else {
        navigate(`/productdetails/${id}`);
      }
    };
  
    if (isLoading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Something went wrong!</p>;
    }
  
    return (
      <section>
        <h2>Edit Product</h2>
      {error && <p>{error}</p>}
      <form>
        <label htmlFor="title">Title</label>
        <input value={form.title} name="title" onChange={handleChange} />
        <label htmlFor="price">Price*</label>
        <input value={form.price} name="price" onChange={handleChange} />
        <label htmlFor="description">Description*</label>
        <input value={form.description} name="description" onChange={handleChange} />        
        <label htmlFor="img_url">Image url</label>
        <input value={form.img_url} name="img_url" onChange={handleChange} />
        <input value={form.category} name="Category" onChange={handleChange} />
        <label htmlFor="category">category</label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}
  
  export default EditProduct;