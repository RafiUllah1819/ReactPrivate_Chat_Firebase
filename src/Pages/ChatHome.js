import React, { useState, useEffect, createContext, useContext } from "react";
import { ForscrollDown } from "../Components/ForscrollDown";
import {
  collection,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import { db, auth, storage } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { User } from "../Components/User";
import { MessageForm } from "../Components/MessageForm";
import { Message } from "../Components/Message";
import EmojiPicker, { SKIN_TONE_MEDIUM_DARK } from "emoji-picker-react";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

export const contextNode = createContext(["", () => {}]);
export const useMe = () => useContext(contextNode);
export const ContextState = (props) => {
  return (
    <contextNode.Provider value={useState([])}>
      {props.children}
    </contextNode.Provider>
  );
};

export const ChatHome = () => {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [me, setMe] = useMe();
  // const [choseEmoji, setChoseEmoji] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false);
  const [img, setImg] = useState("");

  // const { emoji } = choseEmoji;
  // console.log("emojoii", JSON.stringify(emoji));

  const onEmojiClick = (event, emojiObject) => {
    // setChoseEmoji({emojiObject});
    let textWithEmoji = `${text}${emojiObject.emoji}`;
    setText(textWithEmoji);
  };

  const onhandleChange = (e) => {
    setText(e.target.value);
  };

  // console.log(choseEmoji.emoji);
  useEffect(() => {
    let unsub;
    const authUnsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = collection(db, "users");
        const q = query(userRef);
        unsub = onSnapshot(q, (querySnapShot) => {
          let users = [];
          querySnapShot.forEach((doc) => {
            if (doc.data().uid === user.uid) {
              console.log("hello", doc.data());
              setMe(doc.data());
            } else {
              users.push(doc.data());
            }
          });
          setUsers(users);
        });
      }
    });
    return () => {
      if (unsub) unsub();
      if (authUnsub) authUnsub();
    };
  }, [msgs]);

  const selectUser = (user) => {
    setChat(user);
    console.log("selectuser", user);

    const receieverId = user.id;
    console.log("receiever", receieverId);
    const id =
      me.id > receieverId
        ? `${receieverId}_${me.id}`
        : `${me.id}_${receieverId}`;

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

  let today = new Date();
  today = today.toLocaleString("en-US", {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    minute60: true,
  });

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const receiverId = chat.id;
    const id =
      receiverId > me.id ? `${me.id}_${receiverId}` : `${receiverId}_${me.id}`;

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    await addDoc(collection(db, "message", id, "chat"), {
      text,
      today,
      from: me.id,
      to: receiverId,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    setText("");
    setShowEmoji(false);
    setImg("");
    <ForscrollDown />;
  };

  console.log("users", users);
  return (
    <div className="home-container d-flex">
      {
        // <h3 style={{ position: "absolute", left: 0 }}>
        //   choseEmoj {choseEmoji.emoji}
        // </h3>
      }
      <div className="home-user">
        {users?.map((user) => (
          <User key={user.uid} user={user} selectUser={selectUser} />
        ))}
      </div>
      {console.log("all msgs", msgs)}
      <div className="messages-container" style={{ position: "relative" }}>
        {chat ? (
          <>
            <div className="messages-user">
              <h3>{chat.name}</h3>
            </div>
            <div className="messages">
              {msgs.length
                ? msgs.map((msg, i) => (
                    <>
                      <Message key={i} msg={msg} user1={me.id} img={img} />
                      <ForscrollDown msg={msg} />
                    </>
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              showEmoji={showEmoji}
              setShowEmoji={setShowEmoji}
              onhandleChange={onhandleChange}
              setImg={setImg}
            />
          </>
        ) : (
          <div className="no-con">
            <h4 className="text-center pt-3">Start conversation</h4>
          </div>
        )}
      </div>
      <div className="emoji-section">
        {showEmoji && (
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            skinTone={SKIN_TONE_MEDIUM_DARK}
          ></EmojiPicker>
        )}
      </div>
      {/* {choseEmoji && <EmojiData choseEmoji={choseEmoji} />} */}
      <ForscrollDown />
    </div>
  );
};
