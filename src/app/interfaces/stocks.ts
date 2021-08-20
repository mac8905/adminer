export interface Stocks {
    entry_id: string;
    code: String;           // Cod.
    succession: String;     // Serie
    trademark: String;      // Marca
    equipment: String;      // Equipo
    model: String;          // Modelo
    state: String;          // Estado de adquisicion
    laboratory_id: any;
    location_id: any;
    characteristics: {
        power: String,
        voltage: String,
        kw: String,
        amperage: String
    };
    description: string;    // Descripcion
    photo: string;          // Foto
    handbook: string;       // Manual del equipo
    observations: string;   // Observaciones
    status: any;            // Estados
}
