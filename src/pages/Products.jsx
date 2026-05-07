import FliterSidebar from '@/components/FliterSidebar'
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { setProducts } from '@/redux/productSlice'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'

const Products = () => {
  const { products } = useSelector(store => store.product)
  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 999999])
  const [sortOrder, setSortOrder] = useState('')
  const [rating, setRating] = useState(0)
  const dispatch = useDispatch()

  const getAllProducts = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:8000/api/products/getAllProducts')
      if (res.data.success) {
        const data = res.data.products
        setAllProducts(data)
        dispatch(setProducts(data))
        console.log(data)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  useEffect(() => {
    if (allProducts.length === 0) return

    let filtered = [...allProducts]

    if (search.trim() !== "") {
      filtered = filtered.filter(p =>
        p.productName?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (category !== "All") {
      filtered = filtered.filter(p => p.category === category)
    }

    filtered = filtered.filter(
      p => p.productPrice >= priceRange[0] && p.productPrice <= priceRange[1]
    )

    if (rating > 0) {
      filtered = filtered.filter(p => p.rating >= rating)
    }

    if (sortOrder === "lowToHigh") {
      filtered.sort((a, b) => a.productPrice - b.productPrice)
    } else if (sortOrder === "highToLow") {
      filtered.sort((a, b) => b.productPrice - a.productPrice)
    }

    dispatch(setProducts(filtered))
  }, [search, category, sortOrder, priceRange, rating, allProducts])

  const skeletons = Array.from({ length: 8 })

  return (
    <div className='pt-30 pb-10'>
      <div className='max-w-7xl mx-auto flex gap-7'>

        {/* Sidebar */}
        <FliterSidebar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          allProducts={allProducts}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          rating={rating}
          setRating={setRating}
        />

        {/* Main content */}
        <div className='flex flex-col flex-1'>

          {/* Toolbar */}
          <div className='flex items-center justify-between mb-4'>
            <p className='text-sm text-gray-500'>
              {loading ? "Loading..." : `${products.length} product${products.length !== 1 ? 's' : ''} found`}
            </p>
            <Select onValueChange={setSortOrder}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Product grid */}
          {!loading && products.length === 0 ? (
            <div className='flex flex-col items-center justify-center flex-1 py-20 text-gray-400'>
              <p className='text-lg font-medium'>No products found</p>
              <p className='text-sm'>Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
              {loading
                ? skeletons.map((_, i) => (
                    <ProductCard key={i} product={{}} loading={true} />
                  ))
                : products.map((product) => (
                    <ProductCard key={product._id} product={product} loading={false} />  // ✅ no wrapper div
                  ))
              }
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Products