import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({children, button_text, title, open, handleOpen, handleClose}) => {
    return <>
        <Button
        data-testid="button"
        onClick={handleOpen}>{button_text}
        </Button>
        <Dialog
        open={open}
        onClose={handleClose}
        data-testid="modal"
        >
            <DialogTitle data-testid="title">
                {title}
            </DialogTitle>
            <IconButton
            data-testid="close-icon"
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
            >
                <CloseIcon />
            </IconButton>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    </>
}

export default ModalComponent;