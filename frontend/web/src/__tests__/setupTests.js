// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock window.matchMedia with a complete implementation
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
    // Make sure all properties needed by antd are present
    addListener: jest.fn(),
    removeListener: jest.fn()
  })),
});

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
});

// Configure testing library
configure({ testIdAttribute: 'data-testid' });

global.MutationObserver = class {
  constructor(callback) {}
  disconnect() {}
  observe(element, initObject) {}
};

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Empty test to satisfy Jest requirement
describe('Setup Tests', () => {
  test('test environment is configured', () => {
    expect(true).toBe(true);
  });
});

// Test for mock data validation
describe('Mock Data Validation', () => {
  test('mock data should be properly defined', () => {
    const { mockEquipment, mockPatients, mockDoctors, mockAppointments, mockUsers, mockApi } = require('../data/mockData');
    expect(mockEquipment).toBeDefined();
    expect(mockPatients).toBeDefined();
    expect(mockDoctors).toBeDefined();
    expect(mockAppointments).toBeDefined();
    expect(mockUsers).toBeDefined();
    expect(mockApi).toBeDefined();
  });
});