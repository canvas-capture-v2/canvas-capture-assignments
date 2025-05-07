/**
 * Defines types matching file-related
 * portions of the Canvas API
 */
/**
 * Defines types matching file-related
 * portions of the Canvas API
 */
import type {LockInfo} from './assignment'

export type File = {
    id: number
    uuid: string
    folder_id: number
    display_name: string
    filename: string
    'content-type': string
    url: string
    // file size in bytes
    size: number
    created_at: Date
    updated_at: Date
    unlock_at: Date
    locked: boolean
    hidden: boolean
    lock_at: Date
    hidden_for_user: boolean
    // Changes who can access the file. Valid options are 'inherit' (the default),
    // 'course', 'institution', and 'public'. Only valid in course endpoints.
    visibility_level: VisibilityLevel
    thumbnail_url: string
    modified_at: Date
    // simplified content-type mapping
    mime_class: string
    // identifier for file in third-party transcoding service
    media_entry_id: string
    locked_for_user: boolean
    lock_info: LockInfo
    lock_explanation: string
    // optional: url to the document preview. This url is specific to the user
    // making the api call. Only included in submission endpoints.
    preview_url?: string
}

export type VisibilityLevel = 'course' | 'institution' | 'public' | 'inherit'
