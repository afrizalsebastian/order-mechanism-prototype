export interface AdminResponse {
  id: number;
  username: string;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
}

export interface LoginAdminRequest {
  username: string;
  password: string;
}
