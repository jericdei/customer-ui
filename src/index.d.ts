export type Customer = {
    id?: number
    first_name: string
    last_name: string
    email: string
    contact_number: string
    created_at: string
    updated_at: string
}

export type PaginatedResource<T> = {
    current_page: number
    data: T[]
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: PaginationLink[]
    next_page_url: string
    path: string
    per_page: number
    prev_page_url: string | null
    to: number
    total: number
}

export type PaginationLink = {
    url: string | null
    label: string
    active: boolean
}

export type FetchParams = {
    q?: string
    page?: number
    per_page?: number
    sort?: {
        field: string
        order?: 'asc' | 'desc'
    }
}
