import * as React from "react";
import Box from "@mui/system/Box";
import { useNavigate } from "react-router-dom";
import { get, remove } from "../api/Calls";
import ViewFile from "../views/ViewFile";
import DOMPurify from "dompurify";
import Button from "@mui/material/Button";
import "../css/NoteComponentStyle.css";
import ArticleIcon from "@mui/icons-material/Article";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { Tooltip } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

interface NoteComponentProps {
  file: {
    FileId: number;
    FileCourse: string;
    FileTitle: string;
    FileContent: string;
  };
}

function NoteComponent({ file }: NoteComponentProps) {
  const navigate = useNavigate();
  const [isBoxVisible, setBoxVisibility] = React.useState(true);

  const handleClickEvent = async () => {
    console.log(`aici ai dat click: ${file.FileContent}`);
    navigate(`/viewFile/${file.FileId}`);
  };

  const handleDeleteEvent = async () => {
    setBoxVisibility(false);
    const response = await remove("/edit", file.FileId);
    if (response) console.log("file sters");
    else console.log("nu s-a sters file-ul");
  };

  const handleUpdateEvent = () => {
    const updateData = {
      FileId: file.FileId,
      FileCourse: file.FileCourse,
      FileTitle: file.FileTitle,
      FileContent: file.FileContent,
    };
    navigate("/Update", { state: { updateData } });
  };

  return (
    <>
      {isBoxVisible && (
        <Box
          className="container"
          component="section"
          sx={{ p: 2, border: "1px solid grey" }}
        >
          <div className="note-text-container">
            <ArticleIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              fontSize="large"
            />

            <div className="title-and-label">
              <p className="title">{file.FileTitle}</p>
              <p>{file.FileCourse}</p>
            </div>
          </div>

          <div className="buttonContainer">
            {/* <Button 
          variant="contained" color="primary"
          onClick={handleDeleteEvent}>
            Delete
          </Button> */}
            <Tooltip title="Delete">
              <DeleteIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                fontSize="large"
                onClick={handleDeleteEvent}
              />
            </Tooltip>
            <Tooltip title="Update">
              <UpdateIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                fontSize="large"
                onClick={handleUpdateEvent}
              />
            </Tooltip>
            <Tooltip title="View">
              <RemoveRedEyeIcon
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
                fontSize="large"
                onClick={handleClickEvent}
              />
            </Tooltip>
            {/* // butoane vechi */}
            {/* 
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateEvent}
            >
              Update
            </Button> */}
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handleClickEvent}
            >
              View
            </Button> */}
          </div>
        </Box>
      )}
    </>
  );
}

export default NoteComponent;
