import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import TodaysSpecial from '../components/home/TodaysSpecial';
import BestSellers from '../components/home/BestSellers';
import AboutCafe from '../components/home/AboutCafe';
import Gallery from '../components/home/Gallery';
import Contact from '../components/home/Contact';
import Footer from '../components/Footer';

const Home = () => {
    return (
        <div className="bg-pizza-black min-h-screen text-white font-body">
            <Navbar />
            <Hero />
            <Categories />
            {/* <TodaysSpecial /> */}
            <BestSellers />
            <AboutCafe />
            <Gallery />
            <Contact />
            <Footer />
        </div>
    );
};

export default Home;
