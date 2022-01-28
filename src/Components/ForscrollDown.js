import React, { useRef, useEffect } from "react";

export const ForscrollDown = ({ msg }) => {
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);
  return (
    <div>
      <div ref={scrollRef}></div>
    </div>
  );
};
