import React, { useState } from 'react';
import Header from '../Header';
import ContactPage from "../Home/Components/ContactPage"
import Footer from '../Footer';
export default function Contact() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 ">
      <Header />
      <div className='py-6 '>
        <ContactPage />
      </div>
      <Footer />
    </div>
  );
}