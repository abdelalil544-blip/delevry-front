export enum StatutColis {
    EN_ATTENTE = 'EN_ATTENTE',
    EN_COURS = 'EN_COURS',
    LIVRE = 'LIVRE',
    ANNULE = 'ANNULE'
}

export enum PrioriteColis {
    BASSE = 'BASSE',
    MOYENNE = 'MOYENNE',
    HAUTE = 'HAUTE'
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
