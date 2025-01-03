"use client";

import React from 'react'
import { Image as newimage } from "sanity"
import { urlFor } from '@/sanity/lib/image'
import { FC } from 'react'
import { IoCartOutline } from 'react-icons/io5';
import Image from 'next/image';

interface Products {
  _id: string;
  title: string;
  description: string;
  image: newimage;
  price: number;
  category: {
    title: string;
  }
}

const ProductCard:FC<{Item : Products}> = ({ Item }) => {
    const handleAdToCart = async()=>{ 
     const res =  await fetch("/api/cart" , {
        method : "POST",
        body: JSON.stringify({
            product_id: Item._id
        })
      })
      await res.json()
    }
  return (
    <div>
      <div className=" border rounded-lg p-2 cursor-pointer hover:bg-zinc-50 duration-200 hover:-translate-y-2">
        <div className="w-full h-3/4 overflow-hidden">
         <div className='bg-black w-[200px] rounded-md'> <Image
            src={urlFor(Item.image).url()}
            alt={Item.title}
            height={200}
            width={200}
            className='hover:scale-110 hover:opacity-70 duration-200'
          /></div>
        </div >
        <div className="flex m-2 justify-between w-full">
          <h1 className=" text-sm">{Item.title}</h1>
          <button
            className=" mr-2 p-2 rounded-lg duration-200 hover:bg-[#029FAE] font-bold"
            onClick={handleAdToCart}
          >
            <IoCartOutline size={24} />
          </button>
        </div>
        <p className="text-lg p-2 font-bold mt-2">${Item.price}</p>
      </div>
    </div>
  );
}

export default ProductCard;