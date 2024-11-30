import { useEffect } from 'react';
import { newtonsCradle } from 'ldrs';

interface LoadingProps {
  size?: number;
  speed?: number;
  color?: string;
  text?: string;
}

export default function Loading({ 
  size = 78, 
  speed = 1.4, 
  color = '#24FE41',
  text = 'Loading...'
}: LoadingProps) {
  useEffect(() => {
    newtonsCradle.register();
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50">
      <l-newtons-cradle
        size={size}
        speed={speed}
        color={color}
      ></l-newtons-cradle>
      <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white animate-pulse">
        {text}
      </p>
    </div>
  );
}