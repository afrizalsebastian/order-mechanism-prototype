export interface AdminResponse {
  id: number;
  username: string;
}

export interface CreateAdminRequest {
  username: string;
  password: string;
}
