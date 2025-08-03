
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Download, Search, Filter, CreditCard, Smartphone } from 'lucide-react';

interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  total: number;
  paymentProvider: 'razorpay' | 'phonepe';
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
}

const OrderManager = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ORD001',
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '+91 9876543210',
      total: 450,
      paymentProvider: 'razorpay',
      paymentStatus: 'paid',
      orderStatus: 'pending',
      date: '2024-01-15',
      items: [{ name: 'Groundnut Oil', quantity: 1, price: 450 }]
    },
    {
      id: 'ORD002',
      customerName: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+91 9876543211',
      total: 830,
      paymentProvider: 'phonepe',
      paymentStatus: 'paid',
      orderStatus: 'processing',
      date: '2024-01-14',
      items: [
        { name: 'Mustard Oil', quantity: 1, price: 380 },
        { name: 'Groundnut Oil', quantity: 1, price: 450 }
      ]
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterPaymentProvider, setFilterPaymentProvider] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const updateOrderStatus = (orderId: string, newStatus: Order['orderStatus']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, orderStatus: newStatus } : order
    ));
  };

  const updatePaymentStatus = (orderId: string, newStatus: Order['paymentStatus']) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, paymentStatus: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPaymentProvider = filterPaymentProvider === 'all' || order.paymentProvider === filterPaymentProvider;
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus;
    
    return matchesSearch && matchesPaymentProvider && matchesStatus;
  });

  const downloadCSV = () => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Phone', 'Total', 'Payment Provider', 'Payment Status', 'Order Status', 'Date', 'Items'],
      ...filteredOrders.map(order => [
        order.id,
        order.customerName,
        order.email,
        order.phone,
        order.total.toString(),
        order.paymentProvider,
        order.paymentStatus,
        order.orderStatus,
        order.date,
        order.items.map(item => `${item.name} (${item.quantity})`).join('; ')
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orders.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getOrderStatusColor = (status: Order['orderStatus']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'processing': return 'default';
      case 'shipped': return 'outline';
      case 'delivered': return 'default';
      default: return 'secondary';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending': return 'secondary';
      case 'paid': return 'default';
      case 'failed': return 'destructive';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-playfair font-bold">Order Management</h2>
        <Button onClick={downloadCSV} variant="outline">
          <Download size={16} className="mr-2" />
          Download CSV
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterPaymentProvider} onValueChange={setFilterPaymentProvider}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Payment Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Providers</SelectItem>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="phonepe">PhonePe</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.length}</div>
            <p className="text-sm text-muted-foreground">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.filter(o => o.paymentStatus === 'paid').length}</div>
            <p className="text-sm text-muted-foreground">Paid Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.filter(o => o.paymentProvider === 'razorpay').length}</div>
            <p className="text-sm text-muted-foreground">Razorpay</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{orders.filter(o => o.paymentProvider === 'phonepe').length}</div>
            <p className="text-sm text-muted-foreground">PhonePe</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders List ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{order.customerName}</div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{order.phone}</TableCell>
                  <TableCell>₹{order.total}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {order.paymentProvider === 'razorpay' ? (
                        <CreditCard size={16} className="text-blue-600" />
                      ) : (
                        <Smartphone size={16} className="text-purple-600" />
                      )}
                      <span className="capitalize">{order.paymentProvider}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPaymentStatusColor(order.paymentStatus) as any}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getOrderStatusColor(order.orderStatus) as any}>
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Select
                        value={order.orderStatus}
                        onValueChange={(value: Order['orderStatus']) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManager;
