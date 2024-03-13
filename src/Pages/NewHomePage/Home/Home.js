import React from "react";
import Footer from '../../SharedComponents/Footer/Footer';
import NewTopNavigation from '../../SharedComponents/NewTopNavigation/NewTopNavigation';
import FirstSection from "../FirstSection/FirstSection";
import SecondSection from "../SecondSection/SecondSection";
import ThirdSection from "../ThirdSection/ThirdSection";
import FourthSection from "../FourthSection/FourthSection";
import MobileViewNav from "../../SharedComponents/NewTopNavigation/mobileVeiwNav";


const NewHome = () =>{
 return(
   <>
   <NewTopNavigation />
   <MobileViewNav />
   <FirstSection />
   <SecondSection />
    <ThirdSection />
   <FourthSection />
   <Footer />
   </>
 );
};

export  {NewHome}