
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Generic API client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers = {
        ...config.headers,
        'Authorization': `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Product endpoints
  async getProducts() {
    return this.request('/products');
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(product: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  async updateProduct(id: string, product: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Order endpoints
  async getOrders() {
    return this.request('/orders');
  }

  async getUserOrders(userId: string) {
    return this.request(`/orders/user/${userId}`);
  }

  async createOrder(order: any) {
    console.log("order",order);
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  }

  async updateOrderStatus(orderId: string, status: string) {
    return this.request(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Payment endpoints - Razorpay
  async createRazorpayOrder(orderData: any) {
    return this.request('/payments/razorpay/create-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async verifyRazorpayPayment(paymentData: any) {
    return this.request('/payments/razorpay/verify', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  // Payment endpoints - PhonePe
  async initiatePhonePePayment(paymentData: any) {
    return this.request('/payments/phonepe/initiate', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    });
  }

  async checkPhonePeStatus(transactionId: string) {
    return this.request('/payments/phonepe/status', {
      method: 'POST',
      body: JSON.stringify({ transactionId }),
    });
  }

  // Admin auth
  async loginAdmin(credentials: { username: string; password: string }) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
