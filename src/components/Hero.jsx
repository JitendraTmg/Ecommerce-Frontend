import { Button } from './ui/button'

export const Hero = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white py-24"
      style={{ backgroundImage: "url('/product1.png')" }}
    >
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-linear-to-r from-blue-700/80 to-purple-700/80"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Latest Electronics at Best Prices
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-xl">
              Discover cutting-edge technology with unbeatable deals on smartphones, laptops, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-blue-700 hover:bg-gray-100 font-semibold px-6 py-3">
                Shop Now
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-700 bg-transparent font-semibold px-6 py-3"
              >
                View Deals
              </Button>
            </div>
          </div>

          {/* Optional Product Highlight (kept for balance on large screens) */}
          <div className="hidden md:block">
            <img
              src="/product1.png"
              alt="Featured Product"
              className="rounded-xl shadow-2xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
