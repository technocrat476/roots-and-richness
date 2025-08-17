import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send email function
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"E-Commerce Store" <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html || `<p>${options.message}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

// Send order confirmation email
export const sendOrderConfirmation = async (order, user) => {
  const orderItemsHtml = order.orderItems.map(item => `
    <tr>
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>$${item.price}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Order Confirmation</h2>
      <p>Dear ${user.name},</p>
      <p>Thank you for your order! Here are the details:</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
        <h3>Order #${order._id}</h3>
        <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>

      <h3>Order Items:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Product</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Price</th>
            <th style="padding: 10px; text-align: left; border: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${orderItemsHtml}
        </tbody>
      </table>

      <div style="margin-top: 20px; text-align: right;">
        <p><strong>Subtotal: $${order.itemsPrice}</strong></p>
        <p><strong>Shipping: $${order.shippingPrice}</strong></p>
        <p><strong>Tax: $${order.taxPrice}</strong></p>
        ${order.discountAmount > 0 ? `<p><strong>Discount: -$${order.discountAmount}</strong></p>` : ''}
        <h3><strong>Total: $${order.totalPrice}</strong></h3>
      </div>

      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
        <h3>Shipping Address:</h3>
        <p>${order.shippingAddress.fullName}</p>
        <p>${order.shippingAddress.address}</p>
        <p>${order.shippingAddress.city}, ${order.shippingAddress.postalCode}</p>
        <p>${order.shippingAddress.country}</p>
      </div>

      <p>We'll send you another email when your order ships.</p>
      <p>Thank you for shopping with us!</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order Confirmation - #${order._id}`,
    html
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (user, resetUrl) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>Dear ${user.name},</p>
      <p>You are receiving this email because you (or someone else) has requested the reset of a password.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}" 
           style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
          Reset Password
        </a>
      </div>
      
      <p>If the button doesn't work, you can also click on the link below:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      <p>This link will expire in 10 minutes.</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    html
  });
};

// Send welcome email
export const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Our Store!</h2>
      <p>Dear ${user.name},</p>
      <p>Thank you for creating an account with us. We're excited to have you as part of our community!</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
        <h3>What's Next?</h3>
        <ul>
          <li>Browse our extensive product catalog</li>
          <li>Add items to your wishlist</li>
          <li>Enjoy exclusive member discounts</li>
          <li>Track your orders easily</li>
        </ul>
      </div>
      
      <p>If you have any questions, feel free to contact our support team.</p>
      <p>Happy shopping!</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to Our Store!',
    html
  });
};