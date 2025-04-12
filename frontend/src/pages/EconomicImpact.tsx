import React, { useRef, useEffect } from "react";
import * as RechartsPrimitive from "recharts";
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent, 
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp } from "lucide-react";

// Table of contents structure
const tableOfContents = [
  { id: "market-valuation", label: "Market Valuation" },
  { id: "financial-losses", label: "Financial Losses" },
  { id: "systemic-risks", label: "Systemic Risks" },
  { id: "conferences", label: "Industry Conferences" },
  { id: "path-forward", label: "Path Forward" },
  { id: "sources", label: "Sources" }
];

const EconomicImpactPage = () => {
  // References to source list items
  const sourceRefs = useRef<{[key: string]: HTMLLIElement | null}>({});
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const scrollToTopButtonRef = useRef<HTMLButtonElement>(null);
  
  // Initialize section refs array
  useEffect(() => {
    sectionRefs.current = tableOfContents.map(item => document.getElementById(item.id));
  }, []);

  // Handle scroll event for scroll-to-top button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (scrollToTopButtonRef.current) {
        if (window.scrollY > 500) {
          scrollToTopButtonRef.current.classList.remove('opacity-0', 'invisible');
          scrollToTopButtonRef.current.classList.add('opacity-100', 'visible');
        } else {
          scrollToTopButtonRef.current.classList.add('opacity-0', 'invisible');
          scrollToTopButtonRef.current.classList.remove('opacity-100', 'visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Function to scroll to a reference
  const scrollToReference = (refNumber: string) => {
    if (sourceRefs.current[refNumber]) {
      sourceRefs.current[refNumber]?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to a section when clicking on a TOC item
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Market growth data
  const marketGrowthData = [
    { year: '2024', value: 31.77, name: 'Global SCM Market ($ Billion)' },
    { year: '2034', value: 89.57, name: 'Global SCM Market ($ Billion)' }
  ];

  // Annual costs data
  const annualCostsData = [
    { name: 'Total Annual Costs', value: 184 },
    { name: 'Per Firm (2021)', value: 182 },
    { name: 'Per Firm (2022)', value: 82 }
  ];

  // Risk factor data
  const riskFactorsData = [
    { name: 'Climate Change', score: 90 },
    { name: 'Geopolitical Instability', score: 80 },
    { name: 'Cybercrime', score: 75 },
    { name: 'Rare Metals Shortages', score: 65 },
    { name: 'Forced Labor Issues', score: 60 }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen">
      {/* Table of Contents - fixed on desktop, collapsible on mobile */}
      <div className="lg:w-1/4 lg:sticky lg:top-0 lg:h-screen">
        <Card className="lg:h-[calc(100vh-40px)] lg:overflow-auto shadow-md animate-fade-in">
          <CardHeader className="sticky top-0 bg-background z-10">
            <CardTitle>Contents</CardTitle>
            <CardDescription>Navigate through sections</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <ul className="space-y-3">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <button 
                    onClick={() => scrollToSection(item.id)} 
                    className="text-left w-full py-2 px-3 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Main content area with smooth scrolling */}
      <div className="lg:w-3/4 lg:max-h-screen lg:overflow-auto">
        <ScrollArea className="h-full w-full">
          <div className="container mx-auto px-4 py-8 pb-20">
      <h1 className="text-4xl font-bold mb-6 scroll-m-20 animate-fade-in" id="intro">The Economic Impact of Supply Chain Disruptions: Industry Valuation, Financial Losses, and Strategic Responses</h1>
      
      <p className="mb-6">The global supply chain management industry has become a critical pillar of modern commerce, with its market value and associated risks growing exponentially. This report synthesizes data from leading industry studies, conferences, and financial analyses to quantify the scale of supply chain disruptions, their economic impact, and the evolving strategies to mitigate these challenges.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="market-valuation">Market Valuation of the Supply Chain Management Industry</h2>

      <p className="mb-4">The global supply chain management (SCM) market reached <strong>$31.77 billion in 2024</strong> and is projected to grow at a compound annual growth rate (CAGR) of <strong>10.92%</strong>, reaching <strong>$89.57 billion by 2034</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('6')}} className="text-blue-500 hover:underline">[6]</a>. North America dominates this market, accounting for <strong>$12.71 billion in 2024</strong>, driven by widespread adoption of SCM solutions in sectors like retail, healthcare, and manufacturing<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('6')}} className="text-blue-500 hover:underline">[6]</a>. The rapid expansion reflects increasing demand for technologies such as AI-driven predictive analytics, cloud-based logistics platforms, and real-time monitoring systems.</p>

      <p className="mb-6">Notably, the retail SCM segment alone is expected to grow from <strong>$31.11 billion in 2023 to $58.87 billion by 2030</strong>, highlighting the sector's reliance on efficient inventory management and distribution networks<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('3')}} className="text-blue-500 hover:underline">[3]</a>. Meanwhile, investments in AI for supply chain optimization are projected to create a <strong>$20 billion market by 2028</strong>, as businesses seek to reduce prediction errors by <strong>20–50%</strong> and inventory overstocking by <strong>20–50%</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('3')}} className="text-blue-500 hover:underline">[3]</a>.</p>

      <Card className="my-8">
        <CardHeader>
          <CardTitle>SCM Market Growth Projection</CardTitle>
          <CardDescription>Global supply chain management market forecast</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              scmMarket: { color: "#3b82f6" }
            }}
          >
            <RechartsPrimitive.BarChart data={marketGrowthData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="year" />
              <RechartsPrimitive.YAxis />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    formatter={(value, name) => [`$${value}B`, 'Market Size']}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <RechartsPrimitive.Bar dataKey="value" name="scmMarket" fill="var(--color-scmMarket)" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="financial-losses">Financial Losses from Supply Chain Disruptions</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">Annual Direct Costs</h3>
      <p className="mb-4">Supply chain disruptions cost organizations an estimated <strong>$184 billion annually</strong>, according to a 2025 analysis by Swiss Re<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('8')}} className="text-blue-500 hover:underline">[8]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('13')}} className="text-blue-500 hover:underline">[13]</a>. This figure encompasses delays, inventory write-offs, and contractual penalties. For individual companies, losses averaged <strong>$82 million per firm in 2022</strong>, down from <strong>$182 million in 2021</strong>, though this decline masks persistent vulnerabilities exacerbated by geopolitical tensions and climate-related events<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('4')}} className="text-blue-500 hover:underline">[4]</a>.</p>

      <Card className="my-8">
        <CardHeader>
          <CardTitle>Supply Chain Disruption Costs</CardTitle>
          <CardDescription>Annual losses in billions of dollars</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              costBar: { color: "#ef4444" }
            }}
          >
            <RechartsPrimitive.BarChart data={annualCostsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    formatter={(value) => [`$${value}B`, 'Cost']}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <RechartsPrimitive.Bar dataKey="value" name="costBar" fill="var(--color-costBar)" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mt-6 mb-3">Sector-Specific Impacts</h3>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2"><strong>Manufacturing</strong>: The Manufacturing Supplier Deliveries Index rose to <strong>48.9 in April 2024</strong> (from 47 in December 2023), signaling slower delivery times and higher operational costs<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('3')}} className="text-blue-500 hover:underline">[3]</a>.</li>
        <li className="mb-2"><strong>Retail</strong>: A Gartner survey of 258 procurement leaders found that <strong>42%</strong> ranked supply disruptions as their top concern in 2024, with <strong>46%</strong> of companies reporting profit declines due to rising material and logistics costs<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('1')}} className="text-blue-500 hover:underline">[1]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('7')}} className="text-blue-500 hover:underline">[7]</a>.</li>
        <li className="mb-2"><strong>Energy and Shipping</strong>: The Red Sea crisis, driven by Houthi attacks on cargo ships, increased oil prices by <strong>15%</strong> in early 2025 and forced reroutes adding <strong>10–14 days</strong> to Asia-Europe voyages, elevating insurance premiums by <strong>30%</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('5')}} className="text-blue-500 hover:underline">[5]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('10')}} className="text-blue-500 hover:underline">[10]</a>.</li>
      </ul>

      <h3 className="text-xl font-bold mt-6 mb-3">Hidden Costs</h3>
      <p className="mb-3">Beyond direct financial losses, disruptions erode competitive advantage:</p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2"><strong>Revenue Loss</strong>: Delayed shipments caused <strong>22%</strong> of European firms to experience over <strong>20 disruptive incidents annually</strong>, damaging customer relationships and market share<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('8')}} className="text-blue-500 hover:underline">[8]</a>.</li>
        <li className="mb-2"><strong>Compliance Penalties</strong>: Stricter EU regulations on forced labor and environmental practices have led to <strong>$2.4 billion in fines</strong> since 2023 for non-compliant suppliers<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('13')}} className="text-blue-500 hover:underline">[13]</a>.</li>
        <li className="mb-2"><strong>Strategic Paralysis</strong>: The U.S.-China trade war and 2025 tariffs forced <strong>68%</strong> of firms to preload inventory, tying up capital and reducing liquidity for innovation<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('7')}} className="text-blue-500 hover:underline">[7]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('14')}} className="text-blue-500 hover:underline">[14]</a>.</li>
      </ul>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="systemic-risks">Key Studies Highlighting Systemic Risks</h2>

      <h3 className="text-xl font-bold mt-6 mb-3">1. Everstream Analytics' 2025 Annual Risk Report</h3>
      <p className="mb-3">This landmark study identified five critical threats:</p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2"><strong>Climate Change/Extreme Weather</strong> (90% risk score): Floods caused <strong>70% of weather-related disruptions</strong> in 2024, including catastrophic events in Appalachia and Valencia<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('10')}} className="text-blue-500 hover:underline">[10]</a>.</li>
        <li className="mb-2"><strong>Geopolitical Instability</strong> (80%): Conflicts in the Red Sea and Ukraine disrupted <strong>12% of global shipping traffic</strong>, while U.S.-China trade tensions reshaped sourcing strategies<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('1')}} className="text-blue-500 hover:underline">[1]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('5')}} className="text-blue-500 hover:underline">[5]</a>.</li>
        <li className="mb-2"><strong>Cybercrime</strong> (75%): Ransomware attacks on logistics systems increased by <strong>40%</strong> year-over-year, targeting vulnerabilities in IoT-enabled supply chains<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('1')}} className="text-blue-500 hover:underline">[1]</a>.</li>
        <li className="mb-2"><strong>Rare Metals Shortages</strong> (65%): Lithium and cobalt supply gaps raised battery production costs by <strong>18%</strong>, impacting electric vehicle manufacturers<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('10')}} className="text-blue-500 hover:underline">[10]</a>.</li>
        <li className="mb-2"><strong>Forced Labor Crackdowns</strong> (60%): New due diligence laws in the EU and U.S. led to <strong>$1.2 billion in compliance costs</strong> for audits and supplier transitions<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('1')}} className="text-blue-500 hover:underline">[1]</a>.</li>
      </ol>

      <Card className="my-8">
        <CardHeader>
          <CardTitle>Supply Chain Risk Factors</CardTitle>
          <CardDescription>Key threats by risk score percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{
              riskBar: { color: "#8b5cf6" }
            }}
          >
            <RechartsPrimitive.BarChart data={riskFactorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
              <RechartsPrimitive.XAxis dataKey="name" />
              <RechartsPrimitive.YAxis />
              <ChartTooltip 
                content={
                  <ChartTooltipContent 
                    formatter={(value) => [`${value}%`, 'Risk Score']}
                  />
                }
              />
              <ChartLegend content={<ChartLegendContent />} />
              <RechartsPrimitive.Bar dataKey="score" name="riskBar" fill="var(--color-riskBar)" />
            </RechartsPrimitive.BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <h3 className="text-xl font-bold mt-6 mb-3">2. KPMG's 2025 Supply Chain Trends Report</h3>
      <p className="mb-4">KPMG emphasized <strong>cost-to-serve optimization</strong> and <strong>Scope 3 emissions tracking</strong> as priorities, noting that <strong>83% of CEOs</strong> now view supply chain risks as a top-three business threat<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('12')}} className="text-blue-500 hover:underline">[12]</a>. The report advocates for AI-powered analytics to reduce logistics costs by <strong>15–25%</strong> through route optimization and demand forecasting<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('12')}} className="text-blue-500 hover:underline">[12]</a>.</p>

      <h3 className="text-xl font-bold mt-6 mb-3">3. Moody's 2025 Risk Analysis</h3>
      <p className="mb-6">Moody's highlighted <strong>strategic sourcing realignment</strong>, with <strong>24,000 entities</strong> sanctioned globally in 2023 alone, forcing firms to nearshore <strong>28% of production</strong> to Mexico and Southeast Asia<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('14')}} className="text-blue-500 hover:underline">[14]</a>. Tariffs post-2024 U.S. elections are projected to increase import costs by <strong>$45 billion annually</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('14')}} className="text-blue-500 hover:underline">[14]</a>.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="conferences">Industry Conferences Addressing Supply Chain Challenges</h2>

      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2"><strong>ASCM Connect 2025</strong> (Ohio, U.S.): Focused on resilience and technology integration, this event featured workshops on AI-driven risk modeling and attracted <strong>4,000+</strong> executives from firms like Amazon and DHL<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('11')}} className="text-blue-500 hover:underline">[11]</a>.</li>
        <li className="mb-2"><strong>Gartner Supply Chain Symposium/Xpo</strong> (Orlando, U.S.): Keynotes addressed geopolitical risk mitigation, with case studies from Coca-Cola and Nestlé on reducing tariff impacts through supplier diversification<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('11')}} className="text-blue-500 hover:underline">[11]</a>.</li>
        <li className="mb-2"><strong>Sustainable Supply Chain Exhibition 2025</strong> (London, U.K.): Speakers emphasized circular economy strategies, revealing that <strong>35%</strong> of firms now use blockchain for ethical sourcing audits<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('2')}} className="text-blue-500 hover:underline">[2]</a>.</li>
        <li className="mb-2"><strong>J.S. Held Global Risk Summit 2025</strong> (New York, U.S.): Experts quantified the ROI of proactive risk management, showing that firms with real-time monitoring systems reduced disruption costs by <strong>37%</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('13')}} className="text-blue-500 hover:underline">[13]</a>.</li>
      </ol>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="path-forward">The Path Forward: From Reactive to Proactive Risk Management</h2>

      <p className="mb-4">The convergence of market growth and escalating disruptions underscores the need for <strong>agentic risk intelligence systems</strong>. Companies leveraging AI and live geopolitical monitoring report <strong>30% faster response times</strong> to port closures and sanctions<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('9')}} className="text-blue-500 hover:underline">[9]</a>. For example, Resilinc's platform reduced supply chain intervention costs by <strong>$12 million annually</strong> for automotive clients by predicting material shortages<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('5')}} className="text-blue-500 hover:underline">[5]</a>.</p>

      <p className="mb-6">However, adoption barriers remain: <strong>17% of organizations</strong> lack extended visibility beyond tier-one suppliers, and <strong>15%</strong> focus only on production metrics<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('3')}} className="text-blue-500 hover:underline">[3]</a>. Closing these gaps requires integrating SCM tools with existing platforms like Power BI, as <strong>76% of procurement teams</strong> prioritize low-friction tech adoption<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('1')}} className="text-blue-500 hover:underline">[1]</a><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('7')}} className="text-blue-500 hover:underline">[7]</a>.</p>

      <h3 className="text-xl font-bold mt-6 mb-3">Conclusion</h3>
      <p className="mb-6">The supply chain management industry's valuation reflects its strategic importance, yet <strong>$184 billion in annual losses</strong> reveal systemic fragility<a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('8')}} className="text-blue-500 hover:underline">[8]</a>. Leading firms are pivoting to AI-augmented platforms that contextualize risks—such as climate events and trade wars—within specific procurement workflows. As tariffs and regulations intensify, the divide between proactive and reactive organizations will determine market survival. Conferences like ASCM Connect and insights from Everstream Analytics provide blueprints for embedding resilience, but success hinges on translating data into preemptive action. The next decade will reward those who treat supply chain intelligence not as a cost center but as a <strong>$90 billion competitive imperative</strong><a href="#" onClick={(e) => {e.preventDefault(); scrollToReference('6')}} className="text-blue-500 hover:underline">[6]</a>.</p>

      <h2 className="text-2xl font-bold mt-8 mb-4 scroll-m-20" id="sources">Sources</h2>
      <ol className="list-decimal pl-6 mb-6">
        <li ref={(el) => {sourceRefs.current['1'] = el}} id="source-1" className="mb-1">Everstream Analytics names 5 supply chain risks for 2025 <a href="https://www.scmr.com/article/everstream-analytics-names-5-supply-chain-risks-for-2025" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.scmr.com/article/everstream-analytics-names-5-supply-chain-risks-for-2025</a></li>
        <li ref={(el) => {sourceRefs.current['2'] = el}} id="source-2" className="mb-1">Top 10: Supply Chain Events 2025 <a href="https://supplychaindigital.com/operations/top-10-supply-chain-events-2025" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://supplychaindigital.com/operations/top-10-supply-chain-events-2025</a></li>
        <li ref={(el) => {sourceRefs.current['3'] = el}} id="source-3" className="mb-1">35+ Supply Chain Statistics You Need to Know in 2025 <a href="https://warehousewiz.com/blogs/news/supply-chain-statistics" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://warehousewiz.com/blogs/news/supply-chain-statistics</a></li>
        <li ref={(el) => {sourceRefs.current['4'] = el}} id="source-4" className="mb-1">Losses caused by supply chain delays halved - The Drinks Business <a href="https://www.thedrinksbusiness.com/2023/08/losses-caused-by-supply-chain-delays-halved/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.thedrinksbusiness.com/2023/08/losses-caused-by-supply-chain-delays-halved/</a></li>
        <li ref={(el) => {sourceRefs.current['5'] = el}} id="source-5" className="mb-1">Keep These 6 Geopolitical Supply Chain Risks on Your Radar in 2024 <a href="https://www.resilinc.com/blog/geopolitical-supply-chain-risks-2024/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.resilinc.com/blog/geopolitical-supply-chain-risks-2024/</a></li>
        <li ref={(el) => {sourceRefs.current['6'] = el}} id="source-6" className="mb-1">Supply Chain Management Market Size and Forecast 2025 to 2034 <a href="https://www.precedenceresearch.com/supply-chain-management-market" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.precedenceresearch.com/supply-chain-management-market</a></li>
        <li ref={(el) => {sourceRefs.current['7'] = el}} id="source-7" className="mb-1">Supply Chain Disruptions and Financial Planning - Preferred CFO <a href="https://preferredcfo.com/insights/supply-chain-disruptions-and-financial-planning-what-cfos-need-to-know" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://preferredcfo.com/insights/supply-chain-disruptions-and-financial-planning-what-cfos-need-to-know</a></li>
        <li ref={(el) => {sourceRefs.current['8'] = el}} id="source-8" className="mb-1">Global Supply Chain Disruptions and Risks Intensify: 2025 J.S. Held Report <a href="https://www.prnewswire.com/news-releases/global-supply-chain-disruptions-and-risks-intensify-2025-js-held-global-risk-report-highlights-key-challenges-302367407.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.prnewswire.com/news-releases/global-supply-chain-disruptions-and-risks-intensify-2025-js-held-global-risk-report-highlights-key-challenges-302367407.html</a></li>
        <li ref={(el) => {sourceRefs.current['9'] = el}} id="source-9" className="mb-1">The Impact of Geopolitical Risks on Global Supply Chains in 2025 <a href="https://www.cin7.com/blog/geopolitical-risks-in-supply-chains/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.cin7.com/blog/geopolitical-risks-in-supply-chains/</a></li>
        <li ref={(el) => {sourceRefs.current['10'] = el}} id="source-10" className="mb-1">Top 5 supply chain risks in 2025 - Delivered - Global - DHL <a href="https://www.dhl.com/global-en/delivered/global-trade/top-5-supply-chain-risks-in-2025.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.dhl.com/global-en/delivered/global-trade/top-5-supply-chain-risks-in-2025.html</a></li>
        <li ref={(el) => {sourceRefs.current['11'] = el}} id="source-11" className="mb-1">15 Great Supply Chain and Logistics Conferences to Attend in 2025 <a href="https://www.linkedin.com/pulse/15-great-supply-chain-logistics-conferences-attend-qqmyf" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.linkedin.com/pulse/15-great-supply-chain-logistics-conferences-attend-qqmyf</a></li>
        <li ref={(el) => {sourceRefs.current['12'] = el}} id="source-12" className="mb-1">Six supply chain trends to watch in 2025 - KPMG International <a href="https://kpmg.com/xx/en/our-insights/operations/six-supply-chain-trends-to-watch-in-2025.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://kpmg.com/xx/en/our-insights/operations/six-supply-chain-trends-to-watch-in-2025.html</a></li>
        <li ref={(el) => {sourceRefs.current['13'] = el}} id="source-13" className="mb-1">Global Supply Chain Disruptions and Risks Intensify: 2025 J.S. Held Global Risk Report <a href="https://www.jsheld.com/about-us/news/global-supply-chain-disruptions-and-risks-intensify-2025-j-s-held-global-risk-report-highlights-key-challenges" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.jsheld.com/about-us/news/global-supply-chain-disruptions-and-risks-intensify-2025-j-s-held-global-risk-report-highlights-key-challenges</a></li>
        <li ref={(el) => {sourceRefs.current['14'] = el}} id="source-14" className="mb-1">Top 3 supply chain risk-related trends for 2025 - Moody's <a href="https://www.moodys.com/web/en/us/insights/compliance-tprm/top-3-supply-chain-risk-related-trends-for-2025.html" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://www.moodys.com/web/en/us/insights/compliance-tprm/top-3-supply-chain-risk-related-trends-for-2025.html</a></li>
      </ol>
          </div>
        </ScrollArea>
      </div>

      {/* Scroll to top button */}
      <button
        ref={scrollToTopButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg opacity-0 invisible transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 z-50"
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-6 w-6" />
      </button>
    </div>
  );
};

export default EconomicImpactPage;
