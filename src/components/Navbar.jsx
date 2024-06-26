import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

function Navbar() {
  const router = useRouter()
  const { checkoutObj } = useSelector((state) => state.checkoutReducer)
  const { products } = checkoutObj
  return (
    <nav className="w-full h-14 bg-slate-100">
      <div className="w-[90%] mx-auto flex justify-between items-center  h-full">
        <h1
          className="font-700 text-f18 cursor-pointer"
          onClick={() => router.push('/')}
        >
          Shopping Mart
        </h1>
        <div className="flex gap-4">
          <h1
            className="font-400 text-f16 cursor-pointer"
            onClick={() => router.push('/add_product')}
          >
            Add Product
          </h1>
          <h1 className="font-600 text-f16 cursor-pointer">
            Cart Items {products.length}
          </h1>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
