import { useEffect, useState } from "react";
import { Button, Modal } from "@mui/material";
import { format } from "date-fns";
import { MODAL_STYLES, PRIMARY_BUTTON_STYLES } from "./Base";
import { getRandomColor, getRange } from "./utils/helpers";
import { DEFAULT_RANGE, DEFAULT_UNIT, UNIT_FORMATS } from "./utils/constants";
import { fetchData, postNewData } from "./services/services";
import Score from "./score/Score";
import LineChart from "./graph/LineChart";
import SelectTimeRange from "./graph/SelectTimeRange";
import "./app.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [range, setRange] = useState(DEFAULT_RANGE);
  const [unitTime, setUnitTime] = useState(DEFAULT_UNIT);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    const getData = async () => {
      const data = await fetchData();
      const formattedData = formatData(data);
      setIsFetching(false);
      setData(formattedData);
    };

    getData();
  }, []);

  const formatData = (data) => {
    const formattedData = {};
    for (const metric of data) {
      const { name, value, timestamp } = metric;
      if (formattedData[name]) {
        formattedData[name].data.push({ y: value, x: timestamp });
      } else {
        formattedData[name] = {
          color: `rgba(${getRandomColor()},${getRandomColor()},${getRandomColor()}`,
          data: [{ y: value, x: timestamp }],
        };
      }
    }
    return formattedData;
  };

  const updateData = async (newData) => {
    const date = format(newData.date, "yyyy-MM-dd");
    const time = format(newData.time, "HH:mm:ss");
    const data = {
      name: newData.name.toUpperCase(),
      value: newData.value,
      timestamp: new Date(`${date}T${time}`).toISOString(),
    };
    const result = await postNewData(data);
    setIsAddModalOpen(false);
    if (result) {
      const data = await fetchData();
      const formattedData = formatData(data);
      setData(formattedData);
    }
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
    <main className="metrics-page-container">
      <h1 className="metrics-page-header">
        Nivel de satisfacción por empleado
      </h1>

      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <section className="metrics-graphic-section">
          <div className="chart-container">
            <LineChart dataSet={getDataset()} range={range} unit={unitTime} />
          </div>
          <SelectTimeRange
            unit={unitTime.name}
            handleChange={handleSelectTimeChangle}
          />
        </section>
      )}

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
            <Score
              onSubmit={updateData}
              onHandleCancel={() => setIsAddModalOpen(false)}
              styles={MODAL_STYLES}
            />
          </>
        </Modal>
      </section>
    </main>
  );
};

export default App;
