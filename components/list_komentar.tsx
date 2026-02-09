import { useSentimenStore } from "@/store/useSentimenStore"
import { Card } from "./ui/card";
import { CircleMinus, CircleOff, CirclePlus, DiamondMinus, DiamondPlus, LayersPlus, Scale } from "lucide-react";

export default function ListKomentar() {

    const { sentimenResults } = useSentimenStore();

    return <>
        {sentimenResults.map(



            (item) => {
                let iconSentimen;
                switch (item.label) {
                    case 'Very Positive':
                        iconSentimen = <DiamondPlus size={42} color="" stroke="#005F02" />
                        break;
                    case 'Positive':
                        iconSentimen = <CirclePlus size={42} strokeWidth="2" color="#037b05" />
                        break;
                    case 'Neutral':
                        iconSentimen = <Scale size={42} strokeWidth="2" color="#3c3d3c" />
                        break;
                    case 'Negative':
                        iconSentimen = <CircleMinus size={42} strokeWidth="2" color="#DA3D20" />
                        break;
                    case 'Very Negative':
                        iconSentimen = <DiamondMinus size={42} strokeWidth="2" color="#DA3D20" />
                        break;
                    default:
                        iconSentimen = <CircleOff size={42} strokeWidth="2" color="red" />

                }

                return <Card className="p-8" key={item.text}>
                    <div className="flex gap-6">

                        <div className="flex flex-col items-center justify-center gap-2">
                            {iconSentimen}
                            {/* <span className="text-sm flex-wrap">{item.label}</span> */}
                        </div>
                        <div>
                            {item.text}
                        </div>


                    </div>

                </Card>
            }
        )}
    </>
}