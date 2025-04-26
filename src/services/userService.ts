import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';

const userRepo = AppDataSource.getRepository(User);

export async function getAllUsers() {
  return userRepo.find();
}

export async function getUserById(id: number) {
  return userRepo.findOneBy({ id });
}

export async function createUser(data: {name: string; email: string}) {
  const u = userRepo.create(data);
  return userRepo.save(u);
}

export async function updateUser(id: number, data: Partial<User>) {
  const user = await getUserById(id);
  if (!user) return null;
  userRepo.merge(user, data);
  return userRepo.save(user);
}

export async function deleteUser(id: number) {
  const res = await userRepo.delete({ id });
  return res.affected! > 0;
}
