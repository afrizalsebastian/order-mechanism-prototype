import PrismaService from '@common/prisma.service';
import { CreateAdminRequest } from '@dtos/admin.dtos';
import { Admin } from '@prisma/client';

export class AdminRepositories {
  public static instance: AdminRepositories;

  public static getInstance(): AdminRepositories {
    if (!AdminRepositories.instance) {
      AdminRepositories.instance = new AdminRepositories();
    }

    return AdminRepositories.instance;
  }

  public async Create(request: CreateAdminRequest): Promise<Admin> {
    const result = await PrismaService.admin.create({
      data: {
        username: request.username,
        password: request.password,
      },
    });

    return result;
  }

  public async IsUsernameExists(username: string): Promise<boolean> {
    return (
      (await PrismaService.admin.count({
        where: {
          username: username,
        },
      })) > 0
    );
  }

  public async GetAdminFromUsername(username: string): Promise<Admin | null> {
    return await PrismaService.admin.findFirst({
      where: {
        username: username,
      },
    });
  }
}
