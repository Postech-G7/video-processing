import { SortDirection } from '../../../shared/domain/repositories/searchable-repository-contract';
import { ListVideosUseCase } from '../../application/usecases/list-videos.usecase';
export declare class ListVideosDto implements ListVideosUseCase.Input {
    page?: number;
    perPage?: number;
    sort?: string;
    sortDir?: SortDirection;
    filter?: string;
}
