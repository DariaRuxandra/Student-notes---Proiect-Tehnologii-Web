import React from "react";
import { Quill } from "react-quill";

interface UserInfo {
  title: string;
  description: string;
  information: string;
}

interface QuillToolbarProps {
  toolbarId?: string;
}

// Custom Undo button icon component for Quill editor
const CustomUndo: React.FC = () => (
  <svg viewBox="0 0 18 18">
    {/* ... your SVG content */}
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo: React.FC = () => (
  <svg viewBox="0 0 18 18">
    {/* ... your SVG content */}
  </svg>
);

// Undo and redo functions for Custom Toolbar
const undoChange = () => {
  if (Quill) {
    (Quill as any).history.undo();
  }
};

const redoChange = () => {
  if (Quill) {
    (Quill as any).history.redo();
  }
};

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "Inter",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = (props: { toolbarId?: string }) => ({
  toolbar: {
    container: "#" + props.toolbarId,
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
});

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
];

// Quill Toolbar component
export const QuillToolbar: React.FC<QuillToolbarProps> = (props) => {
  return (
    <>
      {props.toolbarId !== undefined && (
        <div id={props.toolbarId}>
          {/* ... your toolbar content */}
        </div>
      )}
    </>
  );
};

export default QuillToolbar;
