import React, { useState } from 'react';
import Editor from './components/Editor';
import axios from 'axios';
import './App.css';


function App() {
  const [code, setCode] = useState('// Write your code here');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('71'); // 71 = Python

  const runCode = async () => {
    setOutput('Running...');
    try {
      const { data } = await axios.post(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        {
          source_code: code,
          stdin: input,
          language_id: language,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': 'replace with ur API key' // Replace with your key
          },
        }
      );

      setOutput(data.stdout || data.stderr || data.compile_output || 'No output');
    } catch (err) {
      console.error(err);
      setOutput('Error running code');
    }
  };

  return (
    <div className="container">
      <h2>💻  Code Compiler</h2>
  
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="71">Python</option>
        <option value="62">Java</option>
        <option value="54">C++</option>
        <option value="50">C</option>
      </select>
  
      <Editor code={code} setCode={setCode} />
  
      <textarea
        rows={5}
        placeholder="Enter input (stdin)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
  
      <button onClick={runCode}>Run</button>
  
      <pre>{output}</pre>
    </div>
  );
  
}

export default App;
