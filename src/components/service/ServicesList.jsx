import React, { useEffect, useState } from "react";
import ExtraOptions from "../modals/extraOptions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Ac from '../../assets/images/serviceBrands/WaterPurifier.png';
import WaterPurifier from '../../assets/images/serviceBrands/WaterPurifier.png';
import AMC from '../../assets/images/amc.webp';
import RoMainitance from '../../assets/images/serviceListImages/ro service.webp';
import PreFilter from '../../assets/images/serviceListImages/pre filter setup.webp';
import RoRepair from '../../assets/images/serviceListImages/ro repair.webp';
import RoInst from '../../assets/images/serviceListImages/ro installation.webp';
import ProblemModal2 from "../modals/ProblemModal2";
import PhoneVerification from "../PhoneVerification/PhoneVerification";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";


const services = [
  // RO Service
  {
    id: 518,
    name: "Routine Service",
    price: 500,
    category: "ro-service",
    reviews: 57,
    rating: 4.8,
    image: RoMainitance,
    briefInfo: "Routine maintenance to ensure optimal performance of your RO system. This includes cleaning filters, checking for leaks, and assessing water quality."
  },

  //RO Repair
  {
    id: 1,
    name: "Repair Service",
    price: 299,
    category: "ro-repair",
    reviews: 42,
    rating: 4.5,
    briefInfo: "Addressing specific problems such as low water flow, unusual noises, or malfunctioning components. Costs vary based on the complexity of the repair and parts required",
    image: RoRepair,
  },

  // RO Installation
  {
    id: 2,
    name: "Ro Installation",
    price: 599,
    category: "ro-installation",
    reviews: 42,
    rating: 4.5,
    image: RoInst,
    briefInfo: "Professional system installation with quality components , warranty and Includes fixing the purifier stand on the wall, connecting the inlet water assembly, connecting the electricity supply, and a free Water Quality Test (TDS) every time."
  },

  // ro Uninstallation
  {
    id: 3,
    name: "RO Uninstallation",
    price: 399,
    category: "ro-unistallation",
    reviews: 35,
    rating: 4.3,
    image: PreFilter,
    briefInfo: "Safe removal of an existing RO system, ensuring no damage to plumbing or electrical setups.Includes removing the purifier from the wall, disconnecting the inlet water assembly, disconnecting the electricity supply, and packing the purifier properly."
  },

  // Water Purifier
  {
    id: 6,
    name: "Purifier Installation",
    price: 250,
    category: "water-purifier",
    reviews: 44,
    rating: 4.7,
    image: WaterPurifier,
    briefInfo: "Expert installation of all types of water purifiers with testing."
  },

  {
    id: 7,
    name: "Purifier Repair",
    price: 400,
    category: "water-purifier",
    reviews: 30,
    rating: 4.2,
    image: WaterPurifier,
    briefInfo: "Troubleshooting and fixing all water purifier issues with genuine parts."
  },

  // AC
  {
    id: 8,
    name: "AC Installation",
    price: 800,
    category: "ac",
    reviews: 60,
    rating: 4.8,
    image: Ac,
    briefInfo: "Professional AC installation with proper setup and testing."
  },
  {
    id: 9,
    name: "AC Service",
    price: 500,
    category: "ac",
    reviews: 75,
    rating: 4.6,
    image: Ac,
    briefInfo: "Complete AC servicing to ensure optimal cooling and energy efficiency."
  },

  // RO AMC 
  {
    id: 103,
    name: "AMC Plan 1",
    price: 999,
    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Comprehensive maintenance plans that typically include regular servicing, replacement of filters and membranes, and coverage of electrical parts.Annual maintenance plan for your RO covering 3-4 routine services.",


  },

  {
    id: 104,
    name: "AMC Plan 2",
    price: 2425,
    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Includes two servicing visits in a year, filter cleaning, and minor repairs. No major part replacements.Annual maintenance plan for your RO covering routine services and filters."

  },
  {
    id: 106,
    name: "AMC Plan 3",
    price: 2500,
    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Covers three servicing visits in a year, replacement of sediment and carbon filters, and minor electrical repairs.Annual maintenance plan for your RO covering routine services and electrical parts."

  },
  {
    id: 105,
    name: "AMC Plan 4",
    price: 4000,

    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Covers four servicing visits per year, replacement of sediment & carbon filters, and membrane cleaning. Includes minor electrical part replacements.Annual maintenance plan for your RO covering routine services, filters and membrane."

  },
  {
    id: 519,
    name: "AMC Plan 5",
    price: 5000,

    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Covers quarterly servicing, replacement of filters (sediment, carbon, and membrane), and free minor repairs. No additional service charge.Annual maintenance plan for your RO covering routine services, filters, membrane and electric parts."

  },
  {
    id: 520,
    name: "AMC Plan 6",
    price: 6000,
    category: "Ro-Amc",
    reviews: 42,
    rating: 4.4,
    image: AMC,
    briefInfo: "Includes unlimited service visits, full filter & membrane replacement, motor & electrical parts coverage, and priority customer support.Annual maintenance plan for your RO covering routine services, filters, membrane, electric parts and faulty parts."

  },
];



