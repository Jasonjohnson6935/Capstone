import { useState } from "react";
import { useAddProductMutation } from "../redux/api";

function AddProduct(props) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    img_url: "",
    category: "",
  });
  const [error, setError] = useState(null);
  const [addProduct] = useAddProductMutation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { data, error } = await addProduct({ token: props.token, body: form });

    if (error) {
      setError("Something went wrong! Please try again.");
    } else {
      setForm({
        title: "",
        price: "",
        description: "",
        img_url: "",
        category: "",
      });
    }
  };

  const handleChange = ({ target }) => {
    setError(null);
    setForm({ ...form, [target.name]: target.value });
  };

  return (
    <section>
      <h2>Add Product</h2>
      <p>All items marked with * are required</p>
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
        <label htmlFor="category">category*</label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}

export default AddProduct;