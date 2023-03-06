import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers";
import {
  GRID_FORM_STYLES,
  FIELD_STYLES,
  PRIMARY_BUTTON_STYLES,
  SECONDARY_BUTTON_STYLES,
} from "../Base";
import "./form.scss";

const DEFAULT_VALUES = {
  name: "",
  value: "",
  date: new Date(),
};

const FORM_ERRORS = {
  name: false,
  value: false,
  date: false,
};

const REQUIRED_ERROR_MESSAGE = "This field is required";

const Form = ({ onSubmit, onHandleCancel, styles }) => {
  const [formValues, setFormValues] = useState({ ...DEFAULT_VALUES });
  const [errorValues, setErrorValues] = useState({ ...FORM_ERRORS });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDateChange = (newDate) => {
    setFormValues({ ...formValues, date: newDate });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = {};
    for (const field in formValues) {
      if (!formValues[field]) {
        errors[field] = true;
      }
    }
    if (Object.keys(errors).length !== 0) {
      setErrorValues({ ...errorValues, ...errors });
      return;
    }
    //Send to api
    console.log("Sending to API, success!");
    onSubmit(formValues);
    setFormValues({ ...DEFAULT_VALUES });
    setErrorValues({ ...FORM_ERRORS });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="metric-from">
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          className="metric-form"
          sx={styles}
        >
          <h1 className="metric-form-title">Add new metric</h1>
          <Grid item sx={GRID_FORM_STYLES}>
            <TextField
              sx={FIELD_STYLES}
              id="name"
              name="name"
              label="Name"
              type="text"
              error={errorValues.name}
              helperText={errorValues.name ? REQUIRED_ERROR_MESSAGE : ""}
              value={formValues.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item sx={GRID_FORM_STYLES}>
            <TextField
              sx={FIELD_STYLES}
              id="value"
              name="value"
              label="Value"
              type="number"
              error={errorValues.name}
              helperText={errorValues.name ? REQUIRED_ERROR_MESSAGE : ""}
              value={formValues.value}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item sx={GRID_FORM_STYLES}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={FIELD_STYLES}
                id="date"
                name="date"
                label="date"
                slotProps={{
                  textField: {
                    helperText: `${
                      errorValues.date ? REQUIRED_ERROR_MESSAGE : ""
                    }`,
                    error: errorValues.date,
                  },
                }}
                value={formValues.date}
                onChange={handleDateChange}
              ></DatePicker>
            </LocalizationProvider>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            direction="column"
          >
            <Grid item xs={12} sx={GRID_FORM_STYLES}>
              <Button
                type="submit"
                variant="outlined"
                sx={PRIMARY_BUTTON_STYLES}
              >
                Submit metric!
              </Button>
            </Grid>
            <Grid item xs={12} sx={GRID_FORM_STYLES}>
              <Button
                variant="text"
                sx={SECONDARY_BUTTON_STYLES}
                onClick={onHandleCancel}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onHandleCancel: PropTypes.func.isRequired,
  styles: PropTypes.object,
};

export default Form;
