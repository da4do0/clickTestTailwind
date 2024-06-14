import React from "react";

const InfoTest = ({ seconds = 0, clicks = 0 , goalSeconds=0}) => {
  const clickXsecond = () => {
    if (isNaN(clicks / seconds) || clicks / seconds == Infinity) {
      return 0;
    }
    return (clicks / seconds).toFixed(1);
  };

  const borderGoal = ({});

  return (
    <section className=" inline-flex items-center justify-evenly border-4 border-[#2c2e30] col-span-2 col-start-2 row-span-1 rounded-[10px]"
      style={{borderColor: (goalSeconds != 0 ? "#8FC2D3":"")}}>
      <div className=" bg-[#2c2e30] rounded-lg  inline-flex flex-col items-center px-10 py-3">
        <span>{seconds.toFixed(1)}</span>
        <span>Timer</span>
      </div>
      <div className=" bg-[#2c2e30] rounded-lg  inline-flex flex-col items-center px-10 py-3">
        <span>{clickXsecond()}</span>
        <span>Click/s</span>
      </div>
      <div className=" bg-[#2c2e30] rounded-lg  inline-flex flex-col items-center px-10 py-3">
        <span>{clicks}</span>
        <span>Clicks</span>
      </div>
    </section>
  );
};

export default InfoTest;
