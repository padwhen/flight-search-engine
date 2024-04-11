import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Example from './Example';

describe('Example component', () => {
  it('renders the default title and options correctly', () => {
    render(<Example handleTitleChange={() => {}} />);
    
    expect(screen.getByText('One Way')).toBeInTheDocument();
    expect(screen.getByText('Multi City')).toBeInTheDocument();
    expect(screen.getByText('Round Trip')).toBeInTheDocument();
  });

  it('changes the title and options when clicked', () => {
    const handleTitleChangeMock = jest.fn();
    render(<Example handleTitleChange={handleTitleChangeMock} />);
    
    fireEvent.click(screen.getByText('One Way'));
    expect(handleTitleChangeMock).toHaveBeenCalledWith('One Way', expect.any(Function));
    expect(screen.getByText('Multi City')).toBeInTheDocument();
    expect(screen.getByText('Round Trip')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Multi City'));
    expect(handleTitleChangeMock).toHaveBeenCalledWith('Multi City', expect.any(Function));
    expect(screen.getByText('One Way')).toBeInTheDocument();
    expect(screen.getByText('Round Trip')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Round Trip'));
    expect(handleTitleChangeMock).toHaveBeenCalledWith('Round Trip', expect.any(Function));
    expect(screen.getByText('One Way')).toBeInTheDocument();
    expect(screen.getByText('Multi City')).toBeInTheDocument();
  });

  it('displays information corresponding to selected option', () => {
    const handleTitleChangeMock = jest.fn();
    render(<Example handleTitleChange={handleTitleChangeMock} />);
    
    fireEvent.click(screen.getByText('One Way'));
    expect(screen.getByText('One Way Information')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Multi City'));
    expect(screen.getByText('Multi City Information')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Round Trip'));
    expect(screen.getByText('Round Trip Information')).toBeInTheDocument();
  });
});
