import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { funtionsMock, createMock, recordMock } from '../mocks/user.mock';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: funtionsMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return an array of user', async () => {
    const result = [recordMock];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.getUsers()).toBe(result);
  });

  it('should return the user', async () => {
    jest.spyOn(service, 'findOne').mockResolvedValue(recordMock);
    expect(await controller.getUser(recordMock.id)).toBe(recordMock);
  });

  it('should create a user and return the id', async () => {
    const result = {
      id: recordMock.id,
    };
    jest.spyOn(service, 'create').mockResolvedValue(recordMock.id);
    expect(await controller.createUser(createMock)).toEqual(result);
  });

  it('should update the user and not return a value', async () => {
    jest.spyOn(service, 'update').mockResolvedValue(undefined);
    expect(await controller.updateUser(recordMock.id, recordMock)).toBe(
      undefined,
    );
  });
});
