
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;
console.log("API BASE URL =>", import.meta.env.VITE_API_BASE_URL);
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

  async getProduct(slug: string) {
    return this.request(`/products/${slug}`);
  }

  async createProduct(product: {name: string; category: string; price: number; imageUrl: string; stock: number; isActive: boolean}) {
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
  async getRelatedProducts(productId: string) {
    return this.request(`/products/${productId}/related`);
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
  //async loginAdmin(credentials: { username: string; password: string }) {
   // return this.request('/admin/login', {
    //  method: 'POST',
    //  body: JSON.stringify(credentials),
   // });
 // }
//async getAdminStats() {
//  return this.request('/admin/stats');
//}
// -----------------------------
  // Admin Auth
  // -----------------------------
  loginAdmin(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async getAdminStats() {
    try {
    return await this.request('/admin/stats'); 
  } catch (error: any) {
   if (error.message.includes('401')) {
  localStorage.removeItem('admin_token');
  window.location.href = '/auth/login';
  }
  throw error;
}
  }

  // -----------------------------
  // Admin - Products
  // -----------------------------
  getAllProductsAdmin() {
    return this.request('/admin/products');
  }

  createProductAdmin(product: any) {
    return this.request('/admin/products', {
      method: 'POST',
      body: JSON.stringify(product),
    });
  }

  updateProductAdmin(id: string, product: any) {
    return this.request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  deleteProductAdmin(id: string) {
    return this.request(`/admin/products/${id}`, {
      method: 'DELETE',
    });
  }

  // -----------------------------
  // Admin - Orders
  // -----------------------------
  getAllOrdersAdmin() {
    return this.request('/admin/orders');
  }

  updateOrderStatusAdmin(orderId: string, status: string) {
    return this.request(`/admin/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  deleteOrderAdmin(orderId: string) {
    return this.request(`/admin/orders/${orderId}`, {
      method: 'DELETE',
    });
  }

  // -----------------------------
  // Admin - Blogs
  // -----------------------------
  getAllBlogsAdmin() {
    return this.request('/admin/blogs');
  }

  createBlogAdmin(blog: any) {
    return this.request('/admin/blogs', {
      method: 'POST',
      body: JSON.stringify(blog),
    });
  }

  updateBlogAdmin(id: string, blog: any) {
    return this.request(`/admin/blogs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(blog),
    });
  }

  deleteBlogAdmin(id: string) {
    return this.request(`/admin/blogs/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
