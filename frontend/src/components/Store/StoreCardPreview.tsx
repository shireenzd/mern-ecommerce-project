import React from 'react'
import { BsHeartFill } from "react-icons/bs"

function StoreCardPreview({inputs}:{inputs:any}) {
  return (
    <div className="flex flex-col w-44 h-[280px] overflow-clip rounded-xl shadow-md">
      <div className="top h-[60%] relative">
        <div className="absolute truncate w-20 top-2 left-2 leading-none text-sm">{inputs.name}</div>
        <div className="absolute top-2 right-2 w-16">
          {inputs.logo && <img src={URL.createObjectURL(inputs.logo)} alt="" />}
        </div>
        {/* TODOs */}
        <img className="object-cover h-full" src="/pexels-photo-90946.webp" alt="" />
        <BsHeartFill className="absolute bottom-2 right-2 BsHeart-main" />
      </div>
      <div className="bottom px-2 py-2 h-[40%] flex flex-col justify-between">
        <span className="flex justify-between gap-4 items-center font-bold">
          <h3 title="product name" className="text-start text-xs truncate">Product Name</h3>
          <h3 className="text-end text-xs">$99.99</h3>
        </span>
        <p className="text-xs mt-1 overflow-y-scroll">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam quia magnam eveniet, perferendis non vel rem ad numquam ut sunt. Mollitia quia numquam consequuntur labore unde qui facilis alias laudantium!
        </p>
        <span className="flex justify-end">
          <button type="button" className="text-xs font-bold px-2 py-1 bg-black rounded-md text-white">Add To Cart</button>
        </span>
      </div>
    </div>
  )
}

export default StoreCardPreview