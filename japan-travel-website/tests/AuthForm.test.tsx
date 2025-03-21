import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AuthForm from '../components/auth/AuthForm';

// Mock the onSubmit function
const mockOnSubmit = vi.fn();

describe('AuthForm Component', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockOnSubmit.mockClear();
  });

  it('renders login form correctly', () => {
    render(<AuthForm type="login" onSubmit={mockOnSubmit} />);
    
    // Check if the login title is displayed
    expect(screen.getByText('Log In')).toBeInTheDocument();
    
    // Check if email and password fields are present
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    
    // Check if the login button is present
    expect(screen.getByRole('button', { name: /Log In/i })).toBeInTheDocument();
    
    // Check if the sign up link is present
    expect(screen.getByText(/Don't have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument();
  });

  it('renders registration form correctly', () => {
    render(<AuthForm type="register" onSubmit={mockOnSubmit} />);
    
    // Check if the register title is displayed
    expect(screen.getByText('Create an Account')).toBeInTheDocument();
    
    // Check if name, email, password, and confirm password fields are present
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument();
    
    // Check if the sign up button is present
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
    
    // Check if the login link is present
    expect(screen.getByText(/Already have an account\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Log in/i)).toBeInTheDocument();
  });

  it('submits login form with correct data', () => {
    render(<AuthForm type="login" onSubmit={mockOnSubmit} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Log In/i }));
    
    // Check if onSubmit was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
  });

  it('submits registration form with correct data', () => {
    render(<AuthForm type="register" onSubmit={mockOnSubmit} />);
    
    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'password123' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    // Check if onSubmit was called with the correct data
    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123'
    });
  });

  it('shows error when passwords do not match in registration form', () => {
    render(<AuthForm type="register" onSubmit={mockOnSubmit} />);
    
    // Fill in the form with mismatched passwords
    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: 'John Doe' }
    });
    
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: 'john@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText(/^Password$/i), {
      target: { value: 'password123' }
    });
    
    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: 'differentpassword' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Sign Up/i }));
    
    // Check if error message is displayed
    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    
    // Check that onSubmit was not called
    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
