import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, MenuItem, Select } from "@mui/material";
import Countries from "../components/Countries";
import { checkout } from "../api/checkoutRoutes";
import CheckoutModal from "../components/Modal/CheckoutModal";
import { postcodeValidator, postcodeValidatorExistsForCountry } from 'postcode-validator';


const defaultErrorState = { server: "", streetAddress: "", state: "", city: "", zipCode: "" };
const defaultDeliveryInfo = { streetAddress: "", optionalAddress: "", state: "", city: "", zipCode: "" }


export default function CheckoutForm() {
  const [modalOpen, setModalOpen] = useState(false)
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  const [userDeliveryInfo, setDeliveryInfo] = useState(defaultDeliveryInfo)

  // const style = {
  //   // position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: "29rem",
  //   bgcolor: 'background.paper',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   p: 4,
  // };

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

  const handleClick = async (event) => {
    event.preventDefault()

    if (!userDeliveryInfo.streetAddress || !userDeliveryInfo.state || !userDeliveryInfo.city || !userDeliveryInfo.zipCode)
      return setErrorMessage({
        streetAddress: userDeliveryInfo.streetAddress === "" ? "This field is required" : "",
        state: userDeliveryInfo.state === "" ? "This field is required" : "",
        city: userDeliveryInfo.city === "" ? "This field is required" : "",
        zipCode: userDeliveryInfo.zipCode === "" ? "This field is required" : "",
      })

    const isZipCodeValid = postcodeValidator(userDeliveryInfo.zipCode, 'US');

    if (!isZipCodeValid) {
      return setErrorMessage({ ...defaultErrorState, zipCode: "Enter a valid ZIP Code" })
    } else {
      handleOpen()
      return setErrorMessage(defaultErrorState)
    }

  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const deliveryInfo = await checkout(userDeliveryInfo)
      // console.log(deliveryInfo)

    } catch (error) {
      handleClose()
      console.log(error)
      //  ***revisit to see if this is the best way to handle the error message from the server***
      //    if (error.status === 400) {
      //   const { field, errorMessage } = await error.json()
      //   return setErrorMessage({ ...defaultErrorState, [field]: errorMessage })
      // }
    }
    setDeliveryInfo(defaultDeliveryInfo)
    setErrorMessage(defaultErrorState)
  }

  return (
    <>
      <Box component="form" sx={{ maxWidth: 400 }}>
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

        <Button onClick={handleClick} variant="contained">Submit</Button>

        {modalOpen && (<CheckoutModal
          open={modalOpen}
          onSubmit={handleSubmit}
          onCancel={handleClose}
          onClose={handleClose}
          deliveryInfo={userDeliveryInfo}
        // style={style}
        >
        </CheckoutModal>)}
      </Box >
    </>
  )
}



