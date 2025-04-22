import React from 'react'
import { Link } from 'react-router-dom';

function StateLinks() {
    const State = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai',
        'Kolkata', 'Noida', 'Ghaziabad', 'Faridabad', 'Surat', 'Pune',
        'Jaipur', 'Lucknow', 'Kanpur', 'Thane', 'Patna', 'Indore',
        'Bhopal', 'Ranchi', 'Greater Noida', 'Meerut', 'Varanasi',
        'Allahabad', 'Prayagraj', 'Chandigarh'];


    return (
        <div className="ro-service-cities">
            <h2>RO Service in Popular Cities</h2>
            <div className="state-links flex flex-wrap gap-2.5 ">


               


                {State.map((city) => (
                    <Link
                        key={city}
                        to={`/${city.toLowerCase()}/ro-water-purifier`}
                        className="state-link  "
                       
                    >
                        {city}
                    </Link>
                ))}
            </div>
        </div>
    );
};


export default StateLinks