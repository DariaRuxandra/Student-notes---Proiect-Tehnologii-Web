import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles for the Snow theme

const Edit = () => {
  const [content, setContent] = useState("");
  const ReactQuill = require("react-quill");

  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <div>
      <h1>Edit</h1>

      <ReactQuill theme="snow" value={content} onChange={handleContentChange} />
    </div>
  );
};

export default Edit;