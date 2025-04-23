import React, { useState, useEffect, useCallback } from "react";
import Tabs from "../Services/AllServices";
import ServicesList from "../../service/ServicesList";
import Cart from "../../cart/Cart";
import Roimg from "../../../assets/images/ro-homepage-banner.png";
import { data, useLocation,useParams } from "react-router-dom";
import FolderList from '../../folderList/FolderList';
import Assurance from "../../Assurance/Assurance";
import ServiceProcedure from '../../serviceProcedure';
import ServiceBanner from '../../../assets/images/RO CARE BANNER 448X251 (1).webp';
import BrandServices from "../../brandServices/BrandServices";
// import ServiceSection from "../../servicesSection/servicesSection";
import AllServicesList from "../Services/Services";

const catergoryInfo=[
    {
        Title:"AC Service Delhi- Engage Pro Service Contributor And Get Doorstep Service",
        content:"Are you looking for AC service in Delhi? Well, your cast around has landed you at the right place here; we are exhibiting you all brands and types of AC service at your doorstep in Delhi, so make connection with us and book your AC repair and maintenance service at your doorstep and experience the top and acceptable AC service at your door to hire the AC repair and maintenance service contributor now you call for not move anywhere because these days with the help out of the internet Delhi people can easily locate the nearest AC service contributor and hire the pro to the proper AC service solution at your doorstep at the top and fair fee. An air conditioner is an electronic machine which guids cool air inmost the encompassing area with the help out of the cooling gas and these days it has become quite necessary for all the houses in Delhi as it guids cool air irrespective to the temperature outside, but for this Delhi, people call for to ensure that their air conditioner unit received regular service because regular AC service maintains the air conditioner unit productivity and efficiency and while hiring the AC repair and maintenance service contributor Delhi people call for to ensure that their AC service contributor is trusted and reliable so that you can enjoy the high rate and 100% acceptable AC repair and maintenance service at your doorstep in Delhi."

    },
    {
        Title:"AC Service Centre In Delhi- Make Connection With The Trusted Service Center And Engage Expert ",
        content:"All the AC service centre in Delhi is staffed with skilled and trained service engineers who dedicatedly exhibits top-rated air conditioner service at the customer doorstep with 100% satisfaction, so if you live in Delhi and looking for the top and appropriate AC service center in Delhi, then cast around for the AC service center near me of your area in Delhi and receive the list of the top and certified service contributor of your area but before you finalize the deal do check the previous customer reviews and rating of the selected AC service centre because it helps out you in hiring the right and certified AC service center technician for the air conditioner repair and servicing at your doorstep in Delhi and it also ensures that you will receive proper air conditioner service at an economical and fair fee. The air conditioner unit has become a necessary part of the Delhi people life because air conditioner the only machine that can present cool air irrespective of the temperature outside Delhi during the summer season Delhi the temperature rise to the boiling level, so life becomes uncomfortable but having a properly working air conditioner ensure that no matter what's the temperature outside the air conditioner will present cool air inmost the encompassing so make sure that your AC unit is working properly and for this make sure to hire the pro from trusted AC service center store in Delhi and enjoy the cool and comfortable air inmost your house. "
    },
    {
        Title:" AC Service Charges Delhi- Check And Compare The Fee Before Your Engage Pro",
        content:"In Delhi, the air conditioner has become the essential home appliance and for all the house because it is one of the top machines to present the cool air irrespective to the temperature outside and in Delhi during the summer season the temperature become boiling so the Delhi people life become quite a changeling, but the help out of the technologically advanced air conditioner unit people can enjoy cool air irrespective to the temperature outside because an AC unit guids cool air with the help out of the cooling gas, so installation of air conditioner has become essential for all houses in Delhi but to enjoy the cool air for the longer duration Delhi people call for to ensure that their air conditioner contains sufficient amount of cooling gas and if case the cooling gas concentration decrease the people living in Delhi call for to book AC gas filling services because for present cool air, cooling gas is necessary. In Delhi, there are various AC service contributor who exhibits reliable and fair AC gas filling services at the customer doorstep, so if you are living in Delhi and looking for gas filling services and other required air conditioner services at your doorstep in Delhi, then make connection with to the nearest service contributor and check the AC service charges along with the AC gas filling charges because AC service cost in Delhi may vary based on additional service and type of gas used in the air conditioner to present the cool air. "
    },
]

const City = () => {
    const location = useLocation();
    const { city  } = useParams(); 
    // const [cityName,setCityName]=useState(""); // Extract city ,brands from URL
  const [cityData,setCityData]=useState([]);
 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [city]);

  useEffect(() => {
  
      fetch('http://rocareindia.online/web_api/get_city_page_data.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ city })
  
      })
      .then(res => res.json())
      .then(data => {
          console.log("Backend Response:", data);
  
          // console.log(JSON.stringify(data));
  
          
          
  
          // console.log("brands name"+data.brands[2].brand_url);
          
          if(!data.error){
              // setCategoryName()
              setCityData(data);
          }
      })
      .catch(err => console.error("Error sending city to backend:", err));
      
    }, [city]);

// console.log(cityData);


    return (
        <div>
            <div className="services-page common-spacing">
            <div className="left-side lg:w-1/4 flex-col mb-1.5">
               <div className="sticky top-20">
               <h3 className="cityHeadings">Most Loved Services by Our Customers!</h3>
               <Tabs />
               </div>
            </div>
            <div className="right-side lg:w-3/4">
                <div className="rightSidePortion justify-center">
                    <div className="lg:w-1/2">
                        <h2 className="ml-2.5 mt-1.5 text-3xl">Services All Over {cityData.city_name}</h2>
                        <div className="mb-3.5 flex items-center justify-center ">
                        <img src={ServiceBanner} alt='service img' width={475} height={345} style={{
                            borderRadius:'17px',width:'100%'
                        }}/></div>
                        <AllServicesList/>
                    </div>
                    <div className="lg:w-5/12 cartContainer">
                        <div className="cart-body-section">
                           
                            <Assurance />
                            <ServiceProcedure/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
   <div className="common-spacing bg-white">
   

   </div>
  <div className="common-spacing">
  <div className=" bg-white aboutStyle">
   <h3 className="catgoreyTitle">ABOUT MR. SERVICE EXPERT {cityData.city_name}</h3>
   <p className="catgoreyContent">{cityData?.city_detail?.city_content}</p>
   </div>
  </div>
  <div className="bg-white common-spacing">
                            <h3 className="catgoreyTitle">Popular City in India</h3>
                            <div className="brandsServices flex items-center flex-wrap gap-2.5 ">
                                {cityData.recent_cities?.map((city) => (
                                    <div  className='brandsServices '>
                                        <a href={`${city.city_url}`}>
                                        <li className='brand-btn-style'>
                                             {city.city_name}
                                            <span></span>
                                        </li>
                                        </a>
                                    </div>
                                 ))} 
                            </div>
                        </div>


        </div>
        
    );
};

export default City;