import {
    Category,
    CultureRef,
    ExtraStoryFields,
    Newsroom,
    NewsroomRef,
    Pagination,
    Query,
    Story,
    StoryFormatVersion,
    StoryVisibility,
    UserRef,
} from '../../types';

/**
 * Uploadcare image JSON string.
 */
type UploadedImage = string;
type Iso8601DateTime = string;
/**
 * Raw HTML string.
 */
type Html = string;
/**
 * String containing Prezly Content Format JSON structure.
 */
type PrezlyContentFormat = string;

export type StoriesQuery = Query<
    | Query.Filter<'id', Query.OneToManyPredicate | Query.EqualityPredicate, Story['id']>
    | Query.Filter<'uuid', Query.OneToManyPredicate | Query.EqualityPredicate, Story['uuid']>
    | Query.Filter<'slug', Query.OneToManyPredicate | Query.EqualityPredicate, Story['slug']>
    | Query.Filter<'format_version', Query.EqualityPredicate, Story['format_version']>
    | Query.Filter<'lifecycle_status', Query.OneToManyPredicate, Story['lifecycle_status']>
    | Query.Filter<'visibility', Query.OneToManyPredicate, Story['visibility']>
    | Query.Filter<'language', Query.OneToManyPredicate, CultureRef['language_code']>
    | Query.Filter<'locale', Query.OneToManyPredicate, CultureRef['code']>
    | Query.Filter<'newsroom.id', Query.OneToManyPredicate, Newsroom['id']>
    | Query.Filter<'newsroom.uuid', Query.OneToManyPredicate, Newsroom['uuid']>
    | Query.Filter<'newsroom.status', Query.OneToManyPredicate, Newsroom['status']>
    | Query.Filter<'author.id', Query.OneToManyPredicate, UserRef['id']>
    | Query.Filter<'tag.id', Query.OneToManyPredicate, number>
    | Query.Filter<'tag.name', Query.OneToManyPredicate, number>
    | Query.Filter<'category.id', Query.OneToManyPredicate, Category['id']>
    | Query.Filter<'published_at', Query.ComparablePredicate, Iso8601DateTime>
    | Query.Filter<'scheduled_at', Query.ComparablePredicate, Iso8601DateTime>
    | Query.Filter<'updated_at', Query.ComparablePredicate, Iso8601DateTime>
    | Query.Filter<'header_image', Query.EqualityPredicate, UploadedImage | null>
    | Query.Filter<'preview_image', Query.EqualityPredicate, UploadedImage | null>
    | Query.Filter<'social_image', Query.EqualityPredicate, UploadedImage | null>
    | Query.Filter<'images.count', Query.ComparablePredicate, number>
    | Query.Filter<'videos.count', Query.ComparablePredicate, number>
>;

export type StoriesSearchRequest<Include extends readonly (keyof ExtraStoryFields)[]> = {
    jsonQuery?: StoriesQuery;
    limit?: number;
    offset?: number;
    sortOrder?: string;
    include?: Include;
};
export type StoriesListRequest<Include extends readonly (keyof ExtraStoryFields)[]> = Omit<
    StoriesSearchRequest<Include>,
    'jsonQuery'
>;

export interface StoriesListResponse<S extends Story = Story> {
    stories: S[];
    pagination: Pagination;
    sort: string;
}

interface GenericStoryCreateRequest {
    newsroom?: NewsroomRef['id'];

    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: StoryVisibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

interface GenericStoryUpdateRequest {
    title?: string;
    subtitle?: string;
    published_at?: Iso8601DateTime;
    visibility?: StoryVisibility;
    culture?: CultureRef['code'];

    header_image?: UploadedImage;
    preview_image?: UploadedImage;
    social_image?: UploadedImage;
    social_text?: string;

    categories?: Category['id'][];
    tags?: string[];
}

export interface HtmlStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.HTML;
    intro: Html;
    content: Html;
}

export interface SlateStoryCreateRequest extends GenericStoryCreateRequest {
    /**
     * If format version is omitted, license default editor version will be implied.
     */
    format_version?: StoryFormatVersion.SLATEJS;
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export interface HtmlStoryUpdateRequest extends GenericStoryUpdateRequest {
    intro: Html;
    content: Html;
}

export interface SlateStoryUpdateRequest extends GenericStoryUpdateRequest {
    /**
     * Intro field is not supported for Prezly Content Format stories.
     */
    intro: never;
    content: PrezlyContentFormat;
}

export type StoryCreateRequest = HtmlStoryCreateRequest | SlateStoryCreateRequest;
export type StoryUpdateRequest = HtmlStoryUpdateRequest | SlateStoryUpdateRequest;
