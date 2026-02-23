import api from './api';

export const authService = {
    login: (data) => api.post('/farmer/login', data),
    signup: (data) => api.post('/farmer/signup', data),
    forgotPassword: (data) => api.post('/farmer/forgot-password', data),
    resetPassword: (data) => api.post('/farmer/reset-password', data),
    getAll:() => api.get('/farmer/getAll'),
    getById:(id)=>api.get(`/getOne/${id}`),
    update:(data,id) => api.put(`/update/${id}`, data),
    delete:(data,id) => api.delete(`/delete/${id}`, { data }),
};

export const productService = {
    getAllProducts: () => api.get('/product/getAll'),
    createProducts: (data) => api.post('/product/createProduct', data),
    getById:(id)=>api.get(`/getOne/${id}`),
    delete:(data,id) => api.delete(`/delete/${id}`, { data }),
    update:(data,id) => api.put(`/update/${id}`, data),
};

export const cartService = {
    getCart: (farmerId) => api.get(`/cart/${farmerId}`),
    addToCart: (data) => api.post('/cart/add', data),
    increaseQty: (data) => api.put('/cart/increase', data),
    decreaseQty: (data) => api.put('/cart/decrease', data),
    removeItem: (data) => api.delete('/cart/remove-item', { data }),
    clearCart: (farmerId) => api.delete(`/cart/clear/${farmerId}`),
};

export const orderService = {
    getFarmerOrders: (farmerId) => api.get(`/order/farmer/${farmerId}`),
    placeOrder: (data) => api.post('/order', data),
    cancelOrder: (orderId) => api.patch(`/order/${orderId}/cancel`),
    updateStatus: (orderId) => api.patch(`/order/${orderId}/status`),
    getAll:() => api.get('/order'),
    getById:(id)=>api.get(`/order/${id}`),
};

export const contactService={
    contact:(data) => api.post('/contact', data),
    getAll:()=>api.get("/contact"),
    delete:(id)=>api.delete(`/contact/${id}`)
}