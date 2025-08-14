import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';

function ProviderProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({
    service_type: '',
    location: '',
    hourly_rate: '',
    bio: '',
    experience: '',
    is_available: true,
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const profile = await api.providers.getProfile();
        if (profile) {
          setForm({
            service_type: profile.service_type || '',
            location: profile.location || '',
            hourly_rate: profile.hourly_rate ?? '',
            bio: profile.bio || '',
            experience: profile.experience ?? '',
            is_available: profile.is_available === 1 || profile.is_available === true,
          });
        }
      } catch (e) {
        // If not found, allow creating a new profile
        setError('');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    try {
      const payload = {
        service_type: form.service_type,
        location: form.location,
        hourly_rate: form.hourly_rate ? Number(form.hourly_rate) : null,
        bio: form.bio,
        // server expects is_available (boolean-ish), not availability string
        is_available: form.is_available ? 1 : 0,
      };
      await api.providers.createProfile(payload);
      setSuccess('Profile saved');
    } catch (e) {
      setError(e.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.user_type !== 'provider') {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="p-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded">
          You must be logged in as a provider to view this page.
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-3 border-4 border-purple-200 border-solid rounded-full border-t-purple-600 animate-spin"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Provider Profile</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <input
            name="service_type"
            value={form.service_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="e.g., Electrician"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="City, State"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate (₹)</label>
          <input
            type="number"
            name="hourly_rate"
            value={form.hourly_rate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min="0"
            step="50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={4}
            placeholder="Describe your services and experience"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="is_available"
            type="checkbox"
            name="is_available"
            checked={form.is_available}
            onChange={handleChange}
          />
          <label htmlFor="is_available" className="text-sm text-gray-700">Available for new bookings</label>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
}

export default ProviderProfile;