const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const verifyEmailAddress = (email: string) => {
  return emailRegex.test(email)
}
