import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => {
        
        setProducts(response.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center py-10">No products found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-xl shadow-md p-5 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-200"
          onClick={() => navigate(`/products/${product._id}`)}
        >
          <img
            src={`http://localhost:8000/${product.productImage}`}
            alt={product.productName}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="font-semibold text-gray-800 mb-2">
            {product.productName}
          </h3>
          <p className="text-gray-600 mb-2">{product.productDescription}</p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Price: Rs {product.productPrice}</span>
            <span>Rating: {product.rating}⭐</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
