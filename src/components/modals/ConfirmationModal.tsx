import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { FC } from 'react'

interface ConfirmationModalProps {
    open: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export const ConfirmationModal: FC<ConfirmationModalProps> = ({ open, onClose, onConfirm, title, message }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <div className="flex justify-end gap-6 my-4">
                    <Button
                        variant="contained"
                        onClick={onConfirm}
                        color="primary">
                        Potvrdiť
                    </Button>
                    <Button
                        onClick={onClose}
                        color="primary">
                        Zrušiť
                    </Button>
                </div>
            </DialogActions>
        </Dialog>
    )
}
