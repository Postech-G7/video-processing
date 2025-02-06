import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repositories-contracts';
export declare abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[];
    insert(entity: E): Promise<void>;
    findById(id: string): Promise<E>;
    findAll(): Promise<E[]>;
    update(newEntity: E): Promise<void>;
    delete(id: string): Promise<void>;
    protected _get(id: string): Promise<E>;
    protected _getIndex(id: string): number;
}
