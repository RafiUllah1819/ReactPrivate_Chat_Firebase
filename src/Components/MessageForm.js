import React from "react";

export const MessageForm = ({ handleSubmit, text, setText }) => {
  const handleKeyUP = (event) => {
    if (event.key === "Enter") {
      console.log("enter button");
      handleSubmit();
    }
  };
  return (
    <div className="messages-form">
      <input
        type="text"
        className="input-field"
        placeholder="Enter message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyUP}
      />
      <button className="send-btn" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
};
