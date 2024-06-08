import Navbar from "./components/navbar/Navbars";
// import Home from "./views/home/home"
import Appointments from "./views/appointments/Appointment";
import LoginForms from "./components/loginForm/LoginForms";

function App() {
  return (
    <div>
      <Navbar />
      {/* <Home/> */}
      <LoginForms />
      <Appointments />
    </div>
  );
}

export default App;
