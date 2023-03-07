import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { MODAL_STYLES, PRIMARY_BUTTON_STYLES } from "./Base";
import { format } from "date-fns";
import { getRandomColor, getRange } from "./utils/helpers";
import { DEFAULT_RANGE, DEFAULT_UNIT, UNIT_FORMATS } from "./utils/constants";
import mockData from "./mock/mockData";
import Form from "./form/Form";
import LineChart from "./graph/LineChart";
import SelectTimeRange from "./form/SelectTimeRange";
import "./app.scss";

const App = () => {
  const [data, setData] = useState({ ...mockData });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [unitTime, setUnitTime] = useState(DEFAULT_UNIT);

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
    //Send to api
    console.log("Sending to API, success!");
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
    <div className="metrics-page-container">
      <h1 className="metrics-page-header">
        Nivel de satisfacción por empleado
      </h1>

      <section className="metrics-graphic-section">
        <div className="chart-container">
          <LineChart dataSet={getDataset()} range={range} unit={unitTime} />
        </div>
        <SelectTimeRange
          unit={unitTime.name}
          handleChange={handleSelectTimeChangle}
        />
      </section>

      <section className="metrics-add-section">
        <Button
          variant="contained"
          onClick={() => setIsAddModalOpen(true)}
          sx={PRIMARY_BUTTON_STYLES}
        >
          Añade puntuación
        </Button>
        <Modal open={isAddModalOpen}>
          <>
            <Form
              onSubmit={updateData}
              onHandleCancel={() => setIsAddModalOpen(false)}
              styles={MODAL_STYLES}
            />
          </>
        </Modal>
      </section>
    </div>
  );
};

export default App;
