import React, { useState, useEffect } from "react";
import NoteComponent from "../components/NoteComponent";
import { get, getCoursesForUser } from "../api/Calls";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import "../css/MyWork.css";
import { uniq } from "lodash";

interface File {
  FileId: number;
  FileCourse: string;
  FileTitle: string;
  FileContent: string;
}

export default function MyWork() {
  const [files, setFiles] = useState<File[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [course, setCourse] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesResponse = await get("/edit");
        setFiles(filesResponse.rows);

        const storedId = localStorage.getItem("id");
        const userId = storedId ? parseInt(storedId, 10) : 0;

        const coursesResponse = await getCoursesForUser(userId);
       const array = coursesResponse.courses.courses;
       console.log(array)
       let unique: any[] = [];
       array.forEach((course: any) => {
        if(!unique.includes(course)){
          unique.push(course);
        }
       })
        setCourses(unique)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };

  return (
    <div className="my-work-container">
      <FormControl fullWidth className="form">
        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          className="select"
          value={course}
          label="Course"
          onChange={handleChange}
        >
          <MenuItem value="" key="all">
            ALL
          </MenuItem>
          {courses.map((courseOption, index) => (
            <MenuItem key={index} value={courseOption}>
              {String(courseOption)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {files.length > 0 ? (
        <div>
          {files.map(
            (file) =>
              (!course || file.FileCourse === course) && (
                <NoteComponent key={file.FileId} file={file} />
              )
          )}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
}
