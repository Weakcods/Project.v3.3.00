import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: "John Doe",
    role: "Student",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    content: "The gate pass system has made my campus entry and exit so much smoother. No more paper passes!"
  },
  {
    name: "Jane Smith",
    role: "Faculty Member",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    content: "As a professor, I appreciate how this system helps maintain campus security while being user-friendly."
  },
  {
    name: "Mike Johnson",
    role: "Security Staff",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    content: "This digital system has revolutionized how we manage campus security. Highly recommended!"
  },
  {
    name: "Sarah Wilson",
    role: "Administrator",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "The analytics and reporting features have made managing campus security so much more efficient."
  }
];

export default function TestimonialsSection() {
  return (
    <section  id='Testimonials' className="py-24 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-16">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105"
              style={{ 
                opacity: 0,
                animation: `fadeIn 0.6s ease-out forwards ${index * 0.2}s`
              }}
            >
              <div className="flex items-start mb-6">
                <div className="relative">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 border-2 border-[#24FE41]"
                  />
                  <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-[#24FE41] bg-white dark:bg-gray-800 rounded-full" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-[#24FE41]/20" />
                <p className="text-gray-700 dark:text-gray-200 italic relative z-10 pl-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}