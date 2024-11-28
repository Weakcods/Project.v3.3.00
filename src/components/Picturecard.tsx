import { motion } from 'framer-motion';
import * as AspectRatio from '@radix-ui/react-aspect-ratio';

interface PictureCardProps {
  image: string;
  title: string;
  description: string;
}

export default function PictureCard({ image, title, description }: PictureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="relative w-full">
        <AspectRatio.Root ratio={16 / 9}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </AspectRatio.Root>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}