function isNameValid(name: string): boolean {
    // Name should not start with a number
    if (/^\d/.test(name)) {
      return false;
    }
  
    // Name should not contain any special characters
    if (!/^[a-zA-Z ]+$/.test(name)) {
      return false;
    }
  
    // Name should contain minimum 3 characters
    if (name.length < 3) {
      return false;
    }
  
    return true;
  }
  export default isNameValid