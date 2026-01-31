export interface Zone {
    id?: string;
    nom: string;
    codePostal?: string;
    ville?: string;
    description?: string;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
