import React, { useState } from "react";
import { Attachment } from "./Attachment";
import emojiImg from "../assets/images/emoji.png";

export const MessageForm = ({
  handleSubmit,
  showEmoji,
  setShowEmoji,
  onhandleChange,
  text,
  setImg,
}) => {
  const [uploadFile, setUploadFile] = useState(false);
  const handleKeyUP = (event) => {
    if (event.key === "Enter") {
      console.log("enter button");
      handleSubmit();
    }
  };
  return (
    <div className="messages-form">
      <button className="emo" onClick={() => setShowEmoji(!showEmoji)}>
        <img src={emojiImg} alt="" />
      </button>

      <input
        type="text"
        className="input-field"
        placeholder="Enter message"
        value={text}
        onChange={onhandleChange}
        onKeyPress={handleKeyUP}
      />
      <label htmlFor="img">
        <Attachment />
      </label>
      <input
        onChange={(e) => setImg(e.target.files[0])}
        type="file"
        id="img"
        accept="image/*"
        style={{ display: "none" }}
      />
      {text.length > 0 ? (
        <button className="send-btn" onClick={handleSubmit}>
          <span>
            <i class="fa fa-paper-plane"></i>
          </span>
        </button>
      ) : null}
    </div>
  );
};
