import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { addToast } from "@heroui/react";
import { axiosInstance } from "../../utils/apiCalling/index";

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
          const response = await axiosInstance.post("/auth/login", req);
          if (response?.data?.statusCode === 200) {
            sessionStorage.setItem("token", response?.data?.data?.accessToken);
            set({ userData: { ...response?.data?.data?.user } });
            set({ isAuthenticated: true });
          }
          return response;
        } catch (error) {
          // addToast({
          //   title: error?.response?.data?.message,
          //   color: "danger",
          // });
        } finally {
          set({ apiLoading: false });
        }
      },

      signUp: async (req) => {
        set({ apiLoading: true });
        const data = new FormData();
        data.append("firstName", req.firstName);
        data.append("lastName", req.lastName);
        data.append("email", req.email);
        data.append("password", req.password);
        data.append("role", req.role);
        data.append("profileImage", req.file);
        try {
          const response = await axiosInstance.post("/auth/create-user", data);
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
        set({ apiLoading: true });
        try {
          const response = await axiosInstance.post(
            "/auth/forgot-password",
            req,
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
      logOut: async () => {
        try {
          const response = await axiosInstance.post("/auth/logout");
          if (response?.data?.statusCode === 200) {
            sessionStorage.clear("token");
            sessionStorage.clear("auth-storage");
            set({ userData: {} });
            set({ isAuthenticated: false });
            return response;
          } else {
            addToast({
              title: error?.response?.data?.message,
              color: "danger",
            });
          }
        } catch (error) {
          // addToast({
          //   title: error?.response?.data?.message,
          //   color: "danger",
          // });
        }
      },

      googleAuth: async (req) => {
        set({ apiLoading: true });
        try {
          const response = await axiosInstance.post("/auth/google-auth", req);
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
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        userData: state.userData,
      }),
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useAuthStore;
