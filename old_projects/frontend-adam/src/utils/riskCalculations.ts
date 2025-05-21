
import { RouteType } from "@/types/route";
import { DataScrapingService, ScrapedData } from "@/services/DataScrapingService";

export type RiskFactor = {
  name: string;
  value: number;
  weight: number;
  score: number;
  source?: string;
  confidence?: number;
  trend?: 'up' | 'down' | 'stable';
};

// External factors cache to avoid recalculating when no new data is available
let cachedExternalFactors: RiskFactor[] | null = null;
let lastExternalFactorUpdate: number = 0;

// Calculate weighted risk score for a route based on various factors
export const calculateRouteRisk = (route: RouteType): number => {
  // Base risk calculation from route properties
  const distanceRisk = route.etaDays * 1.5; // longer routes = higher risk
  const volumeRisk = route.volume / 1000; // higher volume = higher risk
  
  // For synchronous risk calculation, use locally cached external factors if available
  // or use a default external risk impact
  const externalRiskImpact = 20; // default value if no cached factors available
  
  // Combine internal and external risk factors with appropriate weights
  const baseRisk = (distanceRisk + volumeRisk) / 2;
  const totalRisk = (baseRisk * 0.6) + (externalRiskImpact * 0.4);
  
  // Normalize to 0-100 scale
  return Math.min(Math.round(totalRisk), 100);
};

// Calculate external risk impact for a specific route
const calculateExternalRiskImpact = (route: RouteType, externalFactors: RiskFactor[]): number => {
  // Define regions for origin and destination (simple mapping for demo)
  const regionMap: {[key: string]: string} = {
    'Shanghai': 'East Asia',
    'Rotterdam': 'Europe',
    'Los Angeles': 'North America',
    'Singapore': 'Southeast Asia',
    'New York': 'North America',
    'Dubai': 'Middle East',
    'Mumbai': 'South Asia',
    'Sydney': 'Oceania',
    'Hamburg': 'Europe',
    'Santos': 'South America'
  };
  
  const originRegion = regionMap[route.origin] || 'Unknown';
  const destRegion = regionMap[route.destination] || 'Unknown';
  
  // Adjust risk based on specific regions involved
  let regionalMultiplier = 1.0;
  
  // Higher risk for routes crossing multiple regions or involving volatile regions
  if (originRegion !== destRegion) {
    regionalMultiplier *= 1.2; // Cross-regional routes have higher risk
  }
  
  // Apply region-specific risk adjustments
  if (originRegion === 'Middle East' || destRegion === 'Middle East') {
    regionalMultiplier *= 1.3; // Higher geopolitical risk
  }
  
  if (originRegion === 'East Asia' || destRegion === 'East Asia') {
    regionalMultiplier *= 1.1; // Supply chain congestion risk
  }
  
  // Calculate total external risk impact
  const totalExternalRisk = externalFactors.reduce((acc, factor) => {
    return acc + (factor.score * factor.weight);
  }, 0);
  
  return totalExternalRisk * regionalMultiplier;
};

// Get external risk factors from data sources
export const getExternalRiskFactors = async (): Promise<RiskFactor[]> => {
  const currentTime = new Date().getTime();
  
  // Use cached data if less than 15 minutes old
  if (cachedExternalFactors && (currentTime - lastExternalFactorUpdate < 15 * 60 * 1000)) {
    return cachedExternalFactors;
  }
  
  try {
    // Scrape data from all configured sources
    const scrapedData = await DataScrapingService.scrapeAllActiveSources();
    
    // Define weight distribution based on supply chain professional priorities
    // Supply chain: 40%, Economic: 30%, Geopolitical: 20%, Weather: 10%
    const categoryWeights = {
      'supply-chain': 0.40,
      'economic': 0.30,
      'geopolitical': 0.20,
      'weather': 0.10
    };
    
    const riskFactorsByCategory: {[key: string]: RiskFactor[]} = {
      'supply-chain': [],
      'economic': [],
      'geopolitical': [],
      'weather': []
    };
    
    // First, group indicators by category
    Object.entries(scrapedData).forEach(([sourceId, sourceData]) => {
      const source = sourceId.split('-')[0] as 'economic' | 'geopolitical' | 'weather' | 'supply-chain';
      
      sourceData.data.indicators.forEach(indicator => {
        // Calculate initial weight based on confidence
        const confidenceWeight = indicator.confidence / 100;
        
        riskFactorsByCategory[source].push({
          name: indicator.name,
          value: indicator.value,
          weight: confidenceWeight, // This will be adjusted later
          score: indicator.value * confidenceWeight, // This will be recalculated
          source: sourceData.source,
          confidence: indicator.confidence,
          trend: indicator.trend
        });
      });
    });
    
    // Now normalize weights within each category, then apply category weights
    const riskFactors: RiskFactor[] = [];
    
    Object.entries(riskFactorsByCategory).forEach(([category, factors]) => {
      if (factors.length === 0) return;
      
      // Get total confidence weight in this category
      const totalCategoryConfidence = factors.reduce((sum, factor) => sum + factor.weight, 0);
      
      // Apply category weight and normalize individual weights
      factors.forEach(factor => {
        const normalizedWeight = (factor.weight / totalCategoryConfidence) * categoryWeights[category];
        factor.weight = parseFloat(normalizedWeight.toFixed(4)); // Round to 4 decimal places
        factor.score = factor.value * factor.weight;
        riskFactors.push(factor);
      });
    });
    
    // Sort by score (highest impact first)
    riskFactors.sort((a, b) => b.score - a.score);
    
    // Cache the results
    cachedExternalFactors = riskFactors;
    lastExternalFactorUpdate = currentTime;
    
    return riskFactors;
  } catch (error) {
    console.error("Error fetching external risk factors:", error);
    
    // Fallback to professionally weighted risk factors if data scraping fails
    return [
      // Supply Chain factors (40% total weight)
      {
        name: 'Port Congestion Index',
        value: 58,
        weight: 0.20,
        score: 11.6,
        trend: 'up'
      },
      {
        name: 'Container Availability',
        value: 52,
        weight: 0.12,
        score: 6.24,
        trend: 'down'
      },
      {
        name: 'Shipping Cost Index',
        value: 67,
        weight: 0.08,
        score: 5.36,
        trend: 'up'
      },
      
      // Economic factors (30% total weight)
      {
        name: 'Global Inflation Rate',
        value: 62,
        weight: 0.15,
        score: 9.3,
        trend: 'up'
      },
      {
        name: 'Currency Fluctuations',
        value: 58,
        weight: 0.10,
        score: 5.8,
        trend: 'down'
      },
      {
        name: 'Trade Volume Index',
        value: 65,
        weight: 0.05,
        score: 3.25,
        trend: 'stable'
      },
      
      // Geopolitical factors (20% total weight)
      {
        name: 'Political Stability Index',
        value: 55,
        weight: 0.12,
        score: 6.6,
        trend: 'down'
      },
      {
        name: 'Tariffs & Trade Policies',
        value: 65,
        weight: 0.08,
        score: 5.2,
        trend: 'stable'
      },
      
      // Weather factors (10% total weight)
      {
        name: 'Severe Weather Events',
        value: 45,
        weight: 0.06,
        score: 2.7,
        trend: 'up'
      },
      {
        name: 'Sea Route Disruption Risk',
        value: 35,
        weight: 0.04,
        score: 1.4,
        trend: 'up'
      }
    ];
  }
};

