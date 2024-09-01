import React from "react";

function Note(props) {
  const title = props.title;
  const content = props.content;
  const id = props.id;
  return (
    <div className="note">
      <h1>{title}</h1>
      <p>{content}</p>
      <button onClick={() => props.onDelete(id)}>DELETE</button>
    </div>
  );
}

export default Note;
