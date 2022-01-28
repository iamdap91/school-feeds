import { Test, TestingModule } from '@nestjs/testing';
import { SchoolsController } from './schools.controller';
import { SchoolsService } from './schools.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PostEntity, SchoolEntity } from '../models/entities';

const schoolArray = [
  {
    id: 1,
    managerId: 1,
    name: 'name',
    type: 'area',
    createdAt: '2022-01-21T05:10:46.000Z',
    deletedAt: null,
  },
  {
    id: 2,
    managerId: 1,
    name: 'string2',
    type: 'string',
    createdAt: '2022-01-21T05:11:10.000Z',
    deletedAt: null,
  },
];

const postArray = [
  [
    {
      id: 3,
      content: 'asdfasfdasdfasdf',
      schoolId: 1,
      createdAt: '2022-01-26T09:23:16.647Z',
      deletedAt: null,
    },
    {
      id: 1,
      content: 'string-mod',
      schoolId: 1,
      createdAt: '2022-01-21T06:10:39.000Z',
      deletedAt: null,
    },
  ],
];

describe('SchoolsController', () => {
  let controller: SchoolsController;
  let service: SchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SchoolsController],
      providers: [
        SchoolsService,
        {
          provide: getRepositoryToken(SchoolEntity),
          useValue: {
            save: jest.fn().mockImplementation(() => Promise.resolve(schoolArray[0])),
          },
        },
        {
          provide: getRepositoryToken(PostEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(postArray),
          },
        },
      ],
    }).compile();

    controller = module.get<SchoolsController>(SchoolsController);
    service = module.get<SchoolsService>(SchoolsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createSchool()', () => {
    it('should successfully insert a school', async () => {
      jest.spyOn(service, 'createSchool');
      await controller.createSchool({ user: 1 }, { name: 'name', type: 'area' });
      expect(service.createSchool).toHaveBeenCalled();
    });
  });

  describe('getPosts()', () => {
    it('should successfully get posts', async () => {
      jest.spyOn(service, 'findPostsBySchoolId');
      await controller.getPosts(1);
      expect(service.findPostsBySchoolId).toHaveBeenCalled();
    });
  });
});
