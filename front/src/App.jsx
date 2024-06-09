import Navbar from "./components/navbar/Navbars";
import Home from "./views/home/home"
import Appointments from "./views/appointments/Appointment";
import LoginForms from "./views/loginForm/LoginForms";
import Register from "./views/register/Register";

function App() {
  return (
    <div>
      <Navbar />
      <Home/>
      <LoginForms />
      <Appointments />
      <Register/>
    </div>
  );
}

export default App;
