import { Button, Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const ModalComponent = ({
    children,
    button_text,
    title,
    open,
    handleOpen,
    handleClose,
    modal_sx = {},
    button_sx = {},
    title_sx = {}
}) => {
    return <>
        <Button
        sx={button_sx}
        data-testid="button"
        onClick={handleOpen}>{button_text}
        </Button>
        <Dialog
        sx={modal_sx}
        open={open}
        onClose={handleClose}
        data-testid="modal"
        >
            <DialogTitle data-testid="title" sx={title_sx}>
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