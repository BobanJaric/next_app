"use client";

import React, { useEffect, useState } from "react";
import * as XLSX from 'xlsx';
import { Card, CardContent } from "@/components/ui/card";
import { fetchData } from "@/lib/redux/slices/exampleSlice";
import { useDispatch, useSelector } from "react-redux";
import { renderPassengerFields } from "@/components/passengerField";
import { DatePicker } from "@/components/datePicker";
import { CustomSelectItem } from "@/components/CustomSelectItem";
import { CustomInput } from "@/components/CustomInput";
import { fetchCrew } from "@/lib/redux/slices/crewSlice";
import { fetchAircraft } from "@/lib/redux/slices/aircraftSlice";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ValidButton } from "@/components/ValidButton";
import { createXml } from "@/utils/CreateXml";
import SpainApi from "@/utils/SpainAPI";
import Italapi from "@/utils/ItalAPI";
import { excelDateToJSDate } from "@/utils/globalFunctions";
import ExcelUploader from "@/components/ExcelUploader";

const paxNumber = [
  { name: "1", id: "1" },
  { name: "2", id: "2" },
  { name: "3", id: "3" },
  { name: "4", id: "4" },
  { name: "5", id: "5" },
  { name: "6", id: "6" },
  { name: "7", id: "7" },
  { name: "8", id: "8" },
  { name: "9", id: "9" },
  { name: "10", id: "10" },
];

const countryPrefixes = {
  EP: "poland",
  LE: "spain",
  LI: "italy",
  LT: "turkey",
};

const operators = [
  { _id: 1, fullname: "Prince Aviation", iata: "PNC" },
  { _id: 2, fullname: "Aviator.S5", iata: "VIO" },
];

export default function FlightForm() {
  const [values, setValues] = useState({
    operator: { _id: 1, fullname: "Prince Aviation", iata: "PNC" },
    date: "",
    ac: { reg: "", type: "" },
    captain: "",
    copilot: "",
    stw: "",
    originIcao: "",
    destIcao: "",
    paxNbr: 1,
    pax: [
      {
        name: "",
        dob: "",
        nationality: "",
        passport: "",
        doe: "",
        doi: "",
        gender: "",
      },
      {
        name: "",
        dob: "",
        nationality: "",
        passport: "",
        doe: "",
        doi: "",
        gender: "",
      },
    ],
  });
  const [api, setApi] = useState({ poland: false, spain: false });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    let valueData = value;
    if (name === "originIcao" || name === "destIcao")
      valueData = value.toUpperCase();
    setValues({ ...values, [name]: valueData });
  };
  const handlePaxOnChange = (index, field, value) => {
    setValues((prev) => {
      const updatedPax = [...prev.pax];
      updatedPax[index] = {
        ...updatedPax[index],
        [field]: value,
      };
      return {
        ...prev,
        pax: updatedPax,
      };
    });
  };

  const inputItems = [
    { name: "depTime", label: "Departure time" },
    { name: "originIcao", label: "Departure airport" },
    { name: "destIcao", label: "Destination airport" },
    { name: "arrTime", label: "Arrival Time" },
  ];

  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.example);
  const { crew, crewIsLoading, crewError } = useSelector((state) => state.crew);
  const { aircraft, aircraftIsLoading, aircraftError } = useSelector(
    (state) => state.aircraft
  );


  const selectItems = [
    {
      name: "ac",
      data: aircraft.filter((ac) => ac.operator === values.operator.fullname),
      label: "Aircraft",
    },
    {
      name: "captain",
      data: crew.filter(
        (crew) => crew.rank === "CAPT" /* && crew.type?.includes(values.ac?.type) */
      ),
      label: "Captain",
    },
    {
      name: "copilot",
      data: crew.filter((crew) => crew.rank === "F/O"),
      label: "Copilot",
    },
    {
      name: "stw",
      data: crew.filter((crew) => crew.rank === "ACM"),
      label: "Stw",
    },
  ];

  useEffect(() => {
    const originPrefix = values.originIcao.slice(0, 2);
    const destPrefix = values.destIcao.slice(0, 2);

    let updatedApi = { ...api };

    Object.entries(countryPrefixes).forEach(([prefix, country]) => {
      if (originPrefix === prefix || destPrefix === prefix) {
        updatedApi[country] = true;
      }
    });

    setApi(updatedApi);

    if (
      values.originIcao !== "" &&
      values.destIcao !== "" &&
      values.originIcao.length === 4 &&
      values.destIcao.length === 4
    )
      dispatch(fetchData([values.originIcao, values.destIcao]));
  }, [values.originIcao, values.destIcao]);

  useEffect(() => {
    dispatch(fetchCrew());
    dispatch(fetchAircraft());
  }, []);


  const turkeyApi = () => { };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      sheetData.shift()
      console.log(sheetData);
      
      
      const pax1 = sheetData.map((item) => ({
        name: `${item["Pax list"]} ${item["__EMPTY"]}`,
        dob: String(item["__EMPTY_4"]), // Ensure it's a string
        nationality: item["__EMPTY_12"],
        passport: String(item["__EMPTY_13"]),
        doe: item["__EMPTY_14"],
        doi: "", // Not available in source
        gender: item["__EMPTY_7"],
      }));

      setValues({...values,pax:pax1})
    };
    reader.readAsBinaryString(file);
  };


  return (
    <div className="max-w-7xl mx-auto p-6 grid gap-5 ">
      <Card className="p-4 shadow-xl rounded-2xl">
        <CardContent className="grid gap-6">
          <h2 className="text-xl font-semibold">Flight Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            <CustomSelectItem
              values={values}
              setValues={setValues}
              name="operator"
              crew={operators}
              label="Operator"
            />
            <DatePicker values={values} setValues={setValues} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {selectItems.map((item) => (
              <div key={item.name}>
                <CustomSelectItem
                  values={values}
                  setValues={setValues}
                  name={item.name}
                  crew={item.data}
                  label={item.label}
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-4">
            {inputItems.map((item) => (
              <div key={item.name}>
                <CustomInput
                  name={item.name}
                  handleOnChange={handleOnChange}
                  label={item.label}
                />
              </div>
            ))}

            <div>
              <Label className="py-4">Pax Nbr</Label>
              <Select
                onValueChange={(value) =>
                  setValues({ ...values, paxNbr: value })
                }
                value={values.paxNbr}
              >
                <SelectTrigger className="max-w-40">
                  <SelectValue placeholder={"PaxNbr"} />
                </SelectTrigger>
                <SelectContent>
                  {paxNumber?.map((item) => {
                    return (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/*          <div>
            {data.map((apt) => {
              return (
                <div key={apt._id}>
                  <p>{apt.city}</p>
                  <p>{apt.country}</p>
                  <p>{apt.icao}</p>
                  <hr />
                </div>
              );
            })}
          </div> */}
          <h2 className="text-xl font-semibold mt-6">Passenger Information</h2>
          {Array.from({ length: values.paxNbr }).map((_, i) =>
            renderPassengerFields(i, values, handlePaxOnChange)
          )}
          
          <ExcelUploader values={values} setValues={setValues} />
          {values.date && <Italapi data={data} values={values} crew={crew} />}
          {api.spain && <SpainApi data={data} values={values} />}
          {[
            { name: "poland", func: () => createXml(data, values) },
            { name: "turkey", func: turkeyApi },
          ].map(({ name, func }) => (
            <ValidButton
              key={name}
              isLoading={isLoading}
              createXml={func}
              data={data}
              values={values}
              name={name}
              api={api}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
