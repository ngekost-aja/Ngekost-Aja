import User from "@/models/User";
import bcrypt from "bcrypt";

const users: User[] = [
    { email: "admin@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "owner" },
    { email: "manager@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "manager" },
    { email: "user@ngekostaja.com", passwordHash: bcrypt.hashSync("1234", 10), role: "user" },
];

export default users;
