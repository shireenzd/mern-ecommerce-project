import React from 'react'
import CategoryFilter from "./CategoryFilter"
import SearchFilter from "./SearchFilter"
import FavoritesFilter from "./FavoritesFilter"
import Sorting from "./Sorting"

function FiltersBar() {
  // TODO
  return (
    <div className="flex gap-4 justify-between px-6 py-4 pt-0">
      <CategoryFilter />
      <SearchFilter />
      <FavoritesFilter />
      <Sorting/>
    </div>
  )
}

export default FiltersBar