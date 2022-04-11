import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { StyleSheet, Button, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./compoents/auth/Login";
import Dashboard from "./compoents/main/Dashboard";
import Items from "./compoents/main/Items";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="dashboard"
            component={Dashboard}
            options={{ title: "Dashboard", headerBackTitle: "" }}
          ></Stack.Screen>
          <Stack.Screen name="items" component={Items}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
