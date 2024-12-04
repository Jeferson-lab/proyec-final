import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import IncidentModal from './IncidentModal'; // Asegúrate de que la ruta sea correcta

describe('IncidentModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the modal when `isOpen` is true', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByText(/Report Incident/i)).toBeInTheDocument();
  });

  test('does not render the modal when `isOpen` is false', () => {
    render(<IncidentModal isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByText(/Report Incident/i)).not.toBeInTheDocument();
  });

  test('calls `onClose` when the close button is clicked', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const closeButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('allows selection of incident type', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const incidentButton = screen.getByText(/Theft/i);
    fireEvent.click(incidentButton);
    expect(incidentButton.closest('button')).toHaveClass('border-indigo-500');
  });

  test('allows inputting a description', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const descriptionInput = screen.getByPlaceholderText(/Please provide details/i);
    fireEvent.change(descriptionInput, { target: { value: 'Test description' } });
    expect(descriptionInput).toHaveValue('Test description');
  });

  test('allows entering a location', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const locationInput = screen.getByPlaceholderText(/Enter location or use current/i);
    fireEvent.change(locationInput, { target: { value: 'Test location' } });
    expect(locationInput).toHaveValue('Test location');
  });

  test('disables location input when "Use Current Location" is clicked', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const locationButton = screen.getByRole('button', { name: /use current location/i });
    fireEvent.click(locationButton);
    const locationInput = screen.getByPlaceholderText(/Enter location or use current/i);
    expect(locationInput).toHaveValue('Using current location');
    expect(locationInput).toBeDisabled();
  });

  test('disables the submit button when the form is invalid', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    const submitButton = screen.getByRole('button', { name: /Submit Report/i });
    expect(submitButton).toBeDisabled();
  });

  test('enables the submit button when the form is valid', () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText(/Please provide details/i), {
      target: { value: 'Test description' },
    });
    fireEvent.click(screen.getByText(/Theft/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter location or use current/i), {
      target: { value: 'Test location' },
    });

    const submitButton = screen.getByRole('button', { name: /Submit Report/i });
    expect(submitButton).not.toBeDisabled();
  });

  test('shows success message after submitting', async () => {
    render(<IncidentModal isOpen={true} onClose={mockOnClose} />);
    fireEvent.change(screen.getByPlaceholderText(/Please provide details/i), {
      target: { value: 'Test description' },
    });
    fireEvent.click(screen.getByText(/Theft/i));
    fireEvent.change(screen.getByPlaceholderText(/Enter location or use current/i), {
      target: { value: 'Test location' },
    });

    const submitButton = screen.getByRole('button', { name: /Submit Report/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Report Submitted!/i)).toBeInTheDocument();
  });
});
