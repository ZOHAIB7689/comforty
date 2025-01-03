import ProductShowcase from '@/components/ChairGallery'
import FeaturedProductComponent from '@/components/FeaturedProductComponent'
import FurnitureCollection from '@/components/Hero-section'
import LastHome from '@/components/LastHome'
import Logos from '@/components/logos'
import TopCategories from '@/components/TopCategory'
import React from 'react'

export default function Home() {
  return (
    <div>
        <FurnitureCollection/>
        <Logos/>
        <FeaturedProductComponent/>
      <TopCategories/>s
      <ProductShowcase/>
      <LastHome/>
    </div>
  )
}
