import { InputLabel, MenuItem, Select } from "@mui/material";

const SelectTimeRange = ({ unit, handleChange }) => {
  return (
    <div className="select-container">
      <InputLabel sx={{ fontSize: "14px" }}>
        Cambia la unidad de tiempo:{" "}
      </InputLabel>
      <Select
        sx={{
          height: "2.5rem",
          fontSize: "1rem",
          lineHeight: "1.5rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          borderColor: "rgb(211,211,216)",
        }}
        value={unit}
        label="timeRange"
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value="minute">Minutes</MenuItem>
        <MenuItem value="hour">Hours</MenuItem>
        <MenuItem value="day">Days</MenuItem>
      </Select>
    </div>
  );
};

export default SelectTimeRange;
