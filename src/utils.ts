// Return 2026-03-12 14:47 as Thursday 14:47

export const formatDateTime = (dateTimeStr: string): string => {
  const date = new Date(dateTimeStr.replace(' ', 'T'));
  return date.toLocaleDateString('en-GB', {
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};
