import React from "react";

export const MessageForm = ({
  handleSubmit,
  text,
  setText,
  showEmoji,
  setShowEmoji,
  onhandleChange,
}) => {
  const handleKeyUP = (event) => {
    if (event.key === "Enter") {
      console.log("enter button");
      handleSubmit();
    }
  };
  return (
    <div className="messages-form">
      {/* {choseEmoji} */}
      <input
        type="text"
        className="input-field"
        placeholder="Enter message"
        value={text}
        // onChange={(e) => setText(e.target.value)}
        onChange={onhandleChange}
        onKeyPress={handleKeyUP}
      />
      <button className="send-btn" onClick={handleSubmit}>
        Send
      </button>
      <button className="emojies" onClick={() => setShowEmoji(!showEmoji)}>
        emoji
        <i className="fa fa-meh" style={{ fontSize: 24 }}></i>
      </button>
    </div>
  );
};
