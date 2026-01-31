export interface User {
    id?: string;
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    adresse?: string;
    role?: string;
}

export interface ClientExpediteur extends User {
    entreprise?: string;
}

export interface Livreur extends User {
    vehicule?: string;
    disponibilite?: boolean;
    zoneAssigneeId?: string;
}

export interface Destinataire extends User {
    // Additional destinataire-specific fields if any
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
