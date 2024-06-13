import React from "react";


const TimeTest = ({ uploadGoalSeconds, goalSeconds }) => {
  const timeTable = [1, 2, 3, 4, 5, 10, 11, 13, 14];
  const border = () => ({});
  return (
    <section className="border border-red col-span-1 row-start-1 row-span-4 h-[100%]">
      <div className="flex flex-col py-3 px-1 gap-3 overflow-y-scroll h-[100%] no-scrollbar">
        {timeTable.map((time) => {
          return (
            <div
              className=" text-center border border-red rounded-lg py-2 px-3"
              style={{ border: goalSeconds == time ? "1px solid red" : "" }}
              onClick={() => uploadGoalSeconds(time)}
              key={time}
            >
              <span>{time} Seconds</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TimeTest;