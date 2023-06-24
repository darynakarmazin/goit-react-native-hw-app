import React from "react";
import RegistrationScreen from "./screens/RegistrationScreen";
import LoginScreen from "./screens/LoginScreen";
import CommentsScreen from "./screens/CommentsScreen";
import MapScreen from "./screens/MapScreen";
import Home from "./screens/Home";
import { useFonts } from "expo-font";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const MainStack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
  });
  // const navigation = useNavigation();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <MainStack.Screen
          name="CommentsScreen"
          component={CommentsScreen}
          options={{
            title: "Коментарі",
            headerStyle: {
              backgroundColor: "#FFFFFF",
            },
            headerTitleStyle: {
              fontWeight: 500,
              fontSize: 17,
              lineHeight: 22,
            },
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 16, marginBottom: 10 }}
                // onPress={() => navigation.goBack()}
              >
                <Feather name="arrow-left" size={24} color="#212121" />
              </TouchableOpacity>
            ),
          }}
        />
        <MainStack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
