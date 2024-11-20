export interface Ubicacion {
  lat: number;
  lng: number;
}

export interface Incidente {
  id: number;
  tipo: string;
  ubicacion: Ubicacion;
  descripcion: string;
  fecha: Date;
  gravedad: 'baja' | 'media' | 'alta';
}

export interface MensajeChat {
  id: number;
  texto: string;
  esUsuario: boolean;
  fecha: Date;
}