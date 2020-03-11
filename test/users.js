const expect = require('chai').expect;
const bcrypt = require('bcrypt');

const {
  insertUserInDB,
  getUserFromDB,
  updateUserInDB,
  deleteUserFromDB
} = require('../src/services/user');
const sequelize = require('../src/utils/connect_sequelize');
const UserModel = require('../src/models/users')(sequelize);
const { truncateTable } = require('./helper');

describe('User Table', () => {
  const users = [
    {
      name: 'dhanalakshmi',
      user_name: 'dhana',
      password: 'dhana123',
      email: 'dhanalakshmi.narala@gmail.com',
      phone_no: '9553113446'
    },
    {
      name: 'sailaja',
      user_name: 'sailu',
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
      const isInserted = await insertUserInDB(users[0]);
      expect(isInserted).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[0].user_name }
      });
      expect(results).to.have.lengthOf(1);
      await compareUserInfo(results[0], users[0]);
    });

    it('should insert user2', async () => {
      const isInserted = await insertUserInDB(users[1]);
      expect(isInserted).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[1].user_name }
      });
      expect(results).to.have.lengthOf(1);
      await compareUserInfo(results[0], users[1]);
    });
  });

  describe('select', () => {
    it('should select user1 details', async () => {
      await UserModel.create(users[0]);
      const results = await getUserFromDB({ user_name: users[0].user_name });
      await compareUserInfo(results, users[0]);
    });

    it('should select user2 details', async () => {
      await UserModel.create(users[1]);
      const results = await getUserFromDB({ user_name: users[1].user_name });
      await compareUserInfo(results, users[1]);
    });
  });

  describe('update', () => {
    it('should update email of user1', async () => {
      await UserModel.create(users[0]);
      const newEmail = 'dhanalakshmi@gmail.com';
      const isUpdatedd = await updateUserInDB({
        user_name: users[0].user_name,
        email: newEmail
      });
      expect(isUpdatedd).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[0].user_name }
      });
      expect(results).to.have.lengthOf(1);
      await compareUserInfo(results[0], users[0]);
    });

    it('should update email of user2', async () => {
      await UserModel.create(users[1]);
      const newEmail = 'sailaja@gmail.com';
      const isUpdated = await updateUserInDB({
        user_name: users[1].user_name,
        email: newEmail
      });
      expect(isUpdated).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[1].user_name }
      });
      expect(results).to.have.lengthOf(1);
      await compareUserInfo(results[0], users[1]);
    });
  });

  describe('delete', () => {
    it('should delete user1', async () => {
      await UserModel.create(users[0]);
      const isDeleted = await deleteUserFromDB({
        user_name: users[0].user_name
      });
      expect(isDeleted).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[0].user_name }
      });
      expect(results).to.have.lengthOf(0);
    });

    it('should delete user2', async () => {
      await UserModel.create(users[1]);
      const isDeleted = await deleteUserFromDB({
        user_name: users[1].user_name
      });
      expect(isDeleted).to.be.true;

      const results = await UserModel.findAll({
        raw: true,
        where: { user_name: users[1].user_name }
      });
      expect(results).to.have.lengthOf(0);
    });
  });

  const compareUserInfo = async (userInfo, user) => {
    expect(userInfo).to.have.property('user_name', user.user_name);
    expect(userInfo).to.have.property('password');
    expect(await bcrypt.compare(user.password, userInfo.password));
    expect(userInfo).to.have.property('name', userInfo.name);
    expect(userInfo).to.have.property('email', userInfo.email);
    expect(userInfo).to.have.property('phone_no', userInfo.phone_no);
  };
});
