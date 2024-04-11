import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MapGallery from '../Components/MapGallery';

jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

describe('MapGallery component', () => {
  it('renders correctly and fetches airport data', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ latitude: 0, longitude: 0, name: 'Test Airport' }]));
    render(<MapGallery address="Test Address" onSelectAirport={() => {}} />);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Test Airport')).toBeInTheDocument();
    });
  });

  it('displays markers on the map', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ latitude: 0, longitude: 0, name: 'Test Airport' }]));
    render(<MapGallery address="Test Address" onSelectAirport={() => {}} />);
    await waitFor(() => {
      expect(screen.getByText('Test Airport')).toBeInTheDocument();
    });
    expect(screen.getByLabelText('airport-marker')).toBeInTheDocument();
  });

  it('calls onSelectAirport when a marker is clicked', async () => {
    fetch.mockResponseOnce(JSON.stringify([{ latitude: 0, longitude: 0, name: 'Test Airport' }]));
    const onSelectAirport = jest.fn();
    render(<MapGallery address="Test Address" onSelectAirport={onSelectAirport} />);
    await waitFor(() => {
      expect(screen.getByText('Test Airport')).toBeInTheDocument();
    });
    userEvent.click(screen.getByLabelText('airport-marker'));
    expect(onSelectAirport).toHaveBeenCalledWith('Test Airport');
  });
});
