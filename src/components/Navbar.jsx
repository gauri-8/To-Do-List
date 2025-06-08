import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-800 text-white py-2'>
    <div className="logo">
      <span className='font-bold text-xl'>tick</span><span className='text-[rgb(110,237,110)] font-bold text-xl'>THE</span><span className='font-bold text-xl '>task</span>
      
    </div>
    <ul className="flex gap-8 mx-18">
      <li className='cursor-pointer hover:font-bold transition-all' >Home</li>
      <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
    </ul>

   </nav>
  
   
  )
}

export default Navbar
