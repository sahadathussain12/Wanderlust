import Image from "next/image";
import Link from "next/link";
import { FaLocationDot, FaCalendarDays, FaArrowUpRightFromSquare } from "react-icons/fa6";

const DestinationCard = ({ destination }) => {
  const {
    _id,
    destinationName,
    description,
    imageUrl,
    departureDate,
    price,
    country,
    duration,
  } = destination;

  return (
    <div className="w-full max-w-5xl mx-auto mt-5 overflow-hidden rounded-lg bg-white shadow-md">
      
      {/* Image */}
      <div className="relative">
        <Image
          src={imageUrl}
          alt={destinationName}
          width={320}
          height={210}
          className="h-[210px] w-full object-cover"
        />

        {/* Rating */}
        <div className="absolute right-3 top-3 rounded-md bg-white px-3 py-1 text-sm font-semibold shadow">
          4.5 ⭐
        </div>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Country */}
        <div className="mb-1 flex items-center gap-1 text-sm text-gray-500">
          <FaLocationDot className="text-gray-500" />
          <span>{country}</span>
        </div>

        {/* Destination + Price */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800">
            {destinationName}
          </h3>

          <p className="text-sm font-semibold text-gray-800">
            ${price}
            <span className="text-xs font-normal text-gray-500">
              /Person
            </span>
          </p>
        </div>

        {/* Duration */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <FaCalendarDays />
          <span>{duration}</span>
        </div>

        {/* Description */}
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {description}
        </p>

        {/* Book Now */}
        <Link href= {`/destinations/${_id}`}>
        <button className="mt-3 flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-800">
          BOOK NOW
          <FaArrowUpRightFromSquare className="text-xs" />
        </button>

        </Link>
      </div>
    </div>
  );
};

export default DestinationCard;