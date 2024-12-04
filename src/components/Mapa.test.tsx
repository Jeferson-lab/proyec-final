import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Mapa from './Mapa';
import { GoogleMap } from '@react-google-maps/api';

// Mock de la geolocalización
vi.spyOn(navigator.geolocation, 'getCurrentPosition').mockImplementation((success) =>
    success({
        coords: {
            latitude: 40.7128,
            longitude: -74.0060,
        },
    })
);

describe('Mapa Component', () => {
    it('debería mostrar el mapa y los incidentes', async () => {
        const incidentes = [
            {
                id: 1,
                tipo: 'robo',
                ubicacion: { lat: 40.7128, lng: -74.0060 },
                descripcion: 'Actividad sospechosa reportada cerca del parque',
                fecha: new Date('2024-03-10T15:30:00'),
                gravedad: 'media',
            },
            {
                id: 2,
                tipo: 'sospechoso',
                ubicacion: { lat: 40.7580, lng: -73.9855 },
                descripcion: 'Intento de robo en edificio residencial',
                fecha: new Date('2024-03-10T14:15:00'),
                gravedad: 'alta',
            },
        ];

        render(<Mapa incidentes={incidentes} />);

        // Verifica que el mapa se haya cargado
        await waitFor(() => expect(screen.getByText(/Cargando.../)).not.toBeInTheDocument());

        // Verifica que los marcadores de los incidentes estén presentes
        expect(screen.getByTitle('robo: Actividad sospechosa reportada cerca del parque')).toBeInTheDocument();
        expect(screen.getByTitle('sospechoso: Intento de robo en edificio residencial')).toBeInTheDocument();
    });

    it('debería manejar errores de geolocalización', async () => {
        // Simula un error en la geolocalización
        vi.spyOn(navigator.geolocation, 'getCurrentPosition').mockImplementationOnce((_, error) =>
            error({ code: 1, message: 'Geolocalización no disponible' })
        );

        render(<Mapa incidentes={[]} />);

        // Verifica que el mensaje de error se muestre
        await waitFor(() => expect(screen.getByText(/La API de Geolocalización no está disponible/)).toBeInTheDocument());
    });
});
