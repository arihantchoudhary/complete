from serper import SerperAgent
from open_ai import GPT
from dotenv import load_dotenv
import os
import pandas as pd
load_dotenv()


categories = '''
Arts and Entertainment
Amusement Park
Attraction
Aquarium
Arcade
Art Gallery
Bingo Center
Bowling Alley
Carnival
Casino
Circus
Comedy Club
Country Club
Country Dance Club
Dance Hall
Disc Golf
Disc Golf Course
Escape Room
Exhibit
Fair
Gaming Cafe
General Entertainment
Go Kart Track
Internet Cafe
Karaoke Box
Laser Tag Center
Mini Golf Course
Movie Theater
Drive-in Theater
Indie Movie Theater
Multiplex
Museum
Art Museum
Erotic Museum
History Museum
Science Museum
Night Club
Pachinko Parlor
Party Center
Performing Arts Venue
Amphitheater
Concert Hall
Indie Theater
Music Venue
Jazz and Blues Venue
Rock Club
Opera House
Theater
Planetarium
Pool Hall
Psychic and Astrologer
Public Art
Outdoor Sculpture
Street Art
Roller Rink
Salsa Club
Samba School
Stadium
Baseball Stadium
Basketball Stadium
Football Stadium
Hockey Stadium
Rugby Stadium
Soccer Stadium
Tennis Stadium
Track Stadium
Strip Club
Ticket Seller
VR Cafe
Water Park
Zoo
Zoo Exhibit
Business and Professional Services
Advertising Agency
Agriculture and Forestry Service
Appraiser
Architecture Firm
Art Restoration Service
Art Studio
Audiovisual Service
Auditorium
Automation and Control System
Automotive Service
Automotive Repair Shop
Car Wash and Detail
Motorcycle Repair Shop
Oil Change Service
Smog Check Shop
Tire Repair Shop
Towing Service
Transmissions Shop
Vehicle Inspection Station
Ballroom
Business Center
Business Service
Career Counselor
Chemicals and Gasses Manufacturer
Child Care Service
Daycare
Computer Repair Service
Construction
Convention Center
Conference Room
Creative Service
Design Studio
Direct Mail and Email Marketing Service
Distribution Center
Electrical Equipment Supplier
Employment Agency
Engineer
Entertainment Agency
Entertainment Service
Equipment Rental Service
Event Service
Event Space
Factory
Film Studio
Financial Service
Accounting and Bookkeeping Service
Banking and Finance
ATM
Bank
Credit Union
Business Broker
Check Cashing Service
Collections Service
Credit Counseling and Bankruptcy Service
Currency Exchange
Financial Planner
Loans Agency
Stock Broker
Food and Beverage Service
Caterer
Food Distribution Center
Funeral Home
Geological Service
Health and Beauty Service
Barbershop
Bath House
Body Piercing Shop
Dry Cleaner
Hair Removal Service
Hair Salon
Massage Clinic
Nail Salon
Skin Care Clinic
Spa
Tanning Salon
Tattoo Parlor
Home Improvement Service
Bathroom Contractor
Carpenter
Carpet and Flooring Contractor
Chimney Sweep
Deck and Patio Contractor
Doors and Windows Contractor
Electrician
Fence Contractor
Garage Door Supplier
General Contractor
Heating, Ventilating and Air Conditioning Contractor
Home Inspection
Home Service
Interior Designer
Kitchen Remodeler
Landscaper and Gardener
Mover
Painter
Pest Control Service
Plumber
Professional Cleaning Service
Roofer
Sewer Contractor
Swimming Pool Maintenance and Service
Tree Service
Upholstery Service
Human Resources Agency
Import and Export Service
Industrial Equipment Supplier
Industrial Estate
Insurance Agency
Laboratory
Laundromat
Laundry Service
Leather Supplier
Legal Service
Immigration Attorney
Law Office
Notary
Locksmith
Logging Service
Lottery Retailer
Machine Shop
Management Consultant
Manufacturer
Market Research and Consulting Service
Media Agency
Metals Supplier
Mobile Company
Office
Business and Strategy Consulting Office
Campaign Office
Corporate Amenity
Corporate Cafeteria
Corporate Coffee Shop
Corporate Housing Agency
Coworking Space
Meeting Room
Office Building
Tech Startup
Online Advertising Service
Outdoor Event Space
Paper Supplier
Pet Service
Pet Grooming Service
Pet Sitting and Boarding Service
Petroleum Supplier
Photography Service
Photographer
Photography Lab
Photography Studio
Plastics Supplier
Power Plant
Print, TV, Radio and Outdoor Advertising Service
Promotional Item Service
Public Relations Firm
Publisher
Radio Station
Real Estate Service
Building and Land Surveyor
Commercial Real Estate Developer
Property Management Office
Real Estate Agency
Real Estate Appraiser
Real Estate Development and Title Company
Recording Studio
Recycling Facility
Refrigeration and Ice Supplier
Renewable Energy Service
Rental Service
Repair Service
Research Laboratory
Research Station
Rubber Supplier
Salvage Yard
Scientific Equipment Supplier
Search Engine Marketing and Optimization Service
Security and Safety
Shipping, Freight, and Material Transportation Service
Shoe Repair Service
Storage Facility
TV Station
Tailor
Technology Business
IT Service
Software Company
Website Designer
Telecommunication Service
Translation Service
Tutoring Service
Warehouse
Waste Management Service
Water Treatment Service
Wedding Hall
Welding Service
Wholesaler
Writing, Copywriting and Technical Writing Service
Community and Government
Addiction Treatment Center
Animal Shelter
Assisted Living
Cemetery
Community Center
Cultural Center
Disabled Persons Service
Domestic Abuse Treatment Center
Dump
Education
Adult Education
Art School
Circus School
College and University
College Academic Building
College Administrative Building
College Arts Building
College Auditorium
College Baseball Diamond
College Basketball Court
College Bookstore
College Cafeteria
College Classroom
College Communications Building
College Cricket Pitch
College Engineering Building
College Football Field
College Gym
College History Building
College Hockey Rink
College Lab
College Library
College Math Building
College Quad
College Rec Center
College Residence Hall
College Science Building
College Soccer Field
College Stadium
College Technology Building
College Tennis Court
College Theater
College Track
Community College
Fraternity House
General College & University
Law School
Medical School
Sorority House
Student Center
University
Computer Training School
Culinary School
Driving School
Flight School
Language School
Music School
Nursery School
Preschool
Primary and Secondary School
Elementary School
High School
Middle School
Private School
Religious School
Trade School
Government Building
Capitol Building
City Hall
Courthouse
Embassy or Consulate
Government Department
Law Enforcement and Public Safety
Fire Station
Police Station
Probation Office
Rescue Service
Military
Military Base
Post Office
Government Lobbyist
Homeless Shelter
Housing Authority
Housing Development
Library
Observatory
Organization
Charity
Club House
Environmental Organization
LGBTQ Organization
Labor Union
Non-Profit Organization
Social Services Organization
Veterans' Organization
Youth Organization
Polling Place
Prison
Public Bathroom
Public and Social Service
Rehabilitation Center
Residential Building
Apartment or Condo
Home (private)
Retirement Home
Senior Citizen Service
Social Club
Spiritual Center
Buddhist Temple
Cemevi
Church
Confucian Temple
Hindu Temple
Kingdom Hall
Monastery
Mosque
Prayer Room
Shrine
Sikh Temple
Synagogue
Temple
Terreiro
Summer Camp
Town Hall
Trailer Park
Utility Company
Dining and Drinking
Bagel Shop
Bakery
Bar
Apres Ski Bar
Beach Bar
Beer Bar
Beer Garden
Champagne Bar
Cocktail Bar
Dive Bar
Gay Bar
Hookah Bar
Hotel Bar
Ice Bar
Irish Pub
Karaoke Bar
Lounge
Piano Bar
Pub
Rooftop Bar
Sake Bar
Speakeasy
Sports Bar
Tiki Bar
Whisky Bar
Wine Bar
Breakfast Spot
Brewery
Cafe, Coffee, and Tea House
Bubble Tea Shop
Café
Coffee Shop
Pet Café
Tea Room
Cafeteria
Cidery
Creperie
Dessert Shop
Cupcake Shop
Frozen Yogurt Shop
Gelato Shop
Ice Cream Parlor
Pastry Shop
Pie Shop
Waffle Shop
Distillery
Donut Shop
Food Court
Food Stand
Food Truck
Juice Bar
Meadery
Night Market
Restaurant
Afghan Restaurant
African Restaurant
Ethiopian Restaurant
Mauritian Restaurant
American Restaurant
New American Restaurant
Armenian Restaurant
Asian Restaurant
Burmese Restaurant
Cambodian Restaurant
Chinese Restaurant
Anhui Restaurant
Beijing Restaurant
Cantonese Restaurant
Cha Chaan Teng
Chinese Aristocrat Restaurant
Chinese Breakfast Restaurant
Dim Sum Restaurant
Dongbei Restaurant
Fujian Restaurant
Guizhou Restaurant
Hainan Restaurant
Hakka Restaurant
Henan Restaurant
Hong Kong Restaurant
Huaiyang Restaurant
Hubei Restaurant
Hunan Restaurant
Imperial Restaurant
Jiangsu Restaurant
Jiangxi Restaurant
Macanese Restaurant
Manchu Restaurant
Peking Duck Restaurant
Shaanxi Restaurant
Shandong Restaurant
Shanghai Restaurant
Shanxi Restaurant
Szechuan Restaurant
Taiwanese Restaurant
Tianjin Restaurant
Xinjiang Restaurant
Yunnan Restaurant
Zhejiang Restaurant
Filipino Restaurant
Himalayan Restaurant
Hotpot Restaurant
Indonesian Restaurant
Acehnese Restaurant
Balinese Restaurant
Betawinese Restaurant
Indonesian Meatball Restaurant
Javanese Restaurant
Manadonese Restaurant
Padangnese Restaurant
Sundanese Restaurant
Japanese Restaurant
Donburi Restaurant
Japanese Curry Restaurant
Japanese Family Restaurant
Kaiseki Restaurant
Kushikatsu Restaurant
Monjayaki Restaurant
Nabe Restaurant
Okonomiyaki Restaurant
Ramen Restaurant
Shabu-Shabu Restaurant
Soba Restaurant
Sukiyaki Restaurant
Sushi Restaurant
Takoyaki Place
Teishoku Restaurant
Tempura Restaurant
Tonkatsu Restaurant
Udon Restaurant
Unagi Restaurant
Wagashi Place
Yakitori Restaurant
Yoshoku Restaurant
Korean Restaurant
Bossam/Jokbal Restaurant
Bunsik Restaurant
Gukbap Restaurant
Janguh Restaurant
Korean BBQ Restaurant
Samgyetang Restaurant
Malay Restaurant
Mamak Restaurant
Mongolian Restaurant
Noodle Restaurant
Satay Restaurant
Singaporean Restaurant
Thai Restaurant
Som Tum Restaurant
Tibetan Restaurant
Vietnamese Restaurant
Australian Restaurant
Austrian Restaurant
BBQ Joint
Bangladeshi Restaurant
Belgian Restaurant
Bistro
Buffet
Burger Joint
Cajun and Creole Restaurant
Caribbean Restaurant
Cuban Restaurant
Puerto Rican Restaurant
Caucasian Restaurant
Comfort Food Restaurant
Czech Restaurant
Deli
Diner
Dumpling Restaurant
Dutch Restaurant
Eastern European Restaurant
Belarusian Restaurant
Bosnian Restaurant
Bulgarian Restaurant
Romanian Restaurant
Tatar Restaurant
English Restaurant
Falafel Restaurant
Fast Food Restaurant
Fish and Chips Shop
Fondue Restaurant
French Restaurant
Alsatian Restaurant
Auvergne Restaurant
Basque Restaurant
Brasserie
Breton Restaurant
Burgundian Restaurant
Catalan Restaurant
Ch'ti Restaurant
Corsican Restaurant
Estaminet
Labour Canteen
Lyonese Bouchon
Norman Restaurant
Provençal Restaurant
Savoyard Restaurant
Southwestern French Restaurant
Fried Chicken Joint
Friterie
Gastropub
German Restaurant
Apple Wine Pub
Bavarian Restaurant
Bratwurst Joint
Currywurst Joint
Franconian Restaurant
German Pop-Up Restaurant
Palatine Restaurant
Rhenisch Restaurant
Schnitzel Restaurant
Silesian Restaurant
Swabian Restaurant
Gluten-Free Restaurant
Greek Restaurant
Bougatsa Shop
Cretan Restaurant
Fish Taverna
Grilled Meat Restaurant
Kafenio
Magirio
Meze Restaurant
Modern Greek Restaurant
Ouzeri
Patsa Restaurant
Souvlaki Shop
Taverna
Tsipouro Restaurant
Halal Restaurant
Hawaiian Restaurant
Poke Restaurant
Hot Dog Joint
Hungarian Restaurant
Indian Chinese Restaurant
Indian Restaurant
Andhra Restaurant
Awadhi Restaurant
Bengali Restaurant
Chaat Place
Chettinad Restaurant
Dhaba
Dosa Place
Goan Restaurant
Gujarati Restaurant
Hyderabadi Restaurant
Indian Sweet Shop
Irani Cafe
Jain Restaurant
Karnataka Restaurant
Kerala Restaurant
Maharashtrian Restaurant
Mughlai Restaurant
Multicuisine Indian Restaurant
North Indian Restaurant
Northeast Indian Restaurant
Parsi Restaurant
Punjabi Restaurant
Rajasthani Restaurant
South Indian Restaurant
Udupi Restaurant
Italian Restaurant
Abruzzo Restaurant
Agriturismo
Aosta Restaurant
Basilicata Restaurant
Calabria Restaurant
Campanian Restaurant
Emilia Restaurant
Friuli Restaurant
Ligurian Restaurant
Lombard Restaurant
Malga
Marche Restaurant
Molise Restaurant
Piadineria
Piedmontese Restaurant
Puglia Restaurant
Romagna Restaurant
Roman Restaurant
Sardinian Restaurant
Sicilian Restaurant
South Tyrolean Restaurant
Trattoria
Trentino Restaurant
Tuscan Restaurant
Umbrian Restaurant
Veneto Restaurant
Jewish Restaurant
Kosher Restaurant
Kebab Restaurant
Latin American Restaurant
Arepa Restaurant
Empanada Restaurant
Honduran Restaurant
Salvadoran Restaurant
South American Restaurant
Argentinian Restaurant
Brazilian Restaurant
Acai House
Baiano Restaurant
Central Brazilian Restaurant
Churrascaria
Empada House
Goiano Restaurant
Mineiro Restaurant
Northeastern Brazilian Restaurant
Northern Brazilian Restaurant
Pastelaria
Southeastern Brazilian Restaurant
Southern Brazilian Restaurant
Tapiocaria
Colombian Restaurant
Peruvian Restaurant
Peruvian Roast Chicken Joint
Venezuelan Restaurant
Mac and Cheese Joint
Mediterranean Restaurant
Mexican Restaurant
Botanero
Burrito Restaurant
Taco Restaurant
Tex-Mex Restaurant
Yucatecan Restaurant
Middle Eastern Restaurant
Egyptian Restaurant
Iraqi Restaurant
Israeli Restaurant
Kurdish Restaurant
Lebanese Restaurant
Persian Restaurant
Ash and Haleem Place
Dizi Place
Gilaki Restaurant
Jegaraki
Kale Pache Place
Tabbakhi
Shawarma Restaurant
Syrian Restaurant
Yemeni Restaurant
Modern European Restaurant
Molecular Gastronomy Restaurant
Moroccan Restaurant
Pakistani Restaurant
Pizzeria
Polish Restaurant
Portuguese Restaurant
Poutine Restaurant
Restaurant
Russian Restaurant
Blini House
Pelmeni House
Salad Restaurant
Sandwich Spot
Scandinavian Restaurant
Scottish Restaurant
Seafood Restaurant
Slovak Restaurant
Soup Spot
Southern Food Restaurant
Spanish Restaurant
Paella Restaurant
Tapas Restaurant
Sri Lankan Restaurant
Steakhouse
Swiss Restaurant
Theme Restaurant
Turkish Restaurant
Borek Place
Cigkofte Place
Doner Restaurant
Gozleme Place
Kofte Place
Kokoreç Restaurant
Kumpir Restaurant
Kumru Restaurant
Manti Place
Meyhane
Pide Place
Pilavcı
Söğüş Place
Tantuni Restaurant
Turkish Coffeehouse
Turkish Home Cooking Restaurant
Çöp Şiş Place
Ukrainian Restaurant
Varenyky Restaurant
West-Ukrainian Restaurant
Vegan and Vegetarian Restaurant
Wings Joint
Smoothie Shop
Snack Place
Vineyard
Winery
Event
Conference
Convention
Entertainment Event
Festival
Beer Festival
Music Festival
Parade
Sporting Event
Line
Marketplace
Christmas Market
Stoop Sale
Street Fair
Street Food Gathering
Trade Fair
Other Event
Health and Medicine
AIDS Resource
Acupuncture Clinic
Alternative Medicine Clinic
Assisted Living Service
Blood Bank
Chiropractor
Dentist
Emergency Service
Ambulance Service
Emergency Room
Healthcare Clinic
Home Health Care Service
Hospice
Hospital
Children's Hospital
Hospital Unit
Maternity Clinic
Medical Center
Medical Lab
Mental Health Service
Mental Health Clinic
Psychologist
Nurse
Nursing Home
Nutritionist
Optometrist
Other Healthcare Professional
Physical Therapy Clinic
Physician
Anesthesiologist
Cardiologist
Dermatologist
Doctor's Office
Ear, Nose and Throat Doctor
Family Medicine Doctor
Gastroenterologist
General Surgeon
Geriatric Doctor
Internal Medicine Doctor
Neurologist
Obstetrician Gynecologist (Ob-gyn)
Oncologist
Ophthalmologist
Oral Surgeon
Orthopedic Surgeon
Pathologist
Pediatrician
Plastic Surgeon
Psychiatrist
Radiologist
Respiratory Doctor
Urologist
Podiatrist
Sports Medicine Clinic
Urgent Care Center
Veterinarian
Weight Loss Center
Women's Health Clinic
Landmarks and Outdoors
Bathing Area
Bay
Beach
Bike Trail
Boat Launch
Botanical Garden
Bridge
Campground
Canal
Canal Lock
Castle
Cave
Dam
Dive Spot
Farm
Field
Forest
Fountain
Garden
Harbor or Marina
Hiking Trail
Hill
Historic and Protected Site
Hot Spring
Island
Lake
Lighthouse
Memorial Site
Monument
Mountain
Mountain Hut
Nature Preserve
Nudist Beach
Other Great Outdoors
Palace
Park
Dog Park
National Park
Natural Park
Picnic Area
Playground
State or Provincial Park
Urban Park
Pedestrian Plaza
Picnic Shelter
Plaza
Reservoir
River
Rock Climbing Spot
Roof Deck
Scenic Lookout
Sculpture Garden
Stable
States and Municipalities
City
Country
County
Neighborhood
State
Town
Village
Structure
Surf Spot
Tree
Tunnel
Volcano
Waterfall
Waterfront
Well
Windmill
Nightlife Spot
Other Nightlife
Retail
Adult Store
Antique Store
Arts and Crafts Store
Auction House
Auto Workshop
Automotive Retail
Car Dealership
Classic and Antique Car Dealership
New Car Dealership
RV and Motorhome Dealership
Used Car Dealership
Car Parts and Accessories
Moped Dealership
Motor Scooter Dealership
Motorcycle Dealership
Motorsports Store
Automotive Shop
Baby Store
Betting Shop
Big Box Store
Board Store
Bookstore
Used Bookstore
Boutique
Cannabis Store
Comic Book Store
Computers and Electronics Retail
Camera Store
Electronics Store
Mobile Phone Store
Video Games Store
Construction Supplies Store
Convenience Store
Cosmetics Store
Costume Store
Dance Store
Department Store
Discount Store
Drugstore
Duty-free Store
Eyecare Store
Fashion Retail
Batik Store
Bridal Store
Children's Clothing Store
Clothing Store
Fashion Accessories Store
Jewelry Store
Lingerie Store
Men's Store
Shoe Store
Sunglasses Store
Swimwear Store
Watch Store
Women's Store
Financial or Legal Service
Fireworks Store
Flea Market
Floating Market
Flower Store
Food and Beverage Retail
Beer Store
Butcher
Candy Store
Cheese Store
Chocolate Store
Coffee Roaster
Dairy Store
Farmers Market
Fish Market
Fruit and Vegetable Store
Gourmet Store
Grocery Store
Organic Grocery
Health Food Store
Herbs and Spices Store
Imported Food Store
Kosher Store
Kuruyemişçi Shop
Liquor Store
Meat and Seafood Store
Sausage Store
Supermarket
Turşucu Shop
Wine Store
Framing Store
Furniture and Home Store
Carpet Store
Home Appliance Store
Housewares Store
Kitchen Supply Store
Lighting Store
Mattress Store
Garden Center
Gift Store
Hardware Store
Hobby Store
Knitting Store
Leather Goods Store
Luggage Store
Marijuana Dispensary
Market
Medical Supply Store
Miscellaneous Store
Mobility Store
Music Store
Newsagent
Newsstand
Office Supply Store
Outdoor Supply Store
Outlet Mall
Outlet Store
Packaging Supply Store
Party Supply Store
Pawn Shop
Perfume Store
Pet Supplies Store
Pharmacy
Pop-Up Store
Print Store
Record Store
Shopping Mall
Shopping Plaza
Smoke Shop
Souvenir Store
Sporting Goods Retail
Baseball Store
Bicycle Store
Dive Store
Fishing Store
Golf Store
Gun Store
Hunting Supply Store
Running Store
Skate Store
Ski Store
Soccer Store
Surf Store
Tennis Store
Stationery Store
Supplement Store
Swimming Pool Supply Store
Textiles Store
Tobacco Store
Toy Store
Vape Store
Video Store
Vintage and Thrift Store
Warehouse or Wholesale Store
Sports and Recreation
Athletic Field
Baseball
Baseball Club
Baseball Field
Batting Cages
Basketball
Basketball Club
Basketball Court
Bowling Green
Cricket Ground
Curling Ice
Equestrian Facility
Fishing Area
Football
Football Club
Football Field
Golf
Golf Club
Golf Course
Golf Driving Range
Gun Range
Gym and Studio
Boxing Gym
Climbing Gym
Cycle Studio
Dance Studio
Gym
Gym Pool
Outdoor Gym
Pilates Studio
Yoga Studio
Gymnastics
Gymnastics Center
Hockey
Hockey Club
Hockey Field
Hockey Rink
Hunting Area
Indoor Play Area
Martial Arts Dojo
Paintball Field
Personal Trainer
Race Track
Racecourse
Racquet Sports
Badminton Court
Racquet Sport Club
Racquetball Club
Squash Court
Tennis
Tennis Club
Tennis Court
Recreation Center
Rugby
Rugby Pitch
Running and Track
Running Club
Track
Sauna
Skating
Skate Park
Skating Rink
Skydiving Center
Skydiving Drop Zone
Snow Sports
Ski Chalet
Ski Lodge
Ski Resort and Area
Ski Chairlift
Ski Trail
Soccer
Soccer Club
Soccer Field
Sports Club
Volleyball Court
Water Sports
Canoe and Kayak Rental
Rafting Outfitter
Rafting Spot
Sailing Club
Scuba Diving Instructor
Surfing
Swimming
Swim School
Swimming Club
Swimming Pool
Travel and Transportation
Baggage Locker
Bike Rental
Boat Rental
Boat or Ferry
Border Crossing
Cable Car
Cruise
Electric Vehicle Charging Station
Fuel Station
General Travel
Hot Air Balloon Tour Agency
Lodging
Bed and Breakfast
Boarding House
Cabin
Hostel
Hotel
Hotel Pool
Inn
Lodge
Motel
Resort
Vacation Rental
Moving Target
Parking
Pier
Platform
Port
RV Park
Rest Area
Road
Intersection
Street
Toll Booth
Toll Plaza
Tourist Information and Service
Tour Provider
Train
Transport Hub
Airport
Airfield
Airport Food Court
Airport Gate
Airport Lounge
Airport Service
Airport Terminal
Airport Ticket Counter
Airport Tram Station
Baggage Claim
International Airport
Plane
Private Airport
Bus Station
Bus Stop
Heliport
Light Rail Station
Marine Terminal
Metro Station
Rail Station
Rental Car Location
Taxi Stand
Tram Station
Transportation Service
Charter Bus
Limo Service
Public Transportation
Bus Line
Taxi
Travel Agency
Travel Lounge
Truck Stop
'''

