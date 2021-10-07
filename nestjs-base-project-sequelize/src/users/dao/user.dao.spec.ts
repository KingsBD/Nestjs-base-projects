import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User as UserModel } from '../models/user.model';
import { UserDao } from './user.dao';
import {
  funtionsMock,
  recordMock,
  createMock,
  updateResultMock,
} from '../mocks/user.mock';

describe('UserDao', () => {
  let dao: UserDao;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserDao,
        {
          provide: getModelToken(UserModel),
          useValue: funtionsMock,
        },
      ],
    }).compile();

    dao = module.get<UserDao>(UserDao);
  });

  it('should return an array of frequencies', async () => {
    const result = [recordMock];
    jest.spyOn(funtionsMock, 'findAll').mockImplementation(() => result);
    expect(await dao.findAll()).toBe(result);
  });

  it('should return the user', async () => {
    jest.spyOn(funtionsMock, 'findOne').mockImplementation(() => recordMock);
    expect(await dao.findOne(recordMock.id)).toBe(recordMock);
  });

  it('should return undefined', async () => {
    jest.spyOn(funtionsMock, 'create').mockImplementation(() => recordMock);
    expect(await dao.create(createMock)).toBe(recordMock);
  });

  it('should return undefined', async () => {
    jest
      .spyOn(funtionsMock, 'update')
      .mockImplementation(() => updateResultMock);
    expect(await dao.update(recordMock)).toBe(updateResultMock);
  });
});
