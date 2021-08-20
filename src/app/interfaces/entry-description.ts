/**
 * Descripcion de la entrada
 */
export interface EntryDescription {
    _id: string;            // Llave primaria
    group: number;          // Grupo
    unity: number;          // Unidad
    quantity: number;       // Cantidad
    description: string;    // Descripcion del equipo, material e insumo
    location_id: any;       // Ubicacion donde se almacena
}
