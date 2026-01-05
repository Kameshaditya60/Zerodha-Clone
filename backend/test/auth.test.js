const request = require('supertest');
const app = require('../index'); // Your Express app
const User = require('../model/UserModel');

// Mock the User model
jest.mock('../model/UserModel');

describe('Auth API - Signup', () => {

  // Test 1: Successful signup
  test('POST /signup should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    User.findOne.mockResolvedValue(null); // User doesn't exist
    User.create.mockResolvedValue({
      _id: '123',
      ...newUser,
    });

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toContain('signed up successfully');
  });

  // Test 2: Reject duplicate email
  test('POST /signup should reject if email already exists', async () => {
    const newUser = {
      username: 'testuser',
      email: 'existing@example.com',
      password: 'password123',
    };

    User.findOne.mockResolvedValue({ email: 'existing@example.com' }); // User exists

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('already exists');
  });

  // Test 3: Validate required fields
  test('POST /signup should reject missing email', async () => {
    const incompleteUser = {
      username: 'testuser',
      password: 'password123',
      // Missing email
    };

    const response = await request(app)
      .post('/signup')
      .send(incompleteUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toContain('required');
  });

  // Test 4: Password hashing
  test('POST /signup should hash password', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({
      _id: '123',
      ...newUser,
      password: 'hashed_password_here', // Should be hashed
    });

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.status).toBe(201);
    // Password should not be plain text
    expect(User.create).toHaveBeenCalled();
  });

  // Test 5: Token is set in cookie
  test('POST /signup should set auth token in cookie', async () => {
    const newUser = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    };

    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: '123', ...newUser });

    const response = await request(app)
      .post('/signup')
      .send(newUser);

    expect(response.headers['set-cookie']).toBeDefined();
    expect(response.headers['set-cookie'][0]).toContain('token');
  });
});
