import { useState } from 'react'
import ButtonLoading from './Assets/ButtonLoading'
import { commonApiCall } from '@/configs/apiCall'
import { message } from 'antd'
import { useRouter } from 'next/router'

function AddProductComponent() {
  const [clientErrors, setClientErrors] = useState({})
  const [productDetails, setProductDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const validateForm = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const { title, mrp, sellingPrice, imageUrl } = productDetails
    const errors = {}

    if (!title) errors.title = 'Please enter a title'
    if (!mrp) errors.mrp = 'Please enter an MRP'
    if (!sellingPrice) errors.sellingPrice = 'Please enter a Selling Price'

    if (Object.keys(errors).length) {
      setIsLoading(false)
      return setClientErrors(errors)
    } else {
      const res = await commonApiCall('/product', 'post', productDetails)

      if (res._id) {
        message.success('Product has been added successfully!')
        setProductDetails({})
        setIsLoading(false)
        setTimeout(() => router.reload(), 2000)
      }
    }
  }

  return (
    <section className="pt-8 w-[90%] xl:w-[80%] mx-auto flex px-5 justify-between gap-10 pb-8">
      {/* Left and right handling */}
      <div className="w-full mx-auto h-full flex flex-col justify-between">
        <div className="w-[90%] xl:w-[40%] mx-auto">
          <h1 className="text-f28 md:text-f48 font-bold leading-10 lg:pr-[90px] md:leading-[64px] text-center">
            Add Product
          </h1>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Product Name</label>
              <input
                type="text"
                name="title"
                id="title"
                className="w-full rounded-[18px] px-4 py-3 border border-opacity-5"
                style={{
                  backgroundColor: 'rgba(249, 247, 249, 1)',
                  borderColor: 'rgba(223, 223, 223, 1)',
                }}
                placeholder="Product Name"
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    title: e.target.value,
                  })
                }
                value={productDetails.title}
              />
              <p className="text-red-600">{clientErrors.title}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">Selling Price</label>
              <input
                type="text"
                name="sellingPrice"
                id="sellingPrice"
                className="w-full rounded-[18px] px-4 py-3 border border-opacity-5"
                style={{
                  backgroundColor: 'rgba(249, 247, 249, 1)',
                  borderColor: 'rgba(223, 223, 223, 1)',
                }}
                placeholder="Selling Price"
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    sellingPrice: e.target.value,
                  })
                }
                value={productDetails.sellingPrice}
              />
              <p className="text-red-600">{clientErrors.sellingPrice}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">MRP</label>
              <input
                type="text"
                name="mrp"
                id="mrp"
                className="w-full rounded-[18px] px-4 py-3 border border-opacity-5"
                style={{
                  backgroundColor: 'rgba(249, 247, 249, 1)',
                  borderColor: 'rgba(223, 223, 223, 1)',
                }}
                placeholder="MRP"
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    mrp: e.target.value,
                  })
                }
                value={productDetails.mrp}
              />
              <p className="text-red-600">{clientErrors.mrp}</p>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="">Product Image URL {`(Optional)`}</label>
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                className="w-full rounded-[18px] px-4 py-3 border border-opacity-5"
                style={{
                  backgroundColor: 'rgba(249, 247, 249, 1)',
                  borderColor: 'rgba(223, 223, 223, 1)',
                }}
                placeholder="Image URL"
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    imageUrl: e.target.value,
                  })
                }
                value={productDetails.imageUrl}
              />
              <p className="text-red-600">{clientErrors.imageUrl}</p>
            </div>

            <div>
              <ButtonLoading
                classes={
                  'bg-sunglow h-[56px] text-f16 font-figtreep rounded-xl w-full font-bold'
                }
                type="submit"
                isLoading={isLoading}
                callback={validateForm}
              >
                Add Product
              </ButtonLoading>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AddProductComponent
