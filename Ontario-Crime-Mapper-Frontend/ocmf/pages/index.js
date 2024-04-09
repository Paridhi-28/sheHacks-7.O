import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import SneakPeak from "../Components/Sneak_Peak/SneakPeak";
import App_Overview from "../Components/Opening_Sections/App_Overview/App_Overview";
import OpeningSection from "../Components/Opening_Sections/OpeningSection";

export default function Home() {
  return (
    <>
      <Header />
      <OpeningSection />
      <App_Overview />
      <SneakPeak />
      <Footer />
    </>
  );
}
