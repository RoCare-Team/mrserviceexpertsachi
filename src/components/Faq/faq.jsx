import { useState } from 'react';
import FaqImg from '../../assets/images/newFaqCon.webp';

export default function FaqAccordion({faqItems}) {
  const [openItem, setOpenItem] = useState(0);
  // console.log(faqItems);
  
    // const faqItems = [
   
  //   {
  //     question: "How often should I get my RO water purifier serviced in Delhi?",
  //     answer:
  //       "As per the RO experts, the RO water purifier is serviced at least once or twice every year to lessen premature breakdowns in Delhi. Get in touch with one of the top-rated RO water purifier services in Delhi and get the lowest cost service. You can book fill the form on RO Care India website to book RO Service in Delhi.",
  //   },
  //   {
  //     question: "What does the regular water purifier service cost in Delhi?",
  //     answer:
  //       "An RO water purifiers maintenance cost depends on the water purifier model and the cost of replacing the RO membrane, pre-filters and post-filters, and the labor cost. The regular water purifier service cost can be lowered with periodic maintenance.",
  //   },
  //   {
  //     question: "When should you schedule a water purifier service in Delhi?",
  //     answer:
  //       "Any models of water purifiers need to be serviced every 6 to 12 months. Ignoring beyond 12 months can cause filter damage and stops functioning properly. The water purifier manufacturing companies mentioned the standard service period. But its great to be careful about its preventive management and services at an appropriate time by the expert professional.",
  //   },
  //   {
  //     question: "Which water purifier has the lowest service cost in Delhi?",
  //     answer:
  //       "The adequately maintained water purifier has the minimum service cost because its spares are regularly serviced in Delhi. You can also find some low-maintenance water purifiers that are considered low-maintenance cost systems. One can also try RO AMC to lower the periodic RO service cost and extend its longevity in Delhi.",
  //   },
  //   {
  //     question: "How do I know my water purifier is out of service in Delhi?",
  //     answer:
  //       "Once your water purifier worked few years, it lowering its capacity to purify water and needs more frequent service in Delhi. There is some presentation that gives you an indication about its service requirements. Frequent breakdowns, water leakage, water impurity, and some other indications indicate its urgent maintenance in Delhi.",
  //   },
  // ];

  
  
  return (
    // <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className=" bg-white common-spacing">
        <h2 className="text-4xl font-bold faqHeading mb-6">Frequently Asked Questions</h2>
        
      <div className="flex flex-wrap">
      <div className='lg:w-1/2  py-3.5 px-7'>
            <img src={FaqImg} alt='Faq Image Icon'  className=' w-full '  />
        </div>
        <div className="space-y-4 lg:w-1/2">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-300 ${openItem === index ? 'border-purple-300 shadow-md' : 'border-gray-400'}`}
            >
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className={`w-full p-4 text-left flex justify-between items-center ${openItem === index ? 'bg-purple-200' : 'hover:bg-gray-50'}`}
              >
                <span className="font-medium text-gray-800">{item.question}</span>
                <svg 
                  className={`w-5 h-5 text-purple-600 transform transition-transform ${openItem === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {openItem === index && (
                <div className="p-4 bg-white border-t border-purple-100">
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    // </div>
  );
}