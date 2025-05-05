import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center mb-10">
      <div className="text-xl font-bold">MySite</div>
      <ul className="flex space-x-6 items-center">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Services</a></li>
        <li ><button className='bg-red-400 py-2 px-4 rounded'>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;