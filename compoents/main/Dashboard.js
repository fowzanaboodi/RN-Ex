import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  getAllItemsCountAsync,
  getDeliveredAsync,
  getCancelledAsync,
  selectItems,
  selectDeliveredItems,
  selectCancelledItems,
} from "../../feature/dashboard/dasboardSlice";

import { selectUser } from "../../feature/user/userSlice";

export default function Dashboard({ route, navigation }) {
  const getUser = useSelector(selectUser);

  const getTotalItems = useSelector(selectItems);
  const getDeliveredOrders = useSelector(selectDeliveredItems);
  const getCancelledItems = useSelector(selectCancelledItems);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUser) {
      dispatch(getAllItemsCountAsync(getUser.jwt));
      dispatch(getDeliveredAsync(getUser.jwt));
      dispatch(getCancelledAsync(getUser.jwt));
    }
  }, [dispatch, getUser]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            padding: 10,
            borderWidth: 0.5,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 50,
              borderRadius: 100,
              borderColor: "#6b0f1a",
              borderWidth: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              {getDeliveredOrders}
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>Total Orders</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            padding: 10,
            borderWidth: 0.5,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 50,
              borderRadius: 100,
              borderColor: "#6b0f1a",
              borderWidth: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              {getTotalItems}
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>Total Items</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            padding: 10,
            borderWidth: 0.5,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 50,
              borderRadius: 100,
              borderColor: "#6b0f1a",
              borderWidth: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              {getCancelledItems}
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>Cancelled Orders</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            padding: 10,
            borderWidth: 0.5,
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              padding: 50,
              borderRadius: 100,
              borderColor: "#6b0f1a",
              borderWidth: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "800" }}>
              {getDeliveredOrders}
            </Text>
          </View>
          <Text style={{ marginTop: 10 }}>Delivered Orders</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});