def categorize(query):
    serper_api = os.getenv("SERPER_API_KEY")
    if not serper_api:
        raise ValueError("SERPER_API_KEY environment variable is not set")
        
    agent = SerperAgent(serper_api)
    results = agent.search(query)
    # print(results)
    snip = results["organic"][0]["snippet"]
    print(snip)

    gpt = GPT()
    gpt_response = gpt.call(
        system_prompt=f"%%%%CATEGORIES {categories}%%%%%, Enclosed in %%%%% and %%%%% is a list of categories. I want you to take the user input and output the best matching category from the list. For example, if the user input is 'Glendo Elementary En 3rd, 82213 Glendo', the output should be 'School'. Ensure your response is 1 word only",
        user_prompt=snip
    )
    print(gpt_response)
    return gpt_response


if __name__ == "__main__":
    categories_df = pd.read_csv("data.csv")
    # print(os.getcwd())
    print(categories_df)
    categories_list = []
    for index, row in categories_df.iterrows():
        # print(row["address"])
        categories_list.append(categorize(row["address"]))
    print(categories_list)
    categories_df["category"] = categories_list
    categories_df.to_csv("data_with_categories.csv", index=False)
    # print(len(categories_list))
    # print(len(categories_df))


    # categorize("Glendo Elementary En 3rd, 82213 Glendo")