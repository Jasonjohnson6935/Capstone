import { useState } from "react";

function Register() {
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    lat: "",
    long: "",
  });

  const eventHandler = (event) => {
    event.preventDefault();
    console.log("in eventHandler", `USERINFO${userInfo.username}`);
  };

  const onUserInput = (e) => {
    setUserInfo({ ...userInfo, [e.target.placeholder]: e.target.value });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={eventHandler}>
        <label>
          Email
          <input
            type="email"
            placeholder="email"
            value={userInfo.email}
            onChange={onUserInput}
          />
        </label>
        <label>
          Username:
          <input
            type="text"
            placeholder="username"
            value={userInfo.username}
            onChange={onUserInput}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            placeholder="password"
            value={userInfo.password}
            onChange={onUserInput}
          />
        </label>
        <label>
          Name
          <input
            type="text"
            placeholder="firstName"
            value={userInfo.firstName}
            onChange={onUserInput}
          />
          <input
            type="text"
            placeholder="lastName"
            value={userInfo.lastName}
            onChange={onUserInput}
          />
        </label>
        <label>
          City
          <input
            type="text"
            placeholder="city"
            value={userInfo.city}
            onChange={onUserInput}
          />
        </label>
        <label>
          Street
          <input
            type="text"
            placeholder="street"
            value={userInfo.street}
            onChange={onUserInput}
          />
        </label>
        <label>
          Number
          <input
            type="text"
            placeholder="number"
            value={userInfo.number}
            onChange={onUserInput}
          />
        </label>
        <label>
          Zipcode
          <input
            type="text"
            placeholder="zipcode"
            value={userInfo.zipcode}
            onChange={onUserInput}
          />
        </label>
        <label>
          Geolocation
          <input
            type="text"
            placeholder="lat"
            value={userInfo.lat}
            onChange={onUserInput}
          />
          <input
            type="text"
            placeholder="long"
            value={userInfo.long}
            onChange={onUserInput}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
