import React, { useState, useEffect } from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";

const Leaderboard = () => {
  const { dataLeaderboard } = useOperationDb();

  useEffect(() => {
    console.log(dataLeaderboard.length);
  }, [dataLeaderboard]);

  const score = () => {
    if (dataLeaderboard.lenght > 0) {
      dataLeaderboard.map(({ nickname, score }) => {
        return (
          <div
            className=" flex flex-row text-center rounded-lg py-2 px-3 bg-[#323437]"
            key={nickname}
          >
            <span>{nickname}</span>
            <span>{score}</span>
          </div>
        );
      });
    } else {
      return "You didn't select mode or nobody tried test in this mode";
    }
  };
  return (
    <section className="col-end-5 row-span-4 h-[100%] bg-[#2c2e30] rounded-[10px] px-2 pb-4">
      <div className=" w-[100%] text-center py-2 h-[10%] text-[24px]">
        <span>Leaderboard</span>
      </div>
      <div className="flex flex-col py-3 px-1 gap-3 overflow-y-scroll h-[100%] no-scrollbar">
        {dataLeaderboard.length > 0
          ? dataLeaderboard.map(({ nickname, cps }, index) => {
              return (
                <div
                  className=" flex flex-row justify-between rounded-lg py-2 px-5 bg-[#323437]"
                  key={nickname}
                >
                  <div className="flex gap-2">
                    <span>{index + 1}</span>
                    <span>{nickname}</span>
                  </div>
                  <span>{cps}</span>
                </div>
              );
            })
          : "You didn't select mode or nobody tried test in this mode"}
      </div>
    </section>
  );
};

export default Leaderboard;
