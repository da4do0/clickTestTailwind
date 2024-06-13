import React, { useState, createContext, useContext } from "react";
import { useSupabase } from "./supabaseSession.hook";

const OperationDb = createContext();

export const OperationProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [id, id_set] = useState("");
  const [nickname, nickname_set] = useState(null);
  const [dataDayliTests, dataDayliTests_set] = useState([]);

  const newRowClick = async (tempoTest, punteggioTest, date) => {
    if (nickname) {
      await supabase
        .from("tests")
        .insert([{id_utente: id, tempo: tempoTest, cps: punteggioTest, data: date}])
        .select();
    }
  };

  const uploadNickname = (username) => {
    nickname_set(username);
  };

  const uploadIDUser = async (username)=> {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    id_set(data?.[0]?.id);
  }

  const newUserRow = async (username, password) => {
    const checkRowUser = await checkUsername(username);
    if (!checkRowUser?.[0]?.id) {
      return false;
    }
    id_set(checkRowUser?.[0]?.id);
    uploadNickname(username);
    await supabase
      .from("Utenti")
      .insert([{ nickname: username, password: password }])
      .select();
    return true;
  };

  const login = async (username, password) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username)
      .like("password", password);

    if (!data?.[0]?.id) {
      return false;
    }

    uploadNickname(username);
    uploadIDUser(username);
    return true;
  };

  const checkUsername = async (username) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username);
    return data;
  };

  const dataDailyTest = async ()=>{
    console.log(id, "id dataDailyTest")
    const {data} = await supabase
      .from("tests")
      .select("cps, data")
      .eq("id_utente", id);
    dataDayliTests_set(data);
  }

  const getDataTests = () => {
    console.log(dataDayliTests, "dataDayliTests")
    console.log(dataDailyTest(), "dataDayliTest")

  };

  const getUsername = () => nickname;

  return (
    <>
      <OperationDb.Provider
        value={{ newUserRow, login, newRowClick, getUsername, getDataTests}}
      >
        {children}
      </OperationDb.Provider>
    </>
  );
};

export const useOperationDb = () => useContext(OperationDb);
