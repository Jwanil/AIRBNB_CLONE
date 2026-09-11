const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  role: 'guest' | 'host';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
}

let isRefreshing = false;
let refreshSubscribers: ((tokenRefreshed: boolean) => void)[] = [];

function onTokenRefreshed(success: boolean) {
  refreshSubscribers.forEach((callback) => callback(success));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (tokenRefreshed: boolean) => void) {
  refreshSubscribers.push(callback);
}

/**
 * Fetch wrapper that handles JSON headers, credentials: 'include',
 * and automatic refresh-token rotation if access token expires.
 */
export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    credentials: 'include',
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  };

  try {
    const res = await fetch(url, config);
    const data: ApiResponse<T> = await res.json().catch(() => ({
      success: false,
      error: { message: 'Failed to parse response', code: 'PARSE_ERROR' },
    }));

    // If access token expired, attempt automatic refresh & retry
    if (res.status === 401 && data.error?.code === 'ACCESS_TOKEN_EXPIRED' && endpoint !== '/api/auth/refresh') {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshRes = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
          });
          const refreshData = await refreshRes.json();
          isRefreshing = false;

          if (refreshRes.ok && refreshData.success) {
            onTokenRefreshed(true);
            // Retry initial request
            return apiRequest<T>(endpoint, options);
          } else {
            onTokenRefreshed(false);
            return data;
          }
        } catch {
          isRefreshing = false;
          onTokenRefreshed(false);
          return data;
        }
      } else {
        // Wait for active refresh request to finish before retrying
        return new Promise((resolve) => {
          addRefreshSubscriber((success) => {
            if (success) {
              resolve(apiRequest<T>(endpoint, options));
            } else {
              resolve(data);
            }
          });
        });
      }
    }

    return data;
  } catch (err: any) {
    return {
      success: false,
      error: {
        message: err.message || 'Network error occurred',
        code: 'NETWORK_ERROR',
      },
    };
  }
}

export const authApi = {
  async register(data: { name: string; email: string; password: string }) {
    return apiRequest<{ user: User }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async login(data: { email: string; password: string }) {
    return apiRequest<{ user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async me() {
    return apiRequest<{ user: User }>('/api/auth/me', {
      method: 'GET',
    });
  },

  async refresh() {
    return apiRequest<{ user: User }>('/api/auth/refresh', {
      method: 'POST',
    });
  },

  async logout() {
    return apiRequest<{ message: string }>('/api/auth/logout', {
      method: 'POST',
    });
  },

  async logoutAll() {
    return apiRequest<{ message: string }>('/api/auth/logout-all', {
      method: 'POST',
    });
  },
};
