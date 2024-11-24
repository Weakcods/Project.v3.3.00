import { Mail, Send, Star, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

export default function FeedbackSection() {
  const [rating, setRating] = useState<number | null>(null); // Rating state
  const [feedback, setFeedback] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null || feedback.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    setIsSubmitted(true);
  };

  // Reset the form (if desired)
  const handleReset = () => {
    setRating(null);
    setFeedback('');
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        We'd Love Your Feedback!
      </h2>

      {/* Feedback Description */}
      <p className="text-gray-600 dark:text-gray-400">
        Your feedback helps us improve our service. Please take a moment to rate and share your thoughts.
      </p>

      {/* Feedback Form */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Rating Section */}
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Rate Us</p>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-400'}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
            </div>

            {/* Feedback Text Area */}
            <div>
              <label htmlFor="feedback" className="font-medium text-gray-900 dark:text-white">
                Your Feedback
              </label>
              <textarea
                id="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full mt-2 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#24FE41] dark:bg-gray-700 dark:text-white"
                placeholder="Share your experience..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all bg-[#24FE41] text-white hover:bg-[#1A9F33]"
              >
                <Send size={20} />
                Submit Feedback
              </button>
            </div>
          </div>
        </form>
      ) : (
        // Feedback Submitted Success Message
        <div className="flex flex-col items-center space-y-4">
          <ThumbsUp size={50} className="text-[#24FE41]" />
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            Thank you for your feedback!
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            We appreciate your input and will use it to improve our services.
          </p>

          {/* Reset Button to re-enable feedback */}
          <button
            onClick={handleReset}
            className="btn-primary flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all bg-gray-300 text-gray-900 hover:bg-gray-400 dark:bg-gray-700 dark:text-white"
          >
            <Mail size={20} />
            Provide more feedback
          </button>
        </div>
      )}
    </div>
  );
}
