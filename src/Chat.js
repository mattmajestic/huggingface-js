import React, { useState } from 'react';
import { FaPaperclip } from 'react-icons/fa';

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
  const [messages, setMessages] = useState([]);

  const handleClick = async () => {
    const response = await query({ "inputs": input });
    const words = response[0].generated_text.replace(/\\/g, '').split(' ');
    const generated_text = [];
    for (let i = 0; i < words.length; i += 3) {
      generated_text.push(words.slice(i, i + 3).join(' '));
    }
    setMessages([...messages, { text: input, position: 'right' }]);
    setInput('');
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: generated_text.join('\n'), position: 'left' }]);
    }, 1500); // 1.5 seconds delay
  };

  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handleClick();
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // Here you can handle the uploaded file (e.g., send it to a server)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-xl shadow-md p-6 mb-4 flex flex-col">
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