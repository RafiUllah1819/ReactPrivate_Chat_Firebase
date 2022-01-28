import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { ForscrollDown } from "./ForscrollDown";

export const Message = ({ msg, user1 }) => {

  return (
    <div className={`message-wrapper ${msg.from === user1 ? "own" : null}`}>
      <span className={msg.from === user1 ? "me" : "friend"}>
        <h6>
          <span>
            {msg.from === user1 ? (
              <i
                class="fa fa-user-circle"
                style={{ fontSize: 24, marginRight: "10px" }}
              ></i>
            ) : (
              <i
                class="fa fa-user"
                style={{ fontSize: 24, marginRight: "10px" }}
              ></i>
            )}
          </span>
          {msg.text}
        </h6>
       
          <ForscrollDown />
          <div className={`msg.from === user1 ? "text-right" : null`}><span className='today-date'>{msg.today}</span></div>
    
      </span>
    </div>
  );
};
