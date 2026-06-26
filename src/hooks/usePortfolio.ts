import portfolioData from '../data/portfolio.json';
import type { PortfolioData } from '../types/portfolio';

const data = portfolioData as PortfolioData;

export function usePortfolio(): PortfolioData {
  return data;
}
