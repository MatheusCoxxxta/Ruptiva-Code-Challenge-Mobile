import React, { useState, useCallback, useEffect } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import Form from "../../components/Main/Form";
import UserList from "../../components/Main/UserList";

import userType from "../../tools/userType";
import { User, IUsers } from "../../types";
import api from "../../../services/api";

const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const Main = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    await api
      .get("user")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
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
      .catch((error) => {
        console.log(error);
        setLoading(false);
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
      .catch((error) => {
        console.log(error);
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
        <UserList users={users} delete={handleDelete} />
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
