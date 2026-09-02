import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import Services from "@/components/sections/Services";
import Why from "@/components/sections/Why";
import Results from "@/components/sections/Results";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import FinalCta from "@/components/sections/FinalCta";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Services />
      <Why />
      <Results />
      <About />
      <Process />
      <FinalCta />
      <Contact />
    </>
  );
}
