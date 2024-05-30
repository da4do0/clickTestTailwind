import React from "react";
import InfoTest from "./infoTest";
import TimeTest from "./timeTest";
import Leaderboard from "./leaderboard";

const Main = ()=>{
    return(
        <main className=" py-[50px]">
            <section className="border border-red grid grid-cols-4 grid-rows-4 gap-4 w-[80%] h-[450px] mx-auto my-0">
                <InfoTest/>
                <TimeTest/>
                <Leaderboard/>
            </section>
        </main>
    )
}

export default Main;