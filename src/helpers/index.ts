export const getDateFromTimesTamp = (timestamp: number) => {
  return new Date(timestamp * 1000)
}

export const getDateFromTimesDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const day = formatNumber(date.getDate());
  const month = formatNumber(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = formatNumber(date.getMinutes());
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = formatNumber(hours % 12 || 12);

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('es-CL', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

export const formatPercentage = (value: number | undefined): string => {
  if (value === undefined) {
    return '0.00%';
  }
  return `${value.toFixed(2)}%`;
}

export const getValueColor = (value: number | undefined): string => {
  if (value === undefined) {
    return 'text-white';
  }
  return value < 0 ? 'text-red-500' : value > 0 ? 'text-green-500' : 'text-white';
}

export const formatDateTime = (datetime: string) => {
  const date = new Date(datetime);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
}