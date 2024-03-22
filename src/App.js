import React, { useEffect, useState } from 'react';
import './App.css';
import { signInAnonymously, auth, db, storage } from './firebase-config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null); // State to hold the selected file

  useEffect(() => {
    signInAnonymously(auth).catch(console.error);

    const messagesQuery = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
      const fetchedMessages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(fetchedMessages);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && !file) return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage(''); // Clear the message input field
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      uploadFile(selectedFile); // Call uploadFile here
    }
  };
  

  // Adjusted uploadFile to optionally accept a file parameter
  const uploadFile = async (selectedFile = file) => {
    if (!selectedFile) return;

    try {
      const fileRef = ref(storage, `uploads/${selectedFile.name}`);
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const fileUrl = await getDownloadURL(snapshot.ref);
      console.log("File uploaded:", fileUrl); // Here you might want to do something with the file URL
      setFile(null); // Clear the file state after upload
    } catch (error) {
      console.error("Error uploading file: ", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="messages">
          {messages.map(message => (
            <div key={message.id} className="message">{message.text}</div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="message-form">
          {/* Updated Attach Button and File Input */}
          <label htmlFor="file-input" className="attach-button">📎</label>
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;
