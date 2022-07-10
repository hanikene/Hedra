export const changeSecondsToTime = (time: number): string => {
  let minutes: string | number = Math.floor(time / 60);
  let seconds: string | number = time % 60;
  if (seconds < 10) seconds = "0" + seconds;
  return `${minutes}:${seconds}`;
};
