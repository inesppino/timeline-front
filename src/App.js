import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { PRIMARY_BUTTON_STYLES } from "./Base";
import Form from "./form/Form";
import LineChart from "./LineChart";
import "./app.scss";
import {
  addDays,
  addHours,
  addMinutes,
  format,
  startOfHour,
  subDays,
  subHours,
  subMinutes,
} from "date-fns";
import SelectTimeRange from "./form/SelectTimeRange";

const styleModal = {
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const getRandomColor = () => {
  return Math.floor(Math.random() * 255);
};

const rangeByUnit = {
  minute: {
    min: (date) => subMinutes(date, 120),
    max: (date) => addMinutes(date, 10),
  },
  hour: { min: (date) => subHours(date, 12), max: (date) => addHours(date, 1) },
  day: { min: (date) => subDays(date, 6), max: (date) => addDays(date, 1) },
};

const getRange = (date, unit = "hour") => {
  const nearestOclock = startOfHour(date);
  const min = rangeByUnit[unit].min(nearestOclock);
  const max = rangeByUnit[unit].max(nearestOclock);
  return { min, max };
};

const UNIT_FORMATS = {
  hour: "HH:mm",
  minute: "mm",
  day: "eee dd",
};

const DEFAULT_RANGE = getRange(new Date());

const App = () => {
  const [data, setData] = useState({
    ANA: {
      color: `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}`,
      data: [
        { x: subHours(new Date(), 3), y: 7 },
        { x: subHours(new Date(), 2), y: 2 },
        { x: subHours(new Date(), 1), y: 5 },
        { x: new Date(), y: 5 },
      ],
    },
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [unitTime, setUnitTime] = useState({
    name: "hour",
    format: UNIT_FORMATS.hour,
  });

  const updateData = (newData) => {
    const updatedData = { ...data };
    const date = format(newData.date, "yyyy-MM-dd");
    const time = format(newData.time, "HH:mm:ss");

    if (updatedData[newData.name.toUpperCase()]) {
      updatedData[newData.name.toUpperCase()].data.push({
        x: new Date(`${date}T${time}`),
        y: Number(newData.value),
      });
    } else {
      updatedData[newData.name.toUpperCase()] = {
        color: `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}`,
        data: [
          {
            x: new Date(`${date}T${time}`),
            y: Number(newData.value),
          },
        ],
      };
    }
    setData({ ...data, ...updatedData });
    setIsAddModalOpen(false);
  };

  const getDataset = () => {
    const graphData = [];
    for (const employee in data) {
      graphData.push({
        label: employee,
        data: [...data[employee].data],
        backgroundColor: `${data[employee].color}, 0.8)`,
        borderColor: `${data[employee].color}, 1)`,
        borderWidth: 1,
      });
    }
    return graphData;
  };

  const handleSelectTimeChangle = (selectedUnit) => {
    let unit = selectedUnit;
    const range = getRange(new Date(), unit);
    setRange(range);
    setUnitTime({ name: unit, format: UNIT_FORMATS[unit] });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
        sx={PRIMARY_BUTTON_STYLES}
      >
        Añade valoración
      </Button>
      <Modal open={isAddModalOpen}>
        <>
          <Form
            onSubmit={updateData}
            onHandleCancel={() => setIsAddModalOpen(false)}
            styles={styleModal}
          />
        </>
      </Modal>

      <div className="chart-container">
        <LineChart dataSet={getDataset()} range={range} unit={unitTime} />
      </div>
      <SelectTimeRange
        unit={unitTime.name}
        handleChange={handleSelectTimeChangle}
      />
    </div>
  );
};

export default App;
