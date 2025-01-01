"use client";

import React from 'react'
import { Image as newimage } from "sanity"
import { urlFor } from '@/sanity/lib/image'
import { FC } from 'react'
import { IoCartOutline } from 'react-icons/io5';
import Image from 'next/image';
import { Button } from './ui/button';

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
      <div className=" border bg-gray-300 border-zinc-700 rounded-lg">
        <div className="w-full h-3/4">
          <Image src={urlFor(Item.image).url()} alt={Item.title} height={300} width={300} />
        </div>
        <div className='flex justify-between w-full' >
          <h1 className=" text-xl">{Item.title}</h1>
        <Button className=" font-bold" variant={"ghost"} onClick={handleAdToCart}>
            <IoCartOutline size={32}/>
        </Button>
          <p className="text-gray-300">{Item.description}</p>
        </div>
          <p className="text-lg font-semibold mt-2">${Item.price}</p>
      </div>
    </div>
  )
}

export default ProductCard;