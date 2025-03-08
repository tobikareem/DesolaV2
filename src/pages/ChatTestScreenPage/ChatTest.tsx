// import { PenLine } from 'lucide-react';
// import React, { useRef, WheelEvent } from 'react';
// import { BsStars } from 'react-icons/bs';
// import { FaUser } from 'react-icons/fa';
// import { IoSend } from 'react-icons/io5';
// import { LeftPane } from '../../components/LeftSidePane';


// const ChatTest: React.FC = () => {
//   const scrollContainerRef = useRef<HTMLDivElement>(null);

//   const handleScroll = (event: WheelEvent<HTMLDivElement>) => {
//     event.preventDefault();
//     if (scrollContainerRef.current) {
//       scrollContainerRef.current.scrollLeft += event.deltaY;
//     }
//   };

//   return (

//     <div className="flex overflow-hidden">
//       <div className="flex flex-col border w-[60%] h-screen bg-gray-50">
//         <div
//           ref={scrollContainerRef}
//           onWheel={handleScroll}
//           className="flex h-24 w-full overflow-y-hidden overflow-x-auto whitespace-nowrap no-scrollbar items-center gap-2 p-10 border-b bg-neutral-100"
//         >
//           <div className="flex items-center space-x-2 bg-primary-100 py-2 px-5 rounded-full">
//             <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
//               Murtala Muhammed International Airport (MMIA)
//             </span>
//             <PenLine className="cursor-pointer" size={16} />
//           </div>

//           <div className="flex items-center space-x-2 bg-secondary-100 py-2 px-5 rounded-full">
//             <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
//               Seattle-Tacoma International Airport (SEA)
//             </span>
//             <PenLine className="cursor-pointer" size={16} />
//           </div>

//           <div className="flex items-center space-x-2 bg-neutral-300 py-2 px-5  rounded-full">
//             <span className="text-sm text-neutral rounded-lg max-w-[200px] truncate">
//               04/25/2025
//             </span>
//             <PenLine className="cursor-pointer" size={16} />
//           </div>
//           <div className="flex items-center space-x-2 bg-primary-100 py-2 px-5  rounded-full">
//             <span className=" text-sm text-neutral rounded-lg max-w-[200px] truncate">
//               06/25/2025
//             </span>
//             <PenLine className="cursor-pointer" size={16} />
//           </div>
//           <div className="flex items-center space-x-2 bg-secondary-100 py-2 px-5  rounded-full">
//             <span className=" text-sm text-neutral rounded-lg max-w-[200px] truncate">
//               One way
//             </span>
//             <PenLine className="cursor-pointer" size={16} />
//           </div>
//         </div>

//         <div className="flex flex-col flex-1 bg-gray-50 space-y-4 py-2 px-5 chat  overflow-y-auto">
//           <div className="flex  items-center space-x-2 ">
//             <BsStars className="bg-primary-500 text-white h-10 w-10 rounded-full p-2 text-4xl" />
//             <span className="bg-primary-100 text-neutral p-3 rounded-lg">
//               Hi, Oluwatobi, Where are you flying from?
//             </span>
//           </div>
//           <div className="flex items-end justify-end space-x-2">
//             <FaUser className="bg-white border border-primary-100 text-primary-500 h-10 w-10 rounded-full p-2 text-4xl" />
//             <span className="bg-secondary-100 text-black p-3 rounded-lg">
//               Murtala Muhammed International Airport (MMIA)
//             </span>
//           </div>
//           <div className="flex items-start space-x-2">
//             <BsStars className="bg-primary-500 text-white h-10 w-10 rounded-full p-2 text-4xl" />
//             <span className="bg-primary-100 text-neutral p-3 rounded-lg">
//               What's your Destination?
//             </span>
//           </div>
//           <div className="flex items-end justify-end space-x-2">
//             <FaUser className="bg-white border border-primary-100 text-primary-500 h-10 w-10 rounded-full p-2 text-4xl" />
//             <span className="bg-secondary-100 text-neutral p-3 rounded-lg">
//               Seattle-Tacoma International Airport (SEA)
//             </span>
//           </div>
//           <div className="flex items-start space-x-2">
//             <BsStars className="bg-primary-500 text-white h-10 w-10 rounded-full p-2 text-4xl" />
//             <span className="bg-primary-100 text-neutral p-3 rounded-lg">
//               What's your Departure Date? (MM/DD/YY)
//             </span>
//           </div>
//         </div>
//         <div className="w-full p-2 flex items-center justify-center  bg-white border-t h-30">
//           <div className="items-center max-w-[678px] w-full rounded-2xl py-4 px-8 flex message bg-gray-100">
//             <input
//               type="text"
//               placeholder="Please Enter Your Message"
//               className="text-xl flex-grow bg-transparent border-0  rounded-lg outline-0"
//             />
//             <IoSend className="cursor-pointer text-neutral-400" size={24} />
//           </div>
//         </div>
//       </div>

//       <LeftPane
//         departure="Ikeja, Murtala Muhammed International Airport (MMIA)"
//         destination="Seattle-Tacoma International Airport (SEA)"
//         departureDate="04/25/2025"
//         returnDate="06/25/2025"
//         travelRoute="Multi-city"
//         flightClass="Economy"
//       />
//     </div>

//   );
// };

// export default ChatTest