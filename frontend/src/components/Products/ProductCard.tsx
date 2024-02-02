import React from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { useCommerceStore } from '../../store';

function ProductCard({ product }: { product: any }) {

    const {addOneToCart}= useCommerceStore()

    // {
    //     "_id": "65b256fd536b3d34bdae73c4",
    //     "name": "ui added product 1",
    //     "price": 10,
    //     "description": "sgjkhwkhjlglkjwrlrewrgerwg",
    //     "store": "65b256cc536b3d34bdae73bf",
    //     "category": "test",
    //     "updatedAt": "2024-01-25T12:41:33.336Z",
    //     "createdAt": "2024-01-25T12:41:33.336Z",
    //     "__v": 0
    // }
    return (
        <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
            <div className="top h-[60%] relative">
                <div className="absolute top-2 left-2 leading-none text-sm">Store name</div>
                <img className="object-cover h-full" src="/pexels-photo-90946.webp" alt="" />
                <BsHeartFill className="absolute bottom-2 right-2 BsHeart-main" />
            </div>
            <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
                <span className="flex justify-between gap-4 items-center font-bold">
                    <h3 title={product.name} className="text-start text-xs truncate">{product.name}</h3>
                    <h3 className="text-end text-xs">${product.price}</h3>
                </span>
                <p className="text-xs mt-1 overflow-y-scroll">
                    {product.description}
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam quia magnam eveniet, perferendis non vel rem ad numquam ut sunt. Mollitia quia numquam consequuntur labore unde qui facilis alias laudantium!
                </p>
                <span className="flex justify-end">
                    <button type="button" className="text-xs font-bold px-2 py-1 bg-black rounded-md text-white" onClick={()=>{addOneToCart(product._id)}}>Add To Cart</button>
                </span>
            </div>
        </div>
    )
}

export default ProductCard