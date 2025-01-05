import React from "react";
import TopCategories from "@/components/TopCategory";
import LastHome from "@/components/LastHome";
import ChairGallery from "@/components/ChairGallery";
import FurnitureCollection from "@/components/Hero-section";
import Logos from "@/components/logos";
import FeaturedProductComponent from "@/components/FeaturedProductComponent";

// FeaturedProductComponent to render the list of featured products
const Page= () => {

  return (
    <div className="mt-8">
         <FurnitureCollection/>
        <Logos/>
     <FeaturedProductComponent/>
       <TopCategories/>
<ChairGallery/> 
     <LastHome/>
    </div>
  );
};


export default Page