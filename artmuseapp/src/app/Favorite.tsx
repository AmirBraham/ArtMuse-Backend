import { StarIcon } from '@heroicons/react/24/outline'
import { StarIcon as StartIconSolid } from '@heroicons/react/24/solid'

import { add_favorite, remove_favorite  } from './state/manager'
import { useEffect, useState } from 'react'
export default function Favorite({isFavorite=false,addToFavorite,removeFromFavorite}) {
  return <>
  {
    isFavorite ? <StartIconSolid onClick={
      removeFromFavorite} className="h-5 w-5 " /> : <StarIcon onClick={
      addToFavorite} className="h-5 w-5 " />
  } 
  </>

}