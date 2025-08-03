
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { AdminProvider } from "./contexts/AdminContext";
import ErrorBoundary from "./components/ui/ErrorBoundary";
import { Suspense, lazy } from "react";
import Loading from "./components/ui/Loading";

// Lazy load components for better performance
const AdminRoute = lazy(() => import("./components/admin/AdminRoute"));
const Header = lazy(() => import("./components/layout/Header"));
const Footer = lazy(() => import("./components/layout/Footer"));
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderConfirmation = lazy(() => import("./pages/OrderConfirmation"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const ShippingPolicy = lazy(() => import("./pages/policies/ShippingPolicy"));
const ReturnRefundPolicy = lazy(() => import("./pages/policies/ReturnRefundPolicy"));
const PrivacyPolicy = lazy(() => import("./pages/policies/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/policies/TermsAndConditions"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AdminProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <div className="min-h-screen flex flex-col">
                <Routes>
                  {/* Admin Routes */}
                  <Route path="/admin/login" element={
                    <Suspense fallback={<Loading fullScreen text="Loading admin..." />}>
                      <AdminLogin />
                    </Suspense>
                  } />
                  <Route path="/admin" element={
                    <Suspense fallback={<Loading fullScreen text="Loading dashboard..." />}>
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    </Suspense>
                  } />
                  
                  {/* Public Routes */}
                  <Route path="/*" element={
                    <Suspense fallback={<Loading fullScreen text="Loading..." />}>
                      <Header />
                      <main className="flex-1">
                        <ErrorBoundary>
                          <Routes>
                            <Route path="/" element={<Index />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/products/:slug" element={<ProductDetail />} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/checkout" element={<Checkout />} />
                            <Route path="/order-confirmation" element={<OrderConfirmation />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:slug" element={<BlogPost />} />
                            <Route path="/faq" element={<FAQ />} />
                            <Route path="/shipping-policy" element={<ShippingPolicy />} />
                            <Route path="/return-refund-policy" element={<ReturnRefundPolicy />} />
                            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                            <Route path="*" element={<NotFound />} />
                          </Routes>
                        </ErrorBoundary>
                      </main>
                      <Footer />
                    </Suspense>
                  } />
                </Routes>
              </div>
            </BrowserRouter>
          </CartProvider>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
