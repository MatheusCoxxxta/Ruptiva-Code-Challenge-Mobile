import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Alert,
  ToastAndroid,
  Platform,
} from "react-native";
import Form from "../../components/Main/Form";
import UserList from "../../components/Main/UserList";

import userType from "../../tools/userType";
import { User } from "../../types";
import api from "../../../services/api";

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Main = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  /**
   * Loading States
   */
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(true);

  /**
   * Error Handling Stats
   */
  const [errorGetData, setErrorGetData] = useState<boolean>(false);
  const [sendDataError, setSendDataError] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUsers();

    wait(2000).then(() => setRefreshing(false));
  }, []);

  /**
   * getUsers
   * @param
   */

  const getUsers = async () => {
    setLoadingData(true);
    await api
      .get("user")
      .then((response) => {
        setUsers(response.data);
        setLoadingData(false);
      })
      .catch(() => {
        setLoadingData(false);
        setErrorGetData(true);
      });
  };

  /**
   * handleForm
   * @param {string} name
   * @param {string} document
   */

  const handleForm = (name: string, document: string) => {
    setLoading(true);
    let data = {
      name: name,
      document: document,
      type: userType(document),
    };
    api
      .post("user", data)
      .then((response) => {
        const newList = [...users, response.data];
        setUsers(newList);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        Platform.OS !== "android"
          ? Alert.alert(
              "Ocorreu um erro!",
              "Algo falhou ao tentar cadastrar o usuário...",
              [
                {
                  text: "Ok",
                  style: "cancel",
                },
              ]
            )
          : ToastAndroid.show(
              "Algo falhou ao tentar cadastrar o usuário...",
              ToastAndroid.LONG
            );
      });
  };

  /**
   * handleDelete
   * @param user
   */

  const handleDelete = (user: User) => {
    let id = user._id;
    api
      .delete(`user/${id}`)
      .then(() => {
        const newList = users.filter((user) => user._id !== id);
        setUsers(newList);
      })
      .catch(() => {
        Platform.OS !== "android"
          ? Alert.alert(
              "Ocorreu um erro!",
              "Algo falhou ao tentar deletar o usuário...",
              [
                {
                  text: "Ok",
                  style: "cancel",
                },
              ]
            )
          : ToastAndroid.show(
              "Algo falhou ao tentar deletar o usuário...",
              ToastAndroid.LONG
            );
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ImageBackground
          source={require("../../../assets/ruptiva-logo.png")}
          imageStyle={{ width: 70, height: 40 }}
          style={styles.container}
          resizeMode="center"
        />

        <Form handle={handleForm} loading={loading} />
        <UserList
          users={users}
          delete={handleDelete}
          loading={loadingData}
          error={errorGetData}
        />
      </ScrollView>
    </>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 30,
    alignSelf: "center",
    width: "90%",
    height: 100,
  },
  scrollView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e0e0e5",
    paddingTop: 0,
  },
});
