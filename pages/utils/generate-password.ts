const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const special = "!\"#$%&'*+-_,./:;=?@\\^`|~[]{}()<>";

export function generatePassword(checkedState: boolean[], pwdLength: number) {
    let password = "";
    let pool = "";

    if (checkedState[0]) {
        pool += upperCase;
    }

    if (checkedState[1]) {
        pool += lowerCase;
    }

    if (checkedState[2]) {
        pool += digits;
    }

    if (checkedState[3]) {
        pool += special;
    }

    /*if (!pool) {
        throw new TypeError("At least one rule for pools must be true");
    }*/

    for (let i = 0; i < pwdLength; i++) {
        password += pool.charAt(Math.random() * pool.length);
    }

    return password;
}
