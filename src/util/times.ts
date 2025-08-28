import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Enable timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

export function getCurrentDate() {
  return dayjs().tz('Asia/Shanghai').format('YYYY-MM-DD');
}

export function getTomorrowDate() {
  return dayjs().tz('Asia/Shanghai').add(1, 'day').format('YYYY-MM-DD');
}

export function getCurrentChinaTime() {
  const chinaTime = dayjs().tz('Asia/Shanghai');
  const chinaDateString = chinaTime.format('YYYY-MM-DD HH:mm:ss.SSS');
  const chinaDate = new Date(chinaDateString + 'Z');

  return chinaDate;
}

export function convertUtcToChinaTime(utcTimeString: string): string {
  return dayjs.utc(utcTimeString).tz('Asia/Shanghai').format();
}

export function convertUtcToChinaTimeFormatted(
  utcTimeString: string,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string {
  return dayjs.utc(utcTimeString).tz('Asia/Shanghai').format(format);
}

export function getMonthStart(month: string): Date {
  return dayjs.utc(month).startOf('month').toDate();
}

export function getMonthEnd(month: string): Date {
  return dayjs.utc(month).endOf('month').toDate();
}

export function getMonthStartDateString(month: string): string {
  return dayjs.utc(month).startOf('month').format('YYYY-MM-DD');
}
export function getMonthEndDateString(month: string): string {
  return dayjs.utc(month).endOf('month').format('YYYY-MM-DD');
}

export const getNextVersion = (): string => {
  const currentUtcTime = dayjs().utc();
  const cutoffTime = dayjs().utc().hour(3).minute(30).second(0);
  const dateToUse = currentUtcTime.isAfter(cutoffTime)
    ? currentUtcTime.add(1, 'day')
    : currentUtcTime;
  return dateToUse.format('YYYYMMDD');
};
export const getCurrentVersion = (): string => {
  const currentUtcTime = dayjs().utc();
  const cutoffTime = dayjs().utc().hour(3).minute(30).second(0);
  const dateToUse = currentUtcTime.isAfter(cutoffTime)
    ? currentUtcTime
    : currentUtcTime.subtract(1, 'day');
  return dateToUse.format('YYYYMMDD');
};
