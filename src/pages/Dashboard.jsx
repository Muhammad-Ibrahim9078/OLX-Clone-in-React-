import Header from "../components/Header";
import banner from "../assets/banner for cover.JPG";
import mobilebanner from "../assets/mobile-banner.JPG";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VehcileCardsSlider from "../components/VehcileCardsSlider";
import PropertiesCardsSlider from "../components/PropertiesCardsSlider";
import MobilesCardsSlider from "../components/MobilesCardsSlider";

function Dashboard() {
  return (
    <div>
      <div>
        <Header />
        <Navbar />
      </div>

      <main className="mt-[50px] p-[15px]">

        {/* ✅ Desktop / Tablet Banner */}
        <div className="hidden md:flex items-center justify-center relative w-[97%] h-[500px] rounded-xl overflow-hidden">
          <img 
            src={banner} 
            alt="Banner" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
              This is OLX Clone Website
            </h1>
            <p className="text-lg text-center rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
              Developed by Muhammad Ibrahim
            </p>
          </div>
        </div>

        {/* ✅ Mobile Banner (Only visible on small screens) */}
        <div className="flex md:hidden items-center justify-center relative w-full h-[250px] rounded-xl overflow-hidden mt-3">
          <img 
            src={mobilebanner} 
            alt="Mobile Banner" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-2">
            <h1 className="text-2xl font-bold text-center drop-shadow-md rounded"  style={{ backgroundColor: "rgba(255, 255, 255, 0.7)"}}
>
              OLX Clone Website
            </h1>
            <p className=" text-sm text-center drop-shadow-md rounded" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)"}}>
              By Muhammad Ibrahim
            </p>
          </div>
        </div>

        {/* ✅ Sliders */}
        <section className="mt-6">
          <VehcileCardsSlider />
        </section>
        <section>
          <PropertiesCardsSlider />
        </section>
        <section>
          <MobilesCardsSlider />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Dashboard;
