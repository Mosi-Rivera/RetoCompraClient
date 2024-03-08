import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({
    children,
    buttonText,
    title,
    open,
    handleOpen,
    handleClose,
    modalSx = {},
    buttonSx = {},
    titleSx = {}
}) => {
    return <>
        <Button
        sx={buttonSx}
        data-testid="button"
        onClick={handleOpen}>{buttonText}
        </Button>
        <Dialog
        sx={modalSx}
        open={open}
        onClose={handleClose}
        data-testid="modal"
        >
            <DialogTitle data-testid="title" sx={titleSx}>
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
