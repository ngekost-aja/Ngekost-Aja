import User from "@/models/User";
import bcrypt from "bcrypt";

const users: User[] = [
	{ email: "owner1@ngekostaja.com", passwordHash: bcrypt.hashSync("owner1234", 10), role: "owner" },
	{ email: "manager1@ngekostaja.com", passwordHash: bcrypt.hashSync("manager1234", 10), role: "manager" },
	{ email: "user1@ngekostaja.com", passwordHash: bcrypt.hashSync("user1234", 10), role: "user" },
];

export default users;
