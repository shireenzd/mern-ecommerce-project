import React from 'react'

function CategoryFilter() {
  const categories = [
    // keep the empty string for matching all items
    '',
    'clothes',
    'furniture',
    'arts',
    'vases',
    'paintings',
  ]
  return (
    <div className="categories flex gap-4 items-center">
      {categories.map((category) => {
        if (!category) {
          return <p>
            All
          </p>
        }
        return <img className="h-10" src={'/categories/' + category + '.png'} alt="" />

      }
      )}
    </div>
  )
}

export default CategoryFilter