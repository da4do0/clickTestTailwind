import React from "react";

const ClickArea = ({ mouseClick }) => {
  return (
    <>
      <section className=" rounded-[10px] border-[#2c2e30] border-[8px] col-span-2 row-span-3">
        <div className=" h-[100%]" onClick={mouseClick} />
      </section>
    </>
  );
};

export default ClickArea;
