'use client';

import { useState } from 'react';
import { format } from 'date-fns';

// Mock flight data interface
interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departureAirport: string;
  arrivalAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

// Mock API function to simulate flight search
const searchFlights = async (
  origin: string,
  destination: string,
  departDate: string,
  returnDate?: string,
  passengers: number = 1
): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate mock flight data
  const generateFlights = (isReturn: boolean = false): Flight[] => {
    const airlines = ['Japan Airlines', 'ANA', 'Delta', 'United', 'Singapore Airlines'];
    const flights: Flight[] = [];
    
    for (let i = 0; i < 5; i++) {
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      const flightNumber = `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 1000) + 100}`;
      const basePrice = Math.floor(Math.random() * 500) + 500;
      const stops = Math.floor(Math.random() * 2);
      
      flights.push({
        id: `flight-${Date.now()}-${i}`,
        airline,
        flightNumber,
        departureAirport: isReturn ? destination : origin,
        arrivalAirport: isReturn ? origin : destination,
        departureTime: isReturn ? returnDate || '' : departDate,
        arrivalTime: isReturn ? returnDate || '' : departDate,
        duration: `${Math.floor(Math.random() * 5) + 8}h ${Math.floor(Math.random() * 50) + 10}m`,
        price: basePrice * passengers,
        stops
      });
    }
    
    return flights;
  };
  
  return generateFlights();
};

const FlightBookingAPI = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('Tokyo, Japan');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [isLoading, setIsLoading] = useState(false);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!origin || !destination || !departDate || (tripType === 'roundtrip' && !returnDate)) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      const results = await searchFlights(
        origin,
        destination,
        departDate,
        tripType === 'roundtrip' ? returnDate : undefined,
        passengers
      );
      
      setFlights(results);
    } catch (err) {
      setError('An error occurred while searching for flights. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'EEE, MMM d, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  return {
    // State
    origin,
    setOrigin,
    destination,
    setDestination,
    departDate,
    setDepartDate,
    returnDate,
    setReturnDate,
    passengers,
    setPassengers,
    tripType,
    setTripType,
    isLoading,
    flights,
    error,
    
    // Methods
    handleSearch,
    formatDate
  };
};

export default FlightBookingAPI;
