import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Products from '@/components/Products'
import SearchBar from '@/components/SearchBar'
import { commonApiCall } from '@/configs/apiCall'

export default function Home(props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pb-8`}
    >
      <Navbar />
      <SearchBar />
      <Products props={props} />
    </main>
  )
}

Home.getInitialProps = async () => {
  const data = await commonApiCall('/product/all', 'get')

  console.log(data)
  return {
    latestProducts: [...data],
  }
}
