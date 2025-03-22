export const sc2cc = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// e2p: Converts English digits (0-9) to Persian digits (۰-۹)
export const e2p = (s: string | number): string => {
  return s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

// p2e: Converts Persian digits (۰-۹) to English digits (0-9)
export const p2e = (s: string | number): string => {
  return s
    .toString()
    .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
};

// sp: Adds commas to a number and converts it to Persian digits
export const sp = (number: number): string => {
  const separatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);

  // Ensure that separatedNumber is not null
  if (separatedNumber) {
    const joinedNumber = separatedNumber.join(",");
    return e2p(joinedNumber); // Convert to Persian numerals
  }

  // If the input number is not valid (null/undefined case)
  return e2p(number.toString());
};

export const numbersOnly = (input : string) : string =>  input.replace(/[^0-9.]/g, ""); 
export const englishOnly = (input : string) : string =>  input.replace(/[^a-zA-Z0-9@.]/g, "");



const monthList: string[] = [
  "فروردين",
  "ارديبهشت",
  "خرداد",
  "تير",
  "مرداد",
  "شهريور",
  "مهر",
  "آبان",
  "آذر",
  "دي",
  "بهمن",
  "اسفند",
];

// return date in this format 👉 month name / day number
export const getJalaliDate = (timeInput: Date): string => {
  const localeDate: string = timeInput.toLocaleDateString("fa-IR");
  const splitedDate: string[] = localeDate.split("/");
  const month: number = parseInt(splitedDate[1], 10);
  const monthName: string = monthList[month - 1];
  const day: string = splitedDate[2];
  const localeTime: string = timeInput.toLocaleTimeString("fa-IR");
  const splitedTime: string[] = localeTime.split(":");
  const time: string = `${splitedTime[0]}:${splitedTime[1]}`;

  return `${day} ${monthName} ${time}`;
};

// return spent time
export  const calculateSpentTime = (timeInput: string | Date): string => {
  const currentTime: number = Date.now();
  const messageTime: Date = new Date(timeInput);

  const timeDiff: number = currentTime - messageTime.getTime();

  if (timeDiff < 60 * 1000) {
    return "چند لحظه پیش";
  }
  if (timeDiff < 60 * 2 * 1000) {
    return "۱ دقیقه پیش";
  }
  if (timeDiff < 60 * 60 * 1000) {
    return Math.floor(timeDiff / (1000 * 60)).toFixed() + " " + "دقیقه پیش";
  }
  if (timeDiff < 2 * 60 * 60 * 1000) {
    return "۱ ساعت پیش";
  }
  if (timeDiff < 24 * 60 * 60 * 1000) {
    return Math.floor(timeDiff / (1000 * 60 * 60)).toFixed() + " " + "ساعت پیش";
  }

  return getJalaliDate(messageTime);
};