import React, { useState } from 'react';
import { FaPaperclip,FaToggleOn, FaToggleOff } from 'react-icons/fa';

const API_URL = "https://api-inference.huggingface.co/models/gpt2";
const headers = { "Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_API_KEY}` };

async function query(payload) {
  const response = await fetch(API_URL, {
    headers: headers,
    method: "POST",
    body: JSON.stringify(payload),
  });
  const result = await response.json();
  return result;
}

function Chat() {
  const [input, setInput] = useState('');
  const [prompt, setPrompt] = useState('Answer the Following Full Stack question for me of... '); // Default prompt
  const [messages, setMessages] = useState([]);
  const [showPrompt, setShowPrompt] = useState(true); // State to control the visibility of the prompt box

  const handleClick = async () => {
    const fullInput = showPrompt ? `${prompt} ${input}` : input; // Use prompt if showPrompt is true
    const response = await query({ "inputs": fullInput });
    console.log(response);

    if (response && response[0] && response[0].generated_text) {
      const generatedText = response[0].generated_text;

      setMessages([...messages, { text: input, position: 'right' }]);
      setInput('');

      setTimeout(() => {
        setMessages(prevMessages => [...prevMessages, { text: generatedText, position: 'left' }]);
      }, 1500); // Delay for simulated typing effect
    } else {
      console.error("No response or unexpected response structure:", response);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleClick();
      event.preventDefault(); // Prevent form submission
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Handle file upload...
  };

  const togglePromptVisibility = () => {
    setShowPrompt(!showPrompt);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-md p-6 mb-4 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <button onClick={togglePromptVisibility} className="py-2 px-4 rounded text-white bg-green-500 hover:bg-green-600 flex items-center">
            {showPrompt ? <FaToggleOn className="mr-2" /> : <FaToggleOff className="mr-2" />}
            {showPrompt ? 'Hide Prompt' : 'Show Prompt'}
          </button>
        </div>
        {showPrompt && (
          <textarea
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            placeholder="Enter prompt here..."
            className="w-full p-2 mb-4 rounded border border-gray-600 text-white bg-gray-700"
            rows="4"
          ></textarea>
        )}
        <div className="overflow-auto flex-grow mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`text-left ${message.position === 'right' ? 'text-right' : ''}`}>
              <p className={`inline-block p-2 rounded-lg mb-2 ${message.position === 'right' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white'}`}>{message.text}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            id="file-upload"
            type="file"
            accept=".csv,audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label htmlFor="file-upload" className="mr-2">
            <FaPaperclip size={30} className="text-blue-500 cursor-pointer" />
          </label>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-grow mr-2 p-2 rounded border border-gray-600 text-white bg-gray-700"
          />
          <button onClick={handleClick} className="py-2 px-4 rounded bg-blue-500 text-white">
            Send
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default Chat;