// Updated serviceCategories to match the Tabs component
// const serviceCategories = [
//   { id: "ro-service", title: "RO Service", showImage: true },
//   { id: "ro-repair", title: "Ro Repair", showImage: true },
//   { id: "ro-installation", title: "RO Installation", showImage: true },
//   { id: "ro-unistallation", title: "RO Uninstallation", showImage: true },
//   { id: "Ro-Amc", title: "RO AMC Plans", showImage: true },
// ];

// console.log(cartdata);

const ServicesList = ({ onAddToCart, addedServices = [], state }) => {
  const location = useLocation();
  const { city, cat } = useParams(); 
  const [catNam,setCatNam]=useState("");
  const [servicedata,setServiceData]=useState([]);
  const [BrandName,setBrandName]=useState("");
  // const { city, cat } = useParams();

// console.log(cat);

// console.log(BrandName);




//   useEffect(()=>{

    
// setStateName(city);
// setBrandName(cat);
//   },[])



  // Define which categories should use the modal
  const modalCategories = ['ac', 'refrigerator', 'chimney', 'washing-machine', 'water-purifier'];
  const [showModal, setShowModal] = useState(false);

  const type = localStorage.setItem('type', 'add');
 
useEffect(()=>{
  let lead_type = null;

  if (cat === "washing-machine-repair") {
    lead_type = 4;
  } else if (cat === "ac") {
    lead_type = 2;
  } else if (cat === "ro-water-purifier") {
    lead_type = 1;
  }

  

  const cid = localStorage.getItem('customer_id');
  
  fetch('https://waterpurifierservicecenter.in/customer/ro_customer/all_services.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({cid:cid,lead_type:lead_type})

})
.then(res => res.json())
.then(data => {
console.log("Service Response:", data);
setServiceData(data.service_details);
setBrandName(cat);

},[])


  
},[cat])



// console.log(servicedata);









  const handleAddToCart = async (service) => {
    if (!addedServices.includes(service.id)) {
      // onAddToCart(service); 
      const service_id = service.id;
      const quantity = 1;
      console.log(quantity);
      
      const type = localStorage.getItem('type');
      const cid = localStorage.getItem('customer_id');
      console.log(cid);
      if (cid != null) {
        toast.success('Hope You Enjoy Our Services 🎉');
        const payload = { service_id, quantity, cid, type };
        const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/add_to_cart.php", {

          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails == null ? []: data.AllCartDetails));
      localStorage.setItem('cart_total_price',data.total_price== null ? 0 : data.total_price);

           // Update the addedServices array after successful API call
      // setAddedServices(prev => [...prev, service.id]);
      } else {
        setShowModal(true);
        // toast.error('Login before addding any service');

        // setTimeout(() => {
        //   setShowModal(true);
        // }, 1500)

      }

    }
  };

  return (
    <div className="services-list">
      <ToastContainer />
      {servicedata?.map((service) => {
              const isAdded = addedServices.includes(service.id);
              // Fix: Define useModal variable here
              const useModal = modalCategories.includes(service.category);

              return (
                <div key={service.id} className="common-service-style">
                  <div className="servicePortionDetails flex-col" >
                  <div className="flex serviceWiseContainer">
                    <div className="serviceDetails">

                      <h3 className="serviceVarities">{service.service_name}</h3>
                      <div>
                        <span className="serviceReview">
                          <FontAwesomeIcon icon={faStar} /> {service.rating} ({service.reviews} reviews)
                        </span>
                        <div className="dashedLine"></div>
                        <div className="prices flex gap-2.5">
                          <span>
                            ₹{service?.price}
                          </span>
                          <span className="actualPrice">₹{service?.price + 100}</span>
                        </div>
                      </div>
                    </div>
                    <div className="serviceImgContainer">
                     
                        <div className="serviceDetailsImg mb-0.5">
                          <img src={service.image} alt={service.name} />
                        </div>
                     
                      <div className=" ">
                        {useModal ? (
                          <ProblemModal2 onAddToCart={onAddToCart} service={service} isAdded={isAdded} />
                        ) : (
                          <button
                            className={`add-to-cart-btn ${isAdded ? "bg-violet-300 px-2 py-1.5 cursor-not-allowed" : "IncrementDcrementBtn2"} rounded`}
                            onClick={() => handleAddToCart(service)}
                            disabled={isAdded}
                          >
                            {isAdded ? "Added" : "Add"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* <li className="briefInfo2" >
                   
                  </li> */}
                   <div className="briefInfo2 w-full"  dangerouslySetInnerHTML={{ __html: service.description}}></div>
                </div>
                </div>
              );
            })}
      <PhoneVerification setShowModal={setShowModal} showModal={showModal} />

    </div>
  );
};

export default ServicesList;