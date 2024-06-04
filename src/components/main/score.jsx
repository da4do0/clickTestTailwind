import React from "react";



const Score = ({ show, data }) => {
  const display = show ? "block" : "hidden";

  return (
    <>
      <section
        className={` absolute z-50 bg-amber-200 ${display} left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-[50%] h-[50%]`}
      >
      </section>
    </>
  );
};

export default Score;
