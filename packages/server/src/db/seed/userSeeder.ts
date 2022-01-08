import User from '../../modules/auth/user';

export default async () => {
  await User.collection.deleteMany({});
  await (User as any).register(new User({ username: 'admin' }), '123456');
};
