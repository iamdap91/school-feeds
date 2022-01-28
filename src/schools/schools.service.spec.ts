import { Test, TestingModule } from '@nestjs/testing';
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

describe('SchoolsService', () => {
  let service: SchoolsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SchoolsService,
        {
          provide: getRepositoryToken(SchoolEntity),
          useValue: {
            find: jest.fn().mockResolvedValue(schoolArray),
            findOne: jest.fn().mockResolvedValue(schoolArray[0]),
            save: jest.fn().mockResolvedValue(schoolArray[0]),
            remove: jest.fn(),
            delete: jest.fn(),
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

    service = module.get<SchoolsService>(SchoolsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createSchool()', () => {
    it('should successfully insert a school', async () => {
      const school = { name: 'name', type: 'area', managerId: 1 };
      const { name, type, managerId } = await service.createSchool(1, school);
      expect({ name, type, managerId }).toEqual(school);
    });
  });

  describe('findPostsBySchoolId()', () => {
    it('should return array of posts', async () => {
      const posts = await service.findPostsBySchoolId(1);
      expect(posts).toEqual(postArray);
    });
  });
});
