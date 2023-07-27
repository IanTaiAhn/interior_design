import HealthCheck from "../api/HealthCheck";
import CreateUserForm from "../user_form/CreateUserForm";
import LoginUser from "../user_form/LoginUser";
import LogoutUser from "../user_form/LogoutUser";
import JwtToken from "../auth/JwtToken";
import ClientImg from "../api/ClientImg";

const Home = () => {
  return (
    <div>
      <HealthCheck />
      <CreateUserForm />
      <LoginUser />
      <LogoutUser />
      <JwtToken />
      <ClientImg />
    </div>
  );
};
export default Home;
