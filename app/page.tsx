'use client'
import React, { useEffect } from "react";
import api from "./api";
import Image from 'next/image'; // Import Image from next/image
import DateTimePicker from 'react-datetime-picker';

// Custom hook to ensure component runs only on the client side
const useClient = (effect:() => void) => {
  useEffect(() => {
    effect();
  }, []);
};

const Home = () => {
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    location: "",
    department: "",
    date: new Date()
  });

  // Run the effect only on the client side
  useClient(() => {
    const fetchAppointment = async () => {
      const response = await api.get("/appointments/");
      setAppointments(response.data);
    };

    fetchAppointment();
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await api.post("/appointments/", formData);
    const response = await api.get("/appointments/");
    setAppointments(response.data);
    setFormData({
      name: "",
      description: "",
      location: "",
      department: "",
      date: new Date()
    });
  };



  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
  
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
  
      <div>
        <form onSubmit={handleFormSubmit}>
          <div className='mb-3 mt-3'>
            <label htmlFor='name' className='form-label mb-1'>
              Name 
            </label>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
  
          <div className='mb-3'>
            <label htmlFor='description' className='form-label mb-1'>
              Description 
            </label>
            <input
              type='text'
              className='form-control'
              id='description'
              name='description'
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
  
          <div className='mb-3'>
            <label htmlFor='location' className='form-label mb-1'>
              Location 
            </label>
            <input
              type='text'
              className='form-control'
              id='location'
              name='location'
              onChange={handleInputChange}
              value={formData.location}
            />
          </div>
  
          <div className='mb-3'>
            <label htmlFor='department' className='form-label mb-1'>
              Department 
            </label>
            <input
              type='text'
              className='form-control'
              id='department'
              name='department'
              onChange={handleInputChange}
              value={formData.department}
            />
          </div>
  
          <div className='mb-3'>
            <label htmlFor='date' className='form-label mb-1'>
              Date 
            </label>
            <DateTimePicker
              onChange={(value) => setFormData({ ...formData, date: value || new Date() })}
              value={formData.date}
              className='form-control'
            />
          </div>
  
          <button type='submit' className='btn btn-primary'>Create</button>
        </form>
        <table className ='table table-striped table-bordered table-hover'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Department</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>{appointment.name}</td>
                <td>{appointment.description}</td>
                <td>{appointment.location}</td>
                <td>{appointment.department}</td>
                <td>{appointment.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </div>
    </main>
  );
}
export default Home;
