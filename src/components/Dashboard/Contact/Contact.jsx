import React, { useEffect, useState } from 'react';
import { FilePlus, X } from 'lucide-react';
import PageManagement from '../../../hooks/management';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const Contact = () => {
  const { getContacts } = PageManagement();
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(false);


  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      try {
        const data = await getContacts();
        setContactData(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load contact data');
        setContactData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);


  return (
    <div className="px-4 py-6 sm:px-8">
      <div className="p-4 bg-white rounded-xl shadow sm:p-6">
        {/* Header */}
        <div className="flex flex-col justify-between items-start mb-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-[#252B42] sm:text-2xl">Contact Page Management</h2>
          
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-green-50 rounded overflow-hidden">
            <thead className="bg-[#10172B] text-white font-medium text-sm sm:text-base text-left">
              <tr>
                <th className="px-2 py-2 sm:px-4">First Name</th>
                <th className="px-2 py-2 sm:px-4">Last Name</th>
                <th className="px-2 py-2 sm:px-4">Email</th>
                <th className="px-2 py-2 sm:px-4">Phone Number</th>
                <th className="px-2 py-2 sm:px-4">Subject</th>
                <th className="px-2 py-2 sm:px-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">Loading...</td>
                </tr>
              ) : contactData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">No contacts found</td>
                </tr>
              ) : (
                contactData.map((item) => (
                  <tr key={item.id || `contact-${Math.random()}`} className="border-b">
                    <td className="px-2 py-2 sm:px-4">{item.firstname || 'N/A'}</td>
                    <td className="px-2 py-2 sm:px-4">{item.lastname || 'N/A'}</td>
                    <td className="px-2 py-2 sm:px-4">{item.email || 'N/A'}</td>
                    <td className="px-2 py-2 sm:px-4">{item.phone_number || 'N/A'}</td>
                    <td className="px-2 py-2 sm:px-4">{item.subject || 'N/A'}</td>
                    <td className="px-2 py-2 sm:px-4">
                      {item.message
                        ? item.message.length > 50
                          ? `${item.message.substring(0, 50)}...`
                          : item.message
                        : 'No message'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

   
      </div>
    </div>
  );
};

export default Contact;
