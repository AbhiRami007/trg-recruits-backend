
export const verifyTemplate = (userRes, url) => {
    return
    `
      <h1>Email Confirmation</h1>
      <h2>Hello ${userRes.name}</h2>
      <p>Thank you for signing up. Please confirm your email by clicking on the following link</p>
      <a href=${url}> Click here</a>
      </div>`;
}