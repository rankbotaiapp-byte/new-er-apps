import React, { useState } from 'react';
import AdminMenuEditor from '../components/AdminMenuEditor';
import MobileLocationTracker from '../components/MobileLocationTracker';
import StaffSkillManager from '../components/StaffSkillManager';
import BookingsInbox from '../components/BookingsInbox';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">⚙️ Owner Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}
          >
            📥 Live Orders & Bookings
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'menu' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}
          >
            🍔 Daily Menu / Catalog
          </button>
          <button 
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'location' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}
          >
            📍 Mobile Route Tracker
          </button>
          <button 
            onClick={() => setActiveTab('staff')}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${activeTab === 'staff' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 shadow-sm'}`}
          >
            ✂️ Staff & Skills Matrix
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="bg-transparent">
          {activeTab === 'bookings' && <BookingsInbox />}
          {activeTab === 'menu' && <AdminMenuEditor />}
          {activeTab === 'location' && <MobileLocationTracker />}
          {activeTab === 'staff' && <StaffSkillManager />}
        </div>
      </div>
    </div>
  );
}
