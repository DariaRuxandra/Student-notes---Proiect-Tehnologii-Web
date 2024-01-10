import React, { useState, useEffect } from 'react';
import { get } from '../api/Calls';
import DOMPurify from 'dompurify';

interface FileContent {
    FileId: number;
    FileCourse: string;
    FileTitle: string;
    FileContent: string;
}

export default function ViewFile() {
    const [fileContent, setFileContent] = useState<FileContent | null>(null);

    let id = 5;

    const fetchData = async () => {
        try {
            const response: FileContent = await get(`/edit/${id}`);
            setFileContent(response);
        } catch (error) {
            console.error("Error fetching file:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {fileContent && (
                <div>
                    <h1>{fileContent.FileTitle}</h1>
                    
                    <p>Course: {fileContent.FileCourse}</p>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(fileContent.FileContent) }} />
                </div>
            )}
        </div>
    );
}
