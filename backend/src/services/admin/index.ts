import {
  AdminResponse,
  CreateAdminRequest,
  LoginAdminRequest,
} from '@dtos/admin.dtos';
import { BadRequestError } from '@middlewares/error.middleware';
import { Admin } from '@prisma/client';
import { AdminRepositories } from '@repositories/admin.repositories';
import { ClaimsPayload, CreateToken } from '@utils/token.util';
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
      await AdminRepositories.getInstance().IsUsernameExists(
        validRequest.username,
      );

    if (isUsernameExist) {
      throw new BadRequestError('Username Exists. Try Other Username!');
    }

    validRequest.password = await bcrypt.hash(validRequest.password, 10);
    const admin = await AdminRepositories.getInstance().Create(validRequest);

    return this.toAdminResponse(admin);
  }

  async Login(request: LoginAdminRequest): Promise<string> {
    const validRequest: LoginAdminRequest = validate(
      AdminValidation.LOGIN,
      request,
    );

    const admin = await AdminRepositories.getInstance().GetAdminFromUsername(
      validRequest.username,
    );

    if (!admin) {
      throw new BadRequestError('Username or password invalid');
    }

    const isPasswordCorrect = await bcrypt.compare(
      validRequest.password,
      admin.password,
    );

    if (!isPasswordCorrect) {
      throw new BadRequestError('Username or password invalid');
    }

    const payload: ClaimsPayload = {
      id: admin.id,
      username: admin.username,
    };

    const token = CreateToken(payload);
    return token;
  }
}
