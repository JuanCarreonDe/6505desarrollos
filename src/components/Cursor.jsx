import React from "react";
import { useEffect } from "react";
import { useRef } from "react";

const Cursor = () => {
  // const cordsX = 0
  // const cordsY = 0
  const cursorRef = useRef(null);
  const cursorRef2 = useRef(null);
  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      let cordsX = e.clientX;
      let cordsY = e.clientY;
      cursorRef.current.style.transform = `translate3d(${cordsX}px, ${cordsY}px, 0)`;
      setTimeout(() => {
        cursorRef2.current.style.transform = `translate3d(${cordsX}px, ${cordsY}px, 0)`;
      }, 100);
    });
  });
  return (
    <>
      <div className="cursor" ref={cursorRef} />
      <div className="cursor2" ref={cursorRef2} />
    </>
  );
};

export default Cursor;
