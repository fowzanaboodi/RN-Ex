import { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  signinUser,
  selectUser,
  selectError,
  selectLoading,
  selectStatus,
} from "../../feature/user/userSlice";
import { AsyncStorage } from "react-native";
import {AUTH_TOKEN} from "../../apiService"

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const getUser = useSelector(selectUser);
  const getUserError = useSelector(selectError);
  const getLoading = useSelector(selectLoading);

  useEffect(() => {
    if (getUser) {
      const token = getUser.jwt;
      navigation.navigate("dashboard");
    }
  }, [getUser]);

  const handleFormSubmit = () => {
    let formData = { identifier: username, password: password };
    dispatch(signinUser(formData));
  };

  const getLoadingStatus = () => {
    ToastAndroid.show("Signing in...", ToastAndroid.LONG);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 50,
          }}
        >
          Welcome! Login to Continue
        </Text>
      </View>
      <View style={{ flexDirection: "column", margin: 15 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Username</Text>
        <TextInput
          placeholder="Enter username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={{
            fontSize: 20,
            padding: 10,
            backgroundColor: "#cccc",
            borderRadius: 10,
          }}
        ></TextInput>
      </View>
      <View style={{ flexDirection: "column", margin: 15 }}>
        <Text style={{ fontSize: 18, marginBottom: 10 }}>Password</Text>
        <TextInput
          placeholder="Enter password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={{
            fontSize: 20,
            padding: 10,
            backgroundColor: "#cccc",
            borderRadius: 10,
          }}
        ></TextInput>
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "skyblue",
          padding: 12,
          width: "50%",
          borderRadius: 5,
          marginTop: 20,
          marginLeft: "25%",
        }}
        onPress={() => handleFormSubmit()}
      >
        <Text style={{ fontSize: 18, textAlign: "center", color: "#ffff" }}>
          Login
        </Text>
      </TouchableOpacity>
      {getLoading && getLoadingStatus()}
      <Text>{getUserError}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#ffff",
  },
});
