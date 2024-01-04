import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditProps {}

const Edit: React.FC<EditProps> = () => {
  const myColors = [
    "purple",
    "#785412",
    "#452632",
    "#856325",
    "#963254",
    "#254563",
    "white"
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: myColors }],
      [{ background: myColors }]
    ]
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align"
  ];

  const [code, setCode] = useState<string>("");
  const [course, setCourse] = useState<string>("");

  const handleProcedureContentChange = (content: string) => {
    setCode(content);
  };

  const handleCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCourse(event.target.value);
  };

  return (
    <>
      <div>
        <label htmlFor="course">Course:</label>
        <input
          type="text"
          id="course"
          value={course}
          onChange={handleCourseChange}
        />
      </div>
      <div>
        {/* {console.log(code)} */}
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={code}
          onChange={handleProcedureContentChange}
        />
      </div>
    </>
  );
};

export default Edit;
