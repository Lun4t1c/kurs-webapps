function formatPhoneNumber(phoneNumber) {
  const cleanedString = phoneNumber.replace(/\W/g, '');
  return cleanedString.replace(/(\w{3})(\w{3})(\w{3})/, '$1-$2-$3');
}

module.exports = {
    formatPhoneNumber
};