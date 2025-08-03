
import { Shield, Truck, Clock, MapPin } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
              Shipping Policy
            </h1>
            <p className="text-lg text-neutral-dark">
              Everything you need to know about our delivery process
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Truck className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-secondary mb-2">Timely Delivery</h3>
              <p className="text-neutral-medium text-sm">Guaranteed delivery within promised timeframe</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-secondary mb-2">Secure Packaging</h3>
              <p className="text-neutral-medium text-sm">Safe and hygienic packaging for all products</p>
            </div>
            <div className="bg-white p-6 rounded-lg text-center shadow-sm">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold text-secondary mb-2">Pan India Delivery</h3>
              <p className="text-neutral-medium text-sm">Serving customers across India</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="delivery-times">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Delivery Times & Coverage
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Metro Cities</h4>
                      <p className="text-sm">2-3 business days</p>
                    </div>
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Tier 2/3 Cities</h4>
                      <p className="text-sm">3-5 business days</p>
                    </div>
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Rural Areas</h4>
                      <p className="text-sm">5-7 business days</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="processing-time">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Order Processing Time
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>All orders are processed within 1-2 business days (Monday to Friday, excluding public holidays). Orders placed on weekends will be processed on the next business day.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-charges">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Shipping Charges
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="bg-accent-green/10 p-4 rounded-lg border border-accent-green/20">
                    <h4 className="font-semibold text-accent-green mb-2">Free Shipping Available!</h4>
                    <p>Enjoy free shipping on all orders above ₹499</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Standard Shipping Rates:</h4>
                    <ul className="list-disc ml-6 space-y-1">
                      <li>Orders below ₹499: ₹50 shipping charge</li>
                      <li>Express delivery: Additional ₹100 (where available)</li>
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delivery-partners">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Delivery Partners
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>We partner with leading logistics providers including Shiprocket and Delhivery to ensure reliable and timely delivery of your orders across India.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="delays">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Possible Delays
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>Please note that delivery times may be extended during:</p>
                  <ul className="list-disc ml-6 mt-2 space-y-1">
                    <li>Festival seasons and public holidays</li>
                    <li>Sale periods with high order volumes</li>
                    <li>Extreme weather conditions</li>
                    <li>Force majeure events</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="international">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  International Shipping
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>Currently, we only deliver within India. International shipping is not available at this time.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Need Help with Your Shipment?
              </h3>
              <p className="text-neutral-dark mb-3">
                For any shipping-related queries, please contact us:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> hello@rootsandrichness.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Hours:</strong> Monday to Friday, 9 AM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
