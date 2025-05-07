'use client';

import { useState, useEffect} from 'react';
import { FaTrash, FaPen } from "react-icons/fa";
import { toast } from 'react-toastify';

type User = {
  id: number;
  name: string;
  type: string;
  avatar?: string;
};

const users: User[] = [

  // Add more users...
];

const PAGE_SIZE = 5;

export default function UserTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  async function getCompanies(){
      const res = await fetch('/api/companies')
      const data = await res.json()
      if(res.ok){
        
        console.log("fetch completed")
        console.log(data)
      }else{
        console.log("fetch incomplete")
        toast.error(data.message || 'server failed failed')
      }

      
  }

  useEffect( ()=>{
    getCompanies()
  })

  const filtered = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  return (
    <div className="p-6 bg-gray-100 rounded shadow max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder=" Search company"
          className="border px-4 py-2 rounded w-full max-w-md"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <div className="flex space-x-2">
          <button className="bg-blue-100 px-4 py-2 rounded text-sm"> Filter</button>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">+ Add Company</button>
        </div>
      </div>

      <table className="w-full table-auto">
        <thead className=" text-left">
          <tr>
            <th className="p-3 font-normal text-gray-600"></th>
            <th className="p-3 font-normal text-gray-600 align-middle">NAME</th>
            <th className="p-3 font-normal text-gray-600">TYPE</th>
            <th className="p-3 font-normal text-gray-600">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {paginated.map((user) => (
            <tr key={user.id} className=" hover:bg-gray-50">
              <td className="">
                <input type="checkbox" />
              </td>

              <td className="p-3 flex items-center gap-3">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    className="w-8 h-8 rounded-full object-cover"
                    alt="avatar"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold">
                    {user.name[0]}
                  </div>
                )}
                <div>
                  <p className="font-medium">{user.name}</p>
                  
                </div>
              </td>
              <td className="p-3">{user.type}</td>
              <td className="p-3">

                <button> <FaTrash /> </button>
                <button className='ml-10'> <FaPen /> </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
