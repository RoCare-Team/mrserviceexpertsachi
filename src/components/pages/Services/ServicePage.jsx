import React, { useState, useEffect, useCallback } from "react";
import Tabs from "../../tabs/Tabs";
import ServicesList from "../../service/ServicesList";
import Cart from "../../cart/Cart";
import Roimg from "../../../assets/images/ro-homepage-banner.png";
import { useLocation,useParams } from "react-router-dom";
import FolderList from '../../folderList/FolderList';
import Assurance from "../../Assurance/Assurance";
import ServiceProcedure from '../../serviceProcedure';
import ServiceBanner from '../../../assets/images/RO CARE BANNER 448X251 (1).webp';
import BrandServices from "../../brandServices/BrandServices";
import FaqAccordion from "../../Faq/faq";
import FaqImg from '../../../assets/images/newFaqCon.webp';

const ServicePage = () => {
    const location = useLocation();
    const { state ,brand } = useParams();  // Extract city ,brands from URL
    const formattedState = state ? state.replace("-", " ").toLowerCase() : "Delhi"; 
    const formattedBrands = brand ? brand.replace('-','').toLowerCase() : '';
    const [selectedServices, setSelectedServices] = useState([]);
    const [addedServices, setAddedServices] = useState([]); // Track added service IDs
    const [totalAmount, setTotalAmount] = useState(0);
    const [cartLoaded, setCartLoaded] = useState(false);
    const [openItem,setOpenItem]=useState(0)
    

const { city, cat } = useParams();
  const [pagedata, setData] = useState("");
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {

    fetch('https://rocareindia.online/web_api/get_page_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ city,cat })

    })
    .then(res => res.json())
    .then(data => {
        console.log("Backend Response:", data);

        // console.log(JSON.stringify(data));

        
        

        // console.log("brands name"+data.brands[2].brand_url);
        
        if(!data.error){
            // setCategoryName()
            setData(data);
        }
    })
    .catch(err => console.error("Error sending city to backend:", err));
    // setData(data);
    setCategoryName(cat);
  }, [city, cat]);

    // Create a memoized cart load callback
    const handleCartLoad = useCallback((loadedItems, loadedTotal) => {
        console.log("Cart load callback received items:", loadedItems);
        if (loadedItems && loadedItems.length > 0) {
            setSelectedServices(loadedItems);
            setTotalAmount(loadedTotal);
            
            // Update addedServices state with ids from loaded cart items
            const serviceIds = loadedItems.map(item => item.id);
            setAddedServices(serviceIds);
            setCartLoaded(true);
        }
    }, []);

    // Load cart data from localStorage when component mounts
    useEffect(() => {
        const loadCartFromLocalStorage = () => {
            try {
                const savedCartItems = localStorage.getItem('service_name');
                const savedCartTotal = localStorage.getItem('total_price');

                // const cartItems=localStorage.getItem(cartItems);
        // console.log('selected serice'+savedCartItems);
                
                if (savedCartItems && savedCartTotal) {
                    const parsedItems = JSON.parse(savedCartItems);
                    const parsedTotal = parseFloat(savedCartTotal);
                    
                    console.log("ServicePage loading cart from localStorage:", parsedItems);
                    
                    setSelectedServices(parsedItems);
                    setTotalAmount(parsedTotal);
                    
                    // Update addedServices array with ids from loaded cart items
                    const serviceIds = parsedItems.map(item => item.id);
                    setAddedServices(serviceIds);
                    setCartLoaded(true);
                }
            } catch (error) {
                console.error("Error loading cart from localStorage:", error);
            }
        };
        
        loadCartFromLocalStorage();
    }, []);

    // Get the category from URL parameters when component mounts
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        
        if (category) {
            // Give time for the component to render before scrolling
            setTimeout(() => {
                const element = document.getElementById(category);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 500);
        }
    }, [location.search]);

    const handleAddToCart = (service) => {
        // Update selectedServices state
        setSelectedServices((prev) => {
            // Check if service already exists
            const existingService = prev.find(s => s.id === service.id);

            if (existingService) {
                // If exists, increment quantity
                return prev.map(s =>
                    s.id === service.id
                        ? { ...s, quantity: (s.quantity || 1) + 1 }
                        : s
                );
            } else {
                // If new, add with quantity 1
                return [...prev, { ...service, quantity: 1 }];
            }
        });
        
        // Also update addedServices state if not already included
        if (!addedServices.includes(service.id)) {
            setAddedServices([...addedServices, service.id]);
        }
    };

    const handleRemoveFromCart = (serviceId) => {
        // Update selectedServices state
        setSelectedServices((prev) => {
            const updatedServices = prev.filter((s) => s.id !== serviceId);
            return updatedServices;
        });
        
        // Also update addedServices state
        setAddedServices((prev) => prev.filter(id => id !== serviceId));
    };

    const handleDecrementService = (serviceId) => {
        setSelectedServices((prev) => {
            const updatedServices = prev
                .map(s =>
                    s.id === serviceId
                        ? {
                            ...s,
                            quantity: Math.max(0, (s.quantity || 1) - 1)
                        }
                        : s
                )
                // Remove the service completely if quantity becomes 0
                .filter(s => s.quantity > 0);
            
            // If service is completely removed, also update addedServices
            if (!updatedServices.some(s => s.id === serviceId)) {
                setAddedServices(prev => prev.filter(id => id !== serviceId));
            }
            
            return updatedServices;
        });
    };

    const handleIncrementService = (serviceId) => {
        setSelectedServices((prev) => {
            const updatedServices = prev.map(s =>
                s.id === serviceId
                    ? { ...s, quantity: Math.min(5, (s.quantity || 1) + 1) }
                    : s
            );
            
            return updatedServices;
        });
    };

    // Calculate total and update localStorage whenever selectedServices changes
    useEffect(() => {
        if (selectedServices.length > 0) {
            const total = selectedServices.reduce(
                (acc, curr) => acc + (curr.price * (curr.quantity || 1)),
                0
            );
            
            setTotalAmount(total);
            
            // Update localStorage with the latest cart state
            // localStorage.setItem('cartItems', JSON.stringify(selectedServices));
            // localStorage.setItem('cartTotal', total.toString());
        } else {
            // setTotalAmount(0);
            // localStorage.removeItem('cartItems');
            // localStorage.removeItem('cartTotal');
        }
    }, [selectedServices]);

    console.log(setData);
    
    // Debug logging
    useEffect(() => {
        console.log("Current selectedServices:", selectedServices);
        console.log("Current totalAmount:", totalAmount);
        
        
    }, [selectedServices, totalAmount]);

      // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

    return (
        <div className=" ">
          <div className="services-page common-spacing">
          <div className="left-side lg:w-1/4 flex-col mb-1.5">
               <div className="sticky top-20">
               <h3 className="cityHeadings"> {pagedata.city_name}'s Top Picks: Most Loved Services by Our Customers!</h3>
               <Tabs />
               </div>
            </div>
            <div className="right-side lg:w-3/4">
                <div className="rightSidePortion justify-center">
                    <div className="lg:w-1/2">
                        <h2 className="ml-2.5 mt-1.5">{formattedBrands} Services in {pagedata.city_name}</h2>
                        <div className="mb-3.5 flex items-center justify-center ">
                        <img src={ServiceBanner} alt='service img' width={475} height={345} style={{
                            borderRadius:'17px',width:'100%'
                        }}/></div>

                        <ServicesList 
                            onAddToCart={handleAddToCart} 
                            addedServices={addedServices}
                            state={formattedState}
                        />
                    </div>
                    <div className="lg:w-5/12 cartContainer">
                        <div className="cart-body-section">
                            <Cart
                                // selectedServices={selectedServices}
                                // total={totalAmount}
                                onRemove={handleRemoveFromCart}
                                onIncrement={handleIncrementService}
                                onDecrement={handleDecrementService}
                                // onCartLoad={handleCartLoad}
                            />
                            <Assurance />
                            <ServiceProcedure/>

                        </div>
                    </div>
                </div>
            </div>
          </div>
           
          <div className=" bg-white common-spacing">
                  <h2 className="text-4xl font-bold faqHeading mb-6">Frequently Asked Questions</h2>
                  
                <div className="flex flex-wrap">
                <div className='lg:w-1/2  py-3.5 px-7'>
                      <img src={FaqImg} alt='Faq Image Icon'  className=' w-full '  />
                  </div>
                  <div className="space-y-4 lg:w-1/2">
                    
                      <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                        <button
                          onClick={() => setOpenItem( openItem === 1 ? null : 1)}
                          className={`w-full p-4 text-left flex justify-between items-center `}
                        >
                          <span className="font-medium text-gray-800">{pagedata?.content?.faqquestion1 || "faq1"}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-purple-600 transform transition-transform `} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openItem==1  && (
                          <div className="p-4 bg-white border-t border-purple-100">
                            <p className="text-gray-600">
                            {pagedata?.content?.faqanswer1 || "faq1"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                        <button
                          onClick={() => setOpenItem( openItem === 2 ? null : 2)}
                          className={`w-full p-4 text-left flex justify-between items-center `}
                        >
                          <span className="font-medium text-gray-800">{pagedata?.content?.faqquestion2 || "faq1"}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-purple-600 transform transition-transform `} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openItem==2  && (
                          <div className="p-4 bg-white border-t border-purple-100">
                            <p className="text-gray-600">
                            {pagedata?.content?.faqanswer2 || "faq1"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                        <button
                          onClick={() => setOpenItem( openItem === 3 ? null : 3)}
                          className={`w-full p-4 text-left flex justify-between items-center `}
                        >
                          <span className="font-medium text-gray-800">{pagedata?.content?.faqquestion3 || "faq1"}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-purple-600 transform transition-transform `} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openItem==3  && (
                          <div className="p-4 bg-white border-t border-purple-100">
                            <p className="text-gray-600">
                            {pagedata?.content?.faqanswer3 || "faq1"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                        <button
                          onClick={() => setOpenItem( openItem === 4 ? null : 4)}
                          className={`w-full p-4 text-left flex justify-between items-center `}
                        >
                          <span className="font-medium text-gray-800">{pagedata?.content?.faqquestion4 || "faq1"}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-purple-600 transform transition-transform `} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openItem==4  && (
                          <div className="p-4 bg-white border-t border-purple-100">
                            <p className="text-gray-600">
                            {pagedata?.content?.faqanswer4 || "faq1"}
                            </p>
                          </div>
                        )}
                      </div>
                      <div className={`border rounded-xl overflow-hidden transition-all duration-300 `}>
                        <button
                          onClick={() => setOpenItem( openItem === 5 ? null : 5)}
                          className={`w-full p-4 text-left flex justify-between items-center `}
                        >
                          <span className="font-medium text-gray-800">{pagedata?.content?.faqquestion5 || "faq1"}
                          </span>
                          <svg 
                            className={`w-5 h-5 text-purple-600 transform transition-transform `} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        
                        {openItem==5  && (
                          <div className="p-4 bg-white border-t border-purple-100">
                            <p className="text-gray-600">
                            {pagedata?.content?.faqanswer5 || "faq1"}
                            </p>
                          </div>
                        )}
                      </div>


                  </div>
                </div>
                </div>

                <div className="bg-white common-spacing">
                            <h3>Popular Brand in {pagedata.city_name}</h3>
                            <div className="brandsServices flex items-center flex-wrap gap-2.5 ">
                                {pagedata.brands?.map((brand) => (
                                    <div  className='brandsServices '>
                                        <a href={`${brand.brand_url}/${cat}`}>
                                        <li className='brand-btn-style'>
                                             {brand.brand_name}
                                            <span></span>
                                        </li>
                                        </a>
                                    </div>
                                 ))} 
                
                                {/* {!visibleBrands && (
                                    <div>
                                        <button onClick={handleLoadMore} className='readMore'>Read More</button>
                                    </div>
                                )} */}
                            </div>
                        </div>
        </div>
        //  <FaqAccordion/>
    );
};

export default ServicePage;