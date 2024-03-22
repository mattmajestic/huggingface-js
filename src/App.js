import React, { useEffect, useState } from 'react';
import './App.css';
import { signInAnonymously, auth, db } from './firebase-config';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Authenticate the user anonymously
    signInAnonymously(auth).catch(console.error);

    // Listen for new messages
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
    if (!newMessage.trim()) return;
  
    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        timestamp: serverTimestamp(),
      });
      setNewMessage(''); // Attempt to clear the input field
      // Manually clear the input field as a last resort
      document.getElementById("messageInput").value = '';
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Majestic Coding Firebase Chat</h1>
      <div className="chat-container">
        <div className="chat-box">
          {messages.map(message => (
            <div key={message.id} className="message" style={{ animation: 'fadeIn 0.5s' }}>
              {message.text}
            </div>
          ))}
          <form onSubmit={sendMessage} className="message-form">
          <input
            id="messageInput"
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
    </div>
  );
}

export default App;
