import { AppDataSource } from '../ormconfig';
import { User } from '../entity/User';

const userRepo = AppDataSource.getRepository(User);

export const resolvers = {
  Query: {
    users: async () => {
      return userRepo.find();
    },
    user: async (_: any, args: { id: number }) => {
      return userRepo.findOneBy({ id: args.id });
    },
  },
  Mutation: {
    createUser: async (_: any, args: { data: { name: string; email: string } }) => {
      const u = userRepo.create(args.data);
      return userRepo.save(u);
    },
    updateUser: async (_: any, args: { id: number; data: Partial<User> }) => {
      const user = await userRepo.findOneBy({ id: args.id });
      if (!user) return null;
      userRepo.merge(user, args.data);
      return userRepo.save(user);
    },
    deleteUser: async (_: any, args: { id: number }) => {
      const res = await userRepo.delete({ id: args.id });
      return res.affected! > 0;
    },
  },
};
