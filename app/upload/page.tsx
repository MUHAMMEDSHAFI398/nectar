"use client";
import React, { useState, ChangeEvent } from "react";
import Papa from "papaparse";
import isNameValid from "@/validation/NameValidation";
import isIndianPhoneNumberValid from "@/validation/NumbarValidation";
import downloadCSV from "@/helpers/helpers";
import Swal from "sweetalert2";
import { message } from "antd";

const UploadFile = () => {
  const [tableData, setTableData] = useState<boolean>(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [nameValidationErrors, setNameValidationErrors] = useState<number[]>(
    []
  );
  const [phoneValidationErrors, setPhoneValidationErrors] = useState<number[]>(
    []
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCsvData([]);
    const file = event.target.files?.[0];
    if (file) {
      const isCSV = file.name.toLowerCase().endsWith(".csv");
      if (isCSV) {
        Papa.parse(file, {
          complete: (result: Papa.ParseResult<any>) => {
            setCsvData(result.data);
          },
          header: true,
          error: (error) => {
            console.error("CSV parsing error:", error);
            message.error("Error occurred while parsing the CSV file.");
          },
        });
      } else {
        event.target.value = "";
        message.error("Please select a csv file");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate each row in the csvData array
    if (csvData) {
      csvData.forEach((data, rowIndex) => {
        const nameValid = isNameValid(data.Name);
        const phoneValid = isIndianPhoneNumberValid(data.Number);

        // If the Name is invalid, add the rowIndex to the nameErrors array
        if (!nameValid.valid) {
          setNameValidationErrors((prevErrors) => [...prevErrors, rowIndex]);
        }
        // If the Phone Number is invalid, add the rowIndex to the phoneErrors array
        if (!phoneValid.valid) {
          setPhoneValidationErrors((prevErrors) => [...prevErrors, rowIndex]);
        }
      });
    }
    setTableData(true);
  };

  const handleFieldChange =
    (rowIndex: number, field: "Name" | "Number" | "Address") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (csvData) {
        const updatedData = csvData.map((data, rowNumber) =>
          rowNumber === rowIndex ? { ...data, [field]: value } : data
        );

        let updatedValidationErrors: number[] = [];
        if (field === "Name") {
          updatedValidationErrors = updatedData.reduce(
            (errors, data, rowIndex) => {
              const nameValid = isNameValid(data.Name);
              if (!nameValid.valid) {
                errors.push(rowIndex);
              }
              return errors;
            },
            [] as number[]
          );
        } else if (field === "Number") {
          updatedValidationErrors = updatedData.reduce(
            (errors, data, rowIndex) => {
              const phoneValid = isIndianPhoneNumberValid(data.Number);
              if (!phoneValid.valid) {
                errors.push(rowIndex);
              }
              return errors;
            },
            [] as number[]
          );
        }

        setCsvData(updatedData);
        if (field === "Name") {
          setNameValidationErrors(updatedValidationErrors);
        } else if (field === "Number") {
          setPhoneValidationErrors(updatedValidationErrors);
        }
      }
    };

  const handleDelete = (id: number) => {
    Swal.fire({
      text: "Are you sure you want to delete this row?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        if (csvData) {
          const updated = csvData.filter((data, rowNumber) => rowNumber !== id);
          setCsvData(updated);
        }
        message.success("Successfully deleted");
      }
    });
  };
  const handleAddRow = () => {
    const updated = [...csvData, { Name: "", Number: "", Address: "" }];
    setCsvData(updated);
    let updatedNameValidationErrors: number[] = [];
    updatedNameValidationErrors = updated.reduce((errors, data, rowIndex) => {
      const nameValid = isNameValid(data.Name);
      if (!nameValid.valid) {
        errors.push(rowIndex);
      }
      return errors;
    }, [] as number[]);
    let updatedPhoneValidationErrors: number[] = [];
    updatedPhoneValidationErrors = updated.reduce((errors, data, rowIndex) => {
      const phoneValid = isIndianPhoneNumberValid(data.Number);
      if (!phoneValid.valid) {
        errors.push(rowIndex);
      }
      return errors;
    }, [] as number[]);
    setNameValidationErrors(updatedNameValidationErrors);
    setPhoneValidationErrors(updatedPhoneValidationErrors);
    setTableData(true);
  };

  const handleDownload = () => {
    if (phoneValidationErrors.length || nameValidationErrors.length) {
      Swal.fire({
        html: `
      <div style="text-align: left;">
      
        <ul style="list-style-type: disc; margin-left: 20px;">
        <p style="font-weight: bold; margin-bottom: 20px;">Please update the fields highlighted in red:</p>
          <li>Name should not start with a number</li>
          <li>Name should not contain any special characters</li>
          <li>Name should contain a minimum of 3 characters</li>
          <li>Phone number should be a valid Indian phone number</li>
        </ul>
      </div>
    `,
        icon: "warning",
        confirmButtonColor: "green",
        confirmButtonText: "OK",
      }).then((result) => {
        if (result.isConfirmed) {
          message.info(
            "Please review and update the fields highlighted in red"
          );
        }
      });
    } else {
      downloadCSV(csvData ? csvData : [], "data.csv");
    }
  };
  const handleDleteAll = () => {
    Swal.fire({

      text: "Are you sure you want to delete all data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: 'red',
      confirmButtonText: 'Yes'
    }).then((result)=>{
      if(result.isConfirmed){
        setCsvData([]);
        setTableData(false);
      }
    })
  };

  return (
    <div className="mt-[10px]">
      <div className="flex justify-center">
        <p className=" text-4xl font-bold">Upload a CSV file</p>
      </div>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="flex items-center space-x-4 mt-5"
        >
          <div className="border border-gray-300 bg-slate-500 h-10 rounded flex items-center">
            <input
              type="file"
              required
              accept="text/csv"
              onChange={handleFileChange}
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="ms-5 me-5">
        <div className="flex justify-between">
          <div>
            {tableData ? (
              <button
                onClick={handleDownload}
                className=" h-10 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded"
              >
                Download
              </button>
            ) : (
              <p></p>
            )}
          </div>
          <div>
            {tableData ? (
              <button
                onClick={handleDleteAll}
                className=" h-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded"
              >
                Delete all
              </button>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
      <div className="ms-5 me-5 mt-3">
        <div className="overflow-x-auto">
          <table className="w-full table-auto bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Sl. No</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData ? (
                csvData?.map((data, rowIndex) => (
                  <tr key={rowIndex}>
                    <td className="border px-4 py-2">{rowIndex + 1}</td>
                    <td
                      className={`border px-4 py-2 ${
                        nameValidationErrors.includes(rowIndex)
                          ? "bg-red-200"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="Name"
                        value={data.Name}
                        onChange={handleFieldChange(rowIndex, "Name")}
                        className={`w-full bg-transparent focus:outline-none ${
                          nameValidationErrors.includes(rowIndex)
                            ? "text-red-600"
                            : ""
                        }`}
                      />
                      {nameValidationErrors.includes(rowIndex) && (
                        <p className="text-red-500 text-xs">
                          {isNameValid(data.Name).message}
                        </p>
                      )}
                    </td>
                    <td
                      className={`border px-4 py-2 ${
                        phoneValidationErrors.includes(rowIndex)
                          ? "bg-red-200"
                          : ""
                      }`}
                    >
                      <input
                        type="text"
                        name="Number"
                        value={data.Number}
                        onChange={handleFieldChange(rowIndex, "Number")}
                        className={`w-full bg-transparent focus:outline-none ${
                          phoneValidationErrors.includes(rowIndex)
                            ? "text-red-600"
                            : ""
                        }`}
                      />
                      {phoneValidationErrors.includes(rowIndex) && (
                        <p className="text-red-500 text-xs">
                          {isIndianPhoneNumberValid(data.Number).message}
                        </p>
                      )}
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="Address"
                        value={data.Address}
                        onChange={handleFieldChange(rowIndex, "Address")}
                        className="w-full bg-transparent focus:outline-none"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={(e) => handleDelete(rowIndex)}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <p>No data available</p>
              )}
            </tbody>
          </table>
          <div className="flex justify-end mt-5">
            {tableData ? (
              <button
                onClick={handleAddRow}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Addrow
              </button>
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
