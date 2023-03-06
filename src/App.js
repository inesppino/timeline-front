import { useState } from "react";
import { Button, Modal } from "@mui/material";
import { PRIMARY_BUTTON_STYLES } from "./Base";
import Form from "./form/Form";
import ScatterChart from "./ScatterChart";

const styleModal = {
  width: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const App = () => {
  const [data, setData] = useState([
    { name: "uno", value: 6, date: new Date() },
    { name: "dos", value: 4, date: new Date() },
    { name: "tres", value: 9, date: new Date() },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const updateData = (newData) => {
    setData({ ...data, ...newData });
    setIsAddModalOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={() => setIsAddModalOpen(true)}
        sx={PRIMARY_BUTTON_STYLES}
      >
        Add new metric
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

      <ScatterChart />
    </div>
  );
};

export default App;
