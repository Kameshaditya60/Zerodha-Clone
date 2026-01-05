import React from 'react';
import { render, screen } from '@testing-library/react';
import Hero from '../src/landing_page/home/HomePage';

describe('Hero Component', () => {
    test('renders Hero component with correct text', () => {
        render(<Hero />);
        const heroImage = screen.getByAltText('Hero Banner');
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute('src', 'media/images/homeHero.png');
    });
});

