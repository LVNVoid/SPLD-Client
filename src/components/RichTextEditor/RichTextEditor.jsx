import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current && quillRef.current.getEditor()) {
      const editor = quillRef.current.getEditor();
      if (editor.root.innerHTML !== value) {
        editor.clipboard.dangerouslyPasteHTML(value || "");
      }
    }
  }, [value]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      placeholder={placeholder}
      preserveWhitespace
    />
  );
};

export default RichTextEditor;
