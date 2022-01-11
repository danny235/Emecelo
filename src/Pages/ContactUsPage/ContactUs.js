import React, { useEffect } from 'react';
import Banner from '../AboutUsPage/Banner/Banner';
import DailyNeeds from '../SharedComponents/DailyNeeds/DailyNeeds';
import Footer from '../SharedComponents/Footer/Footer';
import TopNavigation from '../SharedComponents/TopNavigation/TopNavigation';

const ContactUs = () => {
  useEffect(() => {
    document.title = 'Contact Us | Kacha Bazar';
  }, []);

  return (
    <>
      <TopNavigation />
      <Banner text='Contact Us' />
      <section></section>
      <DailyNeeds />
      <Footer />
    </>
  );
};

export default ContactUs;
