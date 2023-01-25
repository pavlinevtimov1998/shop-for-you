import * as apiService from "./apiService";

const endpoints = {
    getLast: "/products?limit=16",
    getOne: (productId) => `/products/${productId}`,
};

export const getLastProducts = () => apiService.getRequest(endpoints.getLast);

export const getOneProduct = (productId) =>
    apiService.getRequest(endpoints.getOne(productId));
