// import { MapPin, Star } from "lucide-react";
import { FiMapPin, FiStar } from "react-icons/fi";

const Card = () => {
  const cardsData = [
    {
      img: "https://images.unsplash.com/photo-1590766940554-634a7ed41450?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8a2FybmF0YWthfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
      location: "Karnataka, India",
      title: "Every Life Matters",
      desc: "We provide daily meals and run food drives to ensure child or elder in our community goes to bed.",
      rating: "5.00",
      reviews: "(334)",
      duration: "3 Nights - 9 Days",
      price: "₹589.00",
    },
    {
      img: "https://images.unsplash.com/photo-1595658658481-d53d3f999875?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=700&q=80",
      location: "Mumbai, India",
      title: "Urban Adventures",
      desc: "Explore the vibrant city life with guided tours and cultural experiences.",
      rating: "4.80",
      reviews: "(256)",
      duration: "5 Nights - 6 Days",
      price: "₹450.00",
    },
    {
      img: "https://images.unsplash.com/photo-1642516864726-a243f416fc00?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdvYXxlbnwwfDB8MHx8fDA%3D&auto=format&fit=crop&w=700&q=80",
      location: "Goa, India",
      title: "Beach Paradise",
      desc: "Relax on pristine beaches and enjoy water sports in this tropical haven.",
      rating: "4.90",
      reviews: "(412)",
      duration: "7 Nights - 8 Days",
      price: "₹650.00",
    },
    {
      img: "https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amFpcHVyfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
      location: "Jaipur, India",
      title: "Royal Heritage",
      desc: "Discover the palaces and forts of Rajasthan with expert historians.",
      rating: "4.70",
      reviews: "(198)",
      duration: "6 Nights - 7 Days",
      price: "₹520.00",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8a2VyYWxhfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
      location: "Kerala, India",
      title: "Backwater Bliss",
      desc: "Cruise through serene backwaters and experience the lush greenery of Kerala.",
      rating: "4.85",
      reviews: "(289)",
      duration: "6 Nights - 7 Days",
      price: "₹580.00",
    },
    {
      img: "https://plus.unsplash.com/premium_photo-1697729690458-2d64ca777c04?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aGltYWNoYWwlMjBwcmFkZXNofGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=700&q=80",
      location: "Himachal Pradesh, India",
      title: "Mountain Escape",
      desc: "Trek through the Himalayas and enjoy the fresh mountain air.",
      rating: "4.75",
      reviews: "(345)",
      duration: "9 Nights - 10 Days",
      price: "₹720.00",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5 mb-6 text-indigo-700">
        Our Destination Packages
      </h1>
      <div className="grid grid-cols-3 gap-4 p-4 mx-auto max-w-7xl">
        {cardsData.map((card, index) => (
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
                <a
                  href="#"
                  className="text-blue-600 font-medium hover:text-blue-800 flex items-center gap-1"
                >
                  EXPLORE MORE →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
