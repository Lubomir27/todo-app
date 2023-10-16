import { DialogTitle } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { ReactNode } from 'react'

interface ModalProps {
    title?: string
    modalElement: ReactNode
    isOpen: boolean
    onClose: () => void
}

const Modal = ({ title, modalElement, isOpen, onClose }: ModalProps) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>{modalElement}</DialogContent>
        </Dialog>
    )
}

export default Modal
