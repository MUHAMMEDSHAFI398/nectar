import Papa from 'papaparse';

function downloadCSV(data: any[], filename: string): void {
  const dataWithSlNo = data.map((item, index) => ({ ...item, slno: index + 1 }));
  const csv = Papa.unparse(dataWithSlNo); // Use dataWithSlNo instead of data
  const csvData = new Blob([csv], { type: 'text/csv' });
  const csvUrl = URL.createObjectURL(csvData);
  const hiddenElement = document.createElement('a');
  hiddenElement.href = csvUrl;
  hiddenElement.target = '_blank';
  hiddenElement.download = filename;
  hiddenElement.click();
}

export default downloadCSV;
