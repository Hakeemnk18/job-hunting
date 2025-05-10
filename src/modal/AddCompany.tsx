
'use client'

import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AddCompanyModal = ({ isOpen, onClose }: Props) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [error,setError] = useState({
    name: '',
    type: '',
    logo: ''
  })

  const validate=()=>{
    let isValid = true
    const newError = {
      name: '',
      type: '',
      logo: ''
    }
    if(name.trim() === ''){
      newError.name = 'name is required'
      isValid = false
    }

    if(type.trim() === ''){
      newError.type = 'choose a type'
      isValid = false
    }
    setError(newError)
    return isValid
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("inside submit")
    if(!validate()){
      console.log("error in form inside ")
      console.log(error)
      
      return null
    }

    // image upload
    // if (logo){
    //   const formData = new FormData();
    //   formData.append('logo', logo);
    //   try {
    //     // Send the file to the backend using fetch
    //     const res = await fetch('/api/upload', {
    //       method: 'POST',
    //       body: formData,
    //     });
    
    //     // Parse the response data
    //     const data = await res.json();
    
    //     if (res.ok) {
    //       // If the upload is successful, log the success and image path
    //       console.log("Image uploaded successfully");
    //       console.log("Image path: ", data?.path);
    
    //       // You can save the path in your state or MongoDB as needed
    //     } else {
    //       // Handle errors if the upload fails
    //       console.error('Upload failed:', data?.error);
    //       toast.error(data?.error || "Something went wrong");
    //       return null;
    //     }
    //   } catch (error) {
    //     // Catch any other errors such as network issues
    //     console.error("Error during image upload:", error);
    //     toast.error("Error during upload");
    //   }

    // } 

    

    const res = await fetch('/api/companies', {
      method: 'POST',
      body: JSON.stringify({ type, name }), 
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(data.message)
      onClose();
      setName('');
      setType('');
      setLogo(null);
    } else {
      toast.error(data.message)
      console.log(data);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-96 relative shadow-xl">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl">&times;</button>
        <h2 className="text-xl font-semibold mb-4">Add Company</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className='mb-4'>
          <input
            type="text"
            placeholder="Company Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
            className="w-full border px-3 py-2 rounded mb-0"
          />
          { error.name && <span className='text-red-500 '>{error.name}</span>}
          
          </div>
          
          <div className='mb-4'>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Type</option>
            <option value="Tech">Tech</option>
            <option value="Finance">Finance</option>
            <option value="Retail">Retail</option>
          </select>
          { error.type && <span className='text-red-500 '>{error.type}</span>}
          </div>
          
          <div className="w-full">
            <label
              htmlFor="logo-upload"
              className="block cursor-pointer bg-blue-100 text-black py-2 px-4 rounded text-center hover:bg-blue-600"
            >
              Upload Logo
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/*"
              onChange={(e) => setLogo(e.target.files?.[0] || null)}
              
              className="hidden"
            />
            
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
