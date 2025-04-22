import React from 'react';
import RoInstallation from '../../assets/images/serviceBrands/RoInstallation.png';
import RoRepair from '../../assets/images/ro-service/ro repair.webp';
import RoService from '../../assets/images/ro-service/ro service.webp';

import AMC from '../../assets/images/AMC.jpg';

const serviceList = [
  { id: "ro-service", name: "RO Service", image: RoService },
  { id: "ro-repair", name: "RO Repair", image: RoRepair},
  { id: "ro-installation", name: "RO Installation ", image: RoInstallation },
  { id: "ro-unistallation", name: "RO Uninstallation ", image: RoInstallation },
  { id: "Ro-Amc", name: 'RO AMC', image: AMC },
  // { id: "water-purifier", name: "Water Purifier", image: WaterPurifier },

];

const Tabs = () => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-4xl mx-auto  ">
      <div className="bg-white rounded-lg shadow-md p-4 sticky top-10 servicePortion gap-4 ">
        <div className='flex gap-6 serviceHeading'>
          <h4 className=" font-semibold mb-0 text-center">Select a Service</h4>
          <span className='serviceHorizontal'></span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
          {serviceList.map((service) => (
            <button
              key={service.id}
              onClick={() => scrollToSection(service.id)}
              className="flex flex-col items-center justify-center  tabCards sm:w-xs bg-gray-100 rounded-lg hover:bg-white transition-all shadow-md hover:shadow-lg border border-gray-300 hover:ring-2 hover:ring-purple-300 p-1"
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-11 h-11 object-contain mb-2"
              />
              <span className="text-xs font-medium text-gray-700 text-center text-wrap">{service.name}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Tabs;
