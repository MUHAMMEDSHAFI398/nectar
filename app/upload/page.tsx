import React from "react";

const UploadFile = () => {
  return (
    <div className="mt-[230px]">
      <div className="flex justify-center">
        <p className=" text-4xl font-bold">Upload a CSV file</p>
      </div>
      <div className="flex justify-center">
        <form action="" className="flex items-center space-x-4 mt-5">
          <div className="border border-gray-300 bg-slate-500 h-10 rounded flex items-center">
            <input type="file" accept="text/csv" />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadFile;
