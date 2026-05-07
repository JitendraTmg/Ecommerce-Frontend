import { Button } from "./ui/button";
import { Input } from "./ui/input";

const FliterSidebar = ({ search, setSearch, category, setCategory, allProducts, priceRange, setPriceRange, rating, setRating }) => {
    const Categories = ["All", ...new Set(allProducts.map((product) => product.category))];

    const handleCategoryClick = (val) => setCategory(val)

    const handleMinChange = (e) => {
        const value = Number(e.target.value)
        if (value <= priceRange[1]) setPriceRange([value, priceRange[1]])
    }

    const handleMaxChange = (e) => {
        const value = Number(e.target.value)
        if (value >= priceRange[0]) setPriceRange([priceRange[0], value])
    }

    const resetFilters = () => {
        setSearch("")
        setCategory("All")
        setPriceRange([0, 999999])
        setRating(0)
    }

    return (
        <div className="bg-gray-10 p-4 rounded-md h-max hidden md:block w-64">

            {/* Search */}
            <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="mb-4"
            />

            {/* Categories */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <ul className="space-y-1">
                    {Categories.map((cat) => (
                        <li key={cat}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={cat === category}
                                    onChange={() => handleCategoryClick(cat)}
                                    className="form-checkbox"
                                />
                                <span className="text-gray-700">{cat}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Price Range */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={handleMinChange}
                        className="w-full"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={handleMaxChange}
                        className="w-full"
                    />
                </div>
            </div>

            {/* Ratings */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Ratings</h3>
                <ul className="space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                        <li key={star}>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="rating"
                                    checked={rating === star}
                                    onChange={() => setRating(star)}
                                    className="form-radio"
                                />
                                <span className="flex items-center gap-1 text-gray-700">
                                    {Array.from({ length: star }).map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-sm">★</span>
                                    ))}
                                    {Array.from({ length: 5 - star }).map((_, i) => (
                                        <span key={i} className="text-gray-300 text-sm">★</span>
                                    ))}
                                    <span className="text-sm ml-1">& up</span>
                                </span>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>

            <Button className="w-full" onClick={resetFilters}>Reset Filters</Button>
        </div>
    )
}

export default FliterSidebar