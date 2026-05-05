import { Button } from "@/components/ui/button";


const ProductCard = ({ product }) => {
    const { productImage, productName, productPrice } = product;
    return (
        <div className="shadow-md rounded-lg overflow-hidden border-purple-300 bg-purple-400  h-max">
            <div className="w-full h-full aspect-square overflow-hidden">
                <img
                    src={`http://localhost:8000/${productImage}`}
                    alt={productName}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            </div>
            <div className="px-2 space-y-1">
                <h1 className="font-bold h-12 line-clamp-2">{productName}</h1>
                <p className=" font-bold">${productPrice.toFixed(2)}</p>
            </div>
            <Button className="w-full rounded-t-none">Add to Cart</Button>
        </div>
    );
};

export default ProductCard;
