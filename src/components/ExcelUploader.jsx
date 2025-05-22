import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { UploadCloud } from "lucide-react";

export default function ExcelUploader({ values, setValues }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFileUpload = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target?.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      sheetData.shift(); // Remove header row (optional)

      const pax1 = sheetData.map((item) => ({
        name: `${item["Pax list"]} ${item["__EMPTY"]}`,
        dob: String(item["__EMPTY_4"]),
        nationality: item["__EMPTY_12"],
        passport: String(item["__EMPTY_13"]),
        doe: item["__EMPTY_14"],
        doi: "",
        gender: item["__EMPTY_7"],
      }));

      setValues({ ...values, pax: pax1 });
    };

    reader.readAsBinaryString(file);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && isValidExcel(file)) {
      handleFileUpload(file);
    } else {
      alert("Please upload a valid Excel file (.xls, .xlsx, .csv)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && isValidExcel(file)) {
      handleFileUpload(file);
    } else {
      alert("Please upload a valid Excel file (.xls, .xlsx, .csv)");
    }
  };

  const isValidExcel = (file) => {
    return (
      [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "text/csv",
      ].includes(file.type) ||
      file.name.endsWith(".xls") ||
      file.name.endsWith(".xlsx") ||
      file.name.endsWith(".csv")
    );
  };

  return (
    <div
      className={`border-2 border-dashed p-6 rounded-2xl cursor-pointer transition-colors duration-300 ${
        isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"
      } hover:border-blue-400 hover:bg-blue-50 flex flex-col items-center justify-center`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <UploadCloud className="w-10 h-10 text-blue-400 mb-2" />
      <p className="text-gray-700 font-medium">Drag & drop Excel file here</p>
      <p className="text-sm text-gray-500">or click to upload</p>
      <input
        type="file"
        accept=".xls,.xlsx,.csv"
        className="hidden"
        ref={inputRef}
        onChange={handleChange}
      />
    </div>
  );
}
