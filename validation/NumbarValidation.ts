  // Phone Number Validation
  function isIndianPhoneNumberValid(phoneNumber: string): boolean {
    // The phone number should be a valid Indian phone number
    return /^(\+?91|0)?[789]\d{9}$/.test(phoneNumber);
  }

  export default isIndianPhoneNumberValid