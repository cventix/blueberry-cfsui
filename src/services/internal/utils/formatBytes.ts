/**
 * gets byte and coverts it to biggest unit
 * @param bytes 
 * @param toFixed 
 * numbers deep it goes 
 */

export const formatBytes = (bytes: number = 0,toFixed :number = 2): string => {
  const units = ["bytes", "KB", "MB", "GB", "TB"];

  let unit = 0;
  while (bytes >= 1024 && unit < 4) {
    bytes /= 1024;
    unit++;
  }

  return `${parseFloat(bytes.toFixed(toFixed).toString())} ${units[unit]}`;
};
