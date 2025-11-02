import bcrypt from "bcrypt";

export default [
    { email: "test@example.com", passwordHash: bcrypt.hashSync("1234", 10) },
];
