// app/login.tsx
import GradientButton from "@/components/buttons/GradientButton";
import LinkButton from "@/components/buttons/LinkButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/form/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch } from "@/store/hooks";
import { fetchUserFullProfile, loginUser } from "@/store/user.slice";
import { Redirect, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";

export default function LoginScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { session, signIn } = useSession();
  const dispatch = useAppDispatch();

  if (session) return <Redirect href="/(tabs)" />;

  const handleLogin = async (email: string, password: string) => {
    // Очистка предыдущих ошибок
    setErrors({ email: "", password: "" });

    // Базовая валидация
    if (!email.trim() || !password.trim()) {
      setErrors({
        email: !email.trim() ? "Email обязателен" : "",
        password: !password.trim() ? "Пароль обязателен" : "",
      });
      return;
    }

    try {
      // Вызываем thunk для логина (Firebase + /api/auth/me)
      const result = await dispatch(loginUser({ email, password })).unwrap();

      // Сохраняем сессию в auth-context
      await signIn(email, password, result.userData);

      // Проверяем наличие полного профиля пользователя
      await dispatch(fetchUserFullProfile());

      // Если успешно - перенаправляем на главную
      console.log("Login successful:", result.profile);
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Login failed from thunk:", error);

      // Обработка ошибок
      const errorMessage = error || "Неизвестная ошибка";

      if (errorMessage.includes("не найден")) {
        setErrors({ email: errorMessage, password: "" });
      } else if (errorMessage.includes("пароль")) {
        setErrors({ email: "", password: errorMessage });
      } else if (errorMessage.includes("email")) {
        setErrors({ email: errorMessage, password: "" });
      } else {
        setErrors({ email: errorMessage, password: "" });
      }
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
          onChangeText={(text) => {
            setEmail(text);
            if (errors.email) setErrors({ ...errors, email: "" });
          }}
          placeholder="Введите email"
          error={errors.email}
          style={{ marginBottom: 16 }}
        />
        <TextField
          label="Пароль"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            if (errors.password) setErrors({ ...errors, password: "" });
          }}
          placeholder="Введите пароль"
          secureTextEntry
          error={errors.password}
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

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: c.textMuted }}>Нет аккаунта? </Text>
          <LinkButton href="/sign-up" title="Зарегистрироваться" />
        </View>

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
