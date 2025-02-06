import { VideoEntity } from '../entities/video.entity';
import { SearchableRepositoryInterface, SearchParams as DefaultSearchParams, SearchResult as DefaultSearchResult } from '../../../shared/domain/repositories/searchable-repository-contract';
export declare namespace VideoRepository {
    type Filter = string;
    class SearchParams extends DefaultSearchParams<Filter> {
    }
    class SearchResult extends DefaultSearchResult<VideoEntity, Filter> {
    }
    interface Repository extends SearchableRepositoryInterface<VideoEntity, string, SearchParams, SearchResult> {
    }
}
