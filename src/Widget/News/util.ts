const ONE_HOUR_IN_SECOND = 3600000;

export default function afterOneHour(rawPrevTime: Date | string) {
  const prevTime =
    typeof rawPrevTime === 'string' ? new Date(rawPrevTime) : rawPrevTime;
  const now = new Date();
  return now.getTime() - prevTime.getTime() > ONE_HOUR_IN_SECOND;
}
