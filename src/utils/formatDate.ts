export const formatDate = (date: Date): string => {
  const timeZoneOffset = date.getTimezoneOffset();
  const utcDate = new Date(date.getTime() - timeZoneOffset * 60000);
  return utcDate.toISOString().split("T")[0];
};
