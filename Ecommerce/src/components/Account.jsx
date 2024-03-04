import { useAccountQuery } from "../redux/api";

function Account(props) {
  /**
   * user body from API:
   * {
   "address":{"geolocation":{"lat":"-37.3159","long":"81.1496"},
   "city":"kilcoole",
   "street":"new road",
   "number":7682,
   "zipcode":"12926-3874"},
   "id":1,"email":"john@gmail.com",
   "username":"johnd",
   "password":"m38rmF$",
   "name":{"firstname":"john",
   "lastname":"doe"},
   "phone":"1-570-236-7033",
   "__v":0}                                
   */
   const { data, error, isLoading } = useAccountQuery(props.token);
  console.log(props);
  console.log(props.token);

  console.log("DATA from API", props);
  console.log('Error from API', props.token);
  console.log("isLoading", isLoading)

  return (
    <section>
      <h2>Account</h2>
      {isLoading && <p>Loading...</p>}
      <ul>
        <li>Username:  </li>
        <li>Email:  </li> 
        <li>First Name:  </li> 
        <li>Last Name:  </li>
        <li>City: </li>
        <li>Street: </li>
        <li>Number: </li>
        <li>Zipcode: </li>
        <li>Id: </li>
        <li>Password: </li>
        <li>Phone: </li>
        <li>__V </li>
      </ul>
      
    </section>
  );
}

export default Account;
