import { IoIosArrowRoundForward } from "react-icons/io";

const FurnitureCollection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-between rounded-b-md mt-12 h-auto  bg-[#F0F2F3] p-6 md:p-8">
      {/* Left Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start space-y-6 text-center md:text-left">
        <p className="text-gray-600 font-thin text-sm md:text-base">
          WELCOME TO CHAIRY
        </p>
        <h1 className="text-2xl md:text-5xl font-bold leading-relaxed">
          Best Furniture <br /> Collection For Your <br /> Interior.
        </h1>
        <button className="flex items-center bg-[#029FAE] text-white px-8 py-3 rounded-lg hover:bg-[#027a86] transition duration-300 shadow-lg">
          Shop Now
          <IoIosArrowRoundForward className="ml-2" size={24} />
        </button>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/3 flex justify-center items-center mt-8 md:mt-0">
        <img
          src="/hero.jpg"
          alt="Furniture Collection"
          className="w-full  rounded-lg  object-center"
        />
      </div>
    </div>
  );
};

export default FurnitureCollection;
