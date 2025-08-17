
import { FileText, Scale, Shield, AlertTriangle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
              Terms & Conditions
            </h1>
            <p className="text-lg text-neutral-dark">
              Legal terms governing the use of Roots & Richness website and services
            </p>
            <p className="text-sm text-neutral-medium mt-2">
              Effective Date: December 2024
            </p>
          </div>

          {/* Legal Icons */}
          <div className="flex justify-center space-x-8 mb-12">
            <div className="text-center">
              <Scale className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">Legal Compliance</p>
            </div>
            <div className="text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">User Protection</p>
            </div>
            <div className="text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">Clear Terms</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Alert className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                By using our website and services, you agree to these terms and conditions. Please read them carefully before making any purchase.
              </AlertDescription>
            </Alert>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="general-terms">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  1. General Terms of Use
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="space-y-3">
                    <p><strong>1.1 Acceptance:</strong> By accessing and using the Roots & Richness website, you accept and agree to be bound by these terms.</p>
                    <p><strong>1.2 Modifications:</strong> We reserve the right to modify these terms at any time without prior notice. Continued use after changes constitutes acceptance.</p>
                    <p><strong>1.3 Eligibility:</strong> You must be at least 18 years old and legally capable of entering into binding contracts.</p>
                    <p><strong>1.4 Account Responsibility:</strong> You are responsible for maintaining the confidentiality of your account information.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="buyer-eligibility">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  2. Buyer Eligibility & Requirements
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-accent-green/10 rounded-lg border border-accent-green/20">
                      <h4 className="font-semibold text-accent-green mb-2">✓ Eligible Buyers</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Indian residents aged 18+</li>
                        <li>• Valid contact information</li>
                        <li>• Legitimate delivery address</li>
                        <li>• Valid payment method</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-600 mb-2">✗ Restrictions</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Commercial resellers without agreement</li>
                        <li>• Fraudulent or suspicious activities</li>
                        <li>• Violation of these terms</li>
                        <li>• International customers (currently)</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="pricing-payment">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  3. Product Pricing, Payments & Taxes
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">3.1 Pricing</h4>
                      <ul className="list-disc ml-6 space-y-1 text-sm">
                        <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                        <li>Prices may change without notice due to market conditions</li>
                        <li>Promotional prices are valid for limited periods</li>
                        <li>Bulk pricing may be available for large orders</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">3.2 Payments</h4>
                      <ul className="list-disc ml-6 space-y-1 text-sm">
                        <li>Payment is required at the time of order placement</li>
                        <li>We accept all major cards, UPI, net banking, and wallets via Razorpay</li>
                        <li>All transactions are secure and encrypted</li>
                        <li>Cash on Delivery (COD) may be available for select orders</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">3.3 Taxes</h4>
                      <p className="text-sm">All applicable taxes including GST are included in the displayed price. Tax invoices will be provided for all purchases.</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="order-fulfillment">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  4. Order Acceptance & Fulfillment
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="space-y-3">
                    <p><strong>4.1 Order Confirmation:</strong> Orders are confirmed upon payment verification and inventory availability.</p>
                    <p><strong>4.2 Right to Refuse:</strong> We reserve the right to refuse or cancel orders for any reason, including pricing errors or stock unavailability.</p>
                    <p><strong>4.3 Delivery Timeline:</strong> Delivery times are estimates and may vary due to unforeseen circumstances.</p>
                    <p><strong>4.4 Risk Transfer:</strong> Risk of loss transfers to you upon delivery to the specified address.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="intellectual-property">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  5. Intellectual Property Rights
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h4 className="font-semibold text-secondary mb-2">Protected Content</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Brand name, logos, and trademarks</li>
                      <li>• Website design and content</li>
                      <li>• Product descriptions and images</li>
                      <li>• Marketing materials and videos</li>
                    </ul>
                  </div>
                  <p className="text-sm">You may not reproduce, distribute, or use our intellectual property without written permission. Violation may result in legal action.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="liability-limitation">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  6. Limitation of Liability
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="space-y-3">
                    <p><strong>6.1 Service Disclaimer:</strong> Our services are provided "as is" without warranties of any kind.</p>
                    <p><strong>6.2 Liability Limits:</strong> Our liability is limited to the purchase price of the products involved in the claim.</p>
                    <p><strong>6.3 Exclusions:</strong> We are not liable for indirect, incidental, or consequential damages.</p>
                    <p><strong>6.4 Product Quality:</strong> While we ensure quality, natural products may have variations in appearance and taste.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="policy-changes">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  7. Policy Changes & Communication
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="space-y-3">
                    <p><strong>7.1 Updates:</strong> We may update our policies, including shipping, return, and privacy policies, at any time.</p>
                    <p><strong>7.2 Notification:</strong> Changes will be posted on our website and may be communicated via email.</p>
                    <p><strong>7.3 Acceptance:</strong> Continued use of our services after policy changes constitutes acceptance.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="governing-law">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  8. Governing Law & Jurisdiction
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="p-4 bg-neutral-light rounded-lg">
                    <h4 className="font-semibold text-secondary mb-2">Legal Framework</h4>
                    <ul className="text-sm space-y-2">
                      <li><strong>Governing Law:</strong> These terms are governed by the laws of India</li>
                      <li><strong>IT Act Compliance:</strong> We comply with the Information Technology Act, 2000</li>
                      <li><strong>Jurisdiction:</strong> Courts in Mumbai, Maharashtra shall have exclusive jurisdiction</li>
                      <li><strong>Consumer Rights:</strong> Nothing in these terms affects your statutory consumer rights</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-secondary/10 rounded-lg border border-secondary/20">
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Questions About These Terms?
              </h3>
              <p className="text-neutral-dark mb-3">
                For clarification on any terms or legal questions, contact us:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> legal@rootsandrichness.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Business Hours:</strong> Monday to Friday, 9 AM - 6 PM IST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
