import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';

const ContentEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [layout, setLayout] = useState('single');


  const handleSave = async () => {
    const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    console.log(content)
    try {
    //   const response = await axios.post('http://localhost:5000/api/content/add', { content, layout });
    //   console.log('Content saved:', response.data);
    } catch (err) {
      console.error('Error saving content:', err);
    }
  };

  return (
    <div>
      <Editor
      editorState={editorState}
      onEditorStateChange={setEditorState}/>
      <div>
        <label>
          <input
            type="radio"
            value="single"
            checked={layout === 'single'}
            onChange={() => setLayout('single')}
          />
          Single Column
        </label>
        <label>
          <input
            type="radio"
            value="double"
            checked={layout === 'double'}
            onChange={() => setLayout('double')}
          />
          Two Columns
        </label>
      </div>
      <button onClick={handleSave}>Save Content</button>
    </div>
  );
};

export default ContentEditor;
