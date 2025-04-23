// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import SiteLoader from "./components/loader/SiteLoader";



// Pages 
import ServicePage from "./components/pages/Services/ServicePage";
import WashingPage from "./components/pages/Services/WashingPage";
import CheckOut from "./components/pages/CheckOut/CheckOut";
import Home from "./components/pages/Home/home";
import Accordion from "./components/accordion";
import Terms from "./components/pages/Terms/Terms";
import Privacy from "./components/pages/Privacy/Privacy";
import Booking from "./components/pages/booking/booking";
import HelpCenter from "./components/pages/Helpcenter/HelpCenter";
import BrandServices from "./components/brandServices/BrandServices";
import Contact from "./components/pages/contact/Contact";
import Jobs from "./components/jobs/Jobs";

//state home page 
import StateHome from "./components/pages/stateHome/StateHome";

// Images
import LoaderImg from "./assets/images/logo.png";
import PhoneLinkActivator from "./components/appLink/PhoneLinkActivator";
import Profile from "./components/pages/profileArea/profile";
import Blog from "./components/blogs/Blog";
import BlogContent from "./components/pages/blogContent/BlogContent";
import FaqAccordion from "./components/Faq/faq";
import Test from "./components/pages/test/Test";
import City from "./components/pages/city/City";


function App() {
  // const [isLoading, setIsLoading] = useState(true);


  // const handleLoadComplete = () => {
  //   setIsLoading(false);
  // };



  // if (isLoading) {
  //   return <SiteLoader logoSrc={LoaderImg} onLoadComplete={handleLoadComplete} />;
  // }

  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/service/ro-water-purifier" element={<ServicePage />} />
        {/* <Route path="/ro-water-purifier" element={<Navigate to="/ro-water-purifier/delhi" />} /> */}
        <Route path="/service/ro-water-purifier/:state" element={<ServicePage />} />
        <Route path="/:brand/service/ro-water-purifier/:state" element={<ServicePage />} />
        <Route path="/service/Washing-service" element={<WashingPage />} />

        <Route path="/home/mumbai" element={<StateHome />} />

        <Route path="/:city" element={<City/>}/>

        <Route path="/blogs" element={<Blog />} />
        <Route path="/blogs/1/ro-water-main-stages-of-ro-plant-process-and-health-benefits" element={<BlogContent />} />

        <Route path="/help-center" element={<AuthUser><HelpCenter /></AuthUser>} />
        <Route path="/booking" element={<AuthUser><Booking /></AuthUser>}></Route>
        <Route path="/profile" element={<AuthUser><Profile /></AuthUser>}></Route>

        <Route path="/:city/:cat/" element={<ServicePage />} />
        <Route path="/terms-and-conditions" element={<Terms />} />
        <Route path="/privacy-and-policy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Jobs />} />

      </Routes>
      {/* <Accordion /> */}
       {/* <FaqAccordion/> */}
      <BrandServicePage />
      <PhoneLinkActivator />
      <Footer />
    </Router>

  );
}

// suppose u want to have a component at a particular point but dont want it to appear at rest of others pages
function BrandServicePage() {
  const location = useLocation();
  return location.pathname === '/service/ro-water-purifier' ? <BrandServices /> : null;
}


function AuthUser({ children }) {
  const token = localStorage.getItem('userToken');

  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to={'/checkout'} />;
  }
}


export default App;