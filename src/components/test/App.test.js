import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import ModalIncidente from './components/ModalIncidente';

describe('App Component', () => {
  test('renders the navigation bar', () => {
    render(<App />);
    const navElement = screen.getByText(/VigilanteApp/i);
    expect(navElement).toBeInTheDocument();
  });

  test('renders the button to report incidents', () => {
    render(<App />);
    const reportButton = screen.getByRole('button', { name: /Reportar/i });
    expect(reportButton).toBeInTheDocument();
  });

  test('opens modal on report button click', () => {
    render(<App />);
    const reportButton = screen.getByRole('button', { name: /Reportar/i });
    fireEvent.click(reportButton);

    const modalTitle = screen.getByText(/Reporte de Incidente/i); // Ajusta según tu título real
    expect(modalTitle).toBeInTheDocument();
  });
});

describe('ModalIncidente Component', () => {
  const mockCerrar = jest.fn();
  const mockEnviar = jest.fn();

  test('renders the modal when opened', () => {
    render(<ModalIncidente abierto={true} onCerrar={mockCerrar} onEnviar={mockEnviar} />);
    expect(screen.getByText(/Reporte de Incidente/i)).toBeInTheDocument();
  });

  test('calls onCerrar when close button is clicked', () => {
    render(<ModalIncidente abierto={true} onCerrar={mockCerrar} onEnviar={mockEnviar} />);
    const closeButton = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(closeButton);
    expect(mockCerrar).toHaveBeenCalledTimes(1);
  });

  test('submits form data on send', () => {
    render(<ModalIncidente abierto={true} onCerrar={mockCerrar} onEnviar={mockEnviar} />);
    fireEvent.change(screen.getByPlaceholderText(/Descripción del incidente/i), {
      target: { value: 'Incidente de prueba' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Enviar/i }));
    expect(mockEnviar).toHaveBeenCalled();
  });
});
