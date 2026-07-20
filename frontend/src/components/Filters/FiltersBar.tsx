import React from 'react'
import CategoryFilter from "./CategoryFilter"
import SearchFilter from "./SearchFilter"
import FavoritesFilter from "./FavoritesFilter"
import Sorting from "./Sorting"

function FiltersBar() {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-100 px-6 pb-4 md:flex-row md:items-center md:justify-between">
      <CategoryFilter />
      <div className="flex min-w-0 flex-1 items-center gap-3 md:max-w-xl">
        <SearchFilter />
        <FavoritesFilter />
        <Sorting />
      </div>
    </div>
  )
}

export default FiltersBar
