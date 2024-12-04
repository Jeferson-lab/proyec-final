import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('debería mostrar el modal al hacer clic en el botón de reportar', () => {
    render(<App />);

    // Verificar que el botón "Reportar" está en el documento
    const reportButton = screen.getByRole('button', { name: /reportar/i });
    expect(reportButton).toBeInTheDocument();

    // Simular el clic en el botón de reportar
    fireEvent.click(reportButton);

    // Verificar que el modal se muestra
    expect(screen.getByText(/Reporte de Incidente/i)).toBeInTheDocument();
  });
});
q