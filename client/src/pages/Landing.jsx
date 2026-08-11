import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Features from "../components/Features";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="bg-slate-950 min-h-screen">

      <Navbar />

      <Hero />

      <Stats />

      <Features />

      <Footer />

    </div>
  );
}