import React from 'react';
import { Button } from '@/components/ui/button';
import ReactExport from 'react-data-export';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const CreateTurApi = ({ val }) => {
  const [firstName = '', lastName = ''] = val?.name?.split(' ') || [];
  const dob = val?.dob || '';
  const gender = val?.gender === 'female' ? 'Female' : 'Male';
  const nat = val?.nationality || '';
  const pas = val?.passport || '';
  const doe = val?.doe || '';

  const exportData = [
    {
      firstName,
      lastName,
      dob,
      gender,
      nat,
      pas,
      doe,
    },
  ];

  const DataSet = [
    {
      columns: [
        { title: 'First Name (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Second Name', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Surname (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Date of Birth (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Gender (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Nationality (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'National Id Number (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Traveler Type (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Travel Document Type (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Travel Document Number (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Travel Document Issuer Country (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Document Expiration Date (*)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Number of Bags (pieces)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
        { title: 'Weight of Bags (kg)', style: { font: { sz: '12', bold: true } }, width: { wpx: 100 } },
      ],
      data: exportData.map((data) => [
        { value: data.firstName, style: { font: { sz: '12' } } },
        { value: '', style: { font: { sz: '12' } } },
        { value: data.lastName, style: { font: { sz: '12' } } },
        { value: data.dob, style: { font: { sz: '12' } } },
        { value: data.gender, style: { font: { sz: '12' } } },
        { value: data.nat, style: { font: { sz: '12' } } },
        { value: '', style: { font: { sz: '12' } } },
        { value: 'Passenger', style: { font: { sz: '12' } } },
        { value: 'Passport', style: { font: { sz: '12' } } },
        { value: data.pas, style: { font: { sz: '12' } } },
        { value: data.nat, style: { font: { sz: '12' } } },
        { value: data.doe, style: { font: { sz: '12' } } },
        { value: '1', style: { font: { sz: '12' } } },
        { value: '15', style: { font: { sz: '12' } } },
      ]),
    },
  ];

  return (
    <div className="w-max">
      <ExcelFile
        filename="PassengerListDraft"
        element={
          <Button className="w-full" type="button">
            Tur API
          </Button>
        }
      >
        <ExcelSheet dataSet={DataSet} name="PassengerListDraft" />
      </ExcelFile>
    </div>
  );
};

export default CreateTurApi;
