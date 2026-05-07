import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { addToCart } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const ProductCard = ({ product, loading }) => {
    const { _id, productImage, productName, productPrice, category, rating } = product;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.stopPropagation()  // ✅ prevents navigating to detail page when clicking the button
        dispatch(addToCart({ ...product, quantity: 1 }))
    }

    if (loading) {
        return (
            <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white w-full">
                <Skeleton className="w-full aspect-square rounded-none" />
                <div className="p-3 space-y-2">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/4 mt-1" />
                    <Skeleton className="h-9 w-full rounded-xl mt-2" />
                </div>
            </div>
        );
    }

    return (
        <div
           onClick={() => navigate(`/products/${_id}`)}  // ✅ navigate to product detail
            className="group rounded-2xl overflow-hidden border border-gray-100 bg-white hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
            {/* Image */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                <img
                    src={`http://localhost:8000/${productImage}`}
                    alt={productName}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Body */}
            <div className="p-3">
                {category && (
                    <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-1">{category}</p>
                )}

                <h2 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2 min-h-[2.8em] mb-2.5">
                    {productName}
                </h2>

                <div className="flex items-baseline gap-1.5 mb-3">
                    <span className="text-base font-semibold text-gray-900">RS. {productPrice.toFixed(2)}</span>
                    {rating && (
                        <span className="text-sm text-gray-400">({rating}⭐)</span>
                    )}
                </div>

                <Button
                    onClick={handleAddToCart}   // ✅ wired to Redux
                    className="w-full rounded-xl text-sm font-medium h-9"
                >
                    Add to cart
                </Button>
            </div>
        </div>
    );
};

export default ProductCard;