
function AddMinutesToDate(date, minutes) {
    return new Date(date.getTime() + minutes * 60000)
  }

export const otpGenerator=()=>{
    const otp = Math.floor(100000 + Math.random() * 900000);
    const now = new Date()
    const expiration_time = AddMinutesToDate(now, 5)

    return {otp, now, expiration_time}
}