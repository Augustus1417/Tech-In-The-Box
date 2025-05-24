import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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

export default function GadgetCarousel(){
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
      showDots={true}
    >
      <div>
          <img src="https://www.honor.com/content/dam/honor/ph/special-subject/android-phones/kv-pc.jpg" alt="" />
      </div>
      <div>
          <img src="https://www.honor.com/content/dam/honor/ph/special-subject/android-phones/kv-pc.jpg" alt="" />
      </div>
      <div>
          <img src="https://www.honor.com/content/dam/honor/ph/special-subject/android-phones/kv-pc.jpg" alt="" />
      </div>
    </Carousel>
    );
}