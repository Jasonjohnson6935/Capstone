import { NavLink, useNavigate } from "react-router-dom";

function NavBar(props) {
  const navigate = useNavigate();

  const logoutUser = () => {
    props.setToken(null);
    navigate("/");
  };

  if (props.token) {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Product List</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/products">Add Product</NavLink>
        <NavLink to="/carts">Cart</NavLink>
        <a onClick={logoutUser}>Logout</a>
      </nav>
    );
  }
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
}

export default NavBar;