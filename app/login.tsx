// app/login.tsx
import FacebookButton from "@/components/FacebookButton";
import GoogleButton from "@/components/GoogleButton";
import GradientButton from "@/components/GradientButton";
import LinkButton from "@/components/LinkButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { signIn, session } = useSession();

  if (session) return <Redirect href="/(tabs)" />;

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("Login attempt:", email);
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

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
          onPress={() => handleLogin(email, password)}
          style={{ marginBottom: 32 }}
        />
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ color: c.text }}>или</Text>
        </View>
        <View
          style={{
            marginTop: 32,
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "48%" }}>
            <FacebookButton />
          </View>
          <View style={{ width: "48%" }}>
            <GoogleButton />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
