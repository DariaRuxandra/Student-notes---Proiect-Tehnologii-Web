import React, { useState, useEffect } from 'react';
import NoteComponent from '../components/NoteComponent';
import { get, getCoursesForUser } from '../api/Calls';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import '../css/MyWork.css';

interface File {
  FileId: number;
  FileCourse: string;
  FileTitle: string;
  FileContent: string;
}

export default function MyWork() {
  const [files, setFiles] = useState<File[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [course, setCourse] = useState<string>('');

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await get("/edit");
        setFiles(response.rows);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    const fetchCourses = async () => {
      const storedId = localStorage.getItem("id");
      const userId = storedId ? parseInt(storedId, 10) : 0;
    
      try {
        const userCourses = await getCoursesForUser(userId);
        setCourses(userCourses.courses.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchFiles();
    fetchCourses();
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
    console.log(event.target.value)

    

  };
  
  return (
    <div>
      <h1>My Work</h1>

      <FormControl fullWidth className="form">
        <InputLabel id="demo-simple-select-label">Courses</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={course}
          label="Course"
          onChange={handleChange}
        >
          <MenuItem value="" key="all">
            ALL
          </MenuItem>
          { courses.length > 0 ? (
          courses.map((courseOption, index) => (
            <MenuItem key={index} value={courseOption}>
              {String(courseOption)}
            </MenuItem>
          ))) : null}
        </Select>
      </FormControl>

      {files.length > 0 ? (
        <div>
          {files.map((file) => (
            (course === '' || file.FileCourse === course) && (
              <NoteComponent key={file.FileId} file={file} />
            )
          ))}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
}
