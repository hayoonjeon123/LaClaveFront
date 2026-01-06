
import { Separator } from "@/components/ui/separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export function ProductInquiries() {
    return (
        <div className="w-full">
            <Separator className="my-4 bg-gray-300" />
            <Accordion type="multiple" className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                    <AccordionTrigger className="text-[20px] font-bold py-2 hover:no-underline">
                        상품문의
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                        상품에 대한 문의사항이 이곳에 표시됩니다. (기능 준비중)
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-0">
                    <AccordionTrigger className="text-[20px] font-bold py-2 hover:no-underline">
                        배송 문의
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                        배송에 대한 문의사항이 이곳에 표시됩니다. (기능 준비중)
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
