
import { Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// Demo data for reviews
const reviews = [
    {
        id: 1,
        username: "gkgkghgh33",
        option: "M",
        rating: 4,
        image: "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=1974&auto=format&fit=crop",
        content: "패딩 완전 굿이에요\n너무 따뜻하고 가볍고 맨날 입고 싶어요",
    },
    {
        id: 2,
        username: "gkgkghgh33",
        option: "M",
        rating: 4,
        content: "패딩 완전 굿이에요\n너무 따뜻하고 가볍고 맨날 입고 싶어요",
    },
];

export function ProductReviews() {
    return (
        <div className="w-full">
            <div className="w-full h-[50px] bg-[#5C4033] rounded-[5px] flex items-center px-4 mb-4">
                <span className="text-white text-lg font-bold mr-2">후기</span>
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400 mr-2" />
                <span className="text-white text-lg font-bold">4.7</span>
            </div>
            <div className="flex justify-end mb-3">
                <Select defaultValue="recommend">
                    <SelectTrigger className="w-[100px] h-8 text-sm">
                        <SelectValue placeholder="정렬" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommend" className="text-sm">추천순</SelectItem>
                        <SelectItem value="popular" className="text-sm">인기순</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex flex-col gap-2">
                {reviews.map((review, index) => (
                    <div key={review.id}>
                        <div className="flex flex-col gap-1">
                            <h4 className="text-[18px] font-bold">{review.username}</h4>
                            <div className="text-xs text-gray-500">구매 옵션: {review.option}</div>
                            <div className="flex gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"}`}
                                    />
                                ))}
                                <span className="text-lg font-bold ml-1">{review.rating}</span>
                            </div>
                            {review.image && (
                                <div className="mb-2">
                                    <img src={review.image} alt="Review" className="w-[150px] h-[150px] object-cover rounded-md" />
                                </div>
                            )}
                            <p className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                                {review.content}
                            </p>
                        </div>
                        {index < reviews.length - 1 && <Separator className="my-3 bg-gray-300" />}
                    </div>
                ))}
            </div>
            <Separator className="my-3 bg-gray-300" />
        </div>
    );
}
