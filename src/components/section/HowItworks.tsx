import React from 'react';
import { Shield, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Shield,
    title: 'Register Account',
    description: 'Create your account with your university credentials.',
    details: [
      'Use your official university email',
      'Verify your student/staff ID',
      'Set up secure password',
      'Complete profile information'
    ]
  },
  {
    step: '02',
    icon: Clock,
    title: 'Request Pass',
    description: 'Submit your gate pass request with required details.',
    details: [
      'Select date and time',
      'Specify purpose of visit',
      'Add any required documents',
      'Submit for approval'
    ]
  },
  {
    step: '03',
    icon: CheckCircle,
    title: 'Get Approved',
    description: 'Receive approval and use your digital gate pass.',
    details: [
      'Instant notification on approval',
      'Download digital pass',
      'Show QR code at gate',
      'Track pass usage history'
    ]
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-all">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
            How it Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors">
            Get your gate pass in three simple steps. Our streamlined process ensures quick and secure access management.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#24FE41]/0 via-[#24FE41] to-[#24FE41]/0 transform -translate-y-1/2 z-0" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group"
              >
                <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 relative">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#24FE41] text-gray-900 w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg">
                    {step.step}
                  </div>

                  {/* Icon */}
                  <div className="text-[#24FE41] dark:text-[#1ee539] mb-6 flex justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <step.icon size={48} />
                  </div>

                  {/* Title and Description */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 transition-colors">
                      {step.description}
                    </p>
                  </div>

                  {/* Detailed Steps */}
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <ArrowRight className="w-4 h-4 mr-2 text-[#24FE41]" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connection Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center md:hidden my-4">
                    <ArrowRight className="w-6 h-6 text-[#24FE41] transform rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}