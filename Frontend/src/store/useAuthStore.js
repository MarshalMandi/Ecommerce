import { create } from "zustand"
import { axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast"

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
            toast.success(`client verified as ${res.data.role}`)
        } catch (error) {
            console.log("Error in checkAuth in useAuthStore in FrontEnd", error)
            toast.error("failed to fetch the info of client")
        } finally {
            set({ isCheckingAuth: false })
        }
    },
    signupUser: async (prop) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signupuser", prop)
            set({ authClient: res.data })
            toast.success(`client signed up as User`)
        } catch (error) {
            console.log("Error in signup in useAuthStore in FrontEnd", error)
            toast.error(`failed to sign up as User`)
        } finally {
            set({ isSigningUp: false })
        }
    },
    signupSeller: async (prop) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signupseller", prop)
            set({ authClient: res.data })
            toast.success(`client signed up as Seller`)
        } catch (error) {
            console.log("Error in signup in useAuthStore in FrontEnd", error)
            toast.error(`failed to sign up as Seller`)
        } finally {
            set({ isSigningUp: false })
        }
    },    
    login: async (prop) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", prop)
            set({ authClient: res.data })
            toast.success(`client logged in as ${res.data.role}`)
        } catch (error) {
            console.log("Error in login in useAuthStore in FrontEnd", error)
            toast.error(`failed to log in`)
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout: async () => {
        try {
            const res = await axiosInstance.post("/auth/logout")
            set({authClient: null})
            toast.success(`Logged Out Successfully`)
        } catch (error) {
            console.log("Error in logout in useAuthStore in Frontend", error)
            toast.error("failed to log out")
        }
    }
}))