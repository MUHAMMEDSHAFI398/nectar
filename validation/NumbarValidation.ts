  // Phone Number Validation
  function isIndianPhoneNumberValid(Number: string): boolean {
    // The phone number should be a valid Indian phone number
    return /^(\+?91|0)?[789]\d{9}$/.test(Number);
  }

  export default isIndianPhoneNumberValid