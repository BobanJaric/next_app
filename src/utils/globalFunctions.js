export const dateConvertBack = (date) => {
  //23.05.2023
  if (!date) {
    return "";
  }
  const item = date.split(".");
  const day = item[0];
  const month = item[1];
  const year = item[2];

  return year + "-" + month + "-" + day;
};

export const mapMember = ({ data, member }) => {
  return data?.filter((crew) => crew.rank === member);
};

export function formatDate(inputDate) {
  const date = new Date(inputDate);

  // Extract day, month and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
}

export function formatDateNaslovSlash(inputDate) {
  const date = new Date(inputDate);

  // Extract day, month and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
}

export function formatDoe(inputDate) {
  //15-12-2031
  const c = inputDate.split("-")
  return `${c[1]}/${c[0]}/${c[2]}`;
}

export function formatDateNaslov(inputDate) {
  const date = new Date(inputDate);

  // Extract day, month and year
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}
export function formatDateDOE(inputDate) {
//15-12-2031
  const c = inputDate.split("-")
  return `${c[0]}.${c[1]}.${c[2]}`;
}


export function formatTime(inputDate) {
  const date = new Date(inputDate);

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${hours}:${minutes}`;
}

export const dayBeforeFunc = (date) => {
  const dateCorr = new Date(date);
  const yesterday = new Date(dateCorr.getTime() - 24 * 60 * 60 * 1000);
  let dayBefore = '';
  if (date.length !== 0) {
    dayBefore = yesterday.toISOString().slice(0, 10)
  }
  const d = dayBefore.split('-')[2];
  const m = dayBefore.split('-')[1];
  const convertedMonth = Number(m);
  const y = dayBefore.split('-')[0];
  return d + "." + m + "." + y;
}

export const dayBeforeF = (date) => {
  const dateCorr = new Date(date);
  const yesterday = new Date(dateCorr.getTime() - 24 * 60 * 60 * 1000);
  let dayBefore = '';
  if (date.length !== 0) {
    dayBefore = yesterday.toISOString().slice(0, 10)
  }
  const d = dayBefore.split('-')[2];
  const m = dayBefore.split('-')[1];
  const convertedMonth = Number(m);
  const y = dayBefore.split('-')[0];
  return m + "/" + d + "/" + y;
}


export function excelDateToJSDate(serial) {
  const excelEpoch = new Date(1899, 11, 31); // Excel's epoch start
  return new Date(excelEpoch.getTime() + serial * 24 * 60 * 60 * 1000);
}

export const transformPassengers = (passengers) =>
  passengers.map((passenger, index) => {
    const [firstName, lastName] = passenger.name.split(" ");
    return {
      firstName,
      lastName,
      gender: passenger.gender,
      dob: passenger.dob,
      nationality: passenger.nationality,
      docType: "Passport",
      docNbr: passenger.passport,
      doe: passenger.doe,
      issued: passenger.nationality,
      seat: index + 1,
    };
  });

