import React, {useState, useEffect} from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";
import ClickArea from "./clickArea";

const Main = ()=>{
    const [click, click_set] = useState(0);
    const [goalSeconds, goalSeconds_set] = useState(0);
    const [seconds, seconds_set] = useState(0);

    const timer =()=>{
        seconds_set((v)=>v+1);
    }

    useEffect(()=>{
        console.log(seconds)
    }, [seconds])

    async function incrementSeconds() {
        while (seconds < goalSeconds) {
          await new Promise(resolve => setTimeout(resolve, 1000)); // Attende 1 secondo
          seconds_set((v) => v+1);
        }
      }

    const mouseClick =()=>{
        incrementSeconds();
        click_set((v)=> v+1);
    }

    const uploadSeconds = (newSeconds)=>{
        seconds_set(newSeconds);
    }

    const uploadGoalSeconds = (newSeconds)=>{
        console.log(newSeconds);
        goalSeconds_set(newSeconds);
    }

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