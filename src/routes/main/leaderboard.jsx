import React, {useState} from "react";

const Leaderboard = ()=>{
    const [listaUser, listaUser_set] = useState([
        {
            nickname: "luca",
            score: "8.2c/s"
        },
        {
            nickname: "maira",
            score: "4.6c/s"
        }
    ]);
    const fillLeaderboard = (lista)=>{
        listaUser_set(lista);
    }
    return(
        <section className="border border-red col-end-5 row-span-4 h-[100%]">
            <div className="flex flex-col py-3 px-1 gap-3 overflow-y-scroll h-[100%] no-scrollbar">
                {
                
                    listaUser.map(({nickname, score})=>{
                        return(
                            <>
                                <div className=" border border-red flex flex-row">                    
                                    <span>{nickname}</span>
                                    <span>{score}</span>
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Leaderboard;