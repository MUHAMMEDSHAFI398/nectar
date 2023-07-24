const isNameValid = (Name: string): { valid: boolean; message: string } => {

  if (Name === "") {
    return { valid: false, message: "Name is required" };
  }

  // Name should not start with a number
  if (/^\d/.test(Name)) {
    return { valid: false, message: "Name should not start with a number" };
  }

  // Name should not contain any special characters
  if (!/^[a-zA-Z]+$/.test(Name)) {
    return { valid: false, message: "Name should not contain special characters or numbers" };
  }

  // Name should contain a minimum of 3 characters
  if (Name.length < 3) {
    return { valid: false, message: "Name should contain a minimum of 3 characters" };
  }

  return { valid: true, message: "" };
};

export default isNameValid;
