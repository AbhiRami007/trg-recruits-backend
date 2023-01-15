function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export const otpGenerator = () => {
  let otp = Math.floor(100000 + Math.random() * 900000).toString();
  const now = new Date();
  const expiration_time = AddMinutesToDate(now, 5);

  return { otp, now, expiration_time };
};
