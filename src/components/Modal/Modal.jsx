import { Button, Dialog, DialogContent, DialogTitle, Icon, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


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


const CheckoutModal = ({ onSubmit, onCancel, onClose, deliveryInfo, style }) => {
    return (
        <Box sx={style} >
            <IconButton onClick={onCancel}
                data-testid="close-icon"
                aria-label="close"
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}>
                <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <p style={{ fontWeight: 400 }}>Do you want to continue with this address?</p>
                <span>{deliveryInfo.streetAddress}</span>
                <br></br>
                {deliveryInfo.optionalAddress && <span>{`${deliveryInfo.optionalAddress}`}</span>}
                <br></br>
                <span>{`${deliveryInfo.city} `}</span>
                <span>{`${deliveryInfo.state}`}</span>
                <span>{` ${deliveryInfo.zipCode}`}</span>
            </Typography>
            <Box sx={{ mt: 1 }}>
                <Button variant="contained" size="large" type="submit" onClick={onSubmit} sx={{ mx: 1, px: 3 }}>Yes</Button>
                <Button variant="contained" size="large" onClick={onClose} sx={{ mx: 1, px: 3 }}>No</Button>
            </Box>
        </Box >
    )
}

export default ModalComponent;
export { CheckoutModal }
