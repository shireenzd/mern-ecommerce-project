import React, { MouseEventHandler } from 'react'
import { blackButtonStyle, greenButtonStyle, redButtonStyle } from "../../shared/constants"
import DarkFullScreenWrapper from "../Shared/DarkFullScreenWrapper"
import { useCommerceStore } from "../../store"

function ConfirmModal({ message, onConfirm, style }: { message: string, onCancel: Function, onConfirm: MouseEventHandler, style?: string }) {
  const {
    setShowConfirmModal
  } = useCommerceStore()
  return (
    <DarkFullScreenWrapper>
      <div>
        <button onClick={() => setShowConfirmModal(false)} className={blackButtonStyle} type="button">Cancel</button>
        <button onClick={onConfirm} className={'red' === style ? redButtonStyle : greenButtonStyle} type="button">Confirm</button>
      </div>
    </DarkFullScreenWrapper>
  )
}

export default ConfirmModal