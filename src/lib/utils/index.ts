const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export const verifyEmailAddress = (email: string) => {
  return emailRegex.test(email)
}

export const getShortId = (name: string, prefixLength = 10, suffixLength = 10): string => {
  if (!name) return ''
  if (name.length >= prefixLength + suffixLength) {
    return `${name.substring(0, prefixLength)}...${name.substring(name.length - suffixLength)}`
  }
  return name
}
