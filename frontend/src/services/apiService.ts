const API_BASE = '/api';

const getAuthHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token');
    const headers: HeadersInit = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
};

export const apiService = {
    // ---- Products ----
    async getProducts(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/products`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
    },

    async getProductById(id: string): Promise<any> {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error('Product not found');
        return res.json();
    },

    async createProduct(data: any): Promise<any> {
        const res = await fetch(`${API_BASE}/products`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
        return res.json();
    },

    async updateProduct(id: string, data: any): Promise<any> {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
        return res.json();
    },

    async deleteProduct(id: string): Promise<any> {
        const res = await fetch(`${API_BASE}/products/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders(),
        });
        if (!res.ok) { const err = await res.json(); throw new Error(err.message); }
        return res.json();
    },

    // ---- Orders ----
    async getMyOrders(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/orders/my`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },

    async createOrder(orderData: any): Promise<any> {
        const res = await fetch(`${API_BASE}/orders`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(orderData),
        });
        if (!res.ok) throw new Error('Failed to create order');
        return res.json();
    },

    async getAllOrders(): Promise<any[]> {
        const res = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() });
        if (!res.ok) throw new Error('Failed to fetch orders');
        return res.json();
    },
};
