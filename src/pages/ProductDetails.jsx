import { addToCart } from "@/redux/cartSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/products/${id}`)
            .then((response) => {
                setProduct(response.data.product);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
    }

    const handleBuyNow = () => {
        dispatch(addToCart({ ...product, quantity: 1 }))
        navigate("/cart")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400 text-sm animate-pulse">Loading product...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg font-medium">Product not found</p>
                <button onClick={() => navigate(-1)} className="mt-4 text-sm underline">
                    ← Go back
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Back */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                >
                    ← Back
                </button>

                {/* Main card */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">

                    {/* Image */}
                    <div className="md:w-1/2 aspect-square bg-gray-50 overflow-hidden">
                        <img
                            src={`http://localhost:8000/${product.productImage}`}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-between">
                        <div>
                            {/* Category + Rating */}
                            <div className="flex items-center justify-between mb-3">
                                {product.category && (
                                    <span className="text-[11px] uppercase tracking-widest text-gray-400">
                                        {product.category}
                                    </span>
                                )}
                                {product.rating && (
                                    <span className="text-sm text-yellow-500 font-medium">
                                        ⭐ {product.rating}
                                    </span>
                                )}
                            </div>

                            {/* Name */}
                            <h1 className="text-2xl font-semibold text-gray-900 mb-3 leading-snug">
                                {product.productName}
                            </h1>

                            {/* Price */}
                            <p className="text-2xl font-bold text-gray-900 mb-4">
                                Rs. {product.productPrice?.toFixed(2)}
                            </p>

                            {/* Divider */}
                            <hr className="border-gray-100 mb-4" />

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed">
                                {product.productDescription}
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-3 mt-8">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 py-3 rounded-xl border border-gray-900 text-gray-900 text-sm font-medium hover:bg-gray-900 hover:text-white transition-all duration-200"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 py-3 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-all duration-200"
                            >
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetails;