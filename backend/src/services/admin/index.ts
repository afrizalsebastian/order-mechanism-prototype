import PrismaService from '@common/prisma.service';
import { AdminResponse, CreateAdminRequest } from '@dtos/admin.dtos';
import { BadRequestError } from '@middlewares/error.middleware';
import { Admin } from '@prisma/client';
import { AdminRepositories } from '@repositories/admin.repositories';
import { validate } from '@utils/validation.util';
import * as bcrypt from 'bcryptjs';
import { AdminValidation } from './validation';

export class AdminServices {
  private toAdminResponse(admin: Admin): AdminResponse {
    return {
      id: admin.id,
      username: admin.username,
    };
  }

  async Create(request: CreateAdminRequest): Promise<AdminResponse> {
    const validRequest: CreateAdminRequest = validate(
      AdminValidation.CREATE,
      request,
    );

    const isUsernameExist =
      (await PrismaService.admin.count({
        where: {
          username: validRequest.username,
        },
      })) > 0;

    if (isUsernameExist) {
      throw new BadRequestError('Username Exists. Try Other Username!');
    }

    validRequest.password = await bcrypt.hash(validRequest.password, 10);
    const admin = await AdminRepositories.getInstance().Create(validRequest);

    return this.toAdminResponse(admin);
  }
}
