import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useProductStore = create((set) => ({
    isLoading: false,
    products: null,
    geteveryproduct: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/products/geteveryproduct");
            console.log("the response from geteveryproduct in useProductStore in FrontEnd", res.data);
            set({ products: res.data });
        } catch (error) {
            console.log("Error in geteveryproduct in useProductStore in FrontEnd", error);
        } finally {
            set({ isLoading: false });
        }
    },
    getProducts: async () => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get("/products/getallproducts");
            console.log("the response from getProducts in useProductStore in FrontEnd", res.data);
            set({ products: res.data });
        } catch (error) {
            console.log("Error in getProducts in useProductStore in FrontEnd", error);
        } finally {
            set({ isLoading: false });
        }
    },
    getProductById: async (productId) => {
        set({ isLoading: true });
        try {
            const res = await axiosInstance.get(`/products/getproduct/${productId}`);
            console.log("the response from getProductById in useProductStore in FrontEnd", res.data);
            set({ singleProduct: res.data });
            return res.data;
        } catch (error) {
            console.log("Error in getProductById in useProductStore in FrontEnd", error);
        } finally {
            set({ isLoading: false });
        }
    },
}))