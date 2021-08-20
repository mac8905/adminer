import { PhonesInterface } from './phones';
import { SelectionsInterface } from './selections';

/**
 * Proveedores
 */
export interface ProvidersInterface {
    _id: string;                        // llave primaria
    name: string;                       // nombre del proveedor
    supply: string;                     // bien o servicio suministrado
    importance: string;                 // importancia [critico, no critico]
    city: string;                       // ciudad
    address: string;                    // direccion
    phone: PhonesInterface;             // telefono
    email: string;                      // correo
    status: string;                     // estado actual
    selection: SelectionsInterface;     // seleccion proveedor
}
