import React, { useEffect } from 'react'
import CartItems from './CartItems'
import { useDispatch, useSelector } from 'react-redux'
import { cart_get } from '../redux/counter/cartDetail'
import { calculateTotalPrice } from '../assets/findTotalPrice'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  useEffect(() => {
     localStorage.getItem('auth-token') ? dispatch(cart_get()) : navigate('/auth')
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch])
  
  const { data, error } = useSelector((state) => state.cart_all)
    const {signedIn}=useSelector((state)=>state.isLoggedIn)
  return (
    <>
    {!signedIn && navigate('/')}
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10 mt-8 md:mt-2">
          <div className="grid grid-cols-12">
            <div
              className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
              <div className="flex items-center justify-between pb-8 border-b border-gray-300">
                <h2 className="font-manrope font-bold text-3xl leading-10 text-black">Shopping Cart</h2>
                <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">{data?.length} Items</h2>
              </div>
              {data?.length===0?<>
                <img src="https://www.theblockart.com/assets/images/empty-cart.png" alt="" className='mt-12 mx-auto' />
              </>:<>
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">Product Details</p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">Quantity</p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center ml-16">Total</p>
                    </div>
                  </div>
                </div>
              </div>
              {data?.map((item)=>{
                return <CartItems name={item.name} image={item.image} count={item.qty} price={item.price} linkToItem={item.product} itemId={item._id} variant={item.variant} key={item._id} />
              })}
              </>
              }
            </div>
            <div
              className=" col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
                Order Summary</h2>
              <div className="mt-8">
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">Promo Code
                  </label>
                  <div className="flex pb-4 w-full">
                    <div className="relative w-full ">
                      <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300">

                      </div>
                      <input type="text"
                        className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                        placeholder="xxxx xxxx xxxx" />
                      </div>
                  </div>
                  <div className="flex items-center border-b border-gray-200">
                    <button
                      className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">Apply</button>
                  </div>
                  
                  <div className="flex items-center justify-between py-8">
                    <p className="font-medium text-xl leading-8 text-black"> Total</p>
                    <p className="font-semibold text-xl leading-8 text-indigo-600">₹{calculateTotalPrice(data)}</p>
                    
                  </div>
                   
                  <button
                    className={`w-full text-center disabled:bg-indigo-300 bg-indigo-700 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700 disabled:hover:bg-indigo-300`} disabled={data?.length===0}>Checkout</button>
                
              </div>
            </div>
          </div>
        </div>
      
    </>
  )
}

export default Cart
