import React from "react";
import { useState } from "react";

function CreateArea(props) {
  const [newItem, setNewItem] = useState({
    title: "",
    content: ""
  });
  function handleChange(event) {
    const {name, value} = event.target;
    setNewItem(prev => ({
      ...prev,
      [name]: value
    }))
    event.preventDefault();
  }
  function handleAdd(event) {
    props.onAdd(newItem);
    event.preventDefault();
    setNewItem({
      title: "",
      content: ""
    });
  }
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={handleChange} value={newItem.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleChange} value={newItem.content}/>
        <button onClick={handleAdd}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
