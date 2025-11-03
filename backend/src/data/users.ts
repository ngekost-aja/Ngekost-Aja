import bcrypt from "bcrypt";

export default [
    { email: "admin@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "owner" },
    { email: "manager@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "manager" },
    { email: "user@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "user" },
];
