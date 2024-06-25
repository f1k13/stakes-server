class UserService {
  async registerUser(userName: string, password: string, email: string) {
    try {
      return true;
    } catch (error) {
      return error;
    }
  }
}

export const userService = new UserService();
