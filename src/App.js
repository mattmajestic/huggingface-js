import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { signInAnonymously, auth, db } from './firebase-config';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
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
    <Container maxWidth="md">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Majestic Coding Firebase Chat
        </Typography>
        <Chat messages={messages} setMessages={setMessages} newMessage={newMessage} setNewMessage={setNewMessage} />
      </Box>
    </Container>
  );
}

export default App;