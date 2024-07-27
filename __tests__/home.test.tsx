import "@testing-library/jest-dom";
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';
import { AppRouterContextProviderMock } from '../app-router-context-provider-mock'

describe('Home', () => {

  it('containsPaperHansLogo', () => {
    const push = jest.fn();
    render(<AppRouterContextProviderMock router={{ push }}><Home /></AppRouterContextProviderMock>); // ARRANGE.
    const paperHansLogo = screen.getByAltText('PaperHans Logo'); // ACTION.
    expect(paperHansLogo).toBeInTheDocument(); // ASSERION.
  })

  it('containsAboutUsButton', () => {
    const push = jest.fn();
    render(<AppRouterContextProviderMock router={{ push }}><Home /></AppRouterContextProviderMock>);
    const aboutUseButton = screen.getByTestId('about-us-button');
    expect(aboutUseButton).toBeInTheDocument();
    expect(aboutUseButton).toHaveTextContent('About Us');
  })
  
})