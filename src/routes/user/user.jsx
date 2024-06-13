import React, { useEffect, useState } from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";
import { AreaChart } from "@mantine/charts";

import USER from '../../assets/6zgjtx.webp';
import ChartTest from "./ChartTest";

const User = () => {
  const [usernameI, usernameI_set] = useState("");
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");
  const [showLogin, showLogin_set] = useState(true);

  const {
    newUserRow,
    login,
    dataDailyTest,
    registerDone,
    nickname,
    dataDayliTests
  } = useOperationDb();

  useEffect(()=>{
    usernameI_set(nickname);
  }, [nickname])


  useEffect(() => {
    usernameI_set(nickname);
    if(nickname !== ""){
      dataDailyTest();
    }
  }, []);

  const newUser = async (e) => {
    e.preventDefault();
    newUserRow(userInput, passInput)
    //TODO: else{messaggio errore user gia' esistente}
  };

  useEffect(()=>{
    usernameI_set(nickname)
  }, [registerDone])

  const loginUser = (e) => {
    e.preventDefault();
    login(userInput, passInput)
    //TODO: else{user o password errati}
  };

  const newUserInput = (e) => {
    userInput_set(e.target.value);
  };

  const newPassInput = (e) => {
    passInput_set(e.target.value);
  };

  const switchView = () => {
    return showLogin ? (
      <>
        <Login
          newUserInput={newUserInput}
          newPassInput={newPassInput}
          loginUser={loginUser}
        />
        <button onClick={() => showLogin_set(!showLogin)}>Sign Up</button>
      </>
    ) : (
      <>
        <SignUp
          newUser={newUser}
          newUserInput={newUserInput}
          newPassInput={newPassInput}
        />
        <button onClick={() => showLogin_set(!showLogin)}>Sign In</button>
      </>
    );
  };

  return (
    <>
      <main className=" absolute top-0 h-[100vh] w-[100%] grid place-items-center border border-red-950">
        {usernameI ? (
          <>
            <section className=" border border-red-950 w-[70%] h-[50%] flex">
              <div className="  w-[60%] h-[100%] bg-[#8a8a8a6b] p-3">
                <div className=" overflow-hidden rounded-[10px] grid place-items-center border border-green w-[150px] aspect-square">
                  <img src={USER} alt="" className=" object-cover w-[100%] h-[100%]"/>
                </div>
              </div>
              <ChartTest/>
              
              <div >
                <AreaChart
                  data={dataDayliTests || []}
                  dataKey="data"
                  type="split"
                  strokeWidth={1}
                  dotProps={{ r: 2, strokeWidth: 1 }}
                  activeDotProps={{ r: 3, strokeWidth: 1 }}
                  series={[{ name: "cps", color: "bright" }]}
                />
              </div>
              {/* //todo: hook che piglia i dati da operationdb e li ficca nei grafici */}
            </section>
          </>
        ) : (
          switchView()
        )}
      </main>
    </>
  );
};

const Login = ({ newUserInput, newPassInput, loginUser }) => {
  return (
    <>
      <form className="flex flex-col w-[40%] gap-2">
        <input
          type="text"
          placeholder="Username"
          className=" w-[50%] my-0 mx-auto text-black"
          onChange={(e) => newUserInput(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" w-[50%] my-0 mx-auto text-black"
          onChange={(e) => newPassInput(e)}
        />
        <button onClick={(e) => loginUser(e)}>Sing in</button>
      </form>
    </>
  );
};

const SignUp = ({ newUser, newUserInput, newPassInput }) => {
  return (
    <>
      <form className="flex flex-col w-[40%] gap-2">
        <input
          type="text"
          placeholder="Username"
          className=" w-[50%] my-0 mx-auto text-black"
          onChange={(e) => newUserInput(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" w-[50%] my-0 mx-auto text-black"
          onChange={(e) => newPassInput(e)}
        />
        <button onClick={newUser}>Sing up</button>
      </form>
    </>
  );
};

export default User;
