import React, { useEffect, useState } from 'react';
import { signInAnonymously, auth, db } from './firebase-config';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import './App.css';
import Chat from './Chat'; // assuming Chat.js is in the same directory

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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800 p-4">
      <h1 className="text-4xl mb-4">Majestic Coding Chat</h1>
      <div className={`w-full max-w-lg bg-white rounded-xl shadow-md p-6 mb-4 overflow-auto max-h-[80vh]`}>
        <Chat messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} />
      </div>
    </div>
  );
}

export default App;