import React, { useEffect } from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, setToys }) {
  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((r) => r.json())
      .then((toysArray) => setToys(toysArray));
  }, []);

  function onDeleteToy(id) {
    const updatedToyList = toys.filter((toy) => toy.id !== id);

    setToys(updatedToyList);
  }

  const toyCards = toys.map((toy) => {
    return <ToyCard key={toy.name} toy={toy} onDeleteToy={onDeleteToy} />;
  });

  return <div id="toy-collection">{toyCards}</div>;
}

export default ToyContainer;
