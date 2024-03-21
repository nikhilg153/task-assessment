export interface User {
  username: string;
  password: string;
}

export class AuthService {
  static async register(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!username || !password) {
        throw new Error("Username and password are required.");
      }
      const existingUserJSON = localStorage.getItem(username);
      if (existingUserJSON) {
        reject(
          new Error("Username already exists. Please choose another one.")
        );
        return;
      }

      const usersString = localStorage.getItem("users");
      const existingUsers = usersString ? JSON.parse(usersString) : [];

      const newUser = { username, password };
      existingUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(existingUsers));

      resolve();
    });
  }

  static async login(username: string, password: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      if (!username || !password) {
        reject(new Error("Username and password are required."));
        return;
      }

      const usersJSON = localStorage.getItem("users");

      if (!usersJSON) {
        reject(new Error("No users registered. Please register."));
        return;
      }

      const users: { username: string; password: string }[] =
        JSON.parse(usersJSON);

      const storedUser = users.find((user) => user.username === username);

      if (!storedUser) {
        reject(new Error("User not found. Please register."));
        return;
      }

      if (storedUser.password === password) {
        resolve();
      } else {
        reject(new Error("Invalid password."));
      }
    });
  }
  static async getAllUsers(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      // Fetch registered users from local storage
      const usersFromLocalStorage = localStorage.getItem("users");
      if (usersFromLocalStorage) {
        try {
          const parsedUsers: User[] = JSON.parse(usersFromLocalStorage);
          resolve(parsedUsers); // Resolve with the array of registered users
        } catch (error) {
          reject(new Error("Error parsing registered users data."));
        }
      } else {
        resolve([]);
      }
    });
  }
}
