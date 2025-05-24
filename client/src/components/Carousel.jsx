import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function GadgetCarousel() {
  return (
    <Carousel
      responsive={responsive}
      className="mt-15 lg:h-120"
      arrows={false}
      swipeable={true}
      infinite={true}
      centerMode={false}
      autoPlay={true}
      autoPlaySpeed={3000}
    >

    <div className="relative h-[300px] lg:h-[480px]">
      <img
        src="https://www.stuff.tv/wp-content/uploads/sites/2/2025/01/Best-AI-phones-2025-lead.jpg"
        alt="Phones Promo"
        className="w-full h-full object-cover object-top"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex flex-col justify-center items-start px-8 text-white max-w-lg">
        <h2 className="text-3xl lg:text-5xl font-bold mb-3">Latest Smartphones</h2>
        <p className="text-sm lg:text-lg mb-4">Experience cutting-edge technology at unbeatable prices.</p>
        <Link
          to="/phones"
          className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-200 transition"
        >
          Shop Phones
        </Link>
      </div>
    </div>

    <div className="relative h-[300px] lg:h-[480px]">
      <img
        src="https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-3x2-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200"
        alt="Laptops Promo"
        className="w-full h-full object-cover"
      />
      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Centered text content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-3">Powerful Laptops</h2>
        <p className="text-sm lg:text-lg mb-4">Get the performance you need for work and play.</p>
        <Link
          to="/laptops"
          className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-200 transition"
        >
          Shop Laptops
        </Link>
      </div>
    </div>

    <div className="relative h-[300px] lg:h-[480px]">
      <img
        src="https://www.peroz.com.au/cdn/shop/collections/Tech-Gadgets-and-Accessories-PEROZ-Australia.jpg?v=1668927883"
        alt="Accessories Promo"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex flex-col justify-end items-end px-8 pb-10 text-white text-right">
        <h2 className="text-3xl lg:text-5xl font-bold mb-3">Top Tech Accessories</h2>
        <p className="text-sm lg:text-lg mb-4">Style meets utility – elevate your setup today.</p>
        <Link
          to="/accessories"
          className="bg-white text-black font-semibold px-5 py-2 rounded hover:bg-gray-200 transition"
        >
          Shop Accessories
        </Link>
      </div>
    </div>
  </Carousel>
  );
}
