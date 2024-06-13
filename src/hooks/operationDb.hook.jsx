import React, { useState, createContext, useContext, useEffect } from "react";
import { useSupabase } from "./supabaseSession.hook";

const OperationDb = createContext();

export const OperationProvider = ({ children }) => {
  const { supabase } = useSupabase();
  const [id, id_set] = useState("");
  const [nickname, nickname_set] = useState(null);
  const [dataDayliTests, dataDayliTests_set] = useState([]);
  const [loginDone, loginDone_set] = useState(null);
  const [registerDone, registerDone_set] = useState(null);

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
    console.log(checkRowUser, "newCheckUser");
    if (checkRowUser.length === 0) {
      const { data } = await supabase
        .from("Utenti")
        .insert([{ nickname: username, password: password }])
        .select();
      if (data?.length > 0) {
        id_set(data?.[0]?.id);
        uploadNickname(username);
        registerDone_set(true);
      } else {
        registerDone_set(false);
      }
    }

    return true;
  };

  const login = async (username, password) => {
    let { data, error } = await supabase
      .from("Utenti")
      .select("id")
      .like("nickname", username)
      .like("password", password);
    if (data.length === 0) {
      loginDone_set(false);
    } else {
      uploadNickname(username);
      uploadIDUser(username);
      loginDone_set(true);
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
    console.log(id, "id dataDailyTest");
    const { data } = await supabase
      .from("tests")
      .select("cps, data")
      .eq("id_utente", id);

    console.log(data);
    dataDayliTests_set(data);
  };

  useEffect(() => {
    dataDailyTest();
  }, [id]);

  const getUsername = () => nickname;

  return (
    <>
      <OperationDb.Provider
        value={{
          newUserRow,
          login,
          newRowClick,
          getUsername,
          dataDayliTests,
          dataDailyTest,
          loginDone,
          registerDone,
          nickname
        }}
      >
        {children}
      </OperationDb.Provider>
    </>
  );
};

export const useOperationDb = () => useContext(OperationDb);
