import db from '../db.js';
import jwt from 'jsonwebtoken'
const JWT_SECRET = 'secret_key';
import bcrypt from 'bcrypt';
export default class UserServices {
    async createUser(body) {
        try {
          const salt = await bcrypt.genSalt(10);
          body.password = await bcrypt.hash(body.password, salt);
      
          const [result] = await db.query('INSERT INTO users SET ?', body);
      
          if (result.affectedRows === 0) {
            throw { code: 400, message: 'Failed to insert user' };
          }
      
          const token = jwt.sign({ id: result.insertId }, JWT_SECRET, { expiresIn: '1h' });
          return { id: result.insertId, token, ...body };
          
        } catch (err) {
          console.error('Error creating user:', err);
          throw { code: 500, message: 'Failed to create user' };
        }
      }
      

  async loginUser(body) {
    const { email, password } = body;
    
    try {

      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

      if (users.length === 0) {
        return { code: 404, message: 'User not found' };
      }
      const user = users[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return { code: 401, message: 'Invalid credentials' };
      }

      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

      return { id: user.id, token, name: user.name, email: user.email };
      
    } catch (err) {
      console.error('Error logging in user:', err);
      return { code: err.code || 500, message: err.message || 'Login failed' };
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
      console.log(result,"================="); 
      return result[0] || [];  
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
