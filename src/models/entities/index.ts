import { ManagerEntity } from './manager.entity';
import { SchoolEntity } from './school.entity';
import { PostEntity } from './post.entity';
import { FollowEntity } from './follow.entity';
import { StudentEntity } from './student.entity';

export * from './manager.entity';
export * from './follow.entity';
export * from './post.entity';
export * from './school.entity';
export * from './student.entity';

export const entities = [ManagerEntity, SchoolEntity, PostEntity, FollowEntity, StudentEntity];
