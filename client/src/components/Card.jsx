import { Link } from 'react-router-dom';

export default function Card(props) {
  return (
    <Link to={`/item/${props.product_id}`}>
      <div key={props.product_id} className="bg-white p-4 rounded-xl w-90 h-auto border-2 border-gray-500 shadow-xl">
        <div className="w-full h-60 relative">
          <img
            className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
            src={props.imgURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s"}
            alt={props.name || "Product image"}
          />
        </div>
        <div className="m-5 mt-9">
          <h2 className="text-1xl lg:text-2xl font-semibold">{props.name}</h2>
          <p className="text-md lg:text-xl text-green-600 font-bold">₱{props.price.toLocaleString()}</p>
          <p className="text-sm lg:text-lg text-gray-500">{props.stock} left</p>
        </div>
      </div>
    </Link>
  );
}
