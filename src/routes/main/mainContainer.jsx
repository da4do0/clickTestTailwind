import React, { useState, useEffect, useRef } from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";
import ClickArea from "./clickArea";
import PopUp from "./popUp";
import { useOperationDb } from "../../hooks/operationDb.hook";

const Main = () => {
  const [click, click_set] = useState(0);
  const [clickPerSec, clickPerSec_set] = useState(0);
  const [goalSeconds, goalSeconds_set] = useState(0);
  const [seconds, seconds_set] = useState(0);
  const [secondsStep, secondsStep_set] = useState(0);
  const [show, show_set] = useState(false);
  const [data, data_set] = useState([]);
  const {newRowClick} = useOperationDb();

  const addData=(sec, clickPerSec) =>{
    data_set([...data, {date: sec.toString(), click: clickPerSec}]);
  }

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
      newRowClick(goalSeconds, (click/seconds).toFixed(1), returnDate())
    }
  };

  const returnDate = ()=>{
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `{${year}-${month}-${day}}`;
  }

  const mouseClick = () => {
    if (goalSeconds !== 0 && goalSeconds !== Math.trunc(seconds)) {
      if (seconds !== goalSeconds) {
        click_set((v) => v + 1);
        clickPerSec_set((v) => v + 1);
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
    secondsStep_set(0);
    data_set([]);
    if (timer.current) {
      stopTimer();
    }
  };

  useEffect(() => {
    if(Math.trunc(seconds) === (secondsStep+1)){
      secondsStep_set((v)=>v+1);
      addData(Math.trunc(seconds), clickPerSec);
      clickPerSec_set(0);
    }
    if (seconds >= goalSeconds && goalSeconds !== 0) {
      stopTimer();
      console.log(data)
      show_set(true);
    }
  }, [seconds, goalSeconds, clickPerSec]);

  const hiddenPopUp =()=>{
    show_set(false);
  }

  return (
    <>
    
      <PopUp show={show} data={data} setShow={hiddenPopUp} seconds={seconds} clicks={click}/>
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

//avviare servizio tramite cron avvia richieste paginate con lavori ad intermittenza
//salvare dati utenti sulla macchina dell'utente
