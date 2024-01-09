import { Button, Container, TextField } from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../css/EditComponent.css";
import { post } from "../api/Calls";

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
  const [title, setTitle] = useState<string>("");


  const handleProcedureContentChange = (course: string) => {
    setCode(course);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    setTitle(input);
  };

  const handleCourseChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
      setCourse(input);
  };

  let id : number;
  const sendFileToDatabase = async () => {
    try{
      const obj = {"FileCourse":`${course}`, "FileTitle":`${title}`, "FileContent":`${code}`};
      const response = await post("/edit", obj);
      if (response) {
        id = response.FileId;
        return id;
      }
      if(response) console.log('sendFile ->  success');
      else console.log('send file ->  error');
    }catch (error) {
      console.error('Error in sendFileToDatabase:', error);
    }
    
  }

  const populateUserFileTable = async () => {
    try{
      const userId = localStorage.getItem("id");
      const fileId = await sendFileToDatabase();
      if(fileId){
        const obj = {"UserId": userId, "FileId": fileId};
        const response = await post("/userFile", obj);
        if(response) console.log('send userfile -> success');
        else console.log('send userfile -> error');
      }
      
    }catch (error) {
      console.error('Error in populateUserFileTable:', error);
    }
  }

  const saveDocument = () => {
    const courseInput = course;
    const titleInput = title;
    if (courseInput.length !== 0 && titleInput.length !== 0) {
      setCourse(courseInput);
      setTitle(titleInput);
      sendFileToDatabase();
      populateUserFileTable();
    } else {
      console.log('Field is empty');
    }
  }

  //Butonul de SAVE functioneaza doar daca este completat field-ul de Course, am nevoie sa filtrez notitele dupa ce se scrie in field-ul acesta. Mi s-a parut cea mai usoara varianta de a verifica faptul ca utilizatorul imi completeaza acel field.
  const isSaveButtonDisabled = course.trim() === '' || title.trim() === '';

  return (
    <>
      <Container className="container">
        <Container className="courseAndTitleContainer">
          <TextField
            id="outlined-controlled"
            label="Course"
            value={course}
            onChange={handleCourseChange}
          />

          <TextField
            id="outlined-controlled"
            label="Title"
            value={title}
            onChange={handleTitleChange}
          />
        </Container>
 
        <Button 
        variant="contained" 
        color="primary" 
        onClick={saveDocument} 
        disabled={isSaveButtonDisabled}
        className="saveButton"
        >
          Save
        </Button>

      </Container>
      <Container >
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          value={code}
          onChange={handleProcedureContentChange}
        />
      </Container>
    </>
  );
};

export default Edit;