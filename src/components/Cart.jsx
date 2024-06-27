import { commonApiCall } from '@/configs/apiCall'
import { setCheckoutObj, setFetchedProducts } from '@/redux/features/checkout'
import { Button, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonLoading from './Assets/ButtonLoading'

const SingleCartProduct = ({
  product,
  removeProduct,
  incrementQuantity,
  decrementQuantity,
}) => {
  const { _id, name, addedQuantity, mrp, sellingPrice } = product
  return (
    <div className="w-[400px] bg-slate-100 h-[140px] rounded-lg flex">
      <div className="h-full w-[30%]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src="https://res.cloudinary.com/dksw3p9mg/image/upload/v1711045256/cld-sample-5.webp"
          alt=""
        />
      </div>
      <div className="h-full w-[70%] flex flex-col relative ml-2 ">
        <h1 className="ml-2 font-600 text-f18">{name}</h1>
        <h2 className="ml-2 font-700 text-f22">{`₹${sellingPrice}`}</h2>
        <h3 className="ml-2 font-600 text-f14 line-through text-gray-400">
          {`₹${mrp}`}
        </h3>
        <div className="flex gap-4 ml-2 mt-4 text-f18">
          <button
            className="w-6 h-6 bg-slate-300 shadow-sm rounded-lg text-center flex items-center justify-center"
            onClick={() => decrementQuantity(_id)}
          >
            -
          </button>
          <p>{addedQuantity}</p>
          <button
            className="w-6 h-6 bg-slate-300 shadow-sm rounded-lg text-center flex items-center justify-center"
            onClick={() => incrementQuantity(_id)}
          >
            +
          </button>
        </div>
        <div className="absolute right-5 bottom-2">
          {`₹${addedQuantity * sellingPrice}`}
        </div>
        <p
          className="text-red-600 absolute top-1 right-4 text-md font-800 cursor-pointer"
          onClick={() => removeProduct(_id)}
        >
          X
        </p>
      </div>
    </div>
  )
}

function Cart() {
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { checkoutObj, fetchedProducts } = useSelector(
    (state) => state.checkoutReducer,
  )
  const { products } = checkoutObj
  const dispatch = useDispatch()

  const removeProduct = (_id) => {
    const filteredArr = products.filter((product) => product._id !== _id)

    dispatch(
      setCheckoutObj({
        ...checkoutObj,
        products: filteredArr,
      }),
    )

    const updatedFetchedProducts = fetchedProducts.map((product) => {
      if (product._id === _id) {
        return {
          ...product,
          addedQuantity: 0,
        }
      }
      return product
    })

    dispatch(setFetchedProducts(updatedFetchedProducts))
  }

  useEffect(() => {
    const total = products.reduce((acc, product) => {
      return product.sellingPrice * product.addedQuantity + acc
    }, 0)
    setTotal(total)
  }, [products])

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

    let updatedCheckoutProducts = [...checkoutObj.products] // Clone checkoutProducts array

    // Check if the product already exists in checkoutProducts
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

    let updatedCheckoutProducts = [...checkoutObj.products] // Clone checkoutProducts array

    // Check if the product already exists in checkoutProducts
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

  const handlePayNow = async () => {
    setIsLoading(true)
    const checkout = await commonApiCall('/checkout/createCheckout', 'post', {
      userId: '665725c93619dff2ce6a38a2',
      products: products,
      amount: total*100,
    })
    if(checkout){
      handlePayment(checkout)
    }


   
  }

  // handlePayment Function
  const handlePayment = async (checkout) => {
    try {
      const data = await commonApiCall(`/payment/createOrder`, 'post', {
        amount: total*100,
      })

      const processAndVerifyPayload = {
        ...data,
        checkoutId: checkout._id,
      }
      console.log(processAndVerifyPayload)
      handlePaymentVerify(processAndVerifyPayload)
    } catch (error) {
      console.log(error)
    }
  }

  // handlePaymentVerify Function
  const handlePaymentVerify = async (data) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: 'Vattsal Bhatt',
      order_id: data.id,
      handler: async (response) => {
        console.log('response', response)
        try {
          const res = await commonApiCall(`/payment/processAndVerify`, 'post', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            checkoutId: data.checkoutId, //for updatting the checkout
          })

          if (res.message) {
            message.success(res.message)
            setIsLoading(false)
          }
        } catch (error) {
          message.error('Something went wrong')
          console.log(error)
        }
      },
    }
    const rzp1 = new window.Razorpay(options)
    rzp1.open()
  }

  return (
    <div className="">
      <div className="mt-8">
        <h1 className="text-f24 font-700 text-center">Checkout Summary</h1>
      </div>

      <div className="flex justify-center items-center flex-col mt-8 gap-4">
        <div className="flex flex-col gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <SingleCartProduct
                key={product._id}
                product={product}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
                removeProduct={removeProduct}
              />
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

        {

          products.length > 0 && <> <div className="text-right font-500 text-f18">
          <h2>
            Total Items:{' '}
            <span className="text-f24 font-700"> {products.length}</span>
          </h2>
          <h1>
            Final Total:{' '}
            <span className="text-f24 font-700"> {`₹${total}`}</span>
          </h1>
        </div>
        <div>
          <ButtonLoading
            classes="bg-yellow-300 w-[300px] h-10 font-700 rounded-lg"
            callback={handlePayNow}
            isLoading={isLoading}
          >
            Pay Now
          </ButtonLoading>
        </div>
        </>
        }

       

      </div>
    </div>
  )
}

export default Cart
