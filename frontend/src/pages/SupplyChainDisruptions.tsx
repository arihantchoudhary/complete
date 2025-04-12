import React, { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronUp } from "lucide-react";

// Table of contents structure
const tableOfContents = [
  { id: "intro", label: "Introduction" },
  { id: "red-sea", label: "The Red Sea Crisis" },
  { id: "port-labor", label: "Port Labor Disputes" },
  { id: "trade-war", label: "U.S.-China Trade War" },
  { id: "tariffs", label: "Tariffs and Trade Sanctions" },
  { id: "climate", label: "Climate Change" },
  { id: "covid", label: "COVID-19 Pandemic" },
  { id: "conclusion", label: "Conclusion" },
  { id: "sources", label: "Sources" }
];

const SupplyChainDisruptionsPage = () => {
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
          <div className="container max-w-4xl mx-auto px-4 py-8 pb-20">
            <h1 id="intro" className="text-4xl font-bold mb-6 scroll-m-20 animate-fade-in">Famous Instances of Supply Chain Disruptions: Why Risk Intelligence Matters</h1>
            
            <div className="prose prose-lg max-w-none dark:prose-invert mb-10 animate-fade-in">
              <p className="lead">The global supply chain faces constant threats from geopolitical tensions, climate change, labor disputes, and other disruptive forces. These events can cause significant operational, financial, and strategic impacts on businesses that lack adequate risk intelligence systems. The following comprehensive analysis highlights major supply chain disruptions that demonstrate why procurement teams need proactive risk monitoring capabilities.</p>
            </div>

            <Card id="red-sea" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">The Red Sea Crisis: A Maritime Chokepoint Under Threat</CardTitle>
          <CardDescription className="text-lg">Major shipping disruption in a critical global waterway</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The recent attacks by Yemen's Houthi group on cargo ships in the Bab al Mandeb Strait represent one of the most significant ongoing supply chain disruptions. Major global shipping and oil companies, including Maersk and British Petroleum (BP), have suspended shipments through this critical waterway, which normally accounts for approximately 12% of global shipping traffic[6]. This disruption has forced vessels to avoid Egypt's Suez Canal—the shortest maritime route between Europe and Asia.</p>

          <p className="mb-4">The consequences have been severe and wide-ranging:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Ships rerouting around the Cape of Good Hope has significantly increased transit times, causing delays throughout global supply networks[6].</li>
            <li className="mb-2">Extended journeys have led to higher shipping costs, increased oil prices, and elevated insurance premiums[6].</li>
            <li className="mb-2">The U.S. Energy Information Administration has documented how these delays have created gaps in supply chains and contributed to price inflation for consumer goods[6].</li>
          </ul>

          <p className="mb-4">This crisis exemplifies how geopolitical conflicts can suddenly compromise critical maritime chokepoints, leaving procurement teams scrambling to identify alternative routing options and adjust delivery timelines. Without proactive monitoring systems, companies often learn about such disruptions only after their shipments are already affected.</p>
        </CardContent>
      </Card>

            <Card id="port-labor" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">Port Labor Disputes: The Looming Threat on U.S. Coasts</CardTitle>
          <CardDescription className="text-lg">Labor negotiations affecting critical shipping infrastructure</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Labor negotiations between port workers and management represent another significant source of supply chain vulnerability. In late 2024, the International Longshoremen's Association (ILA), representing approximately 25,000 dockworkers, threatened a significant strike if a new agreement with the U.S. Maritime Alliance was not reached by September 30[4]. This dispute covered vital ports from Maine to Texas, including major hubs in New York, Savannah, and Houston.</p>

          <p className="mb-4">The potential economic impact was considerable:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">A port shutdown would have severely disrupted supply chains, increasing costs for importing materials and exporting products[4].</li>
            <li className="mb-2">A coalition of 177 trade groups warned that a strike could lead to dramatic price hikes for consumers[4].</li>
            <li className="mb-2">Historical precedent from a 2002 port work stoppage resulted in approximately $1 billion in losses each day due to prolonged backlogs[4].</li>
          </ul>

          <p className="mb-4">The situation was further complicated by the White House's reluctance to intervene, unlike the actions taken to avert a freight rail strike in 2022[4]. This scenario highlights how labor disputes can rapidly escalate from negotiation breakdowns to full-scale supply chain crises, particularly when political considerations constrain government intervention.</p>
        </CardContent>
      </Card>

            <Card id="trade-war" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">U.S.-China Trade War: Tariffs and Supply Chain Reconfiguration</CardTitle>
          <CardDescription className="text-lg">Geopolitical tensions reshaping global trade networks</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">The U.S.-China trade war represents one of the most consequential geopolitical disruptions to global supply chains in recent years. What began as a tariff dispute evolved into a fundamental restructuring of global trade patterns and supply networks.</p>

          <p className="mb-4">Prior to the COVID-19 pandemic, this trade conflict had already created significant supply chain turbulence:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">The trade war disturbed the Global Value Chains, generating an unexpected shift that stressed global logistics systems[3].</li>
            <li className="mb-2">Just-in-Time manufacturing, which relies on accurate demand forecasting and reliable transportation, became increasingly difficult to maintain[3].</li>
            <li className="mb-2">Companies implemented "China-Plus-One" strategies, diversifying their supply sources to include countries like Vietnam, Cambodia, India, and Mexico[8].</li>
            <li className="mb-2">Very little production returned to the U.S., contrary to what policymakers might have intended[8].</li>
          </ul>

          <p className="mb-4">The continuation of tariff policies under the recent Trump administration (with the first round of new tariffs on Mexico, Canada, and China implemented on March 4, 2025) has further complicated global supply chain planning[8]. Companies have been preloading inventory for months in anticipation of these trade barriers, creating short-term surges that could be followed by procurement droughts[8].</p>
        </CardContent>
      </Card>

            <Card id="tariffs" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">The Cascading Effects of Tariffs and Trade Sanctions</CardTitle>
          <CardDescription className="text-lg">Secondary and tertiary impacts on global commerce</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Beyond the U.S.-China relationship, tariffs and trade sanctions more broadly create complex ripple effects throughout supply chains:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Tariffs directly increase the cost of imported materials like steel and aluminum, leading to higher project costs in industries such as engineering and construction[5].</li>
            <li className="mb-2">Projects frequently face budget overruns as increased material costs are difficult to absorb once contracts are finalized[5].</li>
            <li className="mb-2">Trade sanctions can lead to shortages of critical materials, driving up costs due to scarcity and forcing companies to seek alternative sources at premium prices[5].</li>
            <li className="mb-2">Navigating the legal complexities of sanctions can be resource-intensive, creating additional compliance costs and contractual disputes[5].</li>
          </ul>

          <p className="mb-4">These impacts demonstrate why procurement teams need sophisticated risk intelligence that can anticipate trade policy shifts and model their potential effects on specific supply chains.</p>
        </CardContent>
      </Card>

            <Card id="climate" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">Climate Change: The Growing Threat to Supply Chain Stability</CardTitle>
          <CardDescription className="text-lg">Environmental factors causing unprecedented disruptions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Weather-related disruptions represent an increasingly important category of supply chain risk, with climate change amplifying their frequency and severity:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">The United States faces a bigger rise in weather-induced supply disruption over the next 15 years than any other country, according to recent modeling studies[2].</li>
            <li className="mb-2">Middle-income countries located primarily in subtropical regions are particularly vulnerable to seasonal heat and rainfall extremes[2].</li>
            <li className="mb-2">Nations that rely heavily on domestic production and have limited international trade relationships lack the flexibility to pivot when climate disruptions occur locally[2].</li>
            <li className="mb-2">Extreme weather events increase costs throughout the supply chain, including higher insurance premiums, logistics expenses, and asset repair costs[7].</li>
          </ul>

          <p className="mb-4">Climate impacts on supply chains are multifaceted:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Production disruptions occur when extreme weather events such as droughts, floods, and hurricanes damage production facilities, distribution centers, and transportation networks[7].</li>
            <li className="mb-2">Transportation systems face interruptions across land, sea, and air routes, causing delivery delays and logistical bottlenecks[7].</li>
            <li className="mb-2">Resource availability becomes less predictable as weather patterns change, threatening access to water, minerals, and agricultural raw materials essential for production[7].</li>
          </ul>

          <p className="mb-4">Companies are responding by implementing advanced technologies such as real-time monitoring systems and predictive analytics to anticipate and mitigate climate impacts[7]. However, these efforts often remain reactive rather than proactive, highlighting the need for more sophisticated risk intelligence platforms.</p>
        </CardContent>
      </Card>

            <Card id="covid" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">The COVID-19 Pandemic: Exposing Supply Chain Vulnerabilities</CardTitle>
          <CardDescription className="text-lg">Global health crisis revealing systemic weaknesses</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">While not strictly a geopolitical event, the COVID-19 pandemic exposed critical weaknesses in global supply chain resilience that remain relevant to current risk discussions:</p>

          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">The pandemic hit supply chains that were already under stress from the U.S.-China trade war, compounding existing vulnerabilities[3].</li>
            <li className="mb-2">Container logistics became severely disrupted, with containers ending up in the wrong locations despite record production of new units[3].</li>
            <li className="mb-2">Just-in-Time manufacturing assumptions about accurate demand forecasting and reliable transportation proved invalid under pandemic conditions[3].</li>
          </ul>

          <p className="mb-4">The pandemic demonstrated the catastrophic potential of "black swan" events that affect multiple geographies simultaneously and revealed how interconnected global supply networks magnify rather than mitigate certain types of risk.</p>
        </CardContent>
      </Card>

            <Card id="conclusion" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">Conclusion: The Case for Proactive Risk Intelligence</CardTitle>
          <CardDescription className="text-lg">Why predictive capabilities are essential for modern supply chains</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">These famous instances of supply chain disruption underscore why procurement and logistics teams need sophisticated risk intelligence systems. The current approach—where analysts manually track news, parse reports, and create ad-hoc dashboards—leaves companies vulnerable to late detection of emerging threats. By the time disruptions become widely reported, mitigation options are often limited and costly.</p>

          <p className="mb-4">An agentic system that monitors geopolitical developments, shipping conditions, climate events, and regulatory changes could provide the early warning capabilities that global procurement teams currently lack. Such systems would be particularly valuable given the multiple concurrent risks facing global supply chains: the ongoing Red Sea crisis, potential port strikes, evolving trade wars, and increasing climate disruptions.</p>

          <p className="mb-4">The economic stakes are significant, with disruptions potentially costing millions in delayed shipments, regulatory fines, or lost contracts. As global supply chain risk remains a top concern for businesses, the need for intelligent, proactive signal detection rather than passive data collection becomes increasingly apparent. The procurement managers of tomorrow will need the superpower of foresight to navigate this complex risk landscape successfully.</p>
        </CardContent>
      </Card>

            <Card id="sources" className="my-12 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden animate-scale-in scroll-m-20">
        <CardHeader>
          <CardTitle className="text-2xl">Sources</CardTitle>
          <CardDescription className="text-lg">References and citations</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal pl-6 mb-6">
        <li>The Impact of Geopolitical Events on Global Supply Chains - Unicargo https://www.unicargo.com/geopolitical-impact-global-supply-chains/</li>
        <li>US supply chains face biggest jump in 'weather shocks' due to ... https://www.carbonbrief.org/us-supply-chains-face-biggest-jump-in-weather-shocks-due-to-climate-change/</li>
        <li>The Supply Chain Was Messy. Then COVID Happened - OEC World https://oec.world/en/blog/covid-19-supply-chain-disruption</li>
        <li>Impending Port Strikes: A Looming Crisis for U.S. Supply Chains https://www.goebelfasteners.com/impending-port-strikes-a-looming-crisis-for-u-s-supply-chains/</li>
        <li>[PDF] Supply Chain Management and the Impacts of Tariffs and Trade ... https://www.naocon.org/wp-content/uploads/Supply-Chain-Management-and-the-Impacts-of-Tariffs-and-Trade-Sanctions.pdf</li>
        <li>https://www.resilinc.com/blog/geopolitical-supply-chain-risks-2024/</li>
        <li>How climate change affects the global supply chain - LinkedIn https://www.linkedin.com/pulse/how-climate-change-affects-global-supply-chain-inspenetnetwork-7evee</li>
        <li>UT Haslam Expert Weighs Effects of a Trade War on Supply Chains https://haslam.utk.edu/news/ut-haslam-expert-weighs-effects-of-a-trade-war-on-supply-chains/</li>
        <li>Supply Chain Crisis? Inflation? What the Dockworkers Strike Could ... https://www.bu.edu/articles/2024/what-the-dockworkers-strike-could-mean/</li>
        <li>Sanctions, Geopolitical Tensions Spark Global Supply Chain ... https://www.creditriskmonitor.com/resources/blog-posts/sanctions-geopolitical-tensions-spark-global-supply-chain-restructuring</li>
        <li>Geopolitical Crises Continue to Challenge Today's Supply Chains https://emag.directindustry.com/2024/02/21/geopolitical-crises-continue-to-challenge-todays-supply-chains/</li>
        <li>Protecting supply chain operations in the face of climate change https://www.ramboll.com/en-us/insights/resource-management-and-circular-economy/protecting-supply-chain-operations-in-the-face-of-climate-change</li>
        <li>In U.S.-China Trade War, New Supply Chains Rattle Markets https://carnegieendowment.org/posts/2020/06/in-us-china-trade-war-new-supply-chains-rattle-markets?lang=en</li>
        <li>Port strike likely to disrupt supply chain, could cause inflation https://talkbusiness.net/2024/10/port-strike-likely-to-disrupt-supply-chain-could-cause-inflation/</li>
        <li>How Russian sanctions may impact global supply chains | Red Stag https://redstagfulfillment.com/global-supply-chains-and-russian-sanctions/</li>
        <li>Top disruptions that shook supply chains in 2022 https://www.supplychaindive.com/news/top-supply-chain-disruptions-2022/639088/</li>
        <li>Weather's wrath: Supply chains reel from 2024's extreme events https://www.freightwaves.com/news/weathers-wrath-supply-chains-reel-from-2024s-extreme-events</li>
        <li>The Tariff Wars Just Upended Your Supply Chain. Here's How to ... https://hbr.org/2025/04/the-tariff-wars-just-upended-your-supply-chain-heres-how-to-adapt</li>
        <li>Political Instability and Its Impact on Global Supply Chains https://www.laceupsolutions.com/political-instability-and-its-impact-on-global-supply-chains/</li>
        <li>Navigating sanctions: Their impact on global supply chains | From A2B https://www.reedsmith.com/en/perspectives/from-a2b-decoding-the-global-supply-chain/2024/12/navigating-sanctions-their-impact-on-global-supply-chains</li>
          </ol>
        </CardContent>
      </Card>
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

export default SupplyChainDisruptionsPage;
