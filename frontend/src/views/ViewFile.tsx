import React, { useState, useEffect } from "react";
import { get } from "../api/Calls";
import DOMPurify from "dompurify";
import { useParams } from "react-router-dom";
import "../css/ViewComponent.css";

interface FileContent {
  FileId: number;
  FileCourse: string;
  FileTitle: string;
  FileContent: string;
}

interface RouteParams {
  id: string;
  [key: string]: string | undefined;
}

export default function ViewFile() {
  const [fileContent, setFileContent] = useState<FileContent | null>(null);
  const { id } = useParams<RouteParams>();

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
        <div className="view-container">
          <div className="title-and-label">
            <span className="label">{fileContent.FileCourse}</span>
            <h1>{fileContent.FileTitle}</h1>
          </div>

          <div className="content-container">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(fileContent.FileContent),
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
