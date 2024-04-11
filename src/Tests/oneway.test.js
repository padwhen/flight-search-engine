import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { OneWay } from './OneWay';
import { useAirportContext } from '../AirportContext';

jest.mock('../AirportContext');

describe('OneWay component', () => {
  beforeEach(() => {
    useAirportContext.mockReturnValue({
      airport1: '',
      airport2: '',
      setAirport1: jest.fn(),
      setAirport2: jest.fn(),
    });
  });

  it('renders input fields and buttons correctly', () => {
    render(<OneWay />);
    
    expect(screen.getByPlaceholderText('From address')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('To address')).toBeInTheDocument();
    expect(screen.getByText('Switch')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Departure')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Passenger')).toBeInTheDocument();
  });

  it('allows switching between from and to addresses', () => {
    render(<OneWay />);
    
    const fromInput = screen.getByPlaceholderText('From address');
    const toInput = screen.getByPlaceholderText('To address');
    fireEvent.change(fromInput, { target: { value: 'From Address' } });
    fireEvent.change(toInput, { target: { value: 'To Address' } });
    
    fireEvent.click(screen.getByText('Switch'));
    
    expect(fromInput).toHaveValue('To Address');
    expect(toInput).toHaveValue('From Address');
  });

  it('fetches and sets airports when addresses are changed', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { latitude: 1, longitude: 1, name: 'Airport 1' },
            { latitude: 2, longitude: 2, name: 'Airport 2' },
          ]),
      })
    );

    render(<OneWay />);
    
    fireEvent.change(screen.getByPlaceholderText('From address'), { target: { value: 'From Address' } });
    await waitFor(() => expect(screen.getByText('Airport 1')).toBeInTheDocument());
    
    fireEvent.change(screen.getByPlaceholderText('To address'), { target: { value: 'To Address' } });
    await waitFor(() => expect(screen.getByText('Airport 2')).toBeInTheDocument());
  });

  it('calls handleSelectAirport when an airport is selected', async () => {
    const handleSelectAirportMock = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { latitude: 1, longitude: 1, name: 'Airport 1' },
          ]),
      })
    );

    render(<OneWay />);
    
    fireEvent.change(screen.getByPlaceholderText('From address'), { target: { value: 'From Address' } });
    await waitFor(() => expect(screen.getByText('Airport 1')).toBeInTheDocument());
    
    fireEvent.click(screen.getByText('Airport 1'));
    expect(handleSelectAirportMock).toHaveBeenCalledWith('Airport 1');
  });
});
