import { ManagerEntity } from './manager.entity';
import { SchoolEntity } from './school.entity';
import { PostEntity } from './post.entity';

export * from './manager.entity';

export const entities = [ManagerEntity, SchoolEntity, PostEntity];
