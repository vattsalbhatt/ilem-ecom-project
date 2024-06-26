import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import AddProduct from '@/components/AddProduct'

export default function AddProductPage() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between pt-2`}
    >
      <Navbar />
      <AddProduct />
    </main>
  )
}
