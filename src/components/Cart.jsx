import React from 'react'
import { useSelector } from 'react-redux'

const SingleCartProduct = ({ product }) => {
  const { _id, name, addedQuantity, mrp, sellingPrice } = product
  return (
    <div className="w-[400px] bg-slate-100 h-[100px] rounded-lg flex">
      <div className="h-full w-[30%]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://res.cloudinary.com/dksw3p9mg/image/upload/v1711045256/cld-sample-5.webp"
          alt=""
        />
      </div>
      <div className="h-full w-[70%] flex flex-col relative">
        <h1 className="ml-2 font-600 text-f18">{name}</h1>

        <h2 className="ml-2 font-700 text-f22">{`₹${sellingPrice}`}</h2>
        <h3 className="ml-2 font-600 text-f14 line-through text-gray-400">
          {`₹${mrp}`}
        </h3>

        <p className="text-red-600 absolute top-1 right-4 text-md font-800 cursor-pointer">
          X
        </p>
      </div>
    </div>
  )
}

function Cart() {
  const { checkoutObj } = useSelector((state) => state.checkoutReducer)
  const { products } = checkoutObj
  return (
    <div className="">
      <div className="mt-8">
        <h1 className="text-f24 font-700 text-center">Checkout Summary</h1>
      </div>

      <div className="flex justify-center mt-8 flex-col items-center gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <SingleCartProduct key={product._id} product={product} />
          ))
        ) : (
          <div className="text-center">
            <h1 className="text-center font-500 text-f24 text-red-500">
              Please add something to cart
            </h1>
            <div>
              <a href="/" className="underline">
                Home
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
