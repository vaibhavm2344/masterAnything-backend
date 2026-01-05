export const validateRegisterInput = ({name, email, password}) => {
    if(!name || !email || !password) {
        throw new Error("All fields are required");
    }
    if(password.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }

    return true;
};

export const validateLoginInput = ({email, password}) => {
    if(!email || !password) {
        throw new Error("All fields are required");
    }

    return true;
};