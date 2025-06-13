import React, {  useState } from 'react';
import ReactExport from 'react-data-export';
import { dayBeforeF, dayBeforeFunc, formatDate, formatDateNaslov, formatDateNaslovSlash, formatDoe, formatTime } from './globalFunctions';
import { Button } from '@/components/ui/button';


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const SpainApi = ({data, values}) => {

  
    const {
        arrTime,
        depTime,
        date,
        pax
      } = values;

    let fltNbrCorr = '111';
  

 
 
    
    const dateCorr = formatDate(date)
    const etd = depTime === undefined ? '' : depTime;
    const eta = arrTime === undefined ? '' : arrTime;


    let dateCurrent = new Date().getFullYear();


    

  const exporPaxCorr = pax
  .filter(p => p.name && p.dob) // Avoid undefined/null
  .map(pax => {
    let paxType = "Infant";
    const year = pax.dob?.split?.('-')?.[2];

    if (year && !isNaN(year)) {
      const age = dateCurrent - parseInt(year, 10);
      if (age > 11) paxType = "Adult";
      else if (age > 2) paxType = "Child";
    }

    return {
      lastName: pax.name?.split?.(' ')?.[1] || '',
      firstName: pax.name?.split?.(' ')?.[0] || '',
      type: paxType,
      bookingNbr: Math.floor(Math.random() * (999 - 100 + 1) + 100) + 'PNC',
      bookingDate: date ? dayBeforeF(date) : '',
      bookingTime: '12:00',
      gender: pax.gender === "male" ? "Male" : "Female",
      dob: pax.dob ? formatDate(pax.dob) : '',
      nat: pax.nationality || '',
      docType: 'Passport',
      docNbr: pax.passport || '',
      docCountry: pax.nationality || '',
      doe: pax.doe ? formatDoe(pax.doe) : '',
      phone: '',
      email: '',
      cancelled: 'no',
    };
  });


    const exporData2 = [...exporPaxCorr];
    const exporData = [{
        "fltNbr": fltNbrCorr,
        "depIcao": data[0]?.icao,
        "depDate": dateCorr,
        "depTime": etd,
        "arrIcao": data[1]?.icao,
        "arrDate": dateCorr,
        "arrTime": eta,
    }];
    const DataSet2 = [
        {
            columns: [
                { title: "Last Name (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "First Name (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } }, // width in characters
                { title: "Passenger Type", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Booking Number", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Booking Date", style: { numFmt:"mm/dd/yy",font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Booking Time", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Gender", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Birth Date", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Nationality", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Doc Type", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Doc Number", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Doc Country", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Expiration Date", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Phone Num", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Email", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Cancelled?", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },

            ],

            data: exporData2.map((data) => [
                { value: data.lastName, style: { font: { sz: "12" } } },
                { value: data.firstName, style: { font: { sz: "12" } } },
                { value: data.type, style: { font: { sz: "12" } } },
                { value: data.bookingNbr, style: { font: { sz: "12" } } },
                { value: data.bookingDate,  style: { numFmt:"mm/dd/yy",font: { sz: "12" }, } },
                { value: data.bookingTime, style: { numFmt:"hh:mm",font: { sz: "12" } , } },
                { value: data.gender, style: { font: { sz: "12" } } },
                { value: data.dob, style: { font: { sz: "12" },  } },
                { value: data.nat, style: { font: { sz: "12" } } },
                { value: data.docType, style: { font: { sz: "12" } } },
                { value: data.docNbr, style: { font: { sz: "12" } } },
                { value: data.docCountry, style: { font: { sz: "12" } } },
                { value: data.doe,  style: { numFmt:"m/dd/yy",font: { sz: "12" },  } },
                { value: data.phone, style: { font: { sz: "12" } } },
                { value: data.email, style: { font: { sz: "12" } } },
                { value: data.cancelled, style: { font: { sz: "12" } } }

            ])
        }
    ]

    const DataSet = [
        {
            columns: [
                { title: "Flight number (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } }, // width in pixels
                { title: "Dept. Airport Code (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } }, // width in characters
                { title: "Dept. Local Date (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Dept. Local Time (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Arrv. Airport Code (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Arrv. Local Date (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
                { title: "Arrv. Local Time (*)", style: { font: { sz: "12", bold: true } }, width: { wpx: 100 } },
            ],

            data: exporData.map((data) => [
                { value: data.fltNbr, style: { font: { sz: "12" } } },
                { value: data.depIcao, style: { font: { sz: "12" } } },
                { value: data.depDate, style: { numFmt:"dd/m/yy",font: { sz: "12" }, } },
                { value: data.depTime, style: { font: { sz: "12" }, } },
                { value: data.arrIcao, style: { font: { sz: "12" } } },
                { value: data.arrDate, style: { numFmt:"dd/m/yy",font: { sz: "12" },  } },
                { value: data.arrTime, style: { font: { sz: "12" },  } }
            ])
        }
    ]


    return (
        <ExcelFile
            filename="PNC"
            element={<Button className="w-full" type="button"  >Spain API</Button>}>
            <ExcelSheet dataSet={DataSet} name="Flight" />
            <ExcelSheet dataSet={DataSet2} name="Passengers" />
        </ExcelFile>
    );
}

export default SpainApi;