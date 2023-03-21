const isEmpty = (value: string | null | undefined) => {
  return value === undefined || value === null || value === '';
};
const isAllEmpty = (value: any[]) => {
  return value.every(item => isEmpty(item));
};

const isValidEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};
const isAnyEmpty = (value: any[]) => {
  return value.some(item => isEmpty(item));
};
const isNumber = (value: string) => {
  return !isNaN(Number(value));
};

export default {
  isEmpty,
  isValidEmail,
  isAllEmpty,
  isAnyEmpty,
  isNumber,
};
