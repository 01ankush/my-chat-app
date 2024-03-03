import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import chatCompletion from './chatCompletion'; // Adjust the path accordingly
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

import "../styles/Chat.css";

export const Chat = ({ room }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (newMessage === "") return;
  
    // Call OpenAI API to correct the message
    const correctedMessage = await chatCompletion(newMessage);
  
    // Display a pop-up or inline notification with the corrected message
    const choice = window.confirm(
      `Original message: ${newMessage}\nCorrected message: ${correctedMessage}\nDo you want to send the corrected message?`
    );
  
    // If the sender chooses to send the corrected message, use it; otherwise, use the original message
    const messageToSend = choice ? correctedMessage : newMessage;
  
    await addDoc(messagesRef, {
      text: messageToSend,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
  
    setNewMessage("");
  };

  return (
    <div className="chat-app">
      <div className="header">
        <h1>{room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};