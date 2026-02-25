import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getApiBaseUrl } from '../utils/url';

const API_BASE = `${getApiBaseUrl()}/api`;

interface User {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    phone?: string;
    address?: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (updatedUser: User) => void;
    refreshUser: () => Promise<void>;
    loading: boolean;
    isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }
        setLoading(false);
    }, []);

    const login = useCallback(async (email: string, password: string) => {
        const res = await fetch(`${API_BASE}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Login failed');
        }
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }, []);

    const register = useCallback(async (name: string, email: string, password: string) => {
        const res = await fetch(`${API_BASE}/users/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Registration failed');
        }
        const data = await res.json();
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('marketplace_cart');
    }, []);

    // Update user data in state and localStorage (after profile edit)
    const updateUser = useCallback((updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    }, []);

    // Refresh user data from the server
    const refreshUser = useCallback(async () => {
        const currentToken = localStorage.getItem('token');
        if (!currentToken) return;
        try {
            const res = await fetch(`${API_BASE}/users/me`, {
                headers: { 'Authorization': `Bearer ${currentToken}` },
            });
            if (res.ok) {
                const freshUser = await res.json();
                setUser(freshUser);
                localStorage.setItem('user', JSON.stringify(freshUser));
            }
        } catch (err) {
            console.error('Failed to refresh user:', err);
        }
    }, []);

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, refreshUser, loading, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
