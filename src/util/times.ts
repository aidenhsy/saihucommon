import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Enable timezone support
dayjs.extend(utc);
dayjs.extend(timezone);

export function getCurrentDate() {
  return dayjs().format('YYYY-MM-DD');
}

export function getTomorrowDate() {
  return dayjs().add(1, 'day').format('YYYY-MM-DD');
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
