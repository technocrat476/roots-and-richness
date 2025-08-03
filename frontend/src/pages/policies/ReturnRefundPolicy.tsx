
import { RotateCcw, Shield, Clock, AlertCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ReturnRefundPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
              Return & Refund Policy
            </h1>
            <p className="text-lg text-neutral-dark">
              Hassle-free returns and refunds for your peace of mind
            </p>
          </div>

          {/* Trust Badge */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-8 rounded-lg text-center shadow-sm max-w-md">
              <RotateCcw className="w-16 h-16 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-secondary mb-2 text-xl">Hassle-Free Returns</h3>
              <p className="text-neutral-medium">Easy return process within 7 days of delivery</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Alert className="mb-6">
              <Shield className="h-4 w-4" />
              <AlertDescription>
                <strong>Important:</strong> Returns are accepted only for unopened, unused products within 7 days of delivery.
              </AlertDescription>
            </Alert>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="return-window">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Return Window & Eligibility
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-accent-green/10 rounded-lg border border-accent-green/20">
                      <h4 className="font-semibold text-accent-green mb-2">✓ Eligible for Return</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Sealed, unopened products</li>
                        <li>• Original packaging intact</li>
                        <li>• Within 7 days of delivery</li>
                        <li>• Unused condition</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-600 mb-2">✗ Non-Returnable Items</h4>
                      <ul className="text-sm space-y-1">
                        <li>• Opened oil bottles</li>
                        <li>• Consumed products</li>
                        <li>• Damaged packaging</li>
                        <li>• Items beyond 7 days</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="refund-process">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Refund Processing
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="flex items-start space-x-4 p-4 bg-primary/10 rounded-lg">
                    <Clock className="w-6 h-6 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">Processing Timeline</h4>
                      <p className="text-sm">Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method via Razorpay.</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary mb-2">Refund Methods:</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Credit/Debit Card: 3-5 business days</li>
                      <li>Net Banking: 3-5 business days</li>
                      <li>UPI/Wallets: 1-3 business days</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="how-to-return">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  How to Initiate a Return
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-neutral-light rounded-lg">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">1</div>
                        <h4 className="font-semibold text-secondary mb-1">Contact Us</h4>
                        <p className="text-sm">Email us within 7 days</p>
                      </div>
                      <div className="text-center p-4 bg-neutral-light rounded-lg">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">2</div>
                        <h4 className="font-semibold text-secondary mb-1">Get Approval</h4>
                        <p className="text-sm">Receive return instructions</p>
                      </div>
                      <div className="text-center p-4 bg-neutral-light rounded-lg">
                        <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold">3</div>
                        <h4 className="font-semibold text-secondary mb-1">Ship Back</h4>
                        <p className="text-sm">Send item in original condition</p>
                      </div>
                    </div>
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Please include your order number and reason for return in your email to expedite the process.
                      </AlertDescription>
                    </Alert>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="exchange-policy">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Exchange Policy
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>Currently, we do not offer direct exchanges. If you need a different product, please initiate a return for the original item and place a new order for the desired product.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="return-shipping">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Return Shipping Charges
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-3">
                    <p><strong>Quality Issues:</strong> We cover return shipping costs if the product is defective or damaged.</p>
                    <p><strong>Change of Mind:</strong> Customer bears the return shipping cost (₹100 will be deducted from refund).</p>
                    <p><strong>Wrong Item Sent:</strong> We cover all return shipping costs and provide full refund.</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-secondary/10 rounded-lg border border-secondary/20">
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <RotateCcw className="w-5 h-5 mr-2" />
                Need to Return an Item?
              </h3>
              <p className="text-neutral-dark mb-3">
                Contact our customer care team to initiate your return:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> returns@rootsandrichness.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Subject:</strong> Return Request - Order #[Your Order Number]</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnRefundPolicy;
