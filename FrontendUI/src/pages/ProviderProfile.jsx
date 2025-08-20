// import React, { useState } from "react";

// function ProviderProfile({ onSubmit }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     profession: "",
//     location: "",
//     profileImage: null,
//   });

//   const [imagePreview, setImagePreview] = useState(null);

//   // Handle text input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         profileImage: file,
//       });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   // Submit form
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare form data for backend
//     const dataToSend = new FormData();
//     Object.keys(formData).forEach((key) => {
//       dataToSend.append(key, formData[key]);
//     });

//     console.log("Provider Basic Info:", formData);

//     if (onSubmit) {
//       onSubmit(formData); // Send data to parent or backend
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Add Provider</h2>
//       <form style={styles.form} onSubmit={handleSubmit}>
        
//         {/* Profile Picture Upload */}
//         <div style={styles.imageUpload}>
//           {imagePreview ? (
//             <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
//           ) : (
//             <div style={styles.imagePlaceholder}>No Image</div>
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             style={styles.fileInput}
//           />
//         </div>

//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         />
//         <input
//           type="tel"
//           name="phone"
//           placeholder="Phone Number"
//           value={formData.phone}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         />
//         <input
//           type="text"
//           name="profession"
//           placeholder="Profession"
//           value={formData.profession}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         />
//         <input
//           type="text"
//           name="location"
//           placeholder="Location / City"
//           value={formData.location}
//           onChange={handleChange}
//           style={styles.input}
//           required
//         />

//         <button type="submit" style={styles.button}>
//           Add Provider
//         </button>
//       </form>
//     </div>
//   );
// }

// // Styles
// const styles = {
//   container: {
//     maxWidth: "400px",
//     margin: "40px auto",
//     padding: "20px",
//     border: "1px solid #ddd",
//     borderRadius: "10px",
//     background: "#fff",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   },
//   title: {
//     textAlign: "center",
//     marginBottom: "20px",
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//   },
//   imageUpload: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginBottom: "15px",
//   },
//   imagePreview: {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     marginBottom: "8px",
//     border: "2px solid #ccc",
//   },
//   imagePlaceholder: {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     background: "#eee",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: "8px",
//     fontSize: "12px",
//     color: "#777",
//   },
//   fileInput: {
//     fontSize: "12px",
//   },
//   input: {
//     marginBottom: "12px",
//     padding: "10px",
//     fontSize: "14px",
//     border: "1px solid #ccc",
//     borderRadius: "5px",
//   },
//   button: {
//     background: "#4CAF50",
//     color: "#fff",
//     padding: "10px",
//     fontSize: "16px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default ProviderProfile;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext to get the logged-in user

const ProviderProfile = () => {
    // In a real app, you'd get the user's ID from your authentication context
    const { user } = useAuth(); 
    const [provider, setProvider] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    // This function fetches the provider's current data from the backend
    const fetchProviderData = async () => {
        // This assumes your useAuth() hook provides the logged-in user's ID
        if (!user || !user.id) {
            setError("You must be logged in to view this page.");
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3001/api/providers/${user.id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch provider data.');
            }
            const data = await response.json();
            setProvider(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch data when the component loads
    useEffect(() => {
        fetchProviderData();
    }, [user]);

    // This function is called when the provider clicks the availability button
    const handleAvailabilityToggle = async () => {
        if (!provider) return;

        const newAvailability = !provider.is_available;

        try {
            const response = await fetch(`http://localhost:3001/api/providers/${user.id}/availability`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_available: newAvailability })
            });

            if (!response.ok) {
                throw new Error('Failed to update status.');
            }

            // Update the local state to immediately reflect the change on the screen
            setProvider({ ...provider, is_available: newAvailability });

        } catch (err) {
            setError('Could not update availability. Please try again.');
        }
    };

    if (isLoading) {
        return <div className="p-10 text-center">Loading your profile...</div>;
    }

    if (error) {
        return <div className="p-10 text-center text-red-500">{error}</div>;
    }

    if (!provider) {
        return <div className="p-10 text-center">Could not find your provider profile.</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                <h2 className="mb-4 text-3xl font-bold text-center text-gray-800">Your Provider Profile</h2>
                <div className="space-y-4">
                    <p><strong>Name:</strong> {provider.name}</p>
                    <p><strong>Service:</strong> {provider.service_type}</p>
                    <p><strong>Location:</strong> {provider.location}</p>
                    <p><strong>Hourly Rate:</strong> ₹{provider.hourly_rate}</p>
                    <p><strong>Bio:</strong> {provider.bio}</p>
                    <div className="flex items-center">
                        <p className="mr-4"><strong>Current Status:</strong></p>
                        <span className={`px-4 py-1 rounded-full text-white ${provider.is_available ? 'bg-green-500' : 'bg-red-500'}`}>
                            {provider.is_available ? 'Available for Hire' : 'Not Available'}
                        </span>
                    </div>
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleAvailabilityToggle}
                        className={`w-full py-3 rounded-md text-white font-semibold transition ${provider.is_available ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                    >
                        {provider.is_available ? 'Set to Not Available' : 'Set to Available'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
