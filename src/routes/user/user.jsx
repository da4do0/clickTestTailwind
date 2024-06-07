import React, { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/supabaseSession.hook";
import { useDataUserLogin } from "../../hooks/dataUserLogin.hook";

const User = () => {
  const [usernameI, usernameI_set] = useState(null);
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");

  const { supabase } = useSupabase();
  const { uploadUsername, username } = useDataUserLogin();

  const newUser = async (e) => {
    e.preventDefault();
    console.log(userInput, "userInput");
    console.log(passInput, "passInput");
    const { data, error } = await supabase
      .from("Utenti")
      .insert([{ nickname: userInput, password: passInput }])
      .select();
    console.log(error);
    console.log(data);
  };

  const newUserInput=(e)=>{
    userInput_set(e.target.value)
  }

  const newPassInput=(e)=>{
    passInput_set(e.target.value)
  }

  return (
    <>
      {/* <Login newUser={newUser} /> */}
      <SignUp newUser={newUser} newUserInput={newUserInput} newPassInput={newPassInput}/>
    </>
  );
};

const Login = ({ newUser }) => {
  return (
    <>
      <section className=" absolute top-0 h-[100vh] w-[100%] grid place-items-center ">
        <form className="flex flex-col w-[40%] gap-2">
          <input
            type="text"
            placeholder="Username"
            className=" w-[50%] my-0 mx-auto"
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-[50%] my-0 mx-auto"
          />
          <button onClick={newUser}>Sing in</button>
        </form>
      </section>
    </>
  );
};

const SignUp = ({ newUser, newUserInput, newPassInput}) => {
  return (
    <>
      <section className=" absolute top-0 h-[100vh] w-[100%] grid place-items-center ">
        <form className="flex flex-col w-[40%] gap-2">
          <input
            type="text"
            placeholder="Username"
            className=" w-[50%] my-0 mx-auto"
            onChange={(e)=>newUserInput(e)}
          />
          <input
            type="password"
            placeholder="Password"
            className=" w-[50%] my-0 mx-auto"
            onChange={(e)=>newPassInput(e)} 
          />
          <button onClick={newUser}>Sing in</button>
        </form>
      </section>
    </>
  );
};

export default User;
