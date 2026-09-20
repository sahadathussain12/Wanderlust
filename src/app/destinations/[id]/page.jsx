import Image from "next/image";
import Link from "next/link";
import {
  FaLocationDot,
  FaCalendarDays,
  FaCheck,
} from "react-icons/fa6";

const DestinationDetelsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/destinations/${id}`, {
    cache: "no-store",
  });

  const destination = await res.json();

  const {
    destinationName,
    description,
    imageUrl,
    departureDate,
    price,
    country,
    duration,
  } = destination;

  return (
    <div className="min-h-screen bg-white py-5">
      <div className="mx-auto max-w-6xl px-3">

        {/* ================= IMAGE ================= */}
        <div className="relative h-[280px] w-full overflow-hidden md:h-[430px]">
          <Image
            src={imageUrl}
            alt={destinationName}
            fill
            className="object-cover"
          />
        </div>

        {/* ================= CONTENT ================= */}
        <div className="grid grid-cols-1 gap-0 border border-gray-200 lg:grid-cols-3">

          {/* ================= LEFT SIDE ================= */}
          <div className="p-5 lg:col-span-2">

            {/* Country */}
            <div className="mb-1 flex items-center gap-1 text-xs text-gray-500">
              <FaLocationDot />
              {country}
            </div>

            {/* Destination Name */}
            <h1 className="text-3xl font-semibold text-gray-800">
              {destinationName}
            </h1>

            {/* Rating */}
            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
              <span className="text-green-600">⭐ 4.9</span>
              <span>24 reviews</span>
              <span>•</span>
              <span>{duration}</span>
            </div>

            {/* Overview */}
            <div className="mt-5">
              <h2 className="mb-2 text-lg font-medium text-gray-800">
                Overview
              </h2>

              <p className="text-xs leading-5 text-gray-500">
                {description}
              </p>
            </div>

            {/* Highlights */}
            <div className="mt-5">
              <h2 className="mb-3 text-lg font-medium text-gray-800">
                Highlights
              </h2>

              <div className="grid grid-cols-1 gap-y-2 md:grid-cols-2">

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  Luxury beachfront accommodation
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  Visit Uluwatu Temple at sunset
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  Traditional Balinese spa treatment
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  Private beach dinner experience
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <FaCheck className="text-green-500" />
                  Sunrise trek to Mount Batur
                </div>

              </div>
            </div>
          </div>

          {/* ================= RIGHT BOOKING CARD ================= */}
          <div className="border-l border-gray-200 p-5">

            <p className="text-xs text-gray-500">
              Starting from
            </p>

            <h2 className="text-2xl font-bold text-cyan-500">
              ${price}
            </h2>

            <p className="text-[10px] text-gray-400">
              per person
            </p>

            {/* Date */}
            <div className="mt-5 border border-gray-100 bg-gray-50 p-3">
              <p className="text-[10px] text-gray-500">
                Departure Date
              </p>

              <div className="mt-1 flex items-center gap-2">
                <FaCalendarDays className="text-xs text-gray-500" />

                <span className="text-xs text-gray-700">
                  {departureDate}
                </span>
              </div>
            </div>

            {/* Book Button */}
            <button className="mt-4 w-full bg-cyan-500 py-3 text-xs font-medium text-white hover:bg-cyan-600">
              Book Now →
            </button>

            {/* Features */}
            <div className="mt-4 space-y-2">

              <p className="flex items-center gap-2 text-[10px] text-gray-500">
                <FaCheck className="text-green-500" />
                Free cancellation up to 7 days
              </p>

              <p className="flex items-center gap-2 text-[10px] text-gray-500">
                <FaCheck className="text-green-500" />
                Travel insurance included
              </p>

              <p className="flex items-center gap-2 text-[10px] text-gray-500">
                <FaCheck className="text-green-500" />
                24/7 customer support
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetelsPage;