import { pinyin } from 'pinyin-pro';

export function chnInitials(text: string): string {
  return text
    .split('')
    .map((char) => {
      if (/[\u4e00-\u9fa5]/.test(char)) {
        return pinyin(char, { pattern: 'initial' });
      }
      return char; // preserve symbols like '-' or spaces
    })
    .join('');
}
