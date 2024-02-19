const capitalizeWords = (str: string) => {
  return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const formatContactNumber = (number: string | number) => {
  let numStr = String(number);
  return numStr.slice(0, 4) + '-' + numStr.slice(4, 7) + '-' + numStr.slice(7);
}

export { capitalizeWords, formatContactNumber };