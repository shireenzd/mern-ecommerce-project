import React from 'react'
import { blackButtonStyle, greenButtonStyle, redButtonStyle } from "../../shared/constants"
import { useCommerceStore } from "../../store"

function ConfirmModal({ message, onConfirm, style }: { message: string, onCancel: Function, onConfirm: Function, style?: string }) {
  const {
    setShowConfirmModal,
    onCancel,
  } = useCommerceStore()

  const handleConfirm = async () => {
    await onConfirm()
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-left text-gray-900 shadow-xl">
        <h2 className="text-lg font-semibold">Confirm action</h2>
        <p className="mt-2 text-sm text-gray-600">
          {message || 'Are you sure you want to continue?'}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              onCancel?.()
              setShowConfirmModal(false)
            }}
            className={blackButtonStyle}
            type="button"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={'red' === style ? redButtonStyle : greenButtonStyle}
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
