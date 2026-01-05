import main_t1 from "@/assets/main_t1.png";
import main_t2 from "@/assets/main_t2.png";
import main_b1 from "@/assets/main_b1.png";
import main_b2 from "@/assets/main_b2.png";
import main_b3 from "@/assets/main_b3.png";

function Lookbook() {
    return (
        <div className="w-[1420px] mx-auto py-20 px-[70px]"> {/* px-[70px] to match 1420 outer - 1280 inner */}

            <div className="grid grid-cols-12 gap-8 mb-24">
                {/* Left: 1 Portrait Image (Large) */}
                <div className="col-span-6">
                    <img src={main_t1} alt="Lookbook 1" className="w-full object-cover h-[500px]" />
                </div>

                {/* Right: Text + Landscape Image */}
                <div className="col-span-6 flex flex-col justify-between pl-8">
                    <div className="mt-8">
                        <h3 className="text-gray-500 mb-2 text-[30px]">감각적인 디자인</h3>
                        <h2 className="text-[100px] font-['Luxurious_Script'] text-[#5C4033]">La Clavé</h2>
                    </div>
                    <div className="mt-auto">
                        <img src={main_t2} alt="Signature Bag" className="w-full h-[700px] object-cover pt-15" />
                    </div>
                </div>
            </div>


            <div className="w-full mb-24">
                <img src={main_b1} alt="Season Hero" className="w-full h-[600px] object-cover" />
            </div>


            {/* --- Section 3: Product Highlights (Zigzag) --- */}
            <div className="flex flex-col gap-24">

                {/* Row 1: Left Text, Right Image */}
                <div className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-4 flex flex-col justify-center items-center text-center">
                        <span className="text-[100px] font-['Aguafina_Script'] leading-[0.8]">01</span>
                        <div className="flex flex-col mt-4">
                            <span className="text-[100px] font-['Aguafina_Script'] leading-none">black</span>
                            <span className="text-[100px] font-['Aguafina_Script'] leading-none">jacket</span>
                        </div>
                    </div>
                    <div className="col-span-8">
                        <img src={main_b2} alt="Black Jacket Detail" className="w-full h-[500px] object-cover" />
                    </div>
                </div>

                {/* Row 2: Left Image, Right Text */}
                <div className="grid grid-cols-12 gap-8 items-center">
                    <div className="col-span-8">
                        <img src={main_b3} alt="Denim" className="w-full h-[600px] object-cover" />
                    </div>
                    <div className="col-span-4 flex flex-col justify-center items-center text-center">
                        <span className="text-[100px] font-['Aguafina_Script'] leading-[0.8]">02</span>
                        <div className="flex flex-col mt-4">
                            <span className="text-[100px] font-['Aguafina_Script'] leading-none">denim</span>
                            <span className="text-[100px] font-['Aguafina_Script'] leading-none">pants</span>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}

export { Lookbook };
