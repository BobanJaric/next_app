"use client";

import React from "react";
import { CSVLink } from "react-csv";
import { formatDate } from "./globalFunctions";
import { Button } from "@/components/ui/button";

const Italapi = ({ data, values, crew }) => {
  const { arrTime, depTime, date, pax = [], captain, copilot, stw } = values;
  const dateCorr = formatDate(date);
 

  const [iataDep = {}, iataDest = {}] = data;
  const iataDepCode = iataDep.iata || "";
  const iataDestCode = iataDest.iata || "";

  const findCrewMember = (fullname) =>
    crew.find((c) => c.fullname === fullname);

  const formatCrewData = (member) => {
    const [firstName, lastName] = member.fullname.toUpperCase().split(" ");
    const dob = member.dob.split(".").reverse().join("-");
    return {
      firstName,
      lastName,
      dob,
      passport: member.passport,
      nationality: member.nationality,
    };
  };

  const formatPaxData = (p) => {
    const [firstName, lastName] = p.name.toUpperCase().split(" ");
    const dob = p.dob.split(".").reverse().join("-");
    return `PAX,${firstName || ""},${lastName || ""},,${p.gender},${dob},,${
      p.nationality
    },P,${p.passport},,${p.nationality},,,,,${iataDepCode},${iataDestCode},`;
  };

  const captainData = findCrewMember(captain);
  const copilotData = findCrewMember(copilot);
  const stwData = findCrewMember(stw);

  const crewDetails = [captainData, copilotData, stwData]
    .filter(Boolean)
    .map((member) => {
      const { lastName, firstName, dob, passport, nationality } =
        formatCrewData(member);
      return `CRW,${lastName},${firstName},,M,${dob},,${nationality},P,${passport},,${nationality},,,,,${iataDepCode},${iataDestCode}`;
    })
    .join("\n");

  const paxDetails = pax
    .slice(0, 10)
    .filter((p) => p?.name && p?.dob && p?.passport)
    .map(formatPaxData)
    .join("\n");

  const data2 = `FD,PNC111,${iataDepCode},${iataDestCode},${dateCorr},${
    depTime || ""
  },${dateCorr},${arrTime || ""},
CTN,BRANIMIR RADIN,381-112-608433,,
${crewDetails}
${paxDetails}`;


  return (
    <CSVLink
      uFEFF={false}
      data={data2}
      filename={`PNC111 ${dateCorr.replace(/-/g, "")}.csv`}
    >
      <Button className="w-full" type="button">
        Ital API
      </Button>
    </CSVLink>
  );
};

export default Italapi;
