// import { MapPin, Star } from "lucide-react";
import { FiMapPin, FiStar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Card = ({ cardsData = [] }) => {
  const navigate = useNavigate();

  const handleExploreClick = (card) => {
    navigate('/package-details', { state: { cardData: card } });
  };

  return (
    <div>

      <div className="grid grid-cols-3 gap-4 p-4 mx-auto max-w-7xl">
        {cardsData && cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 max-w-xs mx-auto"
          >
            {/* Image */}
            <img
              className="w-full h-40 object-cover"
              src={card.img}
              alt="Card image"
            />

            {/* Content */}
            <div className="p-6 space-y-3">
              {/* Location */}
              <div className="flex items-center text-gray-500 text-sm">
                <FiMapPin className="w-4 h-4 mr-1 text-blue-500" />
                <span>{card.location}</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-semibold text-gray-800">
                {card.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {card.desc}
              </p>

              {/* Rating + Duration */}
              <div className="flex items-center justify-between text-sm text-gray-600 pt-2">
                <div className="flex items-center">
                  <FiStar className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-semibold text-gray-800">
                    {card.rating}
                  </span>
                  <span className="ml-1 text-gray-400">{card.reviews}</span>
                </div>
                <span>{card.duration}</span>
              </div>

              {/* Price + Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-xl font-bold text-gray-800">
                    {card.price}
                  </p>
                  <p className="text-xs text-gray-400">/ Per Person</p>
                </div>
                <button
                  onClick={() => handleExploreClick(card)}
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1"
                >
                  EXPLORE MORE →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
