export interface Produit {
    id?: string;
    nom: string;
    categorie: string;
    poids: number;
    prix: number;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
}
