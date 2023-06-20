import { useState } from "react";
import { Select, SelectOption } from "./Select";

const options = [
  { label: "First", value: 1 },
  { label: "Second", value: 2 },
  { label: "Third", value: 3 },
  { label: "Fourth", value: 4 },
];

function App() {
  const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  return (
    <>
      <Select
        options={options}
        value={value}
        onChange={(option) => setValue(option)}
      />
    </>
  );
}

export default App;
