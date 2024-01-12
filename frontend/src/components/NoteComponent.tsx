import * as React from 'react';
import Box from '@mui/system/Box';
import { useNavigate } from 'react-router-dom';
import { get, remove } from '../api/Calls';
import ViewFile from '../views/ViewFile';
import DOMPurify from 'dompurify';
import Button from '@mui/material/Button';


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
  const [isBoxVisible, setBoxVisibility] = React.useState(true);

  const handleClickEvent = async () => {
    console.log(`aici ai dat click: ${file.FileContent}`);
    navigate(`/viewFile/${file.FileId}`);
  }

  const handleDeleteEvent = async () => {
    setBoxVisibility(false); 
    const response = await remove('/edit', file.FileId);
    if(response) console.log('file sters');
    else console.log('nu s-a sters file-ul');
  };

  return (
    <>
      {isBoxVisible && (
        <Box 
          component="section" 
          sx={{ p: 2, border: '1px dashed grey' }}
          onClick={handleClickEvent}
        >
          <p>{file.FileTitle}</p>
          <p>{file.FileCourse}</p>

          <Button onClick={handleDeleteEvent}>
            Delete
          </Button>
        </Box>
      )}
    </>
  );
}

export default NoteComponent;
