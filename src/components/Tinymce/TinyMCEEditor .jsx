import React from "react";

import { Editor } from "@tinymce/tinymce-react";

const TinyMCEEditor = ({ value, onChange }) => {
  return (
    <Editor
      apiKey="jscvngty6x1p0fq9b7y3rftkgjwga69iz7qchxluuvg60p54"
      initialValue={value}
      value={value}
      onEditorChange={onChange}
      init={{
        plugins: "link image code",
        toolbar:
          "undo redo | formatselect | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image",
        content_style:
          "body { font-family: Arial, sans-serif; font-size: 14px; }",
        language: "vi", // Ngôn ngữ tiếng Việt (thay đổi theo ngôn ngữ của bạn)
        directionality: "ltr", // Hướng viết từ trái qua phải (thay đổi theo hướng viết của bạn)
      }}
    />
  );
};

export default TinyMCEEditor;
