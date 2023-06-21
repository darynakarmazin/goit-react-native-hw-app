import React from "react";
import { Image, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tabs = createBottomTabNavigator();

const Home = () => {
  return (
    <Tabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Profile") {
            iconName = focused
              ? "ios-information-circle"
              : "ios-information-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "ios-list-box" : "ios-list";
          }
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          title: "Публікації",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          headerRight: () => (
            <Image
              source={require("../assets/log-out.png")}
              style={{ marginRight: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          title: "Створити публікацію",
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTitleStyle: {
            fontWeight: 500,
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Image
              source={require("../assets/arrow-left.png")}
              style={{ marginLeft: 16 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tabs.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
