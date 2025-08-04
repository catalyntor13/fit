import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Testimoniale from "@/components/sections/Testimoniale";
import CTA from "@/components/sections/CTA";


export default function Home() {
  return (
    <div>
     <Header/>
     <Hero/>
     <Features/>
     <Testimoniale/>
     <CTA/>
     <Footer/>
     </div>
  );
}
