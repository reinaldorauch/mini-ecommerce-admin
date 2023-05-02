interface User {
  name: string;
  email: string;
  sub: string;
  role: UserRole;
}

enum UserRole {
  Admin = "admin",
  Customer = "customer",
}

interface UserStore {
  token: string | null;
  user: User | null;
}

interface PaginatedResult<T> {
  total: number;
  data: T[];
}

interface Product {
  _id: string;
  title: number;
  price: number;
  images: string[];
  itemsInStock: number;
}
