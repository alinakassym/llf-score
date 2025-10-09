// app/signUp.tsx
import GradientButton from "@/components/GradientButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { app } from "@/firebaseConfig.js";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { Redirect, useRouter } from "expo-router";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

export default function signUpScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const router = useRouter();
  const { signIn, session } = useSession();

  if (session) return <Redirect href="/(tabs)" />;

  const handleSignUp = async (email: string, password: string) => {
    try {
      console.log("SignUp attempt:", email);
      const auth = getAuth(app);
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => console.log("SignUp Page res: ", res))
        .catch((err) => console.log("SignUp Page err: ", err));
      await signIn(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("SignUp failed:", error);
    }
  };

  return (
    <View style={{ backgroundColor: c.background }}>
      <LoginHeader
        title="Регистрация"
        text="Для регистрации введите свой адрес электронной почты и пароль"
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
          label="Придумайте пароль"
          value={password}
          onChangeText={setPassword}
          placeholder="Введите пароль"
          style={{ marginBottom: 24 }}
        />

        <TextField
          label="Повторите пароль"
          value={repeatedPassword}
          onChangeText={setRepeatedPassword}
          placeholder="Введите пароль повторно"
          style={{ marginBottom: 24 }}
        />

        <GradientButton
          title="Войти"
          onPress={() => handleSignUp(email, password)}
          style={{ marginBottom: 32 }}
        />
        {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
        </View> */}
      </ScrollView>
    </View>
  );
}
