import React, { useState, useRef, useEffect } from 'react';
import { Modal, Box } from '@mui/material';
import CongratsModal from '../modals/CongratsModal';
import { Await, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import BasicDetails from '../modals/BasicDetails';

const PhoneVerification = ({ onVerificationComplete, showModal, setShowModal }) => {
    const [showOtpModal, setShowOtpModal] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpRes, setOtpRes] = useState('');
    const [otpDigits, setOtpDigits] = useState(['', '', '', '']);
    const [activeButton, setActiveButton] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [openBaisc, setOpenBasic] = useState(false);
    const [name, setName] = useState(false);
    const [email, setEmail] = useState(false);
    const [newaddress, setNewaddress] = useState('');

    const [showCongrats, setShowCongrats] = useState(false);

    const otpInputRefs = useRef([]);

    if (otpInputRefs.current.length === 0) {
        otpInputRefs.current = Array(4).fill().map(() => React.createRef());
    }

    const handleOpenModal = () => {
        setShowModal(true);
        setShowOtpModal(false);
        setShowCongrats(false);
        setPhoneError('');
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setShowOtpModal(false);
        setPhoneNumber('');
        setOtpDigits(['', '', '', '']);
        setActiveButton(null);
        setShowCongrats(false);
        setPhoneError('');
    };

    const handleVerification = async () => {
        // store the user phone number to use further whenver need for login it 
        // localStorage.setItem('userPhone', phoneNumber);
        // localStorage.setItem('userToken', 'verified');
        const newOtpDigits = [...otpDigits];
        const newOtp = newOtpDigits.join('');
        const payload = { phoneNumber, newOtp };


        const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/service_otp_verify.php", {
            // mode:'cors',
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data.email + 'email name' + data.name);

        localStorage.setItem('name', data.name);
        localStorage.setItem('email', data.email);
        localStorage.setItem('customer_id', data.c_id);
        // localStorage.setItem('checkoutState', JSON.stringify(data.AllCartDetails, data.total_cart_price, data.cart_id));

        localStorage.setItem('checkoutState',JSON.stringify(data.AllCartDetails || []));
        localStorage.setItem('cart_total_price',data.total_cart_price || 0);



        
        // console.log(checkoutState.AllCartDetails+'herp');
        
        //    if(data.address.length>0){
        //     // console.log(data.address[0].id +' the saved address id');
        //     console.log(data.map((data,index)=>{data.address})+"saved addresses")
        //    }

        if (data.address && data.address.length > 0) {
            console.log(data.address.id + ' the saved address id');

            console.log(
                data.address.map((addr, index) => addr.id) + " saved addresses"
            );
        }

        let address = data.address;
        let RecentAdd = JSON.stringify(address);
        console.log(RecentAdd);



        if (data.error == false) {
            //  new postion where i added the phone and verifed as it was causing issues 
            localStorage.setItem('userPhone', phoneNumber);
            localStorage.setItem('userToken', 'verified');

            const newaddress = localStorage.setItem('RecentAddress', RecentAdd);
            console.log(newaddress);


            // console.log(address);


            toast.success(data.msg);
            // setShowOtpModal(false);
            if (data.status == 1) {
                setOpenBasic(true);
            }
            else {


                toast.success(data.msg);
                setShowCongrats(true);

            }

        }
        else {
            toast.error(data.msg)
        }


        // Call the callback function if provided
        if (onVerificationComplete) {
            onVerificationComplete();
        }
    }




    // This is the function to handle submitting basic details
    const handleBasicDetails = async (userData) => {
        // Combine the form data with phone number
        const fullUserData = {
            ...userData,
            phoneNumber: phoneNumber
        };

        console.log("Submitting user data:", fullUserData);

        try {
            // Make API call to save user details
            const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/update_user_dtls.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fullUserData),
            });

            const data = await res.json();

            if (data.error == false) {
                toast.success("Details saved successfully!");
                setOpenBasic(false);
                // setShowCongrats(true); // Show congrats modal after successful submission

                // Store additional user info in localStorage if needed
                localStorage.setItem('userName', userData.name);
                localStorage.setItem('userEmail', userData.email);
                setShowCongrats(true);
            } else {
                toast.error(data.msg || "Failed to save details");
            }

            return data;
        } catch (error) {
            toast.error("Error saving details: " + error.message);
            throw error;
        }
    };



    const handlePhoneChange = (e) => {
        const value = e.target.value;
        // Only allow digits in the phone number
        if (value === '' || /^\d+$/.test(value)) {
            setPhoneNumber(value);
            setPhoneError('');
        } else {
            setPhoneError('Please enter numbers only');
        }
    };

    const handlePhoneSubmit = async () => {
        if (phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber)) {

            try {

                const res = await fetch("https://waterpurifierservicecenter.in/customer/ro_customer/roservice_sendotp.php", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ phoneNumber }),
                });

                const data = await res.json();
                console.log(data + 'user phone');

                if (data.error == false) {
                    toast.success(data.msg);
                    setShowModal(false);
                    setShowOtpModal(true);
                    setPhoneError('');
                }
                else {
                    toast.error(data.msg);
                }

            } catch (error) {
                toast.error("Error:", error);
                setOtpRes("Error connecting to server");
            }

        } else if (phoneNumber.length !== 10) {
            setPhoneError('Phone number must be 10 digits');
        } else {
            setPhoneError('Please enter a valid phone number');
        }
    };

    const handleOtpChange = (index, value) => {
        if (value.match(/^[0-9]?$/)) {
            const newOtpDigits = [...otpDigits];

            newOtpDigits[index] = value;

            setOtpDigits(newOtpDigits);



            if (value && index < 3) {
                otpInputRefs.current[index + 1].focus();


            }


        }
    };




    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
    };



    const handleResendCode = (method) => {
        setActiveButton(method);

        // Show toast message
        setToastMessage(`OTP has been resent to your ${method === 'whatsapp' ? 'WhatsApp' : 'SMS'}`);
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
            setShowToast(false);
        }, 3000);
    };

    // Check if phone number is valid (10 digits)
    const isPhoneValid = phoneNumber.length === 10 && /^\d{10}$/.test(phoneNumber);

    return (
        <div>



            {/* Phone Verification Modal using MUI Modal */}
            <Modal
                open={showModal || showOtpModal}
                onClose={handleCloseModal}
                aria-labelledby="phone-verification-modal"
                aria-describedby="phone-verification-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        maxWidth: '600px',
                        bgcolor: 'background.paper',
                        borderRadius: '0.5rem',
                        boxShadow: 24,
                        p: 3,
                    }}
                >
                    <ToastContainer />
                    {/* Close Button */}
                    <button
                        onClick={handleCloseModal}
                        className="closeModalStyle text-gray-500 hover:text-gray-700"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>

                    {/* Phone Number Modal */}
                    {(showModal) && (
                        <div className="text-center flex items-start flex-col gap-3">
                            {/* SVG Phone Icon instead of image */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                            </svg>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Enter your phone number</h2>
                            <p className="text-gray-600 mb-6">We'll send you a text with a verification code.</p>
                            <div className="flex mb-4 w-full">
                                <div className="flex items-center px-4 bg-gray-100 rounded-l-lg border border-gray-300 border-r-0">
                                    <span className="text-gray-600">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Enter your phone number"
                                    className={`flex-1 p-3 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 ${phoneError ? 'border-red-500' : 'border-gray-300'}`}
                                    value={phoneNumber}
                                    onChange={handlePhoneChange}
                                    maxLength={10}
                                    name='mobile'
                                    id='mobile'
                                />
                            </div>

                            {phoneError && (
                                <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                            )}

                            <button
                                onClick={handlePhoneSubmit}
                                className={`w-full py-3 rounded-lg font-medium mt-4 transition ${isPhoneValid
                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                    : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
                                    }`}
                                disabled={!isPhoneValid}
                            >
                                Continue
                            </button>
                            {/* /privacy-and-policy */}
                            <div>
                                <span className='text-gray-400 '>By continuing, you agree to our <Link to={'/terms-and-conditions '} style={{ color: 'gray' }}><b>T&C</b></Link> and <Link to={'/privacy-and-policy'} style={{ color: 'gray' }}><b>Privacy policy</b></Link>.</span>
                            </div>
                        </div>
                    )}

                    {/* OTP Verification Modal */}
                    {showOtpModal && (
                        <div className="text-center">
                            <div className='flex items-center justify-center'>
                                {/* SVG OTP Icon instead of image */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                    <path d="M7 11V7a5 5 0 0110 0v4" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2 text-gray-900">Enter verification code</h2>
                            <p className="text-gray-600 mb-6">A 4-digit verification code has been sent to +91{phoneNumber}</p>

                            <div className="flex justify-center gap-2 mb-6">
                                {otpDigits.map((digit, index) => (
                                    <input
                                        name='otp'
                                        id='otp'
                                        key={index}
                                        ref={el => otpInputRefs.current[index] = el}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        value={digit}
                                        onChange={(e) => handleOtpChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                    />
                                ))}
                            </div>
                            {/* resend code  */}
                            <div className="resendCode mb-2">
                                <span className='text-gray-400'>Resend the code on</span>
                                <div className='flex items-center gap-2.5 justify-center'>
                                    <button
                                        className={`checkout-btn ${activeButton === 'whatsapp' ? 'bg-green-500 text-white' : ''}`}
                                        onClick={() => handleResendCode('whatsapp')}
                                    >
                                        Whatsapp
                                    </button>
                                    <button
                                        className={`checkout-btn ${activeButton === 'sms' ? 'bg-blue-500 text-white' : ''}`}
                                        onClick={() => handleResendCode('sms')}
                                    >
                                        SMS
                                    </button>
                                </div>
                            </div>
                            <button
                                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium"
                                onClick={handleVerification}
                            >
                                Verify
                            </button>
                        </div>
                    )}
                </Box>
            </Modal>


            {openBaisc && (
                <BasicDetails setOpen={setOpenBasic} open={openBaisc} phoneNumber={phoneNumber}
                    onSubmitDetails={handleBasicDetails} />
            )

            }

            {/* CongratsModal - This should also use MUI Modal for consistency */}
            {showCongrats && (
                <CongratsModal setShowCongrats={setShowCongrats} open={showCongrats} />
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg transition-opacity duration-300">
                    <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{toastMessage}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneVerification;