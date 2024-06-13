import React, { useEffect, useState } from "react";
import { useOperationDb } from "../../hooks/operationDb.hook";
import { AreaChart } from "@mantine/charts";

import USER from '../../assets/6zgjtx.webp';
import TestChart from "./test-chart";

const User = () => {
  const [usernameI, usernameI_set] = useState("");
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");
  const [showLogin, showLogin_set] = useState(true);
  const [dataDTests, dataDTests_set] = useState([]);

  const { newUserRow, login, getUsername, dataDayliTests, getDataTests } = useOperationDb();

  useEffect(() => {
    if (getUsername() !== null) {
      usernameI_set(getUsername());
    }
  }, []);


  useEffect(()=>{
    
    console.log(getDataTests())
    if(dataDayliTests !== undefined){
      console.log(getDataTests())
      console.log(dataDayliTests)
      dataDTests_set(dataDayliTests)
    }
  }, [dataDayliTests, usernameI])

  const newUser = async (e) => {
    e.preventDefault();
    if (newUserRow(userInput, passInput)) {
      usernameI_set(userInput);
    }
    //TODO: else{messaggio errore user gia' esistente}
  };

  const loginUser = (e) => {
    e.preventDefault();
    if (login(userInput, passInput)) {
      usernameI_set(userInput);
    }
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
          newUser={newUser}
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
            <section className=" border border-red-950 w-[70%] h-[60%]">
              <div>
                <AreaChart
                  h={300}
                  data={dataDTests}
                  dataKey="date"
                  type="split"
                  strokeWidth={1}
                  dotProps={{ r: 2, strokeWidth: 1 }}
                  activeDotProps={{ r: 3, strokeWidth: 1 }}
                  series={[{ name: "cps", color: "bright" }]}
                />
              </div>
              <button onClick={getDataTests}>click</button>
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
