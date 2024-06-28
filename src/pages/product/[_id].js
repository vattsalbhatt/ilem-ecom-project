import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import { commonApiCall } from '@/configs/apiCall'

export default function SingleProductPage({ productInfo }) {
  const { imageUrl, title, sellingPrice, mrp } = productInfo
  return (
    <main className={`flex min-h-screen flex-col items-center pb-8`}>
      <Navbar />
      <SearchBar />
      <div>
        <div className="h-[300px] w-[170px] md:w-[250px] border border-gray-400 rounded-lg flex flex-col gap-2 mt-4">
          <img
            className="h-[50%] object-cover"
            src={
              imageUrl
                ? imageUrl
                : 'https://res.cloudinary.com/dksw3p9mg/image/upload/v1711045256/cld-sample-5.webp'
            }
            alt="image"
          />
          <h1 className="ml-2 font-600 text-f18">{title}</h1>
          <div className="flex items-center">
            <h2 className="ml-2 font-700 text-f22">{`₹${sellingPrice}`}</h2>
            <h3 className="ml-2 font-600 text-f14 line-through text-gray-400">
              {`₹${mrp}`}
            </h3>
          </div>
        </div>
      </div>
    </main>
  )
}

SingleProductPage.getInitialProps = async (ctx) => {
  const { _id } = ctx?.query

  let data
  if (_id) {
    data = await commonApiCall(`/product/${_id}`, 'get')
  }

  return {
    productInfo: data,
  }
}
