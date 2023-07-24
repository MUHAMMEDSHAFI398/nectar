function isNameValid(Name: string): boolean {
    // Name should not start with a number
    if (/^\d/.test(Name)) {
      return false;
    }
  
    // Name should not contain any special characters
    if (!/^[a-zA-Z]+$/.test(Name)) {
      return false;
    }
  
    // Name should contain minimum 3 characters
    if (Name.length < 3) {
      return false;
    }
  
    return true;
  }
  export default isNameValid