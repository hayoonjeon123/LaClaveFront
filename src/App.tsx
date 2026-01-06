import mainBanner from "@/assets/main/mainBanner.png";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import mainBanner2 from "@/assets/main/mainBanner2.png";
import { Lookbook } from "@/components/home/Lookbook";

const bannerImages = [mainBanner, mainBanner2];
function App() {
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000 })]
  );
  return (
    <div className="w-full">
      <div className="w-[1420px] mx-auto overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {bannerImages.map((src, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={index}>
              <img
                src={src}
                alt={`메인 배너 ${index + 1}`}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <Lookbook />
    </div>
  );
}
export { App }; 