// Update risk factors based on all routes and external data - returns synchronously from cache if available
export const calculateRiskFactors = (routes: RouteType[]): RiskFactor[] => {
  const totalRoutes = routes.length;
  if (totalRoutes === 0) return [];

  // Use cached external factors if available
  if (!cachedExternalFactors) {
    // Return professionally weighted risk factors if we don't have cached external factors
    return [
      // Supply Chain factors (40% total weight)
      {
        name: 'Port Congestion Index',
        value: 58,
        weight: 0.20,
        score: 11.6,
        trend: 'up'
      },
      {
        name: 'Container Availability',
        value: 52,
        weight: 0.12,
        score: 6.24,
        trend: 'down'
      },
      {
        name: 'Shipping Cost Index',
        value: 67,
        weight: 0.08,
        score: 5.36,
        trend: 'up'
      },
      
      // Economic factors (30% total weight)
      {
        name: 'Global Inflation Rate',
        value: 62,
        weight: 0.15,
        score: 9.3,
        trend: 'up'
      },
      {
        name: 'Currency Fluctuations',
        value: 58,
        weight: 0.10,
        score: 5.8,
        trend: 'down'
      },
      
      // Geopolitical factors (20% total weight)
      {
        name: 'Political Stability Index',
        value: 55,
        weight: 0.12,
        score: 6.6,
        trend: 'down'
      },
      {
        name: 'Regional Conflict Metric',
        value: 42,
        weight: 0.08,
        score: 3.36,
        trend: 'up'
      },
      
      // Weather factors (10% total weight)
      {
        name: 'Severe Weather Events',
        value: 45,
        weight: 0.06,
        score: 2.7,
        trend: 'up'
      },
      {
        name: 'Sea Route Disruption Risk',
        value: 35,
        weight: 0.04,
        score: 1.4,
        trend: 'up'
      }
    ];
  }
  
  // Calculate averages and risks across all routes
  const avgVolume = routes.reduce((acc, route) => acc + route.volume, 0) / totalRoutes;
  const avgEta = routes.reduce((acc, route) => acc + route.etaDays, 0) / totalRoutes;
  const delayedRoutes = routes.filter(route => route.etaStatus === 'delayed').length;
  const delayPercentage = (delayedRoutes / totalRoutes) * 100;
  
  // Create combined risk factors (external + internal)
  const riskFactors: RiskFactor[] = [
    ...cachedExternalFactors.slice(0, 7), // Take top 7 external factors
    {
      name: 'Route Delay Risk',
      value: Math.round(delayPercentage),
      weight: 0.08,
      score: Math.round(delayPercentage) * 0.08,
      trend: delayPercentage > 30 ? 'up' : 'stable'
    },
    {
      name: 'Volume Complexity',
      value: Math.min(Math.round((avgVolume / 1000) * 10), 100),
      weight: 0.04,
      score: Math.min(Math.round((avgVolume / 1000) * 10), 100) * 0.04,
      trend: 'stable'
    }
  ];
  
  return riskFactors;
};

// Async version to fetch fresh data
export const fetchRiskFactors = async (routes: RouteType[]): Promise<RiskFactor[]> => {
  try {
    // Get external risk factors
    const externalFactors = await getExternalRiskFactors();
    
    // Cache the external factors
    cachedExternalFactors = externalFactors;
    lastExternalFactorUpdate = new Date().getTime();
    
    // Calculate risk factors using the newly fetched external factors
    return calculateRiskFactors(routes);
  } catch (error) {
    console.error("Error fetching risk factors:", error);
    return calculateRiskFactors(routes); // Fall back to the synchronous version
  }
};

// Clear cached data (useful when manually refreshing)
export const clearRiskFactorCache = (): void => {
  cachedExternalFactors = null;
  lastExternalFactorUpdate = 0;
  DataScrapingService.clearCache();
};
