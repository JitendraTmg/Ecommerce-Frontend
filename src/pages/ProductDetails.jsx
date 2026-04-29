import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    if (loading) {
        return <p className="text-center py-10">Loading product details...</p>;
    }

    if (!product) {
        return <p className="text-center py-10">Product not found.</p>;
    }

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 border-purple-300 bg-purple-400">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
                ← Back
            </button>

            <img
                src={`http://localhost:8000/${product.productImage}`}
                alt={product.productName}
                className="w-full h-auto object-cover rounded-lg shadow-md mb-6"
            />

            <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
            <p className="text-gray-700 mb-4">{product.productDescription}</p>

            <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-semibold text-white">
                    Rs {product.productPrice}
                </span>
                <span className="text-lg text-yellow-500">
                    Rating: {product.rating}⭐
                </span>
            </div>

            <p className="text-sm text-gray-500 mb-6">
                Category: {product.category}
            </p>

            <div className="flex gap-4">
                <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add to Cart
                </button>
                <button className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default ProductDetails;
