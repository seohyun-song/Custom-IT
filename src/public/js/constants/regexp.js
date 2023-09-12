const validateRegExp = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    adminEmail: /[a-z0-9]+@admin.com/,
    password: /^(?=.*[a-zA-Z])(?=.*[!@#$%^+=-])(?=.*[0-9]).{8,15}$/,
    name: /^[가-힣]{2,4}$/,
    phoneNumber: /^[0-9]+$/,
};

export { validateRegExp };
