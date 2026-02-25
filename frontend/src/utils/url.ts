/**
 * Returns the backend API base URL.
 * In production, reads from VITE_API_URL env var.
 * In development, falls back to empty string (uses Vite proxy).
 */
export const getApiBaseUrl = (): string => {
    const url = import.meta.env.VITE_API_URL || '';
    return url.endsWith('/') ? url.slice(0, -1) : url;
};

/**
 * Resolves an image path to a full URL.
 * - Base64 data URLs and external URLs are returned as-is.
 * - Relative paths like /uploads/... are prefixed with the backend URL.
 */
export const getImageUrl = (image: string): string => {
    if (!image) return '';
    if (image.startsWith('data:') || image.startsWith('http')) return image;
    if (image.startsWith('/uploads')) return `${getApiBaseUrl()}${image}`;
    return image;
};
