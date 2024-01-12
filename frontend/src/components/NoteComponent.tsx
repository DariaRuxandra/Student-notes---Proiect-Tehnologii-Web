import * as React from 'react';
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
import { get } from '../api/Calls';
import ViewFile from '../views/ViewFile';
import DOMPurify from 'dompurify';

interface NoteComponentProps {
  file: {
    FileId: number;
    FileCourse: string,
    FileTitle: string,
    FileContent: string
  };
}

function NoteComponent({ file }: NoteComponentProps) {
  const navigate = useNavigate();

  // const handleClickEvent = async () => {
  //   const id = file.FileId;
  //   console.log(`id: ${id}`);
  //   ViewFile(id);
  //   // if(response){
  //   //   console.log(response);
  //   //   navigate(`/viewFile/${id}`);
  //   // }else console.log('Nu gaseste notita');
  // } 

  const handleClickEvent = async () => {
    console.log(`aici ai dat click: ${file.FileContent}`);
    navigate(`/viewFile/${file.FileId}`);
  }

  return (
    <div>
      <Box 
      component="section" 
      sx={{ p: 2, border: '1px dashed grey' }}
      onClick={handleClickEvent}
      >
        <p>{file.FileTitle}</p>
        <p>{file.FileCourse}</p>
      </Box>
    </div>
  );
}

export default NoteComponent;
