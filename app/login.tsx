// app/login.tsx
import GradientButton from "@/components/GradientButton";
import LinkButton from "@/components/LinkButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useThemeMode } from "@/hooks/use-theme-mode";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ backgroundColor: c.background }}>
      <LoginHeader
        title="Добро пожаловать"
        text="Для входа в приложение введите свой номер мобильного телефона и пароль"
      />
      <ScrollView style={{ padding: 16, height: "100%" }}>
        <TextField
          label="Электронная почта"
          value={email}
          onChangeText={setEmail}
          placeholder="Введите email"
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          style={{ marginBottom: 24 }}
        />

        <LinkButton
          href="/"
          title="Забыли пароль?"
          style={{ marginBottom: 28 }}
        />
        <GradientButton
          title="Войти"
          onPress={() => {}}
          style={{ marginBottom: 32 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text>или</Text>
        </View>
      </ScrollView>
    </View>
  );
}
