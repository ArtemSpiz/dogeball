export const truncateString = (str: string, numChars: number): string => {
  if (str.startsWith("0x"))
    return `0x${truncateString(str.substring(2), numChars - 2)}`;
  if (str.length <= numChars) return str;
  const charsLeft = Math.ceil((numChars - 3) / 2);
  const charsRight = Math.floor((numChars - 3) / 2);
  return (
    str.substring(0, charsLeft) + "..." + str.substring(str.length - charsRight)
  );
};

export const capitalize = (str: string): string => {
  return str
    .split(/_+|\s+/g)
    .map(
      (str) =>
        str.substring(0, 1).toUpperCase() + str.substring(1).toLowerCase()
    )
    .join(" ");
};
