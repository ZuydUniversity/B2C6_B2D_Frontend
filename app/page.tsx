'use client'
import React, { useEffect, useState } from "react";
import api from "./api";
import DateTimePicker from 'react-datetime-picker';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format } from 'date-fns';

const Home = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    department: "",
    date: new Date()
  });
  const [editData, setEditData] = useState<any | null>(null);
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false);
  const [isEditDateTimePickerOpen, setIsEditDateTimePickerOpen] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments/");
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
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
    } catch (error) {
      console.error("Failed to create appointment:", error);
    }
  };

  const handleEditClick = (appointment: any) => {
    setEditData({
      id: appointment.id,
      name: appointment.name,
      description: appointment.description,
      location: appointment.location,
      department: appointment.department,
      date: new Date(appointment.date)
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/appointments/${id}`);
      const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Failed to delete appointment:", error);
    }
  };

  const handleUpdateInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setEditData({
      ...editData,
      [event.target.name]: value,
    });
  };

  const handleUpdateSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editData) {
      try {
        const response = await api.put(`/appointments/${editData.id}`, editData);
        console.log("Update response:", response);
        const getResponse = await api.get("/appointments/");
        setAppointments(getResponse.data);
        setEditData(null);
      } catch (error) {
        console.error("Failed to update appointment:", error);
      }
    }
  };

  const handleDateChange = (date: Date | null) => {
    setFormData({ ...formData, date: date || new Date() });
    setIsDateTimePickerOpen(false);
  };

  const handleEditDateChange = (date: Date | null) => {
    if (editData) {
      setEditData({ ...editData, date: date || new Date() });
      setIsEditDateTimePickerOpen(false);
    }
  };

  const handleEventClick = (eventInfo: any) => {
    console.log('Event clicked:', eventInfo);
  };

  return (
    <main className="flex min-h-screen flex-row items-start justify-between p-100 bg-gray-50">
      <div className="flex flex-col w-[300px] min-w-[300px] border-r min-h-screen p-4 bg-blue-100 p-30">
        <h1>Afspraak toevoegen</h1>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor='name' className='block text-gray-700 text-sm font-bold mb-2'>
              Name
            </label>
            <input
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='name'
              name='name'
              onChange={handleInputChange}
              value={formData.name}
            />
          </div>
          <div className="mb-4">
            <label htmlFor='description' className='block text-gray-700 text-sm font-bold mb-2'>
              Description
            </label>
            <input
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='description'
              name='description'
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
          <div className="mb-4">
            <label htmlFor='location' className='block text-gray-700 text-sm font-bold mb-2'>
              Location
            </label>
            <input
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='location'
              name='location'
              onChange={handleInputChange}
              value={formData.location}
            />
          </div>
          <div className="mb-4">
            <label htmlFor='department' className='block text-gray-700 text-sm font-bold mb-2'>
              Department
            </label>
            <input
              type='text'
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='department'
              name='department'
              onChange={handleInputChange}
              value={formData.department}
            />
          </div>
          <div className="mb-4">
            <label htmlFor='date' className='block text-gray-700 text-sm font-bold mb-2'>
              Date
            </label>
            <div className='relative'>
              <input
                type='text'
                readOnly
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={formData.date.toLocaleString()}
                onClick={() => setIsDateTimePickerOpen(true)}
              />
              {isDateTimePickerOpen && (
                <div className='absolute z-10'>
                  <DateTimePicker
                    onChange={handleDateChange}
                    value={formData.date}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end">
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Create</button>
          </div>
        </form>
      </div>
      
      <div className="flex flex-col w-full max-w-5xl">
        <div className="flex justify-center mb-10">
          <h1 className="text-4xl font-bold">Kalender</h1>
        </div>
        
        <div className="col-span-1 mb-10">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={appointments.map(appointment => ({
              title: appointment.name,
              start: format(new Date(appointment.date), "yyyy-MM-dd"),
              id: appointment.id
            }))}
            eventClick={handleEventClick}
          />
        </div>
        
        <div className="col-span-1">
          <table className='min-w-full leading-normal shadow rounded-lg overflow-hidden'>
            <thead>
              <tr>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Name</th>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Description</th>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Location</th>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Department</th>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Date</th>
                <th className='px-5 py-3 bg-gray-200 text-gray-600 text-left text-sm uppercase font-bold'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className='bg-white border-b'>
                  <td className='px-5 py-5 border-gray-200 text-sm'>{appointment.name}</td>
                  <td className='px-5 py-5 border-gray-200 text-sm'>{appointment.description}</td>
                  <td className='px-5 py-5 border-gray-200 text-sm'>{appointment.location}</td>
                  <td className='px-5 py-5 border-gray-200 text-sm'>{appointment.department}</td>
                  <td className='px-5 py-5 border-gray-200 text-sm'>{format(new Date(appointment.date), 'yyyy-MM-dd HH:mm')}</td>
                  <td className='px-5 py-5 border-gray-200 text-sm'>
                    <button onClick={() => handleEditClick(appointment)} className='bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2'>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(appointment.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editData && (
          <form onSubmit={handleUpdateSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
            <h3 className="text-lg font-bold mb-4">Update Appointment</h3>
            <div className="mb-4">
              <label htmlFor='editName' className='block text-gray-700 text-sm font-bold mb-2'>
                Name
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='editName'
                name='name'
                onChange={handleUpdateInputChange}
                value={editData.name}
              />
            </div>
            <div className="mb-4">
              <label htmlFor='editDescription' className='block text-gray-700 text-sm font-bold mb-2'>
                Description
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='editDescription'
                name='description'
                onChange={handleUpdateInputChange}
                value={editData.description}
              />
            </div>
            <div className="mb-4">
              <label htmlFor='editLocation' className='block text-gray-700 text-sm font-bold mb-2'>
                Location
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='editLocation'
                name='location'
                onChange={handleUpdateInputChange}
                value={editData.location}
              />
            </div>
            <div className="mb-4">
              <label htmlFor='editDepartment' className='block text-gray-700 text-sm font-bold mb-2'>
                Department
              </label>
              <input
                type='text'
                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='editDepartment'
                name='department'
                onChange={handleUpdateInputChange}
                value={editData.department}
              />
            </div>
            <div className="mb-4">
              <label htmlFor='editDate' className='block text-gray-700 text-sm font-bold mb-2'>
                Date
              </label>
              <div className='relative'>
                <input
                  type='text'
                  readOnly
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  value={editData.date.toLocaleString()}
                  onClick={() => setIsEditDateTimePickerOpen(true)}
                />
                {isEditDateTimePickerOpen && (
                  <div className='absolute z-10'>
                    <DateTimePicker
                      onChange={handleEditDateChange}
                      value={editData.date}
                      className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    />
                  </div>
                )}
              </div>
            </div>
            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Update</button>
          </form>
        )}
      </div>
      
      <div className="flex flex-col w-[300px] min-w-[300px] border-l min-h-screen p-4 bg-blue-100 p-30">
        <h1>Right Sidebar</h1>
        {}
      </div>
    </main>
  );
}

export default Home;
