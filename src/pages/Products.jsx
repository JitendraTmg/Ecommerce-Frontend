import FliterSidebar from '@/components/FliterSidebar'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from 'axios'
import { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const products = () => {
  const [allProducts, setAllProducts] = useState([])

  const getAllProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/products/getAllProducts')
      if (res.data.success) {
        const data = res.data.products
        setAllProducts(data)
      }
      console.log(data)
    } catch (error) {
      console.error("Error fetching products:", error)
    }
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  
  return (
    <div className='pt-30 pb-10'>
      <div className='max-w-7xl mx-auto flex gap-7'>
        {/* sidebar */}
        <FliterSidebar />
        {/* products */}
        <div className='flex flex-col flex-1'>
          <div className='flex justify-end mb-4'>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
                  <SelectItem value="highToLow">Price: High to Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* product grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7'>
            {
              allProducts.map((product) => {
                return <ProductCard key={product._id} product={product} />;
              })
                
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default products