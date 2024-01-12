import React, { useState, useEffect } from 'react';
import NoteComponent from '../components/NoteComponent';
import { get } from '../api/Calls';

interface File {
  FileId: number;
  FileCourse: string,
  FileTitle: string,
  FileContent: string
}

export default function MyWork() {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await get("/edit");
        setFiles(response.rows); 
        console.log(response);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);
  console.log(files[1]);
  return (
    <div>
      <h1>My Work</h1>

      {files.length > 0 ? (
        
        <div>
          {files.map((file) => (
            <NoteComponent key={file.FileId} file={file} />
          ))}
        </div>
      ) : (
        <p>No files available</p>
      )}
    </div>
  );
}
