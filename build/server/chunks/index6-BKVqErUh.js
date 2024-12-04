const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const verifyEmailAddress = (email) => {
  return emailRegex.test(email);
};
const getShortId = (name, prefixLength = 10, suffixLength = 10) => {
  if (!name) return "";
  if (name.length >= prefixLength + suffixLength) {
    return `${name.substring(0, prefixLength)}...${name.substring(name.length - suffixLength)}`;
  }
  return name;
};

export { getShortId as g, verifyEmailAddress as v };
//# sourceMappingURL=index6-BKVqErUh.js.map
