import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
// import toast from "react-hot-toast"

export const useAuthStore = create((set) => ({
    authClient: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: false,
    checkAuth: async () => {
        set({ isCheckingAuth: true })
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authClient: res.data })
        } catch (error) {
            console.log("Error in checkAuth in useAuthStore in FrontEnd", error)
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signup: async (prop) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signupuser", prop)
            set({ authClient: res.data })
        } catch (error) {
            console.log("Error in signup in useAuthStore in FrontEnd", error)
        } finally {
            set({ isSigningUp: false })
        }
    },
    login: async (prop) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", prop)
            set({ authClient: res.data })
        } catch (error) {
            console.log("Error in login in useAuthStore in FrontEnd", error)
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({authClient: null})
        } catch (error) {
            console.log("Error in logout in useAuthStore in Frontend", error)
        }
    }
}))