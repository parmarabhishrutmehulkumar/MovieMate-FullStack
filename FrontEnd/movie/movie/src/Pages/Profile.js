import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { name, email, phone, address });
  };

  return (
    <div className="profile-page">
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Phone:
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />
        <label>
          Address:
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default Profile;