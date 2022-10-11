module.exports = (dateObj) => {
  const year = dateObj.getFullYear();
  const month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
