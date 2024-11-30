import { ButtonHTMLAttributes } from 'react';

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export default function LoadingButton({
  isLoading = false,
  loadingText = 'Loading...',
  children,
  className = '',
  disabled,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      {...props}
      disabled={isLoading || disabled}
      className={`relative ${className} ${isLoading ? 'cursor-wait' : ''}`}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </button>
  );
}