import React from "react";

const ClickArea = ({ mouseClick }) => {
  return (
    <>
      <section className=" border border-red col-span-2 row-span-3">
        <div className="border border-red-950 h-[100%]" onClick={mouseClick} />
      </section>
    </>
  );
};

export default ClickArea;
