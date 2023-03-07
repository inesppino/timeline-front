import { MenuItem, Select } from "@mui/material";

const SelectTimeRange = ({ unit, handleChange }) => {
  return (
    <Select
      value={unit}
      label="timeRange"
      onChange={(e) => handleChange(e.target.value)}
    >
      <MenuItem value="minute">Minutes</MenuItem>
      <MenuItem value="hour">Hours</MenuItem>
      <MenuItem value="day">Days</MenuItem>
    </Select>
  );
};

export default SelectTimeRange;
