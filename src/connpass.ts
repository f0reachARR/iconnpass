export interface Series {
    url: string;
    id: number;
    title: string;
}

export interface Event {
    event_url: string;
    event_type: string;
    owner_nickname: string;
    series: Series;
    updated_at: Date;
    lat: string;
    started_at: Date;
    hash_tag: string;
    title: string;
    event_id: number;
    lon: string;
    waiting: number;
    limit: number;
    owner_id: number;
    owner_display_name: string;
    description: string;
    address: string;
    catch: string;
    accepted: number;
    ended_at: Date;
    place: string;
}

export interface Connpass {
    results_returned: number;
    events: Event[];
    results_start: number;
    results_available: number;
}