import React, {useState} from "react";
import bcrypt from 'bcryptjs';

const User = ()=>{
    const [username, username_set] = useState(null);
    const [userInput, userInput_set] = useState("");
    const [passInput, passInput_set] = useState("");

    const newUser = ()=>{
        console.log(userInput, "userInput");
        console.log(passInput, "passInput");
        const newPass = bcrypt.hashSync(passInput, 10);
        console.log(newPass);
    }

    

    return(
        <>
            <input type="text" onChange={(e)=> userInput_set(e.target.value)}/>
            <input type="text" onChange={(e)=> passInput_set(e.target.value)}/>
            <button onClick={newUser}>nuovo user</button>
        </>
    )
}

export default User;