import { useState } from "react";
import { useRegisterMutation } from '../redux/api'

function Register(props) {
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
        phone: "",
    });
    const [errorMsg, setError] = useState(null);
    const [register] = useRegisterMutation();

    const eventHandler = async (event) => {
        event.preventDefault();
        const { data, error } = await register(userInfo);
    
        if (error) {
          setError(error.data.message);
          console.log(`error ${JSON.stringify(error.data.message)}`);
        } else {
          props.setToken(data.token);
          console.log(`data ${JSON.stringify(data.token)}`);
        }
      };
    
      const onUserInput = (e) => {
        if (errorMsg) {
          setError(null);
        }
    
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
      };
    

return (
    <div>
        <h2>Register</h2>
        {errorMsg ? <p>{errorMsg}</p> : <span />}
        <form onSubmit={eventHandler}>
            <label>
                Email
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={userInfo.email}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Username:
                <input
                    type="text"
                    placeholder="username"
                    name="username"
                    value={userInfo.username}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Password
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={userInfo.password}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Email
                <input
                    type="email"
                    placeholder="email"
                    name="email"
                    value={userInfo.email}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Name
                <input
                    type="text"
                    placeholder="firstName"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={onUserInput}
                />
                <input
                    type="text"
                    placeholder="lastName"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={onUserInput}
                />
            </label>
            <label>
                City
                <input
                    type="text"
                    placeholder="city"
                    name="city"
                    value={userInfo.city}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Street
                <input
                    type="text"
                    placeholder="street"
                    name="street"
                    value={userInfo.street}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Number
                <input
                    type="text"
                    placeholder="number"
                    name="number"
                    value={userInfo.number}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Zipcode
                <input
                    type="text"
                    placeholder="zipcode"
                    name="zipcode"
                    value={userInfo.zipcode}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Geolocation
                <input
                    type="text"
                    placeholder="lat"
                    name="lat"
                    value={userInfo.lat}
                    onChange={onUserInput}
                />
                <input
                    type="text"
                    placeholder="long"
                    name="long"
                    value={userInfo.long}
                    onChange={onUserInput}
                />
            </label>
            <label>
                Phone
                <input
                    type="phone"
                    placeholder="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={onUserInput}
                />
            </label>
            <button type="submit">Register</button>
        </form>
    </div>
);
}

export default Register;
