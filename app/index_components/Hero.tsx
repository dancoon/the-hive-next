import React from "react";
import { lusitana } from "../fonts";
import { PropertySearch } from "./PropertySearch";
import Image from "next/image";
import bg from "@/public/index_bg.jpg";

const Hero = () => {
  return (
    <section className="p-10 flex flex-col relative min-h-[80vh]">
      <div className="grow hidden lg:block ml-[40%] pr-20 absolute justify-center items-center">
        <div className="bg-gradient-to-tr from-green-800 to-red-900 transform skew-x-12 overflow-hidden">
          <Image
            src={bg}
            alt="Home"
            className="object-cover bg-blend-overlay"
          />
        </div>
      </div>
      <div className="w-[90%] lg:w-8/12 xl:w-7/12 min-w-[400px] items-center  z-10">
        <h1
          className={`text-5xl ${lusitana.className} mb-10 font-bold w-full md:w-[50%]`}
        >
          We will find a perfect property for you
        </h1>
        <p className="mb-10  w-full md:w-[60%]">
          Find a variety of properties that suit you very easily, forget all
          difficulties in finding a residence for you
        </p>
        <PropertySearch />
      </div>
    </section>
  );
};

export default Hero;
