import React from 'react'
import { useCommerceStore } from "../../store"

function SearchFilter() {
  const {
    searchFilter,
    setSearchFilter
  } = useCommerceStore()

  return (
    <input
      className="min-w-0 flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm outline-none focus:border-gray-500"
      type="search"
      name="search"
      id="search"
      placeholder="Search products"
      value={searchFilter}
      onChange={(e) => { setSearchFilter(e.target.value) }}
    />
  )
}

export default SearchFilter
