import HealthCheck from "../api/HealthCheck";
import CreateUserForm from "../user_form/CreateUserForm";
import LoginUser from "../user_form/LoginUser";
import LogoutUser from "../user_form/LogoutUser";
import JwtToken from "../auth/JwtToken";
import ClientImg from "../api/ClientImg";
import CreateCustomerForm from "../user_form/CreateCustomerForm";
import NavBar from "../nav/Navbar";

// This is for testing my components and seeing where it is.
const Home = () => {
  return (
    <div>
      {/* <NavBar /> */}
      <HealthCheck />
      <CreateUserForm />
      <CreateCustomerForm />
      <LoginUser />
      <LogoutUser />
      <JwtToken />
      <ClientImg />
    </div>
  );
};
export default Home;
