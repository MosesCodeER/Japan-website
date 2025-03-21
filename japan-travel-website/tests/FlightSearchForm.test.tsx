import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FlightSearchForm from '../components/flights/FlightSearchForm';

// Mock the onSearch function
const mockOnSearch = vi.fn();

describe('FlightSearchForm Component', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockOnSearch.mockClear();
  });

  it('renders flight search form correctly', () => {
    render(
      <FlightSearchForm 
        origin=""
        setOrigin={vi.fn()}
        destination="Tokyo, Japan"
        setDestination={vi.fn()}
        departDate=""
        setDepartDate={vi.fn()}
        returnDate=""
        setReturnDate={vi.fn()}
        passengers={1}
        setPassengers={vi.fn()}
        tripType="roundtrip"
        setTripType={vi.fn()}
        onSearch={mockOnSearch}
      />
    );
    
    // Check if the form title is displayed
    expect(screen.getByText('Find Flights to Japan')).toBeInTheDocument();
    
    // Check if radio buttons for trip type are present
    expect(screen.getByLabelText(/Round Trip/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/One Way/i)).toBeInTheDocument();
    
    // Check if form fields are present
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Depart/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Return/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passengers/i)).toBeInTheDocument();
    
    // Check if the search button is present
    expect(screen.getByRole('button', { name: /Search Flights/i })).toBeInTheDocument();
  });

  it('hides return date field when one-way trip is selected', () => {
    render(
      <FlightSearchForm 
        origin=""
        setOrigin={vi.fn()}
        destination="Tokyo, Japan"
        setDestination={vi.fn()}
        departDate=""
        setDepartDate={vi.fn()}
        returnDate=""
        setReturnDate={vi.fn()}
        passengers={1}
        setPassengers={vi.fn()}
        tripType="oneway"
        setTripType={vi.fn()}
        onSearch={mockOnSearch}
      />
    );
    
    // Check that return date field is not present
    expect(screen.queryByLabelText(/Return/i)).not.toBeInTheDocument();
  });

  it('calls onSearch with form data when submitted', () => {
    const setOrigin = vi.fn();
    const setDepartDate = vi.fn();
    const setReturnDate = vi.fn();
    
    render(
      <FlightSearchForm 
        origin="New York"
        setOrigin={setOrigin}
        destination="Tokyo, Japan"
        setDestination={vi.fn()}
        departDate="2025-04-01"
        setDepartDate={setDepartDate}
        returnDate="2025-04-15"
        setReturnDate={setReturnDate}
        passengers={2}
        setPassengers={vi.fn()}
        tripType="roundtrip"
        setTripType={vi.fn()}
        onSearch={mockOnSearch}
      />
    );
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Search Flights/i }));
    
    // Check if onSearch was called
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
  });
});
