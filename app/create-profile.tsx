// app/create-profile.tsx
import DatePickerField from "@/components/DatePickerField";
import GradientButton from "@/components/GradientButton";
import LoginHeader from "@/components/LoginHeader";
import TextField from "@/components/TextField";
import { Colors } from "@/constants/theme";
import { useSession } from "@/contexts/auth-context";
import { useThemeMode } from "@/hooks/use-theme-mode";
import { useAppDispatch } from "@/store/hooks";
import { createUserProfile } from "@/store/user.slice";
import { validateIIN } from "@/utils/validateIIN";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

export default function CreateProfileScreen() {
  const scheme = useThemeMode();
  const c = Colors[scheme];
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { updateUserDisplayName } = useSession();

  const scrollViewRef = useRef<ScrollView>(null);
  const fieldRefs = useRef<{ [key: string]: number }>({});

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    identificationNumber: "",
    dateOfBirth: "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    identificationNumber: "",
    dateOfBirth: "",
  });

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
      middleName: "",
      identificationNumber: "",
      dateOfBirth: "",
    };

    // Валидация имени
    if (!formData.firstName.trim()) {
      newErrors.firstName = "Имя обязательно";
    }

    // Валидация фамилии
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Фамилия обязательна";
    }

    // Валидация ИИН
    if (!formData.identificationNumber.trim()) {
      newErrors.identificationNumber = "ИИН обязателен";
    } else {
      const iinValidation = validateIIN(formData.identificationNumber);
      if (!iinValidation.isValid) {
        newErrors.identificationNumber =
          iinValidation.error || "Некорректный ИИН";
      }
    }

    // Валидация даты рождения
    if (!formData.dateOfBirth.trim()) {
      newErrors.dateOfBirth = "Дата рождения обязательна";
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = "Формат даты: YYYY-MM-DD";
    }

    setErrors(newErrors);
    return (
      !newErrors.firstName &&
      !newErrors.lastName &&
      !newErrors.identificationNumber &&
      !newErrors.dateOfBirth
    );
  };

  const handleCreateProfile = async () => {
    // Валидация формы
    if (!validateForm()) {
      return;
    }

    try {
      // Подготовка данных для отправки
      const profileData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        middleName: formData.middleName.trim() || undefined,
        identificationNumber: formData.identificationNumber.trim(),
        dateOfBirth: formData.dateOfBirth.trim(),
      };

      console.log("Creating profile with data:", profileData);

      // Отправка данных на сервер
      await dispatch(createUserProfile(profileData)).unwrap();

      // Обновление displayName в localStorage
      const displayName = `${profileData.firstName} ${profileData.lastName}`;
      await updateUserDisplayName(displayName);

      // Перенаправление на страницу профиля
      console.log("Profile created successfully");
      router.replace("/profile");
    } catch (error: any) {
      console.error("Failed to create profile:", error);
      setErrors({
        ...errors,
        firstName: error || "Ошибка создания профиля. Попробуйте позже",
      });
    }
  };

  const handleClose = () => {
    router.back();
  };

  const handleFocus = (fieldName: string) => {
    const yOffset = fieldRefs.current[fieldName];
    if (yOffset !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: yOffset - 100, animated: true });
    }
  };

  return (
    <View
      style={{
        position: "relative",
        backgroundColor: c.background,
        flex: 1,
      }}
    >
      <View
        style={{
          position: "absolute",
          right: 0,
          paddingTop: Platform.OS === "ios" ? 16 : 52,
          paddingHorizontal: 8,
          paddingBottom: 8,
          zIndex: 99,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleClose}
          style={{ padding: 4 }}
        >
          <Ionicons name="close" size={24} color={"#FFFFFF"} />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <LoginHeader
          title="Заполнение профиля"
          text="Пожалуйста, заполните все обязательные поля для создания вашего профиля"
        />
        <ScrollView
          ref={scrollViewRef}
          style={{ paddingHorizontal: 16, paddingBottom: 110, paddingTop: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            onLayout={(event) => {
              fieldRefs.current.firstName = event.nativeEvent.layout.y;
            }}
          >
            <TextField
              label="Имя *"
              value={formData.firstName}
              onChangeText={(text) => {
                setFormData({ ...formData, firstName: text });
                if (errors.firstName) setErrors({ ...errors, firstName: "" });
              }}
              onFocus={() => handleFocus("firstName")}
              placeholder="Введите имя"
              error={errors.firstName}
              style={{ marginBottom: 16 }}
            />
          </View>

          <View
            onLayout={(event) => {
              fieldRefs.current.lastName = event.nativeEvent.layout.y;
            }}
          >
            <TextField
              label="Фамилия *"
              value={formData.lastName}
              onChangeText={(text) => {
                setFormData({ ...formData, lastName: text });
                if (errors.lastName) setErrors({ ...errors, lastName: "" });
              }}
              onFocus={() => handleFocus("lastName")}
              placeholder="Введите фамилию"
              error={errors.lastName}
              style={{ marginBottom: 16 }}
            />
          </View>

          <View
            onLayout={(event) => {
              fieldRefs.current.middleName = event.nativeEvent.layout.y;
            }}
          >
            <TextField
              label="Отчество"
              value={formData.middleName}
              onChangeText={(text) => {
                setFormData({ ...formData, middleName: text });
                if (errors.middleName) setErrors({ ...errors, middleName: "" });
              }}
              onFocus={() => handleFocus("middleName")}
              placeholder="Введите отчество (необязательно)"
              error={errors.middleName}
              style={{ marginBottom: 16 }}
            />
          </View>

          <View
            onLayout={(event) => {
              fieldRefs.current.identificationNumber =
                event.nativeEvent.layout.y;
            }}
          >
            <TextField
              label="ИИН *"
              value={formData.identificationNumber}
              onChangeText={(text) => {
                setFormData({ ...formData, identificationNumber: text });
                if (errors.identificationNumber)
                  setErrors({ ...errors, identificationNumber: "" });
              }}
              onFocus={() => handleFocus("identificationNumber")}
              placeholder="Введите ИИН (12 цифр)"
              keyboardType="numeric"
              maxLength={12}
              error={errors.identificationNumber}
              style={{ marginBottom: 16 }}
            />
          </View>

          <DatePickerField
            label="Дата рождения *"
            value={formData.dateOfBirth}
            onChangeDate={(date) => {
              setFormData({ ...formData, dateOfBirth: date });
              if (errors.dateOfBirth) setErrors({ ...errors, dateOfBirth: "" });
            }}
            error={errors.dateOfBirth}
            style={{ marginBottom: 24 }}
          />

          <GradientButton
            title="Создать профиль"
            onPress={handleCreateProfile}
            style={{ marginBottom: 32 }}
          />

          {/* <View style={{ height: 210 }} /> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
