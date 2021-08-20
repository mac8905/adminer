import { EntryDescription } from './entry-description';

/**
 * Entrada de almacen
 */
export interface Entries {
    _id: string;            // llave primaria
    invoice: string;        // Numero de factura
    date: string;           // Fecha de entrada
    username: any;          // Nombre del laboratorista que recibe
    per_delivery: string;   // Nombre de quien entrega material
    entry: string;          // Entrada
    contract: string;       // Tipo de contrato
    provider_id: any;       // Proveedor
    description: any;       // Descripcion de la entrada
}
