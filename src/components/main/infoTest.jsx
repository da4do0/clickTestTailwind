import React from "react";

const InfoTest = ({seconds})=>{

    return(
        <section className=" inline-flex items-center justify-evenly border border-violet col-span-2 col-start-2 row-span-1">
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>0</span>
                <span>Timer</span>
            </div>
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>0</span>
                <span>Timer</span>
            </div>
            <div className="border rounded-lg border-red inline-flex flex-col items-center px-10 py-3">
                <span>0</span>
                <span>Timer</span>
            </div>
        </section>
    )

}

export default InfoTest;