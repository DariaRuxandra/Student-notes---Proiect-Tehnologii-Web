import * as React from 'react';
import Box from '@mui/system/Box';

interface NoteComponentProps {
  file: {
    FileId: number;
    FileCourse: string,
    FileTitle: string,
    FileContent: string
  };
}

function NoteComponent({ file }: NoteComponentProps) {
  return (
    <div>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <p>File ID: {file.FileId}</p>
        {/* Add other properties based on your actual file structure */}
        {/* For example: <p>Course: {file.FileCourse}</p> */}
        This is a section container
      </Box>
    </div>
  );
}

export default NoteComponent;
