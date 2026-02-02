export enum StatutColis {
    CREE = 'CREE',
    COLLECTE = 'COLLECTE',
    EN_STOCK = 'EN_STOCK',
    EN_TRANSIT = 'EN_TRANSIT',
    LIVRE = 'LIVRE',
    ANNULE = 'ANNULE'
}

export enum PrioriteColis {
    NORMALE = 'NORMALE',
    URGENTE = 'URGENTE',
    EXPRESS = 'EXPRESS'
}

export interface ColisProduit {
    produitId: string;
    produitNom: string;
    quantite: number;
}

export interface Colis {
    id: string;
    description: string;
    poids: number;
    statut: StatutColis;
    priorite: PrioriteColis;
    villeDestination: string;
    dateCreation: string;
    livreurId?: string;
    livreurNom?: string;
    clientExpediteurId: string;
    clientExpediteurNom?: string;
    destinataireId: string;
    destinataireNom?: string;
    zoneId: string;
    zoneNom?: string;
    produits: ColisProduit[];
}

export interface ColisSearchCriteria {
    statut?: StatutColis;
    priorite?: PrioriteColis;
    villeDestination?: string;
    clientId?: string;
    livreurId?: string;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
