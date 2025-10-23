import { app } from "@/firebaseConfig.js";
import { httpGet } from "@/services/http";
import { storage } from "@/utils/storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Типы
export type UserProfile = {
  firebaseUid: string;
  email: string;
  emailVerified: boolean;
  role: "admin" | "orgadmin" | "teamadmin" | "player" | "user";
};

export type UserState = {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
};

export type LoginResult = {
  profile: UserProfile;
  idToken: string;
  userData: {
    uid: string;
    email: string;
    displayName?: string;
    photoURL?: string;
  };
};

const initialState: UserState = {
  profile: null,
  loading: false,
  error: null,
};

// Константы для storage
const ID_TOKEN_STORAGE_KEY = "id_token";

// Async thunk для логина
export const loginUser = createAsyncThunk<
  LoginResult,
  { email: string; password: string },
  { rejectValue: string }
>(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      console.log("Login attempt:", email);
      const auth = getAuth(app);
      console.log("auth: ", auth);

      // Вход в Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log("Login Page res: ", userCredential);
      const idToken = await userCredential.user.getIdToken();
      console.log("getIdToken idToken: ", idToken);

      // Сохранение idToken в storage (нужен для /auth/me запроса)
      await storage.setItem(ID_TOKEN_STORAGE_KEY, idToken);
      console.log("idToken saved to storage");

      // Подготовка данных пользователя для auth-context
      const userData = {
        uid: userCredential.user.uid,
        email: userCredential.user.email || email,
        displayName: userCredential.user.displayName || undefined,
        photoURL: userCredential.user.photoURL || undefined,
      };

      // Получение профиля с backend
      const meResponse = await httpGet<UserProfile>("/api/auth/me");
      console.log("Auth me response:", meResponse);

      return {
        profile: meResponse,
        idToken,
        userData,
      };
    } catch (error: any) {
      console.error("Login failed:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Обработка ошибок Firebase
      const errorCode = error.code || "";
      const errorMessage = error.message || "";

      if (
        errorCode === "auth/user-not-found" ||
        errorMessage.includes("USER_NOT_FOUND")
      ) {
        return rejectWithValue("Пользователь не найден");
      } else if (
        errorCode === "auth/wrong-password" ||
        errorMessage.includes("INVALID_PASSWORD")
      ) {
        return rejectWithValue("Неверный пароль");
      } else if (
        errorCode === "auth/invalid-email" ||
        errorMessage.includes("INVALID_EMAIL")
      ) {
        return rejectWithValue("Некорректный email");
      } else if (
        errorCode === "auth/invalid-credential" ||
        errorMessage.includes("INVALID_LOGIN_CREDENTIALS")
      ) {
        return rejectWithValue("Неверный email или пароль");
      } else if (errorMessage.includes("TOO_MANY_ATTEMPTS_TRY_LATER")) {
        return rejectWithValue("Слишком много попыток. Попробуйте позже");
      } else if (errorMessage.includes("Ошибка авторизации на сервере")) {
        return rejectWithValue("Ошибка авторизации на сервере");
      } else {
        return rejectWithValue(`Ошибка входа: ${errorMessage}`);
      }
    }
  },
);

// Async thunk для получения профиля пользователя
export const fetchUserProfile = createAsyncThunk<
  UserProfile,
  void,
  { rejectValue: string }
>("user/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const meResponse = await httpGet<UserProfile>("/api/auth/me");
    console.log("Fetched user profile:", meResponse);
    return meResponse;
  } catch (error: any) {
    console.error("Failed to fetch user profile:", error);
    return rejectWithValue(
      error.message || "Ошибка получения профиля пользователя",
    );
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserProfile: (s) => {
      s.profile = null;
      s.loading = false;
      s.error = null;
    },
    clearUserError: (s) => {
      s.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.profile = a.payload.profile;
        s.error = null;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || "Неизвестная ошибка";
      })
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (s, a) => {
        s.loading = false;
        s.profile = a.payload;
        s.error = null;
      })
      .addCase(fetchUserProfile.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload || "Неизвестная ошибка";
      });
  },
});

export const { clearUserProfile, clearUserError } = userSlice.actions;
export default userSlice.reducer;

// Селекторы
export type RootState = { user: UserState };
export const selectUserProfile = (s: RootState) => s.user.profile;
export const selectUserLoading = (s: RootState) => s.user.loading;
export const selectUserError = (s: RootState) => s.user.error;
