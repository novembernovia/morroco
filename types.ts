import { ReactNode } from 'react';

export interface Meals {
  b: string;
  l: string;
  d: string;
}

export interface ItineraryItem {
  day: number;
  date: string;
  city: string;
  title: string;
  icon: ReactNode;
  content: string;
  meals: Meals;
  features: string[];
  souvenirs?: string[];
  guideTip: string;
}

export interface EmergencyContact {
  name: string;
  phone: string;
  flightTo: string;
  flightBack: string;
}

export interface ColorScheme {
  header: string;
  bg: string;
  text: string;
  accentGreen: string;
  accentBlue: string;
  card: string;
  navActive: string;
  navInactive: string;
}