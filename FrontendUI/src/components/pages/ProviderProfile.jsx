import React, { useState } from "react";

function ProviderProfile({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    profession: "",
    location: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Handle text input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profileImage: file,
      });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare form data for backend
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });

    console.log("Provider Basic Info:", formData);

    if (onSubmit) {
      onSubmit(formData); // Send data to parent or backend
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add Provider</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        
        {/* Profile Picture Upload */}
        <div style={styles.imageUpload}>
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" style={styles.imagePreview} />
          ) : (
            <div style={styles.imagePlaceholder}>No Image</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={styles.fileInput}
          />
        </div>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="profession"
          placeholder="Profession"
          value={formData.profession}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location / City"
          value={formData.location}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Add Provider
        </button>
      </form>
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  imageUpload: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "15px",
  },
  imagePreview: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "8px",
    border: "2px solid #ccc",
  },
  imagePlaceholder: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    background: "#eee",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "8px",
    fontSize: "12px",
    color: "#777",
  },
  fileInput: {
    fontSize: "12px",
  },
  input: {
    marginBottom: "12px",
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    background: "#4CAF50",
    color: "#fff",
    padding: "10px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default ProviderProfile;
