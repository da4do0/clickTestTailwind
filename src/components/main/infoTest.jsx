import React from "react";

const InfoTest = ({seconds=0, clicks=0})=>{

    const clickXsecond = ()=>{
        if(isNaN(clicks/seconds) || (clicks/seconds)==Infinity){
            return 0;
        }
        return (clicks/seconds).toFixed(1);
    }

    return(
        <section className=" inline-flex items-center justify-evenly border border-violet col-span-2 col-start-2 row-span-1">
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>{seconds}</span>
                <span>Timer</span>
            </div>
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>{clickXsecond()}</span>
                <span>Click/s</span>
            </div>
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>{clicks}</span>
                <span>Clicks</span>
            </div>
        </section>
    )

}

export default InfoTest;