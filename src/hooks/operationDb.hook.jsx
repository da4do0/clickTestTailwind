import React, { useState, createContext, useContext } from "react";
import { useSupabase } from "./supabaseSession.hook";

const OperationDb = createContext();

export const OperationProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [id, id_set] = useState(null);
  const [nickname, nickname_set] = useState(null);

  const newRowTest = async (tempoTest, punteggioTest) => {
    uploadID();
    /* const { data, error } = await supabase
      .from("tests")
      .insert([{ tempo: tempoTest, click: punteggioTest}])
      .select(); */
  };

  const uploadNickname = (username)=>{
    nickname_set(username);
  }

  const uploadID = async () => {
    let { data: Utenti, error } = await supabase
    .from("Utenti")
    .select("id")
    .like('nickname', "da4do0");
    id_set(Utenti?.[0]?.id);
  };

  return(
    <>
        <OperationDb.Provider value={{newRowTest, uploadID}}>
            {children}
        </OperationDb.Provider>
    </>
  )
};

export const useOperationDb = ()=> useContext(OperationDb);