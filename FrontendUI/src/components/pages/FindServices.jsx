// import React from 'react'

// function FindServices() {
//   return (
//     <div>Find-services</div>
//   )
// }

// export default FindServices

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FindServices = () => {
  const [workers] = useState([
    { id: 1, name: "Ravi Kumar", workType: "Electrician", distance: 2, location: "Bangalore", updatedAt: "2025-08-10" },
    { id: 2, name: "Anita Sharma", workType: "Plumber", distance: 5, location: "Bangalore", updatedAt: "2025-08-09" },
    { id: 3, name: "Suresh Patel", workType: "Painter", distance: 1, location: "Bangalore", updatedAt: "2025-08-11" },
    { id: 4, name: "Meena Rao", workType: "Carpenter", distance: 3, location: "Bangalore", updatedAt: "2025-08-08" },
    { id: 5, name: "Kiran Reddy", workType: "Electrician", distance: 8, location: "Bangalore", updatedAt: "2025-08-07" },
  ]);
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const professions = ["All", ...new Set(workers.map((w) => w.workType))];

  useEffect(() => {
    let data = [...workers];

    if (selectedProfession && selectedProfession !== "All") {
      data = data.filter((w) => w.workType === selectedProfession);
    }

    data = data.filter((w) => w.distance <= maxDistance);

    if (searchTerm.trim() !== "") {
      data = data.filter((w) =>
        w.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    data.sort((a, b) => a.distance - b.distance);
    setFilteredWorkers(data);
  }, [selectedProfession, maxDistance, searchTerm, workers]);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-center">Find Services Near You</h1>

      {/* Search Bar at Top */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a worker..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-xl p-3 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Filters Below Search */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        {/* Profession Filter */}
        <div>
          <label className="block mb-2 font-semibold">Select Profession</label>
          <select
            value={selectedProfession}
            onChange={(e) => setSelectedProfession(e.target.value)}
            className="p-2 border rounded-lg"
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
        ></iframe>
      </div>

      {/* Worker Cards */}
      <h2 className="mb-4 text-2xl font-semibold">Available Workers</h2>
      {filteredWorkers.length === 0 ? (
        <p className="text-gray-500">No workers found for the selected filters.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold">{worker.name}</h3>
              <p className="text-gray-600">{worker.workType}</p>
              <p className="text-gray-500">📍 {worker.location}</p>
              <p className="text-gray-500">Distance: {worker.distance} km</p>
              <p className="text-sm text-gray-400">
                Last Updated: {worker.updatedAt}
              </p>
              <button
                onClick={() => navigate("/register/customer")}
                className="px-4 py-2 mt-3 text-white transition bg-blue-600 shadow rounded-xl hover:bg-blue-700"
              >
                Book now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FindServices;
