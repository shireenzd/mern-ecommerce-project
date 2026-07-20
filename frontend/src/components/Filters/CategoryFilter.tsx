import React from 'react'
import { useCommerceStore } from "../../store"
import { productCategories } from "../../shared/constants"

function CategoryFilter() {

  const {
    categoryFilter,
    setCategoryFilter
  } = useCommerceStore()

  const categories = ['', ...productCategories]

  return (
    <div className="categories flex flex-wrap items-center gap-3">
      {categories.map((category) => {
        if (!category) {
          return (
            <button
              type="button"
              key="category_all"
              onClick={() => { setCategoryFilter(category) }}
              className={`cursor-pointer text-lg font-bold ${categoryFilter === category ? 'active' : 'text-gray-700'}`}
            >
              All
            </button>
          )
        }
        return (
          <button
            type="button"
            key={'category_' + category}
            onClick={() => { setCategoryFilter(category) }}
            className="h-10"
            aria-label={category}
            aria-pressed={categoryFilter === category}
          >
            <img
              className={`h-full min-w-7 cursor-pointer ${categoryFilter === category ? 'active-img' : ''}`}
              src={'/categories/' + category + '.png'}
              alt={category}
            />
          </button>
        )
      })}
    </div>
  )
}

export default CategoryFilter
