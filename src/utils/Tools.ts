export const sc2cc = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj));
  };
  

// e2p: Converts English digits (0-9) to Persian digits (۰-۹)
export const e2p = (s: string | number): string => {
    return s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
  };
  
  // p2e: Converts Persian digits (۰-۹) to English digits (0-9)
  export const p2e = (s: string | number): string => {
    return s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
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
  

  