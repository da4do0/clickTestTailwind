import React, {useState, useEffect, useRef} from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";
import ClickArea from "./clickArea";

const Main = ()=>{
    const [click, click_set] = useState(0);
    const [goalSeconds, goalSeconds_set] = useState(0);
    const [seconds, seconds_set] = useState(0);

    /* const timer =useRef()

    const startTimer= ()=>{
        if(seconds==goalSeconds){
            stopTimer();
        }
        debugger;
        click_set(0);
        clearInterval(timer.current);
        timer.current = setInterval(()=>seconds_set((v)=>v+1), 1000);
    };

    const stopTimer=()=>{
        clearInterval(timer.current);
    }

    const updateTime = ()=>{
        seconds_set(new Date());
    }

    const mouseClick =()=>{
        if(goalSeconds!==0){
            if(!timer.current){
                startTimer();
            }
            if(seconds==goalSeconds){
                stopTimer();
            }else{
                click_set((v)=> v+1);
            }
        }
    }

    const uploadGoalSeconds = (newSeconds)=>{
        goalSeconds_set(newSeconds);
        console.log(newSeconds)
        seconds_set(0);
        click_set(0);
    } */

    const timer = useRef(null);

  const startTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    timer.current = setInterval(() => {
      seconds_set((v) => v + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const mouseClick = () => {
    if (goalSeconds !== 0 || goalSeconds !== seconds) {
        if(seconds!==goalSeconds){
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
    }
  }, [seconds, goalSeconds]);

    return(
        <main className=" py-[50px]">
            <section className="border border-red grid grid-cols-4 grid-rows-4 gap-4 w-[80%] h-[450px] mx-auto my-0">
                <InfoTest
                    seconds={seconds}
                    clicks={click}/>

                <TimeTest
                    uploadGoalSeconds={uploadGoalSeconds}
                    goalSeconds={goalSeconds}
                    />

                <Leaderboard/>
                <ClickArea
                    mouseClick={mouseClick}/>

            </section>
        </main>
    )
}

export default Main;