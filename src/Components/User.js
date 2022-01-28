import React from "react";

export const User = ({ user, selectUser }) => {
  return (
    <div className="user-detail" onClick={() => selectUser(user)}>
      <div className="user-info">
        <h5>{user?.name}</h5>
      </div>
      <div
        className={`user-status ${user.isOnline ? "online" : "offline"}`}
      ></div>
    </div>
  );
};
