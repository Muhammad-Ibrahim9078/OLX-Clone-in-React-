import Header from "../components/Header"
import banner from '../assets/banner for cover.JPG'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import CardsSlider from "../components/CardsSlider"

function Dashboard() {
  return (
    <div>
      <div>
        <Header />
        <Navbar />
      </div>



      <main className="mt-[50px]">
<div className="hidden md:flex items-center justify-center relative w-[97%] h-[500px] rounded-xl overflow-hidden">
  {/* Background Image */}
  <img 
    src={banner} 
    alt="Banner" 
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Text Overlay */} 
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4" >
    <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
      This is OLX Clone Website
    </h1>
    <p className="text-white text-lg text-center">
      Developed by Muhammad Ibrahim
    </p>
  </div>
</div>



        <section>
          <CardsSlider />
        </section>


      </main>



<Footer />
        
    </div>
  )
}

export default Dashboard
