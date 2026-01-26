export const DATE_REGEX = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;

export const isValidDate = (value: string) => {
  if (!DATE_REGEX.test(value)) return false;

  const [dd, mm, yyyy] = value.split('-').map(Number);

  const date = new Date(yyyy, mm - 1, dd);

  return date.getFullYear() === yyyy && date.getMonth() === mm - 1 && date.getDate() === dd;
};

export const toISODate = (value: string): string | null => {
  const [dd, mm, yyyy] = value.split('-');
  return new Date(`${yyyy}-${mm}-${dd}T00:00:00.000Z`).toISOString();
};
