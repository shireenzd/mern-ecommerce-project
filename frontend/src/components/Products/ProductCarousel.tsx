import React, { useState } from 'react'
import { homeURL } from "../../shared/constants"

function ProductCarousel({ pictures }: { pictures: any[] }) {
    const [index, setIndex] = useState(0)
    const safePictures = Array.isArray(pictures) ? pictures : []

    const moveLeft = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!safePictures.length) return
        setIndex(index === 0 ? safePictures.length - 1 : index - 1)
    }

    const moveRight = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (!safePictures.length) return
        setIndex(index === safePictures.length - 1 ? 0 : index + 1)
    }

    if (!safePictures.length) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-gray-100 text-xs text-gray-400">
                No image
            </div>
        )
    }

    const src = typeof safePictures[index] === 'string'
        ? homeURL + safePictures[index]
        : URL.createObjectURL(safePictures[index])

    return (
        <div className="relative h-full w-full">
            <img
                className="h-full w-full object-cover"
                src={src}
                alt=""
            />
            {safePictures.length > 1 && (
                <>
                    <button
                        type="button"
                        onClick={moveLeft}
                        aria-label="Previous image"
                        className="absolute left-1 top-1/2 -translate-y-1/2 rounded bg-black/40 px-1.5 text-sm text-white"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={moveRight}
                        aria-label="Next image"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded bg-black/40 px-1.5 text-sm text-white"
                    >
                        ›
                    </button>
                </>
            )}
        </div>
    )
}

export default ProductCarousel
