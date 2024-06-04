import React, { useState, useEffect, useRef } from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";
import ClickArea from "./clickArea";
import Score from "./score";

const Main = () => {
  const [click, click_set] = useState(0);
  const [goalSeconds, goalSeconds_set] = useState(0);
  const [seconds, seconds_set] = useState(0);
  const [showResult, showResult_set] = useState(true);
  const timer = useRef(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      seconds_set((v) => v + 1 / 60);
    }, 1000 / 60);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const mouseClick = () => {
    if (goalSeconds !== 0 && goalSeconds !== Math.trunc(seconds)) {
      if (seconds !== goalSeconds) {
        click_set((v) => v + 1);
      }
      if (!timer.current) {
        startTimer();
      }
    }
  };

  const uploadGoalSeconds = (newSeconds) => {
    goalSeconds_set(newSeconds);
    seconds_set(0);
    click_set(0);
    if (timer.current) {
      stopTimer();
    }
  };

  useEffect(() => {
    if (seconds >= goalSeconds && goalSeconds !== 0) {
      stopTimer();
      showResult_set(true);
    }
  }, [seconds, goalSeconds]);

  return (
    <>
      <Score show={showResult} />
      <main className=" py-[50px]">
        <section className="border border-red grid grid-cols-4 grid-rows-4 gap-4 w-[80%] h-[450px] mx-auto my-0">
          <InfoTest seconds={seconds} clicks={click} />

          <TimeTest
            uploadGoalSeconds={uploadGoalSeconds}
            goalSeconds={goalSeconds}
          />

          <Leaderboard />

          <ClickArea mouseClick={mouseClick} />
        </section>
      </main>
    </>
  );
};

export default Main;
