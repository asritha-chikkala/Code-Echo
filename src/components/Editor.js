import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const Editor = ({ code, setCode }) => {
  return (
    <div>
      <CodeMirror
        value={code}
        height="300px"
        extensions={[javascript()]} // language - default is JS
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default Editor;
