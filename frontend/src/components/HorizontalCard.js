import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayNGNCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const HorizontalCard = ({loading, data = []}) => {
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id)=>{
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return(
        <div className='container mx-auto'>
            <div className='flex flex-col items-center lg:flex-row gap-10 lg:justify-between p-4'>
                {
                    loading ? (
                        loadingList.map((product, index)=>{
                            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                                
                                </div>
                                <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse p-1'></button>
                                </div>
                            </div>
                        })
                        
                    ) : (
                        data.map((product, index)=>{
                            return(
                                <Link to={"/product/"+product?._id} className='flex flex-shrink-0 sm:max-w-sm sm:min-w-[280px] md:w-full md:min-w-[280px] md:max-w-[350px] h-36 bg-white rounded-sm shadow ' onClick={scrollTop}>
                                    <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                                    </div>
                                    <div className='p-4 grid'>
                                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{ displayNGNCurrency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{ displayNGNCurrency(product?.price)}</p>
                                        </div>
                                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>
                                </Link>
                            )
                        })

                    )
                }

            </div>
        </div>
    )
}

export default HorizontalCard