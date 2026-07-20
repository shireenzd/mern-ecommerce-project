import React from 'react'
import { BsHeartFill } from 'react-icons/bs';
import { useCommerceStore } from "../../store";

function FavoritesFilter() {
  const {
    favoritesToggled,
    toggleFavoritesFilter
  } = useCommerceStore()

  return (
    <button
      type="button"
      aria-label="Toggle favorites filter"
      aria-pressed={!!favoritesToggled}
      onClick={toggleFavoritesFilter}
      className="shrink-0 rounded-full border border-gray-200 p-2 transition hover:bg-gray-50"
    >
      <BsHeartFill
        size={22}
        className={`BsHeart-main m-0 p-0 ${favoritesToggled ? 'active' : 'text-gray-300'}`}
      />
    </button>
  )
}

export default FavoritesFilter
