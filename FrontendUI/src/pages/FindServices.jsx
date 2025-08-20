// import React from 'react'

// function FindServices() {
//   return (
//     <div>Find-services</div>
//   )
// }

// export default FindServices

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

const FindServices = () => {
  const { user } = useAuth();
  const [providers, setProviders] = useState([]);
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();

  const professions = ["All", "Electrician", "Plumber", "Painter", "Cook", "Driver", "Cleaner", "Gardener", "Tutor"];

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    try {
      setLoading(true);
      const data = await api.providers.getAll();
      setProviders(data);
      setFilteredProviders(data);
    } catch (error) {
      console.error("Error fetching providers:", error);
      setError("Failed to load service providers. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let data = [...providers];

    if (selectedProfession && selectedProfession !== "All") {
      data = data.filter((p) => p.service_type === selectedProfession);
    }

    if (searchTerm.trim() !== "") {
      data = data.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by availability first, then by name
    data.sort((a, b) => {
      if (a.is_available !== b.is_available) {
        return b.is_available - a.is_available; // Available first
      }
      return a.name.localeCompare(b.name);
    });
    
    setFilteredProviders(data);
  }, [selectedProfession, maxDistance, searchTerm, providers]);

  const handleBookNow = (provider) => {
    if (!user) {
      navigate('/SignIn');
      return;
    }
    
    if (user.user_type !== 'customer') {
      alert('Only customers can book services. Please login with a customer account.');
      return;
    }
    
    setSelectedProvider(provider);
    setShowBookingModal(true);
  };

  const handleBookingCreated = () => {
    alert('Booking created successfully! The provider will contact you soon.');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-200 border-solid rounded-full border-t-blue-500 animate-spin"></div>
          <p className="text-gray-600">Loading service providers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl px-4 py-10 mx-auto text-center">
        <div className="p-6 text-red-700 bg-red-100 border border-red-400 rounded-lg">
          <h2 className="mb-2 text-xl font-semibold">Error Loading Services</h2>
          <p>{error}</p>
          <button
            onClick={fetchProviders}
            className="px-4 py-2 mt-4 font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Find Services Near You</h1>

      {/* Search Bar at Top */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a service provider..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters Below Search */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Profession Filter */}
        <div>
          <label className="block mb-2 font-semibold">Select Service</label>
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {professions.map((prof, index) => (
              <option key={index} value={prof}>
                {prof}
              </option>
            ))}
          </select>
        </div>

        {/* Distance Slider */}
        <div>
          <label className="block mb-2 font-semibold">
            Max Distance: {maxDistance} km
          </label>
          <input
            type="range"
            min="1"
            max="20"
            value={maxDistance}
            onChange={(e) => setMaxDistance(Number(e.target.value))}
            className="w-40"
          />
        </div>
      </div>

      {/* Map */}
      <div className="mb-8">
        <iframe
          title="Nearby Map"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d241317.11609725545!2d72.74109805!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1695631967060!5m2!1sen!2sin"
          width="100%"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className="rounded-lg shadow-md"
        ></iframe>
      </div>

      {/* Service Provider Cards */}
      <h2 className="mb-4 text-2xl font-semibold">
        Available Service Providers ({filteredProviders.length})
      </h2>
      
      {filteredProviders.length === 0 ? (
        <div className="p-8 text-center">
          {providers.length === 0 ? (
            <div>
              <p className="text-gray-500 mb-4">No service providers registered yet.</p>
              <button
                onClick={() => navigate("/SignIn")}
                className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Register as Service Provider
              </button>
            </div>
          ) : (
            <p className="text-gray-500">No service providers found for the selected filters.</p>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className={`p-6 transition bg-white shadow rounded-xl hover:shadow-lg border-l-4 ${
                provider.is_available ? 'border-green-500' : 'border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-semibold">{provider.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  provider.is_available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {provider.is_available ? 'Available' : 'Busy'}
                </span>
              </div>
              
              <p className="text-blue-600 font-medium mb-2">{provider.service_type}</p>
              <p className="text-gray-600 mb-2">📍 {provider.location}</p>
              <p className="text-gray-600 mb-2">📞 {provider.phone}</p>
              
              {provider.hourly_rate && (
                <p className="text-gray-800 font-semibold mb-2">
                  ₹{provider.hourly_rate}/hour
                </p>
              )}
              
              {provider.bio && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{provider.bio}</p>
              )}
              
              <button
                onClick={() => handleBookNow(provider)}
                disabled={!provider.is_available}
                className={`w-full px-4 py-2 mt-3 text-white transition rounded-lg ${
                  provider.is_available
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                {provider.is_available ? 'Book Now' : 'Currently Busy'}
              </button>
            </div>
          ))}
        </div>
      )}
      
      {/* Booking Modal */}
      {selectedProvider && (
        <BookingModal
          provider={selectedProvider}
          isOpen={showBookingModal}
          onClose={() => {
            setShowBookingModal(false);
            setSelectedProvider(null);
          }}
          onBookingCreated={handleBookingCreated}
        />
      )}
    </div>
  );
};

export default FindServices;
