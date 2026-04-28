import { Menu, ShoppingCart, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = true
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-purple-300 fixed top-0 left-0 w-full z-20 border-b border-purple-400 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/Ecommerce(1).png" alt="Ecommerce Logo" className="w-27.5 h-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-purple-900 hover:text-purple-700 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6 items-center text-lg font-semibold text-purple-900">
            <Link to="/" className="hover:text-purple-700 transition-colors"><li>Home</li></Link>
            <Link to="/products" className="hover:text-purple-700 transition-colors"><li>Products</li></Link>
            {user && (
              <Link to="/profile" className="hover:text-purple-700 transition-colors">
                <li>Hello User</li>
              </Link>
            )}
          </ul>

          {/* Cart */}
          <Link to="/cart" className="relative text-purple-900 hover:text-purple-700 transition-colors">
            <ShoppingCart size={26} />
            <span className="bg-purple-600 text-white text-xs font-bold rounded-full absolute -top-2 -right-2 px-2 py-px">
              0
            </span>
          </Link>

          {/* Auth Button */}
          {user ? (
            <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isOpen && (
        <div className="md:hidden bg-purple-200 border-t border-purple-300 px-6 py-4 space-y-4">
          <Link to="/" className="block text-purple-900 font-semibold hover:text-purple-700">Home</Link>
          <Link to="/products" className="block text-purple-900 font-semibold hover:text-purple-700">Products</Link>
          {user && (
            <Link to="/profile" className="block text-purple-900 font-semibold hover:text-purple-700">Hello User</Link>
          )}
          <Link to="/cart" className="flex items-center gap-2 text-purple-900 hover:text-purple-700">
            <ShoppingCart size={22} />
            <span>Cart (0)</span>
          </Link>
          {user ? (
            <button className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Logout
            </button>
          ) : (
            <Link to="/login" className="block w-full bg-purple-500 hover:bg-purple-600 text-white font-medium px-4 py-2 rounded-lg transition-colors">
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
