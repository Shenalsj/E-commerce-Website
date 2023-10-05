import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setCookies } from "../../utils/cookies";
import { User } from "./userTypes";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RefreshTokenBody {
  refreshToken: string;
}

export const loginAndStoreTokens = createAsyncThunk(
  "auth/loginAndStoreTokens",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login", 
        credentials
      );

      const { access_token, refresh_token } = response.data;

      setCookies("refreshToken", refresh_token, 3600);

      return access_token;
    } catch (error: any) {
      // Handle login error here
      return rejectWithValue((error.response?.data || "An error occurred during login") as string);
    }
  }
);

export const refreshTokenAndStoreTokens = createAsyncThunk(
  "auth/refreshTokenAndStoreTokens",
  async (refreshToken: string, { rejectWithValue }) => {
    try {
      const body: RefreshTokenBody = {
        refreshToken,
      };

      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/refresh-token", 
        body
      );

      const { access_token, refresh_token } = response.data;

      setCookies("refreshToken", refresh_token, 3600);

      return access_token;
    } catch (error: any) {
      // Handle refresh token error here
      return rejectWithValue((error.response?.data || "An error occurred while refreshing the token") as string);
    }
  }
);

const api = axios.create({
  baseURL: "https://api.escuelajs.co/api/v1/auth",
});

export const getProfile = createAsyncThunk(
  "auth/getProfile",
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const response = await api.get<User>(
        "/profile", 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return response.data;
    } catch (error:any) {
     
      return rejectWithValue((error.response?.data || "An error occurred while profile fetch") as string);
    }
  }
);
