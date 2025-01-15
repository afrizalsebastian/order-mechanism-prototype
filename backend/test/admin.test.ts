import { CreateAdminRequest } from '@dtos/admin.dtos';
import { Admin } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import appMock from 'supertest';
import app from '../src/App';
import { prismaMock } from './prisma.mock';

describe('POST /admin/create', () => {
  it('should return id and username admin if success', async () => {
    const admin: Admin = {
      id: 1,
      username: 'admin-test',
      password: 'admin-password-test',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.admin.create.mockResolvedValue(admin);

    const request: CreateAdminRequest = {
      username: 'admin-test',
      password: 'admin-password-test',
    };

    const result = await appMock(app)
      .post('/api/v1/admin/register')
      .send(request)
      .set('Accept', 'application/json');

    expect(result.statusCode).toBe(201);
    expect(result.body.status).toBe(true);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.username).toBe('admin-test');
    expect(result.body.data.id).toBe(1);
  });

  it('should return error if username-exists', async () => {
    prismaMock.admin.count.mockResolvedValue(1);
    const request: CreateAdminRequest = {
      username: 'admin-test',
      password: 'admin-password-test',
    };

    const result = await appMock(app)
      .post('/api/v1/admin/register')
      .send(request)
      .set('Accept', 'application/json');

    expect(result.statusCode).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.error).toBeDefined();
  });
});

describe('POST /admin/login', () => {
  it('should return token if sucess', async () => {
    const hashedPassword = await bcrypt.hash('admin-password-test', 10);
    const admin: Admin = {
      id: 1,
      username: 'admin-test',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.admin.findFirst.mockResolvedValue(admin);

    const request: CreateAdminRequest = {
      username: 'admin-test',
      password: 'admin-password-test',
    };

    const result = await appMock(app)
      .post('/api/v1/admin/login')
      .send(request)
      .set('Accept', 'application/json');

    expect(result.statusCode).toBe(200);
    expect(result.body.status).toBe(true);
    expect(result.body.data).toBeDefined();
    expect(result.body.data.token).toBeDefined();
  });

  it('should return error if username wrong', async () => {
    prismaMock.admin.findFirst.mockResolvedValue(null);

    const request: CreateAdminRequest = {
      username: 'admin',
      password: 'admin-password-test',
    };

    const result = await appMock(app)
      .post('/api/v1/admin/login')
      .send(request)
      .set('Accept', 'application/json');

    expect(result.statusCode).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.error).toBeDefined();
  });

  it('should return error if password wrong', async () => {
    const hashedPassword = await bcrypt.hash('admin-password-test', 10);
    const admin: Admin = {
      id: 1,
      username: 'admin-test',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    prismaMock.admin.findFirst.mockResolvedValue(admin);

    const request: CreateAdminRequest = {
      username: 'admin-test',
      password: 'admin-password',
    };

    const result = await appMock(app)
      .post('/api/v1/admin/login')
      .send(request)
      .set('Accept', 'application/json');

    expect(result.statusCode).toBe(400);
    expect(result.body.status).toBe(false);
    expect(result.body.error).toBeDefined();
  });
});
