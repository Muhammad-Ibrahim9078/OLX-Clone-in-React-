import logo from "../assets/olx-logo.png";
import AddItem from "./AddItem";



function Header() {
  return (
<header className="bg-blue-100 shadow-md">

<section className=" flex justify-between p-[20px] flex-wrap">
   
    <img src={logo} alt="Olx" className="h-12 cursor-pointer" />


<div>
 <AddItem />
</div>
  
</section>
   
 

   {/* Search Bar */}
   <section className="flex justify-center p-[15px]">

    <div className="flex items-center w-full md:w-1/2 bg-white rounded-lg shadow-inner px-3">
      <input
        type="text"
        placeholder="Search item"
        className="w-full h-[55px] bg-transparent outline-none p-2 text-gray-700"
        />
      <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
        Search
      </button>
    </div>
        </section>
 
<br /> 

</header>

  

  )
}

export default Header
