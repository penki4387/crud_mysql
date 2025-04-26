import db from '../db.js';

export default class UserServices {
  async createUser(body) {
    
    try {
      const [result] = await db.query('INSERT INTO users SET ?', body);
      return { id: result.insertId, ...body };
    } catch (err) {
      console.error('Error creating user:', err);
      throw { code: 500, message: 'Failed to create user' };
    }
  }

  async updateUser(body, userId) {
    try {
     const [result] = await db.query('UPDATE users SET ? WHERE id = ?', [body, userId]);
     if (result.affectedRows === 0) {
        throw { code: 404, message: 'User not found or nothing to update' };
      }
      return { id: userId, message: 'Updated successfully' };
    } catch (err) {
      console.error('Error updating user:', err);
      throw { code: 500, message: 'Failed to update user' };
    }
  }

  async getAllUsers() {
    try {
      const result = await db.query('SELECT * FROM users');
      return result
    } catch (err) {
      console.error('Error fetching users:', err);
      throw { code: 500, message: 'Failed to fetch users' };
    }
  }

  async deleteUser(userId) {
    try {
      await db.query('DELETE FROM users WHERE id = ?', [userId]);
      return { message: 'User deleted successfully' };
    } catch (err) {
      console.error('Error deleting user:', err);
      throw { code: 500, message: 'Failed to delete user' };
    }
  }

  async getUserById(id) {
    console.log(id,"================");
    
    try {
      const result = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      return result[0]
    } catch (err) {
      console.error('Error fetching user by ID:', err);
      throw { code: 500, message: 'Failed to fetch user by ID' };
    }
  }
}
