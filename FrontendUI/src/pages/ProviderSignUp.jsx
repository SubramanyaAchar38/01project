import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const ProviderSignUp = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from your context
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        location: '',
        service_type: 'Electrician',
        hourly_rate: '',
        bio: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Step 1: Register the provider
            const response = await fetch('http://localhost:3001/api/auth/register-provider', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to register');
            }

            // Step 2: Log the new user in to get a token
            await login(formData.email, formData.password);

            // --- THIS IS THE FIX ---
            // Step 3: Navigate to the Find Services page
            navigate('/FindServices');

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const serviceTypes = ['Electrician', 'Plumber', 'Painter', 'Cook', 'Tutor', 'Driver', 'Cleaner', 'Gardener'];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-800">Become a Service Provider</h2>
                <p className="text-center text-gray-500">Fill out the details below to start offering your services.</p>
                
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Form Fields */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Full Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location (e.g., City, State)</label>
                        <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Service You Offer</label>
                        <select name="service_type" value={formData.service_type} onChange={handleChange} className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500">
                            {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hourly Rate (₹)</label>
                        <input type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange} required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Short Bio (Tell customers about yourself)</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" required className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"></textarea>
                    </div>

                    {error && <p className="text-sm text-red-500 md:col-span-2">{error}</p>}

                    <div className="md:col-span-2">
                        <button type="submit" disabled={loading} className="w-full px-4 py-3 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400">
                            {loading ? 'Registering...' : 'Register as Provider'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProviderSignUp;
