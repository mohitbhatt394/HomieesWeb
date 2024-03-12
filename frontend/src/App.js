import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register'
import Login from './pages/Login'
import RegisterProvider from './pages/RegisterProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomeContect from './components/HomeContect';
import Logout from './pages/Logout';
import Contact from './pages/Contact';
import About from './pages/About';
import Donate from './pages/Donate';
import UserProfile from './pages/UserProfile';
import Service from './pages/Service';
import Error from './pages/Error';


function App() {
  return (
    <>
    
      <BrowserRouter>
      <Navbar />
      
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/userRegister" element={<Register/>}/>

          <Route path="/userLogin" element={<Login/>}/>
          <Route path="/userLogout" element={<Logout/>}/>
          <Route path="/providerRegister" element={<RegisterProvider/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/donate" element={<Donate/>}/>
          <Route path="/userProfile" element={<UserProfile/>}/>
          <Route path="/service" element={<Service/>}/>
          <Route path="*" element={<Error/>}/>

        </Routes>

        <HomeContect/>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
