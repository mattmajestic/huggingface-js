import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemText, Paper, IconButton, InputAdornment } from '@material-ui/core';
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
    const generated_text = response[0].generated_text.replace(/\\/g, '').split('\n').map((line, index) => <div key={index}>{line}</div>);
    setMessages([...messages, { text: input, position: 'right' }, { text: generated_text, position: 'left' }]);
    setInput('');
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100vh', padding: '20px' }}>
      <Paper style={{ width: '50%',  marginBottom: '20px', padding: '20px', borderRadius: '10px' }}>
        <List>
          {messages.map((message, index) => (
            <ListItem key={index} style={{ justifyContent: message.position === 'right' ? 'flex-end' : 'flex-start' }}>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
        <TextField
          id="file-upload"
          type="file"
          accept=".csv,audio/*"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
        <label htmlFor="file-upload">
          <IconButton color="primary" component="span">
            <FaPaperclip size={30} />
          </IconButton>
        </label>
        <TextField
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{ flex: 1, marginRight: '10px' }}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button onClick={handleClick} color="primary" variant="contained">
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

export default Chat;