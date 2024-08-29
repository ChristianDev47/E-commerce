import './index.css'
import { Principal } from "./components/Principal";
import  Navbar  from "./components/Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductDetails } from './components/Details';
import Footer from './components/Footer';
import { Products } from './components/Products';
import { FiltersProvider } from './context/filters';
import { CartProvider } from './context/cart';
import { CartDetails } from './components/Cart/Details';
import { AuthProvider } from './context/auth';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { NewProducts } from './components/News';
import Profile from './components/User/Profile';
import EditLogin from './components/User/EditLogin';
import EditName from './components/User/EditLogin/EditName';
import EditEmail from './components/User/EditLogin/EditEmail';
import EditPhoneNumber from './components/User/EditLogin/EditPhoneNumber';
import EditPassword from './components/User/EditLogin/EditPassword';
import Payment from './components/Payment/PaymentDetail';
import EditAddress from './components/User/EditLogin/EditAddress';
import Address from './components/User/Address/Address';
import AddPaymentMethod from './components/User/Payment/AddPaymentMetod';
import Orders from './components/Orders/Orders';
import { FiltersOrderProvider } from './context/orderFilter';
import About from './components/About';
import Contact from './components/Contact';
import { ProductProvider } from './context/products';
import ProtectedRoute from './utils/protectedRoutes';
import { Toaster } from 'react-hot-toast';
import Loading from './ui/Loading';
import { ModalProvider } from './context/modal';
import { OrderProvider } from './context/orders';

function App() {

  return (
    <>
      <BrowserRouter>
        <ProductProvider>
          <AuthProvider>
            <CartProvider>
              <OrderProvider>
              <ModalProvider>
                <Loading>
                  <FiltersProvider>
                    <FiltersOrderProvider>
                      <Navbar/>
                      <Routes>
                      <Route path='/' element={<Principal/>}/>
                        <Route path='/about' element={<About/>}/>
                        <Route path='/contact' element={<Contact/>}/>
                        <Route path='/products' element={<Products/>}/>
                        <Route path='/card_details' element={<CartDetails/>}/>
                        <Route path='/products/filters' element={<Products/>}/>
                        <Route path='/product/:id' element={<ProductDetails/>}/>
                        <Route path='/new_products' element={<NewProducts/>}/>
                        <Route path='/login' element={<Login/>}/>
                        <Route path='/register' element={<Register/>}/>
                        <Route element={<ProtectedRoute />}>
                          <Route path='/profile' element={<Profile/>}/>
                          <Route path='/profile/orders' element={<Orders/>}/>s
                          <Route path='/profile/login-segurity' element={<EditLogin/>}/>
                          <Route path='/profile/login-segurity/name' element={<EditName/>}/>
                          <Route path='/profile/login-segurity/email' element={<EditEmail/>}/>
                          <Route path='/profile/login-segurity/phone-number' element={<EditPhoneNumber/>}/>
                          <Route path='/profile/login-segurity/password' element={<EditPassword/>}/>
                          <Route path='/profile/addresses' element={<EditAddress/>}/>
                          <Route path='/profile/addresses/add' element={<Address/>}/>
                          <Route path='/profile/addresses/edit/:id' element={<Address/>}/>
                          <Route path='/profile/payment' element={<AddPaymentMethod/>}/>
                          <Route path='/complet_order' element={<Payment/>}/>
                        </Route>
                      </Routes>
                    </FiltersOrderProvider>
                  </FiltersProvider>
                  <Footer/>
                </Loading>
              </ModalProvider>
              </OrderProvider>
            </CartProvider>
          </AuthProvider>
        </ProductProvider>
      </BrowserRouter>
      <Toaster position="bottom-right"/>
    </>
  )
}

export default App 