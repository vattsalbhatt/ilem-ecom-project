import { setCheckoutObj, setFetchedProducts } from '@/redux/features/checkout'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SingleProduct = ({ product, incrementQuantity, decrementQuantity }) => {
  const { _id, title, addedQuantity, mrp, sellingPrice, imageUrl } = product
  return (
    <div className="min-h-[300px] w-[170px] md:w-[250px] border border-gray-400 rounded-lg flex flex-col gap-2 mt-4">
      <img
        className="h-[150px] object-cover"
        src={
          imageUrl
            ? imageUrl
            : 'https://res.cloudinary.com/dksw3p9mg/image/upload/v1711045256/cld-sample-5.webp'
        }
        alt="image"
      />
      <h1 className="ml-2 font-600 text-f14 lg:text-f18 line-clamp-1">
        {title}
      </h1>
      <div className="flex items-center">
        <h2 className="ml-2 font-700  text-f18 lg:text-f22">{`₹${sellingPrice}`}</h2>
        <h3 className="ml-2 font-600 text-f14 line-through text-gray-400">
          {`₹${mrp}`}
        </h3>
      </div>
      {addedQuantity > 0 ? (
        <div className="border border-gray-300 w-[90%] mx-auto h-10 rounded-lg flex justify-between items-center mt-4">
          <button
            className="w-10 h-10 bg-gray-400 rounded-lg font-700"
            onClick={() => decrementQuantity(_id)}
          >
            -
          </button>
          <h3 className="text-f16 font-600">{addedQuantity}</h3>
          <button
            className="w-10 h-10 bg-gray-400 rounded-lg font-700"
            onClick={() => incrementQuantity(_id)}
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => incrementQuantity(_id)}
          className="border shadow-sm bg-gray-300 w-[90%] mx-auto h-10 rounded-lg  mt-4 text-center font-600"
        >
          {' '}
          Add to Cart
        </button>
      )}
    </div>
  )
}

export default function Products({ props }) {
  const { latestProducts } = props
  const dispatch = useDispatch()
  const { checkoutObj, fetchedProducts } = useSelector(
    (state) => state.checkoutReducer,
  )

  const { products } = checkoutObj

  useEffect(() => {
    if (fetchedProducts.length === 0) {
      const updatedProductRes = latestProducts.map((product) => {
        return {
          ...product,
          addedQuantity: 0,
        }
      })
      dispatch(setFetchedProducts(updatedProductRes))
    } else {
      const updatedFetchedProducts = fetchedProducts.map((product) => {
        const foundProduct = checkoutObj.products.find(
          (p) => p._id === product._id,
        )
        return foundProduct
          ? { ...product, addedQuantity: foundProduct.addedQuantity || 0 }
          : product
      })
      dispatch(setFetchedProducts(updatedFetchedProducts))
    }
  }, [latestProducts, products])

  const incrementQuantity = (_id) => {
    let updatedFetchedProducts = fetchedProducts.map((product) => {
      if (product['_id'] === _id) {
        return {
          ...product,
          addedQuantity: (product.addedQuantity || 0) + 1,
        }
      }
      return product
    })

    let updatedCheckoutProducts = [...checkoutObj.products]


    const existingProductIndex = updatedCheckoutProducts.findIndex(
      (product) => product['_id'] === _id,
    )

    // If product does not exist
    if (existingProductIndex === -1) {
      let newObj = updatedFetchedProducts.find((item) => item['_id'] === _id)
      updatedCheckoutProducts.push({
        ...newObj,
      })
    } else {
      // Product exist, add it to checkoutProducts
      updatedCheckoutProducts[existingProductIndex] = {
        ...updatedCheckoutProducts[existingProductIndex],
        addedQuantity:
          updatedCheckoutProducts[existingProductIndex]['addedQuantity'] + 1,
      }
    }

    dispatch(setFetchedProducts(updatedFetchedProducts))
    dispatch(
      setCheckoutObj({ ...checkoutObj, products: updatedCheckoutProducts }),
    )
  }

  const decrementQuantity = (_id) => {
    let updatedFetchedProducts = fetchedProducts.map((product) => {
      if (product['_id'] === _id) {
        return {
          ...product,
          addedQuantity:
            product.addedQuantity > 0 ? product.addedQuantity - 1 : 0,
        }
      }
      return product
    })

    let updatedCheckoutProducts = [...checkoutObj.products]

    const existingProductIndex = updatedCheckoutProducts.findIndex(
      (product) => product['_id'] === _id,
    )

    updatedCheckoutProducts[existingProductIndex] = {
      ...updatedCheckoutProducts[existingProductIndex],
      addedQuantity:
        updatedCheckoutProducts[existingProductIndex]['addedQuantity'] > 0
          ? updatedCheckoutProducts[existingProductIndex]['addedQuantity'] - 1
          : 0,
    }

    if (updatedCheckoutProducts[existingProductIndex]['addedQuantity'] === 0) {
      const filteredCheckoutProducts = updatedCheckoutProducts.filter(
        (product) =>
          product._id !== updatedCheckoutProducts[existingProductIndex]['_id'],
      )
      dispatch(
        setCheckoutObj({ ...checkoutObj, products: filteredCheckoutProducts }),
      )
    } else {
      dispatch(
        setCheckoutObj({ ...checkoutObj, products: updatedCheckoutProducts }),
      )
    }

    dispatch(setFetchedProducts(updatedFetchedProducts))
  }

  const sortByNameAsc = (products) => {
    return [...products].sort((a, b) => a.title.localeCompare(b.title))
  }

  const sortByNameDesc = (products) => {
    return [...products].sort((a, b) => b.title.localeCompare(a.title))
  }

  const sortByPriceHighToLow = (products) => {
    return [...products].sort((a, b) => b.sellingPrice - a.sellingPrice)
  }

  const sortByPriceLowToHigh = (products) => {
    return [...products].sort((a, b) => a.sellingPrice - b.sellingPrice)
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center lg:justify-between gap-2 mt-8">
        <div>
          <button
            className="w-48 rounded-lg bg-slate-200 px-2 py-1 font-600"
            onClick={() =>
              dispatch(
                setFetchedProducts(sortByPriceHighToLow(fetchedProducts)),
              )
            }
          >
            High to Low
          </button>
        </div>
        <div>
          <button
            className="w-48 rounded-lg bg-slate-200 px-2 py-1 font-600"
            onClick={() =>
              dispatch(
                setFetchedProducts(sortByPriceLowToHigh(fetchedProducts)),
              )
            }
          >
            Low to High
          </button>
        </div>
        <div>
          <button
            className="w-48 rounded-lg bg-slate-200 px-2 py-1 font-600"
            onClick={() =>
              dispatch(setFetchedProducts(sortByNameAsc(fetchedProducts)))
            }
          >
            A to Z
          </button>
        </div>
        <div>
          <button
            className="w-48 rounded-lg bg-slate-200 px-2 py-1 font-600"
            onClick={() =>
              dispatch(setFetchedProducts(sortByNameDesc(fetchedProducts)))
            }
          >
            Z to A
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {fetchedProducts.map((product, index) => (
          <SingleProduct
            key={index}
            product={product}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        ))}
      </div>
    </div>
  )
}
