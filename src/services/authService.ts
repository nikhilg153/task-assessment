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

      // Fetch users array from localStorage
      const usersJSON = localStorage.getItem("users");

      if (!usersJSON) {
        reject(new Error("No users registered. Please register."));
        return;
      }

      // Parse the stored users array
      const users: { username: string; password: string }[] =
        JSON.parse(usersJSON);

      // Find the user with the provided username
      const storedUser = users.find((user) => user.username === username);

      if (!storedUser) {
        reject(new Error("User not found. Please register."));
        return;
      }

      // Check if the provided password matches the stored user's password
      if (storedUser.password === password) {
        resolve();
      } else {
        reject(new Error("Invalid password."));
      }
    });
  }
}
