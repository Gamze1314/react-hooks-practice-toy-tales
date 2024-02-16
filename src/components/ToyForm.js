import React, { useState } from "react";
// controlled Form
// send POST request to the backend
//create a ToyCard for new toy => IDF

function ToyForm({ toys, setToys }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newToy),
    })
      .then((r) => r.json())
      .then((newT) => {
        setFormData(newT);
        setToys([...toys, newT]);
      })
      .catch((error) => {
        console.error("Error creating new toy:", error); // no error here
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>
        <input
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
        />
        <br />
        <input
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
        />
        <br />
        <input
          type="submit"
          name="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;
