import React, { useState } from "react";
import PropTypes from "prop-types";
import { TextField, Button, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimeField } from "@mui/x-date-pickers";
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
  time: new Date(),
};

const FORM_ERRORS = {
  name: false,
  value: false,
  date: false,
  time: false,
};

const REQUIRED_ERROR_MESSAGE = "Este campo es obligatorio";

const Form = ({ onSubmit, onHandleCancel, styles }) => {
  const [formValues, setFormValues] = useState({ ...DEFAULT_VALUES });
  const [errorValues, setErrorValues] = useState({ ...FORM_ERRORS });

  const handleInputChange = (e) => {
    const { name, value } = e.target ?? e;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
      setErrorValues(errors);
      return;
    }
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
          <h1 className="metric-form-title">Añade tu nivel de satisfacción</h1>
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
              inputProps={{ min: 0, max: 10 }}
            />
          </Grid>
          <Grid item sx={GRID_FORM_STYLES}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                sx={FIELD_STYLES}
                id="date"
                name="date"
                label="date"
                maxDate={new Date()}
                slotProps={{
                  textField: {
                    helperText: `${
                      errorValues.date ? REQUIRED_ERROR_MESSAGE : ""
                    }`,
                    error: errorValues.date,
                  },
                }}
                value={formValues.date}
                onChange={(e) => handleInputChange({ name: "date", value: e })}
              ></DatePicker>
            </LocalizationProvider>
          </Grid>
          <Grid item sx={GRID_FORM_STYLES}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimeField
                sx={FIELD_STYLES}
                id="time"
                name="time"
                label="time"
                maxTime={new Date()}
                slotProps={{
                  textField: {
                    helperText: `${
                      errorValues.time ? REQUIRED_ERROR_MESSAGE : ""
                    }`,
                    error: errorValues.time,
                  },
                }}
                value={formValues.time}
                onChange={(e) => handleInputChange({ name: "time", value: e })}
              />
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
                ¡Añadir satisfación!
              </Button>
            </Grid>
            <Grid item xs={12} sx={GRID_FORM_STYLES}>
              <Button
                variant="text"
                sx={SECONDARY_BUTTON_STYLES}
                onClick={onHandleCancel}
              >
                Cancelar
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
