import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ManagersService } from './managers.service';
import { ManagerEntity } from '../models/entities';
import { RegisterManagerDto } from './dto';
import { JwtService } from '@nestjs/jwt';

describe('ManagersService', () => {
  let service: ManagersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ManagersService,
        { provide: JwtService, useValue: { sign: jest.fn().mockResolvedValue('') } },
        {
          provide: getRepositoryToken(ManagerEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(undefined),
            save: jest.fn().mockImplementation((arg) => ({ ...arg, id: Math.round(Math.random() + 1000) })),
          },
        },
      ],
    }).compile();

    service = module.get<ManagersService>(ManagersService);
  });

  describe('register()', () => {
    it('should successfully insert a manager', async () => {
      const manager = { email: 'email', password: 'password', name: 'name' } as RegisterManagerDto;
      const { email, password, name } = await service.register(manager);
      expect({ email, password, name }).toEqual(manager);
    });
  });

  describe('login()', () => {
    it('should successfully get access-token', async () => {
      const manager = { id: 1, email: 'email', name: 'name' };
      const token = await service.login(manager);
      expect(token).toHaveProperty('access-token');
    });
  });
});
