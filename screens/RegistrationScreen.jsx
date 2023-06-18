import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Button } from "react-native";

export const RegistrationScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../img/photo-bg.png")}
        resizeMode="cover"
        style={styles.image}
      />
      <View style={styles.form}>
        <Image />
        <Text>Реєстрація</Text>
        <View>
          <TextInput placeholder="Логін"></TextInput>
          <TextInput placeholder="Адреса електронної пошти"></TextInput>
          <TextInput placeholder="Пароль"></TextInput>
        </View>
        <Button title="Зареєстуватися" />
        <Text>Вже є акаунт? Увійти</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  form: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
  },
});
