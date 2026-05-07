import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "@/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const { cartItems } = useSelector(store => store.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const totalPrice = cartItems.reduce(
        (acc, item) => acc + item.productPrice * item.quantity, 0
    )

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-400">
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm mb-6">Add some products to get started</p>
                <button
                    onClick={() => navigate("/products")}
                    className="px-6 py-2.5 bg-gray-900 text-white text-sm rounded-xl hover:bg-gray-700 transition-all"
                >
                    Browse Products
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        Your Cart ({cartItems.length} {cartItems.length === 1 ? "item" : "items"})
                    </h1>
                    <button
                        onClick={() => dispatch(clearCart())}
                        className="text-sm text-red-400 hover:text-red-600 transition-colors"
                    >
                        Clear cart
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Cart Items */}
                    <div className="flex-1 space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item._id}
                                className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4"
                            >
                                {/* Image */}
                                <img
                                    src={`http://localhost:8000/${item.productImage}`}
                                    alt={item.productName}
                                    onClick={() => navigate(`/products/${item._id}`)}
                                    className="w-24 h-24 object-cover rounded-xl bg-gray-50 cursor-pointer hover:opacity-80 transition-opacity"
                                />

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        {item.category && (
                                            <p className="text-[11px] text-gray-400 uppercase tracking-widest mb-0.5">
                                                {item.category}
                                            </p>
                                        )}
                                        <h2
                                            onClick={() => navigate(`/products/${item._id}`)}
                                            className="text-sm font-medium text-gray-900 line-clamp-2 cursor-pointer hover:underline"
                                        >
                                            {item.productName}
                                        </h2>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        {/* Price */}
                                        <p className="text-base font-semibold text-gray-900">
                                            Rs. {(item.productPrice * item.quantity).toFixed(2)}
                                        </p>

                                        {/* Quantity controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => dispatch(decreaseQuantity(item._id))}
                                                className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center text-sm"
                                            >
                                                −
                                            </button>
                                            <span className="text-sm font-medium w-5 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => dispatch(increaseQuantity(item._id))}
                                                className="w-7 h-7 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center text-sm"
                                            >
                                                +
                                            </button>

                                            {/* Remove */}
                                            <button
                                                onClick={() => dispatch(removeFromCart(item._id))}
                                                className="ml-2 text-sm text-red-400 hover:text-red-600 transition-colors"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80">
                        <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-6">
                            <h2 className="text-base font-semibold text-gray-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 text-sm text-gray-600 mb-4">
                                {cartItems.map((item) => (
                                    <div key={item._id} className="flex justify-between">
                                        <span className="line-clamp-1 flex-1 mr-2">{item.productName} × {item.quantity}</span>
                                        <span className="font-medium text-gray-900 shrink-0">
                                            Rs. {(item.productPrice * item.quantity).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <hr className="border-gray-100 mb-4" />

                            <div className="flex justify-between text-base font-semibold text-gray-900 mb-6">
                                <span>Total</span>
                                <span>Rs. {totalPrice.toFixed(2)}</span>
                            </div>

                            <button
                                className="w-full py-3 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-all duration-200"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={() => navigate("/products")}
                                className="w-full py-3 mt-3 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                            >
                                ← Continue Shopping
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cart