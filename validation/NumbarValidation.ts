// Phone Number Validation
function isIndianPhoneNumberValid(Number: string): { valid: boolean; message: string } {
  // The phone number should not contain any letter
  if (/[a-zA-Z]/.test(Number)) {
    return { valid: false, message: "Phone number should not contain letters" };
  }

  // The phone number should be a valid Indian phone number
  if (/^(\+?91|0)?[789]\d{9}$/.test(Number)) {
    return { valid: true, message: "" };
  } else {
    return { valid: false, message: "Phone number should contain exactly 10 digits" };
  }
}

export default isIndianPhoneNumberValid;
