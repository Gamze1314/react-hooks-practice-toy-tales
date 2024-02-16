import React, { useState } from "react";

function ToyCard({ toy, onDeleteToy }) {
  const { id, name, image, likes } = toy; // toy props
  const [likeCount, setLikeCount] = useState(0);

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => onDeleteToy(id));
  }

  function incrementLikes() {
    setLikeCount((likes) => likes + 1);

    // Send PATCH request to update likes
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likeCount + 1,
      }),
    })
      .then((r) => r.json())
      .then((updatedToy) => {
        console.log("Toy likes updated:", updatedToy);
      });
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img src={image} alt={name} className="toy-avatar" />
      <p>{likeCount} Likes </p>
      <button onClick={incrementLikes} className="like-btn">
        Like 💗
      </button>
      <button onClick={handleDelete} className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
