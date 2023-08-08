import HealthCheck from "../api/HealthCheck";
import LogoutUser from "../user_form/LogoutUser";
import JwtToken from "../auth/JwtToken";
import CreateCustomerForm from "../user_form/CreateCustomerForm";
// import LoginUser from "../user_form/LoginUser";
// import CreateUserForm from "../user_form/CreateUserForm";
// import ClientImg from "../api/ClientImg";
// import NavBar from "../nav/Navbar";

// This is for testing my components and seeing where it is.
const Dev = () => {
  return (
    <div>
      {/* Slowly deprecating the dev components */}
      {/* <NavBar /> */}
      {/* <ClientImg /> */}
      {/* <CreateUserForm /> */}
      {/* <LoginUser /> */}
      <HealthCheck />
      <CreateCustomerForm />
      <LogoutUser />
      <JwtToken />
    </div>
  );
};
export default Dev;
