import React from 'react'

function DarkFullScreenWrapper({ children }: { children: any }) {
    return (
        <div className="overflow-y-scroll w-full h-full absolute bg-[rgba(1,1,1,0.95)] z-10 p-6 text-white font-bold text-xl">
            {children}
        </div>
    )
}

export default DarkFullScreenWrapper