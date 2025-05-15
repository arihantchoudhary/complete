
import { toast } from "sonner";

// Types for data sources and responses
export interface DataSource {
  id: string;
  name: string;
  url: string;
  type: 'economic' | 'geopolitical' | 'weather' | 'supply-chain';
  active: boolean;
  lastUpdated?: string;
}

export interface ScrapedData {
  source: string;
  timestamp: string;
  data: {
    indicators: {
      name: string;
      value: number;
      trend: 'up' | 'down' | 'stable';
      confidence: number;
    }[];
  };
}

// Mock data sources - in a real implementation, these would be configurable
const dataSources: DataSource[] = [
  {
    id: 'economic-1',
    name: 'Global Economic Indicators',
    url: 'https://tradingeconomics.com/indicators',
    type: 'economic',
    active: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'geopolitical-1',
    name: 'Political Risk Index',
    url: 'https://www.prsgroup.com',
    type: 'geopolitical',
    active: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'weather-1',
    name: 'Global Weather Patterns',
    url: 'https://www.wmo.int',
    type: 'weather',
    active: true,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'supply-chain-1',
    name: 'Supply Chain Disruptions',
    url: 'https://www.freightwaves.com',
    type: 'supply-chain',
    active: true,
    lastUpdated: new Date().toISOString()
  }
];

// Cache for scraped data to avoid excessive scraping
let dataCache: {[key: string]: ScrapedData} = {};

export class DataScrapingService {
  static async getDataSources(): Promise<DataSource[]> {
    return dataSources;
  }
  
  static async scrapeData(source: DataSource): Promise<ScrapedData | null> {
    // Check cache first
    if (dataCache[source.id] && 
        new Date().getTime() - new Date(dataCache[source.id].timestamp).getTime() < 3600000) { // 1 hour cache
      return dataCache[source.id];
    }
    
    try {
      // In a real implementation, this would make actual HTTP requests
      // For now, we'll simulate data scraping with realistic mock data
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockData = this.generateMockDataForSource(source);
      
      // Update cache
      dataCache[source.id] = mockData;
      source.lastUpdated = new Date().toISOString();
      
      return mockData;
    } catch (error) {
      console.error(`Error scraping data from ${source.name}:`, error);
      toast.error(`Failed to fetch data from ${source.name}`);
      return null;
    }
  }
  
  static async scrapeAllActiveSources(): Promise<{[key: string]: ScrapedData}> {
    const activeSources = dataSources.filter(source => source.active);
    const results: {[key: string]: ScrapedData} = {};
    
    for (const source of activeSources) {
      const data = await this.scrapeData(source);
      if (data) {
        results[source.id] = data;
      }
    }
    
    return results;
  }
  
  private static generateMockDataForSource(source: DataSource): ScrapedData {
    const now = new Date();
    let indicators: ScrapedData['data']['indicators'] = [];
    
    switch (source.type) {
      case 'economic':
        indicators = [
          {
            name: 'Global GDP Growth',
            value: 2.7 + (Math.random() - 0.5),
            trend: Math.random() > 0.6 ? 'up' : 'down',
            confidence: 85
          },
          {
            name: 'Inflation Rate',
            value: 3.2 + (Math.random() - 0.5),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            confidence: 80
          },
          {
            name: 'Trade Volume Index',
            value: 65 + (Math.random() * 10 - 5),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            confidence: 75
          }
        ];
        break;
      case 'geopolitical':
        indicators = [
          {
            name: 'Political Stability Index',
            value: 55 + (Math.random() * 10 - 5),
            trend: Math.random() > 0.7 ? 'down' : 'stable',
            confidence: 70
          },
          {
            name: 'Regional Conflict Metric',
            value: 42 + (Math.random() * 15 - 7.5),
            trend: Math.random() > 0.6 ? 'up' : 'stable',
            confidence: 65
          }
        ];
        break;
      case 'weather':
        indicators = [
          {
            name: 'Severe Weather Events',
            value: 45 + Math.floor(Math.random() * 10 - 5),
            trend: Math.random() > 0.6 ? 'up' : 'stable',
            confidence: 90
          },
          {
            name: 'Sea Route Disruption Probability',
            value: 35 + (Math.random() * 10 - 5),
            trend: Math.random() > 0.5 ? 'up' : 'down',
            confidence: 75
          }
        ];
        break;
      case 'supply-chain':
        indicators = [
          {
            name: 'Port Congestion Index',
            value: 58 + (Math.random() * 14 - 7),
            trend: Math.random() > 0.6 ? 'up' : 'down',
            confidence: 85
          },
          {
            name: 'Shipping Cost Index',
            value: 67 + (Math.random() * 20 - 10),
            trend: Math.random() > 0.7 ? 'up' : 'down',
            confidence: 80
          },
          {
            name: 'Container Availability',
            value: 52 + (Math.random() * 16 - 8),
            trend: Math.random() > 0.5 ? 'down' : 'up',
            confidence: 75
          }
        ];
        break;
    }
    
    return {
      source: source.name,
      timestamp: now.toISOString(),
      data: {
        indicators
      }
    };
  }
  
  static clearCache(): void {
    dataCache = {};
  }
}
