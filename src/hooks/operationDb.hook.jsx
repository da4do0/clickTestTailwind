import React, { useState, createContext, useContext } from "react";
import { useSupabase } from "./supabaseSession.hook";

const OperationDb = createContext();

export const OperationProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [id, id_set] = useState(15);
  const [nickname, nickname_set] = useState("da4do0");
  const [dataDayliTests, dataDayliTests_set] = useState([]);
  const [registerDone, registerDone_set] = useState(null);
  const [chartTestData, chartTestData_set] = useState([]);

  const newRowClick = async (tempoTest, punteggioTest, date) => {
    if (nickname) {
      await supabase
        .from("tests")
        .insert([
          { id_utente: id, tempo: tempoTest, cps: punteggioTest, data: date },
        ])
        .select();
    }
  };

  const uploadNickname = (username) => {
    nickname_set(username);
  };

  const uploadIDUser = async (username) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    id_set(data?.[0]?.id);
  };

  const newUserRow = async (username, password) => {
    const checkRowUser = await checkUsername(username);
    console.log(checkRowUser)
    if (checkRowUser.length ===0) {
      const {data}=await supabase
        .from("Utenti")
        .insert([{ nickname: username, password: password }])
        .select();
      if(data.length>0){
        uploadNickname(username);
        uploadIDUser(username);
        registerDone_set(true);
      }
    }
  };

  const login = async (username, password) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username)
      .like("password", password);

    console.log(data);

    if (data.length > 0) {
      uploadNickname(username);
      uploadIDUser(username);
    }
  };

  const checkUsername = async (username) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    return data;
  };

  const dataDailyTest = async () => {
    const { data } = await supabase
      .from("tests")
      .select("cps, data")
      .eq("id_utente", id);
    dataDayliTests_set(data);
  };

  const reloadChartsFilter = async (time)=>{
    const { data } = await supabase
      .from("tests")
      .select("cps, data")
      .eq("tempo", time)
      .eq("id_utente", id);
    chartTestData_set(data);
  }

  return (
    <>
      <OperationDb.Provider
        value={{
          newUserRow,
          login,
          newRowClick,
          dataDayliTests,
          dataDailyTest,
          nickname,
          registerDone,
          reloadChartsFilter,
          chartTestData
        }}
      >
        {children}
      </OperationDb.Provider>
    </>
  );
};

export const useOperationDb = () => useContext(OperationDb);
