import React, { useEffect } from "react";

export function Success() {
  useEffect(() => {
    setTimeout(() => {
      console.log("I'll close");
      window.close();
    }, 100);
  }, []);

  return <div>Logging failure!</div>;
}