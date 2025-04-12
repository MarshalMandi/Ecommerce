import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useSellerStore = create((set) => ({
    isAddingProduct: false,
    addProduct: async (prop) => {
        set({ isAddingProduct: true });
        try {
            const res = await axiosInstance.post("/seller/addproduct", prop);
        } catch (error) {
            console.log("Error in addProduct in useSellerStore in FrontEnd", error);
            toast.error("Failed to add product");
        } finally {
            set({ isAddingProduct: false });
        }
    },
}));