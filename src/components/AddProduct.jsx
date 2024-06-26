import { useState } from 'react'
import ButtonLoading from './Assets/ButtonLoading'

function AddProductComponent() {
  const [clientErrors, setClientErrors] = useState({})
  const [userDetails, setUserDetails] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const { email, password } = userDetails
    const errors = {}

    // Email regex pattern for validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!email) {
      errors.email = 'Email is required'
    } else if (!emailPattern.test(email)) {
      errors.email = 'Invalid email format'
    }
    if (!password) errors.password = 'Password is required'

    if (Object.keys(errors).length) {
      setIsLoading(false)
      return setClientErrors(errors)
    } else {
    }
  }

  return (
    <section className="pt-8 h-[85vh] w-[90%] xl:w-[80%] mx-auto flex px-5 justify-between gap-10">
      {/* Left and right handling */}
      <div className="w-full mx-auto h-full md:mx-0 flex flex-col justify-between">
        <div className="w-[40%] mx-auto">
          <h1 className="text-f28 md:text-f48 font-bold leading-10 lg:pr-[90px] md:leading-[64px] text-center">
            Add Product
          </h1>

          <div className="flex flex-col gap-6 mt-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Product Name</label>
              <input
                type="text"
                name="productName"
                id="productName"
                className="w-full rounded-[18px] px-4 py-3 border border-opacity-5"
                style={{
                  backgroundColor: 'rgba(249, 247, 249, 1)',
                  borderColor: 'rgba(223, 223, 223, 1)',
                }}
                placeholder="Product Name"
              />
              <p className="text-red-600">{clientErrors.productName}</p>
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
              />
              <p className="text-red-600">{clientErrors.mrp}</p>
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
