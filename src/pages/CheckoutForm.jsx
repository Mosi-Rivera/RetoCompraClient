import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, MenuItem, Select } from "@mui/material";
import Header from "../components/Header";
import Countries from "../components/Countries";
import { checkout } from "../api/checkoutRoutes";
import ModalComponent from "../components/Modal/Modal";
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const defaultErrorState = { server: "", streetAddress: "", state: "", city: "", zipCode: "" };



export default function CheckoutForm() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 200,
    maxWidth: 700,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  const [userDeliveryInfo, setDeliveryInfo] = useState({
    streetAddress: "",
    optionalAddress: "",
    state: "",
    city: "",
    zipCode: ""
  })


  const [errorMessage, setErrorMessage] = useState(defaultErrorState)

  function handleChange(event) {
    const { name, value } = event.target
    setDeliveryInfo(prevValue => {
      return { ...prevValue, [name]: value }
    })

  }


  function countryValue(event) {
    setDeliveryInfo(prevValue => {
      return { ...prevValue, state: event.target.value }
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!userDeliveryInfo.streetAddress || !userDeliveryInfo.state || !userDeliveryInfo.city || !userDeliveryInfo.zipCode)
      return setErrorMessage({
        streetAddress: userDeliveryInfo.streetAddress === "" ? "This field is required" : "",
        state: userDeliveryInfo.state === "" ? "This field is required" : "",
        city: userDeliveryInfo.city === "" ? "This field is required" : "",
        zipCode: userDeliveryInfo.zipCode === "" ? "This field is required" : "",
      })



    try {

      const deliveryInfo = await checkout(userDeliveryInfo)
      console.log(deliveryInfo)

    } catch (error) {
      console.log(error)

      //  ***revisit to see if this is the best way to handle the error message from the server***
      //    if (error.status === 400) {
      //   const { field, errorMessage } = await error.json()
      //   return setErrorMessage({ ...defaultErrorState, [field]: errorMessage })
      // }
    }
    setErrorMessage(defaultErrorState)
  }
  // const Confirmation = () => {
  //   const [showRegister, setShowRegister] = useState(false);
  //   return (
  //     <nav>
  //       <Modal
  //         open={showRegister}
  //         handleOpen={() => setShowRegister(true)}
  //         handleClose={() => setShowRegister(false)}
  //         buttonText="Register"
  //         title="Register"
  //         buttonSx={{ color: "white" }}
  //       >
  //         <h1>Are you Sure?</h1>
  //       </Modal>
  //     </nav >
  //   );

  // }


  return (
    <>
      <Header></Header>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, marginTop: 15, marginLeft: 2 }}>
        <h3>Shipping Address</h3>
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <TextField
            name="streetAddress"
            value={userDeliveryInfo.streetAddress}
            placeholder="Street address or P.O. Box"
            onChange={handleChange}
            fullWidth
            error={!!errorMessage.streetAddress}
            helperText={errorMessage.streetAddress}
          >
          </TextField>
          <TextField
            name="optionalAddress"
            value={userDeliveryInfo.optionalAddress}
            placeholder="Apt, Suite, Unit, Building (optional)"
            onChange={handleChange}
            fullWidth
          >
          </TextField>
        </Box>
        <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          {/* <label>Country or region</label>
          <Countries
            name="country"
            value={userDeliveryInfo.country}
            getCountry={countryValue}
          ></Countries> */}
          <label>City</label>
          <TextField
            name="city"
            value={userDeliveryInfo.city}
            onChange={handleChange}
            fullWidth
            error={!!errorMessage.streetAddress}
            helperText={errorMessage.streetAddress}
          >
          </TextField>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <label>States</label>
            <Countries
              value={userDeliveryInfo.state}
              getCountry={countryValue}
              error={!!errorMessage.state}
              helperText={errorMessage.state}
            ></Countries>
          </Grid>
          <Grid item xs={6}>
            <label>ZIP Code</label>
            <TextField
              name="zipCode"
              value={userDeliveryInfo.zipCode}
              onChange={handleChange}
              fullWidth
              error={!!errorMessage.zipCode}
              helperText={errorMessage.zipCode}
            ></TextField>
          </Grid>

        </Grid>


        <Button type="submit" variant="contained">Submit</Button>

        <Button onClick={handleOpen}>Open modal</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <p style={{ fontWeight: 500 }}>Do you want to continue with this address?</p>
              <span>{userDeliveryInfo.streetAddress}</span>
              <br></br>
              {userDeliveryInfo.optionalAddress && <span>{`${userDeliveryInfo.optionalAddress}`}</span>}
              <br></br>
              <span>{`${userDeliveryInfo.city} `}</span>
              <span>{`${userDeliveryInfo.state}`}</span>
              <span>{` ${userDeliveryInfo.zipCode}`}</span>
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button variant="contained" size="large">Yes</Button> <Button variant="contained" size="large">No</Button>
            </Typography>

          </Box>
        </Modal>


      </Box >
    </>
  )
}

{/* <Box sx={{ display: "flex", flexFlow: "column nowrap" }}>
          <label>Full Name (First and Last name)</label>
          <TextField
            name=""
            value={userDeliveryInfo.fullName}
            // label="Full Name"
            // InputLabelProps={{ shrink: true, size: "big" }}
            fullWidth
          >
          </TextField>
        </Box> */}

