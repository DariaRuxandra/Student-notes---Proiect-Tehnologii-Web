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

interface Course {
  FileCourse: string;
}

interface File {
  FileId: number;
  FileCourse: string;
  FileTitle: string;
  FileContent: string;
}

export default function MyWork() {
  const [files, setFiles] = useState<File[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<string>("");
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const filesResponse = await get("/edit");
        setFiles(filesResponse.rows);

        const storedId = localStorage.getItem("id");
        const userId = storedId ? parseInt(storedId, 10) : 0;
  
        const coursesResponse = await getCoursesForUser(userId);
  
        
        if (!coursesResponse || !Array.isArray(coursesResponse.courses.courses)) {
          console.error("Invalid courses data:", coursesResponse);
          return;
        }

        const uniqueCourses = coursesResponse.courses.courses.filter((course: any, index: number, self: any[]) =>
        index === self.findIndex((c: any) => c.FileCourse === course.FileCourse)
      );

        setCourses(uniqueCourses);
        
        setCourses(coursesResponse.courses.courses);

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
          {courses.map((course, index) => (
            <MenuItem key={index} value={course.FileCourse}>
              {course.FileCourse}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {Array.isArray(courses) && courses.length > 0 ? (
  <div>
    {courses
      .filter((file) => !course || file.FileCourse === course)
      .map((file) => (
        <NoteComponent file={file as any} />
      ))}
  </div>
) : (
  <p>No files available</p>
)}

    </div>
  );
}
