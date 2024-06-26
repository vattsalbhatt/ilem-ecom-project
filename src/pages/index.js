import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Products from '@/components/Products'
import SearchBar from '@/components/SearchBar'

export default function Home(props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between py-2 pb-8`}
    >
      <Navbar />
      <SearchBar />
      <Products props={props} />
    </main>
  )
}

Home.getInitialProps = () => {
  const latestProducts = [
    { _id: 0, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 1, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 2, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 3, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 4, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 5, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 6, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
    { _id: 7, name: 'Nike Shoes', mrp: 500, sellingPrice: 300 },
  ]
  return {
    latestProducts: [...latestProducts],
  }
}
