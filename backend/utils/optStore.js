const otpStore = {};
const userDataStore = {};

export const saveOtp = (email, otp) => {
    otpStore[email] = { otp, createAt: Date.now()}
};

export const verifyOtp = (email, otp) => {
    if( !otpStore[email] ) {
        return false;
    };

    const { otp: storedOtp, createAt} = otpStore[email];

    const isOtpValid = storedOtp === otp && ( Date.now() - createAt ) < 5 * 60 * 1000;

    if( isOtpValid ) {
        delete otpStore[email];
    };

    return isOtpValid;
};

export const saveUserData = (email, userData) => {
    userDataStore[email] = userData
};

export const getUserData = (email) => {
    const userData = userDataStore[email];
    delete userDataStore[email];
    return userData;
};