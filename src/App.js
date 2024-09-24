
import './App.css';
import Navbar from './COMPONENTS/NAVBAR/Navbar';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomePage from './COMPONENTS/PAGES/HomePage.jsx';
import AboutPage from './COMPONENTS/PAGES/AboutPage.jsx';

import ServicesPage from './COMPONENTS/PAGES/ServicesPage.jsx';
import ContactPage from './COMPONENTS/PAGES/ContactPage.jsx';

import Service1Page from './COMPONENTS/PAGES/Service1Page.jsx';
import Service2Page from './COMPONENTS/PAGES/Service2Page.jsx';
import Service3Page from './COMPONENTS/PAGES/Service3Page.jsx';
import Service4Page from './COMPONENTS/PAGES/Service4Page.jsx';
import Service5Page from './COMPONENTS/PAGES/Service5Page.jsx';
import Service6Page from './COMPONENTS/PAGES/Service6Page.jsx';
import ScrollToTop from './ScrolltoTop.jsx';

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../src/Firebase.js";
import AdminLogin from './COMPONENTS/PAGES/AdminLogin.jsx';
import BlogPage from './COMPONENTS/PAGES/BlogPage.jsx';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
    
        <BrowserRouter>
        <Navbar />
        <ScrollToTop></ScrollToTop>
        <Routes>
        <Route path="/login" element={<AdminLogin />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/About' element={<AboutPage />} />
          <Route path='/Contact' element={<ContactPage />} />
          <Route path='/Services' element={<ServicesPage />} />
          <Route path='/blog' element={<BlogPage />} />
          <Route path='/services/service1' element={<Service1Page />} />
<Route path='/services/service2' element={<Service2Page />} />
<Route path='/services/service3' element={<Service3Page />} />
<Route path='/services/service4' element={<Service4Page />} />
<Route path='/services/service5' element={<Service5Page />} />
<Route path='/services/service6' element={<Service6Page />} />
        </Routes>
      </BrowserRouter> 
     
    </div>
  );
}

export default App;
