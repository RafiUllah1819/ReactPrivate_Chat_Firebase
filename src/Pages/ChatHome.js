import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  doc,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../Components/User";
import { MessageForm } from "../Components/MessageForm";
import { Message } from "../Components/Message";
import { ForscrollDown } from "../Components/ForscrollDown";

export const ChatHome = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);

  const user1 = auth.currentUser.uid;
  console.log("user1", user1);

  useEffect(() => {
    let unsub;
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = collection(db, "users");
        const q = query(
          userRef,
          where("uid", "not-in", [auth.currentUser.uid])
        );
        unsub = onSnapshot(q, (querySnapShot) => {
          let users = [];
          querySnapShot.forEach((doc) => {
            users.push(doc.data());
          });
          setUsers(users);
        });
      }
    });
    return () => {
      if (unsub) unsub();
      if (authUnsub) authUnsub();
    };
  }, []);

  const selectUser = (user) => {
    setChat(user);
    console.log("selectuser", user);

    const user2 = user.uid;
    console.log("user2", user2);
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;

    const msgsRef = collection(db, "message", id, "chat");

    const q = query(msgsRef, orderBy("createdAt", "asc"));

    const unsubs = onSnapshot(q, (querySnapShot) => {
      let msgs = [];
      querySnapShot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMsgs(msgs);
    });
    return () => unsubs();
  };

  var today = new Date();
  today = today.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    minute60: true,
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const user2 = chat.uid;
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
    await addDoc(collection(db, "message", id, "chat"), {
      text,
      today,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  };

  console.log("users", users);
  return (
    <div className="home-container d-flex">
      <div className="home-user">
        {users?.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
      {console.log("all mesgs", msgs)}
      <div className="messages-container">
        {chat ? (
          <>
            <div className="messages-user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <div className="no-con">
            <h4 className="text-center pt-3">Start conversation</h4>
          </div>
        )}
      </div>
    </div>
  );
};
