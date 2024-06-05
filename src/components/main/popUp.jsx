import React from "react";
import { AreaChart } from "@mantine/charts";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const PopUp = ({ show, data, setShow }) => {
  const display = show ? "block" : "hidden";
  return (
    <MantineProvider>
      <section className={`w-[100%] h-[100%] z-90 ${display} bg-[#ffffff00] absolute`} >
        <div
          className={` bg-amber-700 absolute w-[60%] h-[60%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]`}
        >
          <button onClick={setShow} className=" absolute right-0">X</button>
          <section className="w-[50%] border border-black h-[40%]">
            
            <AreaChart
              data={data}
              dataKey="date"
              series={[{ name: "click", color: "indigo.6" }]}
              curveType="natural"
              tickLine="none"
              withYAxis={false}
              withDots={false}
              className="h-[100%] border border-black"
            />
          </section>
        </div>
      </section>
    </MantineProvider>
  );
};

export default PopUp;
