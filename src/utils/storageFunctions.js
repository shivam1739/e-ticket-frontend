import { xorEncryptDecrypt } from "./xorEncryption";


export const saveTicketsToLocalStorage = (tickets) => {
	const encryptedTickets = xorEncryptDecrypt(
		JSON.stringify(tickets),
		import.meta.env.VITE_XOR_KEY
	);
	localStorage.setItem("tickets", encryptedTickets);
};


export const getTicketsFromLocalStorage = () => {
	const encryptedTickets = localStorage.getItem("tickets");
	if (!encryptedTickets) return [];
	const decryptedTickets = xorEncryptDecrypt(
		encryptedTickets,
		import.meta.env.VITE_XOR_KEY
	);
	return decryptedTickets;
};

export const saveUserDataToSessionStorage = (user) => {
	const encryptedUser = xorEncryptDecrypt(
		JSON.stringify(user),
		import.meta.env.VITE_XOR_KEY
	);
	sessionStorage.setItem("user", encryptedUser);
};

export const getUserDataFromSessionStorage = () => {
	const encryptedUser = sessionStorage.getItem("user");
	if (!encryptedUser) return null;

	try {
		const decryptedUser = xorEncryptDecrypt(
			encryptedUser,
			import.meta.env.VITE_XOR_KEY
		);
		return JSON.parse(decryptedUser);
	} catch (error) {
		console.error("Failed to decrypt or parse user data:", error);
		return null;
	}
};
