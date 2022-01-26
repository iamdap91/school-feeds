import { EntityRepository, Repository } from 'typeorm';
import { FollowEntity } from '../entities';

@EntityRepository(FollowEntity)
export class FollowRepository extends Repository<FollowEntity> {}
