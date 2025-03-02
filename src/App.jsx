import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import AllProducts from './pages/AllProducts'
import ProductDetails from './pages/ProductDetails'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<AllProducts />} />
            <Route path='/products/:category' element={<AllProducts />} />
            <Route path='/product/:productId' element={<ProductDetails />} />
            <Route path='/search-products/:searchQuery' element={<AllProducts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
