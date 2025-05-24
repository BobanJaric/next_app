import React from "react";
import { Button } from "@/components/ui/button";
import ReactExport from "react-data-export";
import { transformPassengers } from "./globalFunctions";

const { ExcelFile, ExcelFile: { ExcelSheet } } = ReactExport;



const CreateRomaniaApi = ({ data, values }) => {
  const {
    arrTime,
    depTime,
    pax = [],
    paxNbr,
    ac: { callsign = "" } = {},
  } = values;

  const [dep = {}, dest = {}] = data;
  const depIcao = dep.icao || "";
  const arrIcao = dest.icao || "";

  const flightInfo = [
    {
      fltNbr: callsign,
      depIcao,
      arrIcao,
      depTime,
      arrTime,
    },
  ];

  const passengerList = transformPassengers(pax.slice(0, Number(paxNbr)));

  const formatCell = (value) => ({ value: value ?? "" });

  const passengerData = passengerList.map((pax) => [
    formatCell(pax.lastName),
    formatCell(pax.firstName),
    formatCell(pax.gender),
    formatCell(pax.dob),
    formatCell(pax.nationality),
    formatCell(pax.docType),
    formatCell(pax.docNbr),
    formatCell(pax.doe),
    formatCell(pax.issued),
    formatCell(pax.seat),
  ]);

  const baseFont = { font: { sz: "16" } };
  const boldFont = { font: { sz: "16", bold: true } };
  const width150 = { wpx: 150 };
  const width200 = { wpx: 200 };

  const DataSet = [
    {
      columns: [
        { title: "FLIGHT NUMBER", style: boldFont, width: width150 },
        { title: "DEPARTURE AIRPORT", style: boldFont, width: width150 },
        { title: "ARRIVAL AIRPORT", style: boldFont, width: width150 },
        { title: "DEPARTURE TIME", style: boldFont, width: width150 },
        { title: "ARRIVAL TIME", style: boldFont, width: width150 },
        { title: "", style: boldFont, width: width150 },
        { title: "", style: boldFont, width: width150 },
        { title: "", style: boldFont, width: width200 },
        { title: "", style: boldFont, width: width150 },
      ],
      data: [
        ...flightInfo.map(({ fltNbr, depIcao, arrIcao, depTime, arrTime }) => [
          { value: fltNbr, style: baseFont },
          { value: depIcao, style: baseFont },
          { value: arrIcao, style: baseFont },
          { value: depTime, style: baseFont },
          { value: arrTime, style: baseFont },
        ]),
        [
          { value: "FAMILY NAME", style: boldFont },
          { value: "GIVEN NAME", style: boldFont },
          { value: "GENDER", style: boldFont },
          { value: "DATE OF BIRTH", style: boldFont },
          { value: "NATIONALITY", style: boldFont },
          { value: "DOC TYPE", style: boldFont },
          { value: "DOC NO", style: boldFont },
          { value: "DOC EXPIRATION DATE", style: boldFont },
          { value: "ISSUING STATE", style: boldFont },
          { value: "SEAT", style: boldFont },
        ],
        ...passengerData,
      ],
    },
  ];

  return (
    <ExcelFile
      filename="APIS DATA INFORMATION ROMANIA 1.1"
      element={
        <Button className="w-full" type="button">
          Rumunski API
        </Button>
      }
    >
      <ExcelSheet dataSet={DataSet} name="LIST OF PAX" />
    </ExcelFile>
  );
};

export default CreateRomaniaApi;