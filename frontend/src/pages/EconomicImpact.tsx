import React, { useRef, useEffect, useState } from 'react';

const EconomicImpact = () => {
  const [activeSection, setActiveSection] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const sourceRefs = useRef<Record<string, HTMLElement | null>>({});
  
  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId];
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle smooth scrolling to sources
  const scrollToSource = (sourceId: string) => {
    const source = sourceRefs.current[sourceId];
    if (source) {
      source.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      // Find the current section
      let currentSection = '';
      Object.keys(sectionRefs.current).forEach((sectionId) => {
        const section = sectionRefs.current[sectionId];
        if (section && section.offsetTop <= scrollPosition) {
          currentSection = sectionId;
        }
      });

      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);

  // Scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScrollVisibility = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Table of Contents - Left Side */}
      <aside className="md:w-64 p-6 md:h-[calc(100vh-64px)] md:sticky md:top-0 overflow-y-auto border-r border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-bold mb-4">Economic Impact</h2>
        <nav className="space-y-1">
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'overview' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('overview')}
          >
            Overview
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'global-trends' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('global-trends')}
          >
            Global Economic Trends
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'trade-impact' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('trade-impact')}
          >
            Impact on International Trade
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'supply-chain' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('supply-chain')}
          >
            Supply Chain Economics
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'regional' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('regional')}
          >
            Regional Considerations
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'future' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('future')}
          >
            Future Outlook
          </div>
          <div 
            className={`cursor-pointer p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${activeSection === 'sources' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium' : ''}`}
            onClick={() => scrollToSection('sources')}
          >
            Sources
          </div>
        </nav>
      </aside>
      
      {/* Main Content - Right Side */}
      <main className="flex-1 p-6">
        {/* Overview Section */}
        <section ref={(el) => {sectionRefs.current['overview'] = el}} id="overview" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Overview of Economic Impact</h2>
          <p className="mb-4">
            Global trade routes are the arteries of international commerce, with approximately 80% of world trade by volume being carried by sea<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('1')}} className="text-blue-500 hover:underline">[1]</a>. Any disruption to these routes can have cascading effects on the world economy, ranging from supply shortages to price inflation.
          </p>
          <p className="mb-4">
            Recent years have seen a series of unprecedented challenges to global trade routes including the COVID-19 pandemic, geopolitical conflicts, and climate-related events. The economic consequences of these disruptions have been far-reaching, with the World Bank estimating global trade disruptions costing the world economy over $1.5 trillion annually<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('2')}} className="text-blue-500 hover:underline">[2]</a>.
          </p>
        </section>
        
        {/* Global Economic Trends Section */}
        <section ref={(el) => {sectionRefs.current['global-trends'] = el}} id="global-trends" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Global Economic Trends</h2>
          <p className="mb-4">
            The global economy continues to adjust to a post-pandemic landscape with inflation, labor market shifts, and supply chain resilience at the forefront of economic planning. The IMF projects global growth to remain at 3.1% in 2024<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('3')}} className="text-blue-500 hover:underline">[3]</a>, reflecting an economic environment still calibrating to new realities.
          </p>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Key Economic Indicators Affected by Trade Route Disruptions:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>GDP growth rates in trade-dependent economies</li>
              <li>Inflation rates, particularly for imported goods</li>
              <li>Employment in manufacturing and logistics sectors</li>
              <li>Trade balance and current account positions</li>
              <li>Exchange rate volatility</li>
            </ul>
          </div>
          <p>
            According to the World Trade Organization, trade growth has slowed to 1.7% in 2023, down from 2.7% in 2022<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('4')}} className="text-blue-500 hover:underline">[4]</a>. This slowdown underscores the persistent challenges facing global commerce in an era of increased fragmentation and uncertainty.
          </p>
        </section>
        
        {/* Impact on International Trade Section */}
        <section ref={(el) => {sectionRefs.current['trade-impact'] = el}} id="trade-impact" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Impact on International Trade</h2>
          <p className="mb-4">
            The disruption of major trade routes has led to significant shifts in global trade patterns. Rerouting vessels adds costs in terms of fuel, time, and additional fees. The European Central Bank estimates that shipping delays add 0.2 to 0.4 percentage points to core inflation in the eurozone<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('5')}} className="text-blue-500 hover:underline">[5]</a>.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Direct Costs:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Extended transit times</li>
                <li>Increased fuel consumption</li>
                <li>Higher insurance premiums</li>
                <li>Additional security measures</li>
                <li>Port congestion fees</li>
              </ul>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2">Indirect Costs:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Inventory carrying costs</li>
                <li>Production delays</li>
                <li>Market share losses</li>
                <li>Consumer price increases</li>
                <li>Supply contract penalties</li>
              </ul>
            </div>
          </div>
          <p>
            The recent disruptions in the Red Sea have forced shipping companies to reroute vessels around the Cape of Good Hope, adding 7-10 days to transit times between Asia and Europe and increasing costs by an estimated 15-20%<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('6')}} className="text-blue-500 hover:underline">[6]</a>.
          </p>
        </section>
        
        {/* Supply Chain Economics Section */}
        <section ref={(el) => {sectionRefs.current['supply-chain'] = el}} id="supply-chain" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Supply Chain Economics</h2>
          <p className="mb-4">
            The economics of supply chains have undergone fundamental reassessment since 2020. Traditional "just-in-time" inventory models have given way to more resilient "just-in-case" approaches, with companies building redundancy and flexibility into their operations at the expense of maximum efficiency.
          </p>
          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Market Response to Disruptions:</h3>
            <p>Global supply chain managers are increasingly adopting three key strategies:<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('7')}} className="text-blue-500 hover:underline">[7]</a></p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><span className="font-medium">Diversification:</span> Reducing dependency on single sources or routes</li>
              <li><span className="font-medium">Regionalization:</span> Shortening supply chains through nearshoring and friend-shoring</li>
              <li><span className="font-medium">Digitalization:</span> Leveraging technology for better visibility and faster response times</li>
            </ol>
          </div>
          <p>
            McKinsey estimates that companies could experience supply chain disruptions lasting a month or longer every 3.7 years, with the most severe disruptions potentially wiping out almost a year's worth of profits over the course of a decade<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('8')}} className="text-blue-500 hover:underline">[8]</a>.
          </p>
        </section>
        
        {/* Regional Considerations Section */}
        <section ref={(el) => {sectionRefs.current['regional'] = el}} id="regional" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Regional Considerations</h2>
          <p className="mb-4">
            The economic impact of trade route disruptions varies significantly by region, with some areas more vulnerable than others due to dependence on specific routes or types of goods.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-gray-200 dark:border-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <th className="px-4 py-2 border">Region</th>
                  <th className="px-4 py-2 border">Primary Vulnerability</th>
                  <th className="px-4 py-2 border">Economic Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">East Asia</td>
                  <td className="px-4 py-2 border">Export dependency</td>
                  <td className="px-4 py-2 border">Manufacturing slowdowns, reduced GDP growth</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-2 border">Europe</td>
                  <td className="px-4 py-2 border">Energy imports, manufacturing exports</td>
                  <td className="px-4 py-2 border">Inflation pressure, industrial production constraints</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Middle East</td>
                  <td className="px-4 py-2 border">Oil exports, food imports</td>
                  <td className="px-4 py-2 border">Fiscal pressures, food security concerns</td>
                </tr>
                <tr className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-2 border">Africa</td>
                  <td className="px-4 py-2 border">Limited route options, critical imports</td>
                  <td className="px-4 py-2 border">Severe supply shortages, price shocks</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">North America</td>
                  <td className="px-4 py-2 border">Consumer goods imports</td>
                  <td className="px-4 py-2 border">Retail inventory issues, price inflation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Small island developing states (SIDS) are particularly vulnerable to shipping disruptions, with the UN Conference on Trade and Development noting that many face a "perfect storm" of limited shipping options and complete import dependence for essential goods<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('9')}} className="text-blue-500 hover:underline">[9]</a>.
          </p>
        </section>
        
        {/* Future Outlook Section */}
        <section ref={(el) => {sectionRefs.current['future'] = el}} id="future" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Future Outlook</h2>
          <p className="mb-4">
            The future of global trade economics will likely be characterized by ongoing adaptation to a more volatile environment. The OECD predicts that economies will continue to prioritize resilience even at the cost of efficiency<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('10')}} className="text-blue-500 hover:underline">[10]</a>.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Emerging Trends:</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">▲</span>
                <span><span className="font-medium">Alternative route development:</span> Investment in Arctic shipping lanes and new rail corridors</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">▲</span>
                <span><span className="font-medium">Supply chain technology:</span> AI-powered predictive analytics and blockchain for transparency</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">▲</span>
                <span><span className="font-medium">Strategic stockpiling:</span> National reserves of critical goods and materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">▼</span>
                <span><span className="font-medium">Pure efficiency focus:</span> Prioritizing lowest cost over resilience</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">▼</span>
                <span><span className="font-medium">Globalization momentum:</span> Shift toward regionalization and self-sufficiency</span>
              </li>
            </ul>
          </div>
          <p>
            The long-term economic implications of persistent trade route disruptions could include structural shifts in global manufacturing patterns, changes in consumer behavior, and the emergence of new economic winners and losers in the international system<a href="#" onClick={(e) => {e.preventDefault(); scrollToSource('11')}} className="text-blue-500 hover:underline">[11]</a>.
          </p>
        </section>
        
        {/* Sources Section */}
        <section ref={(el) => {sectionRefs.current['sources'] = el}} id="sources" className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Sources</h2>
          <ol className="list-decimal pl-5 space-y-2">
            <li ref={(el) => {sourceRefs.current['1'] = el}} id="source-1" className="mb-1">United Nations Conference on Trade and Development (UNCTAD), Review of Maritime Transport 2023 <a href="https://unctad.org/webflyer/review-maritime-transport-2023" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://unctad.org/webflyer/review-maritime-transport-2023</a></li>
            <li ref={(el) => {sourceRefs.current['2'] = el}} id="source-2" className="mb-1">World Bank, The Impact of Trade Disruptions on Economic Activity, 2024 <a href="https://www.worldbank.org/en/publication/global-economic-prospects" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.worldbank.org/en/publication/global-economic-prospects</a></li>
            <li ref={(el) => {sourceRefs.current['3'] = el}} id="source-3" className="mb-1">International Monetary Fund, World Economic Outlook, January 2024 <a href="https://www.imf.org/en/Publications/WEO" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.imf.org/en/Publications/WEO</a></li>
            <li ref={(el) => {sourceRefs.current['4'] = el}} id="source-4" className="mb-1">World Trade Organization, Global Trade Outlook, 2023 <a href="https://www.wto.org/english/res_e/publications_e/publication_e.htm" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.wto.org/english/res_e/publications_e/publication_e.htm</a></li>
            <li ref={(el) => {sourceRefs.current['5'] = el}} id="source-5" className="mb-1">European Central Bank, Economic Bulletin Issue 3, 2024 <a href="https://www.ecb.europa.eu/pub/economic-bulletin/html/index.en.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.ecb.europa.eu/pub/economic-bulletin/html/index.en.html</a></li>
            <li ref={(el) => {sourceRefs.current['6'] = el}} id="source-6" className="mb-1">Maersk, Red Sea Situation Update, February 2024 <a href="https://www.maersk.com/news/articles/2024/02/07/red-sea-situation-update" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.maersk.com/news/articles/2024/02/07/red-sea-situation-update</a></li>
            <li ref={(el) => {sourceRefs.current['7'] = el}} id="source-7" className="mb-1">Boston Consulting Group, Supply Chain Resilience in a Volatile World, 2023 <a href="https://www.bcg.com/publications/2023/building-resilience-in-supply-chain" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.bcg.com/publications/2023/building-resilience-in-supply-chain</a></li>
            <li ref={(el) => {sourceRefs.current['8'] = el}} id="source-8" className="mb-1">McKinsey Global Institute, Risk, resilience, and rebalancing in global value chains, 2020 <a href="https://www.mckinsey.com/capabilities/operations/our-insights/risk-resilience-and-rebalancing-in-global-value-chains" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.mckinsey.com/capabilities/operations/our-insights/risk-resilience-and-rebalancing-in-global-value-chains</a></li>
            <li ref={(el) => {sourceRefs.current['9'] = el}} id="source-9" className="mb-1">UNCTAD, Small Island Developing States: Maritime Transport in the Era of a Sustainable Blue Economy, 2023 <a href="https://unctad.org/publication/small-island-developing-states-maritime-transport-era-sustainable-blue-economy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://unctad.org/publication/small-island-developing-states-maritime-transport-era-sustainable-blue-economy</a></li>
            <li ref={(el) => {sourceRefs.current['10'] = el}} id="source-10" className="mb-1">OECD, Global Supply Chain Policy Forum: Building Resilience, 2024 <a href="https://www.oecd.org/trade/topics/global-value-chains-and-trade/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.oecd.org/trade/topics/global-value-chains-and-trade/</a></li>
            <li ref={(el) => {sourceRefs.current['11'] = el}} id="source-11" className="mb-1">Brookings Institution, The Future of Global Supply Chains: Scenarios for 2030, 2023 <a href="https://www.brookings.edu/articles/the-future-of-global-supply-chains/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.brookings.edu/articles/the-future-of-global-supply-chains/</a></li>
          </ol>
        </section>
      </main>
      
      {/* Scroll to top button */}
      {showScrollTop && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-6 right-6 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default EconomicImpact;
