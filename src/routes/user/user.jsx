import React, { useState } from "react";
import {useSupabase} from '../../hooks/supabaseSession.hook';

const User = () => {
  const [username, username_set] = useState(null);
  const [userInput, userInput_set] = useState("");
  const [passInput, passInput_set] = useState("");

  const {supabase} = useSupabase();

  const newUser = async () => {
    console.log(userInput, "userInput");
    console.log(passInput, "passInput");
    const { data, error } = await supabase
      .from("Utenti")
      .insert([{ nickname: "someValue", password: "otherValue" }])
      .select();
      console.log(error)
      console.log(data)
  };

  return (
    <>
      <input type="text" onChange={(e) => userInput_set(e.target.value)} />
      <input type="text" onChange={(e) => passInput_set(e.target.value)} />
      <button onClick={newUser}>nuovo user</button>
    </>
  );
};

const Login = ()=>{
    return(
        <>
            <form>
                <input type="text" />
            </form>
        </>
    );
}

export default User;
