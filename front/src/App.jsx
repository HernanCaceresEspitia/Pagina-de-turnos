import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbars";
import Home from "./views/home/home";
import Appointments from "./views/appointments/Appointment";
import LoginForms from "./views/loginForm/LoginForms";
import Register from "./views/register/Register";
import CreateAppointment from "./views/createAppointment/CreateAppointment";
import UserAppointments from "./views/userAppointment/userAppointment";
import NotFound from "./views/notFound/NotFound"
import '@fortawesome/fontawesome-free/css/all.css';
import About from "./views/about/About";
import Contact from "./views/contact/Contact";


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForms />} />
        <Route path="/seeAppointments" element={<Appointments />} />
        <Route path="/setAppointment" element={<CreateAppointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<UserAppointments />} />
        <Route path="/contact" element={ <Contact/>} />
        <Route path="/about" element={<About/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
