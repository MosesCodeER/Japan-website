'use client';

import Image from 'next/image';
import Link from 'next/link';

interface FoodCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: string;
  region: string;
}

const FoodCard = ({ id, title, description, imageUrl, difficulty, region }: FoodCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-[#1D3557] line-clamp-1">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${
            difficulty === 'Easy' 
              ? 'bg-green-100 text-green-800' 
              : difficulty === 'Medium' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
          }`}>
            {difficulty}
          </span>
        </div>
        <p className="text-[#457B9D] text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#457B9D]">Region: {region}</span>
          <Link 
            href={`/food/${id}`}
            className="text-[#E63946] text-sm font-medium hover:underline"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
