import React, { useRef, useEffect } from "react";
import Moment from "react-moment";
import { ForscrollDown } from "./ForscrollDown";

export const Message = ({ msg, user1,img }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg,img]);

  return (
    <div className={`message-wrapper ${msg.from === user1 ? "own" : null}`} ref={scrollRef}>
      <p className={msg.from === user1 ? "me" : "friend"}>
        <h6 className="d-flex flex-column" >
          <span >
            {msg.from === user1 ? (
              <i
                className="fa fa-user-circle"
                style={{ fontSize: 24, marginRight: "10px" }}
              ></i>
            ) : (
              <i
                className="fa fa-user"
                style={{ fontSize: 24, marginRight: "10px" }}
              ></i>
            )}
          </span>
        
      <span>{msg.media ? <img src={msg.media} alt={msg.text}/>:  null}</span>
          {msg.text}
        </h6>
         {/* <ForscrollDown /> */}
       
          <div className={`msg.from === user1 ? "text-right" : null`} style={{fontSize:'12px', color:'darkBlue',fontStyle:'italic'}}><span className='today-date'>{msg.today}</span></div>
    
      </p>
    </div>
  );
};