
import { Shield, Eye, Lock, Users } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-neutral-light">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-playfair font-bold text-secondary mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-neutral-dark">
              How we collect, use, and protect your personal information
            </p>
            <p className="text-sm text-neutral-medium mt-2">
              Last updated: December 2024
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">Data Protection</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <Lock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">Secure Storage</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">Transparency</p>
            </div>
            <div className="bg-white p-4 rounded-lg text-center shadow-sm">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-secondary">User Rights</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
              <p className="text-neutral-dark">
                At Roots & Richness, we respect your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="data-collection">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Information We Collect
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Personal Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Name and contact details</li>
                        <li>• Email address and phone number</li>
                        <li>• Billing and shipping addresses</li>
                        <li>• Payment information (processed securely via Razorpay)</li>
                        <li>• Order history and preferences</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Technical Information</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• IP address and browser type</li>
                        <li>• Device information</li>
                        <li>• Website usage patterns</li>
                        <li>• Cookies and tracking data</li>
                        <li>• Location data (if permitted)</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-usage">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  How We Use Your Information
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Order Fulfillment</h4>
                      <p className="text-sm">Processing orders, payment verification, shipping, and customer support</p>
                    </div>
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Communication</h4>
                      <p className="text-sm">Order updates, promotional offers (with consent), and customer service</p>
                    </div>
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Analytics & Improvement</h4>
                      <p className="text-sm">Website optimization, product recommendations, and business analysis</p>
                    </div>
                    <div className="p-4 bg-neutral-light rounded-lg">
                      <h4 className="font-semibold text-secondary mb-2">Legal Compliance</h4>
                      <p className="text-sm">Meeting regulatory requirements and preventing fraud</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="third-parties">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Third-Party Services
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <p>We work with trusted third-party services to provide you with the best experience:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border border-neutral-medium/20 rounded-lg">
                        <h4 className="font-semibold text-secondary">Payment Processing</h4>
                        <p className="text-sm mt-1">Razorpay - for secure payment transactions</p>
                      </div>
                      <div className="p-3 border border-neutral-medium/20 rounded-lg">
                        <h4 className="font-semibold text-secondary">Analytics</h4>
                        <p className="text-sm mt-1">Google Analytics - for website performance tracking</p>
                      </div>
                      <div className="p-3 border border-neutral-medium/20 rounded-lg">
                        <h4 className="font-semibold text-secondary">Shipping</h4>
                        <p className="text-sm mt-1">Courier services - for order delivery</p>
                      </div>
                      <div className="p-3 border border-neutral-medium/20 rounded-lg">
                        <h4 className="font-semibold text-secondary">Communication</h4>
                        <p className="text-sm mt-1">Email services - for order updates and newsletters</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="cookies">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Cookies & Tracking
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <p>We use cookies to enhance your browsing experience:</p>
                    <ul className="list-disc ml-6 space-y-2">
                      <li><strong>Essential Cookies:</strong> Required for website functionality and security</li>
                      <li><strong>Performance Cookies:</strong> Help us understand how visitors use our site</li>
                      <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                      <li><strong>Marketing Cookies:</strong> Used to show relevant advertisements (with consent)</li>
                    </ul>
                    <p className="text-sm bg-neutral-light p-3 rounded-lg">
                      You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="data-security">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Data Security & Storage
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <div className="p-4 bg-accent-green/10 rounded-lg border border-accent-green/20">
                      <h4 className="font-semibold text-accent-green mb-2">Security Measures</h4>
                      <ul className="text-sm space-y-1">
                        <li>• SSL encryption for data transmission</li>
                        <li>• Secure cloud storage with access controls</li>
                        <li>• Regular security audits and updates</li>
                        <li>• Employee training on data protection</li>
                      </ul>
                    </div>
                    <p className="text-sm">
                      <strong>Data Retention:</strong> We retain your personal information only as long as necessary for the purposes outlined in this policy or as required by law.
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="user-rights">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Your Rights & Choices
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <div className="space-y-4">
                    <p>You have the following rights regarding your personal information:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Access:</span>
                          <span className="text-sm">Request a copy of your personal data</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Correction:</span>
                          <span className="text-sm">Update or correct inaccurate information</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Deletion:</span>
                          <span className="text-sm">Request removal of your data</span>
                        </li>
                      </ul>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Portability:</span>
                          <span className="text-sm">Transfer your data to another service</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Opt-out:</span>
                          <span className="text-sm">Unsubscribe from marketing communications</span>
                        </li>
                        <li className="flex items-start">
                          <span className="font-semibold text-secondary mr-2">Restrict:</span>
                          <span className="text-sm">Limit how we use your information</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="age-compliance">
                <AccordionTrigger className="text-lg font-semibold text-secondary">
                  Age Requirements
                </AccordionTrigger>
                <AccordionContent className="text-neutral-dark">
                  <p>Our services are intended for users aged 18 and above. We do not knowingly collect personal information from children under 18. If you are under 18, please use our website with parental supervision.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8 p-6 bg-secondary/10 rounded-lg border border-secondary/20">
              <h3 className="font-semibold text-secondary mb-2 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Questions About Your Privacy?
              </h3>
              <p className="text-neutral-dark mb-3">
                Contact our privacy team for any concerns or requests:
              </p>
              <div className="space-y-1 text-sm">
                <p><strong>Email:</strong> privacy@rootsandrichness.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
