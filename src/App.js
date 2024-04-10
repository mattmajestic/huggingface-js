import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { db } from './firebase-config';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import './App.css';
import Chat from './Chat';
import Navbar from './Navbar';
import Docs from './Docs';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
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

  return (
    <Router>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800 p-4">
        <Routes>
          <Route path="/" element={<Docs />} />
          <Route path="/chat" element={<Chat messages={messages} setMessages={setMessages} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
