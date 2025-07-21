import { ProductRecord } from "@rcffuta/ict-lib";
import { Cta } from "../client/Shop/utils";
import { SacredQuantityInput } from "../client/Shop/quantity";
import { observer } from "mobx-react-lite";

type Props = {
    product: ProductRecord;
    quantity: number;
    onChangeQuantity: (q?:number)=>void;
}

function QuantitySelector({ product, quantity, onChangeQuantity }: Props) {
    return (
        <div className="flex items-center gap-8">
            <Cta product={product} mini={false} onClick={() => onChangeQuantity()} />
            {/* <QuantityInput onQuantityChange={() => {}} initialQuantity={1} /> */}
            <SacredQuantityInput
                initialQuantity={1}
                maxQuantity={10}
                onQuantityChange={(q) => onChangeQuantity(q)}
                quantity={quantity}
                // className="mt-6"
            />
        </div>
    )
}

export default observer(QuantitySelector);