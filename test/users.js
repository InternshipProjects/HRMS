const expect = require('chai').expect;
const bcrypt = require('bcrypt');

const sequelize = require('../src/utils/connect_sequelize');
const UserModel = require('../src/models/users')(sequelize);
const User = require('../src/controller/user');
const { truncateTable } = require('./helpers');

describe('User Table', () => {
  const users = [
    {
      name: 'dhanalakshmi',
      password: 'dhana123',
      email: 'dhanalakshmi.narala@gmail.com',
      phone_no: '9553113446'
    },
    {
      name: 'sailaja',
      password: 'sailu123',
      email: 'sailu@gmail.com',
      phone_no: '1234567890'
    }
  ];

  beforeEach(async () => {
    await truncateTable('users');
  });

  describe('insert', () => {
    it('should insert user1', async () => {
      await User.insert(users[0]);
      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[0].name }
      });
      await compareUserDeatils(results, users[0]);
    });

    it('should insert user2', async () => {
      await User.insert(users[1]);
      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[1].name }
      });
      await compareUserDeatils(results, users[1]);
    });
  });

  describe('select', () => {
    it('should select user1 details', async () => {
      await UserModel.create(users[0]);
      const results = await User.select({ name: users[0].name });
      await compareUserDeatils(results, users[0]);
    });

    it('should select user2 details', async () => {
      await UserModel.create(users[1]);
      const results = await User.select({ name: users[1].name });
      await compareUserDeatils(results, users[1]);
    });
  });

  describe('update', () => {
    it('should update email of user1', async () => {
      await UserModel.create(users[0]);
      const newEmail = 'dhanalakshmi@gmail.com';
      await User.update({ name: users[0].name, email: newEmail });

      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[0].name }
      });
      await compareUserDeatils(results, users[0]);
    });

    it('should update email of user2', async () => {
      await UserModel.create(users[1]);
      const newEmail = 'sailaja@gmail.com';
      await User.update({ name: users[1].name, email: newEmail });

      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[1].name }
      });
      await compareUserDeatils(results, users[1]);
    });
  });

  describe('delete', () => {
    it('should delete user1', async () => {
      await UserModel.create(users[0]);
      await User.delete({ name: users[0].name });
      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[0].name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete user2', async () => {
      await UserModel.create(users[1]);
      await User.delete({ name: users[1].name });
      const results = await UserModel.findAll({
        raw: true,
        where: { name: users[1].name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });

  const compareUserDeatils = async (results, user) => {
    expect(results).to.have.lengthOf(1);
    const userInfo = results[0];
    expect(userInfo).to.have.property('name', user.name);
    expect(userInfo).to.have.property('password');
    expect(await bcrypt.compare(user.password, userInfo.password));
    expect(userInfo).to.have.property('email', userInfo.email);
    expect(userInfo).to.have.property('phone_no', userInfo.phone_no);
  };
});
