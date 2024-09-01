import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  function addItem(newItem) {
    setItems(prev => [...prev, newItem])
  }
  function deleteItem(id) {
    setItems(items => items.filter((item, index) => (index !== id)));
  }
  return (
    <div>
      <Header />
      <CreateArea onAdd={addItem}/>
      {items.map((item, index) => (
        <Note key={index} id={index} title={item.title} content={item.content} onDelete={deleteItem}/>
      ))}
      <Footer />
    </div>
  );
}

export default App;
