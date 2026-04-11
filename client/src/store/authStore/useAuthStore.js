import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../../utils/apiCalling.js";
import { addToast } from "@heroui/react";

const useAuthStore = create(
  persist(
    (set) => ({
      apiLoading: false,
      isAuthenticated: false,
      userData: {},

      login: async (req) => {
        debugger;
        set({ apiLoading: true });
        try {
          const response = await axiosInstance.post("/user/login", req);
          if (response?.data?.statusCode === 200) {
            sessionStorage.setItem("token", response?.data?.accessToken);
            set({ userData: { ...response?.data?.user } });
            set({ isAuthenticated: true });
          }
          return response;
        } catch (error) {
          addToast({
            title: error?.response?.data?.message,
            color: "danger",
          });
        } finally {
          set({ apiLoading: false });
        }
      },

      signUp: async (req) => {
        debugger;
        set({ apiLoading: true });
        const data = new FormData();
        data.append("firstName", req.firstName);
        data.append("lastName", req.lastName);
        data.append("email", req.email);
        data.append("password", req.password);
        data.append("role", req.role);
        data.append("profileImage", req.file);
        try {
          const response = await axiosInstance.post("/user/create-user", data);
          return response;
        } catch (error) {
          addToast({
            title: error?.response?.data?.message,
            color: "danger",
          });
        } finally {
          set({ apiLoading: false });
        }
      },
      forgotPassword: async (req) => {
        debugger;
        set({ apiLoading: true });
        try {
          const response = await axiosInstance.post(
            "/user/forgot-password",
            req
          );
          return response;
        } catch (error) {
          addToast({
            title: error?.response?.data?.message,
            color: "danger",
          });
        } finally {
          set({ apiLoading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
      }),
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
