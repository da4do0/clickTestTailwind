import React, { useEffect, useState } from "react";
import { useSupabase } from "../../hooks/supabaseSession.hook";
import { useDataUserLogin } from "../../hooks/dataUserLogin.hook";

const User = () => {
  const [usernameI, usernameI_set] = useState("");
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");
  const [showLogin, showLogin_set] = useState(true);

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
    if (data?.[0]?.nickname) {
      uploadUsername(data?.[0]?.nickname);
      usernameI_set(data?.[0]?.nickname);
    }
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
        <Login newUser={newUser} />
        <button onClick={() => showLogin_set(!showLogin)}>
          {showLogin ? "Sign In" : "SignUp"}
        </button>
      </>
    ) : (
      <>
        <SignUp
          newUser={newUser}
          newUserInput={newUserInput}
          newPassInput={newPassInput}
        />
        <button onClick={() => showLogin_set(!showLogin)}>
          {showLogin ? "Sign In" : "SignUp"}
        </button>
      </>
    );
  };

  return (
    <>
      <main className=" absolute top-0 h-[100vh] w-[100%] grid place-items-center border border-red-950">
        {!usernameI ? (
          <>
              <section className=" border border-red-950 w-[70%] h-[60%]">
                
              </section>
          </>
        ) : (
          switchView()
        )}
      </main>
    </>
  );
};

const Login = ({ newUser }) => {
  return (
    <>
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
          className=" w-[50%] my-0 mx-auto"
          onChange={(e) => newUserInput(e)}
        />
        <input
          type="password"
          placeholder="Password"
          className=" w-[50%] my-0 mx-auto"
          onChange={(e) => newPassInput(e)}
        />
        <button onClick={newUser}>Sing up</button>
      </form>
    </>
  );
};

export default User;
