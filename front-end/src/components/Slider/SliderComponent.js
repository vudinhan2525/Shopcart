import { useEffect, useState } from 'react';
import slider from '../../components/Slider';

function SliderComponent() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const intervalSlider = setInterval(() => {
      setSlide((prev) => {
        if (prev >= 2) return 0;
        else return prev + 1;
      });
    }, 4000);
    return () => {
      clearInterval(intervalSlider);
    };
  }, []);
  return <div className="w-full h-[500px] bg-gray-200"></div>;
}

export default SliderComponent;
