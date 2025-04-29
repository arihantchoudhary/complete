export interface Port {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  type?: 'origin' | 'destination' | 'port'; // Default is 'port'
}

export interface RiskFactor {
  id: string;
  name: string;
  level: 'low' | 'medium' | 'high';
  description: string;
}

export interface BillOfLading {
  id: string;
  documentNumber: string;
  issueDate: string;
  shipper: {
    name: string;
    address: string;
    contact: string;
  };
  consignee: {
    name: string;
    address: string;
    contact: string;
  };
  notifyParty: {
    name: string;
    address: string;
    contact: string;
  };
  vessel: {
    name: string;
    voyage: string;
  };
  portOfLoading: string;
  portOfDischarge: string;
  cargo: {
    description: string;
    packages: number;
    weight: string;
    measurement: string;
  };
  containers: Array<{
    number: string;
    seal: string;
    type: string;
  }>;
  termsOfShipment: string;
  freightCharges: string;
  specialRemarks: string;
}

export interface Shipment {
  id: string;
  vesselName: string;
  cargoType: string;
  originPort: Port;
  destinationPort: Port;
  departureDate: string;
  arrivalDate: string;
  distance: number; // in nautical miles
  currentPosition?: {
    coordinates: [number, number]; // [longitude, latitude]
    timestamp: string;
  };
  riskScore: number; // 0-100
  riskLevel: 'low' | 'medium' | 'high';
  riskFactors: RiskFactor[];
  billOfLading: BillOfLading;
  aiSuggestions: string[];
}

// Mock data for the application
export const ports: Port[] = [
  {
    id: 'p1',
    name: 'Singapore Port',
    country: 'Singapore',
    coordinates: [103.8198, 1.2649],
    type: 'port'
  },
  {
    id: 'p2',
    name: 'Port of Rotterdam',
    country: 'Netherlands',
    coordinates: [4.4059, 51.9244],
    type: 'port'
  },
  {
    id: 'p3',
    name: 'Port of Shanghai',
    country: 'China',
    coordinates: [121.4737, 31.2304],
    type: 'port'
  },
  {
    id: 'p4',
    name: 'Port of Los Angeles',
    country: 'USA',
    coordinates: [-118.2437, 33.7288],
    type: 'port'
  },
  {
    id: 'p5',
    name: 'Port of Dubai',
    country: 'UAE',
    coordinates: [55.2708, 25.2048],
    type: 'port'
  },
  {
    id: 'p6',
    name: 'Port of Santos',
    country: 'Brazil',
    coordinates: [-46.3047, -23.9619],
    type: 'port'
  },
  {
    id: 'p7',
    name: 'Port of Hamburg',
    country: 'Germany',
    coordinates: [9.9937, 53.5511],
    type: 'port'
  },
  {
    id: 'p8',
    name: 'Port of Sydney',
    country: 'Australia',
    coordinates: [151.2093, -33.8688],
    type: 'port'
  }
];

export const shipments: Shipment[] = [
  {
    id: 's1',
    vesselName: 'Pacific Navigator',
    cargoType: 'Electronics',
    originPort: {
      ...ports[2], // Shanghai
      type: 'origin'
    },
    destinationPort: {
      ...ports[3], // Los Angeles
      type: 'destination'
    },
    departureDate: '2025-04-15',
    arrivalDate: '2025-05-02',
    distance: 6252,
    currentPosition: {
      coordinates: [175.2093, 28.8688],
      timestamp: '2025-04-28T10:30:00Z'
    },
    riskScore: 75,
    riskLevel: 'high',
    riskFactors: [
      {
        id: 'rf1',
        name: 'Weather Conditions',
        level: 'high',
        description: 'Severe storm expected along the route'
      },
      {
        id: 'rf2',
        name: 'Piracy Risk',
        level: 'low',
        description: 'Low risk of piracy in current waters'
      },
      {
        id: 'rf3',
        name: 'Document Compliance',
        level: 'medium',
        description: 'Some documentation issues detected'
      }
    ],
    billOfLading: {
      id: 'bol1',
      documentNumber: 'BOL-PNAV-23579',
      issueDate: '2025-04-14',
      shipper: {
        name: 'TechGlobal Industries',
        address: '123 Innovation Way, Shanghai, China',
        contact: '+86 21 5555 7890'
      },
      consignee: {
        name: 'WestCoast Electronics Corp',
        address: '456 Tech Boulevard, San Jose, CA, USA',
        contact: '+1 408 555 1234'
      },
      notifyParty: {
        name: 'WestCoast Logistics Department',
        address: '456 Tech Boulevard, San Jose, CA, USA',
        contact: '+1 408 555 5678'
      },
      vessel: {
        name: 'Pacific Navigator',
        voyage: 'PN-2025-042'
      },
      portOfLoading: 'Shanghai, China',
      portOfDischarge: 'Los Angeles, USA',
      cargo: {
        description: 'Consumer Electronics - Smartphones, Tablets, Accessories',
        packages: 2500,
        weight: '45,000 kg',
        measurement: '120 CBM'
      },
      containers: [
        {
          number: 'ABCD1234567',
          seal: 'SL98765432',
          type: '40ft High Cube'
        },
        {
          number: 'EFGH7654321',
          seal: 'SL12345678',
          type: '40ft Standard'
        }
      ],
      termsOfShipment: 'CIF Los Angeles',
      freightCharges: 'As Arranged',
      specialRemarks: 'Handle with care. Temperature-sensitive electronics.'
    },
    aiSuggestions: [
      'Consider rerouting to avoid storm front expected on April 29-30',
      'Verify customs documentation for electronics import restrictions',
      'Check container seal integrity at next port of call'
    ]
  },
  {
    id: 's2',
    vesselName: 'Atlantic Trader',
    cargoType: 'Automotive Parts',
    originPort: {
      ...ports[1], // Rotterdam
      type: 'origin'
    },
    destinationPort: {
      ...ports[3], // Los Angeles
      type: 'destination'
    },
    departureDate: '2025-04-10',
    arrivalDate: '2025-05-05',
    distance: 7890,
    currentPosition: {
      coordinates: [-40.5511, 28.2048],
      timestamp: '2025-04-28T09:45:00Z'
    },
    riskScore: 35,
    riskLevel: 'medium',
    riskFactors: [
      {
        id: 'rf4',
        name: 'Weather Conditions',
        level: 'medium',
        description: 'Moderate waves expected in Atlantic crossing'
      },
      {
        id: 'rf5',
        name: 'Port Congestion',
        level: 'medium',
        description: 'Destination port reporting moderate congestion'
      },
      {
        id: 'rf6',
        name: 'Document Compliance',
        level: 'low',
        description: 'All documentation appears to be in order'
      }
    ],
    billOfLading: {
      id: 'bol2',
      documentNumber: 'BOL-ATLTR-45821',
      issueDate: '2025-04-09',
      shipper: {
        name: 'EuroParts Manufacturing GmbH',
        address: '789 Industrial Strasse, Hamburg, Germany',
        contact: '+49 40 1234 5678'
      },
      consignee: {
        name: 'American Auto Assembly Inc',
        address: '321 Factory Road, Detroit, MI, USA',
        contact: '+1 313 555 9876'
      },
      notifyParty: {
        name: 'American Auto Assembly Shipping Dept',
        address: '321 Factory Road, Detroit, MI, USA',
        contact: '+1 313 555 8765'
      },
      vessel: {
        name: 'Atlantic Trader',
        voyage: 'AT-2025-018'
      },
      portOfLoading: 'Rotterdam, Netherlands',
      portOfDischarge: 'Los Angeles, USA',
      cargo: {
        description: 'Automotive Parts - Engines, Transmissions, Electronics',
        packages: 1800,
        weight: '86,000 kg',
        measurement: '210 CBM'
      },
      containers: [
        {
          number: 'JKLM9876543',
          seal: 'SL45678901',
          type: '45ft High Cube'
        },
        {
          number: 'NPQR6543219',
          seal: 'SL56789012',
          type: '45ft High Cube'
        },
        {
          number: 'STUV5432198',
          seal: 'SL67890123',
          type: '40ft Standard'
        }
      ],
      termsOfShipment: 'FOB Los Angeles',
      freightCharges: 'Prepaid',
      specialRemarks: 'Contains hazardous materials (batteries). UN3480.'
    },
    aiSuggestions: [
      'Monitor port congestion situation for potential delays',
      'Prepare for US Customs inspection of hazardous materials',
      'Confirm battery compliance documentation with shipper'
    ]
  },
  {
    id: 's3',
    vesselName: 'Singapore Star',
    cargoType: 'Textiles',
    originPort: {
      ...ports[0], // Singapore
      type: 'origin'
    },
    destinationPort: {
      ...ports[6], // Hamburg
      type: 'destination'
    },
    departureDate: '2025-04-18',
    arrivalDate: '2025-05-12',
    distance: 8650,
    currentPosition: {
      coordinates: [55.2708, 15.2048],
      timestamp: '2025-04-28T11:15:00Z'
    },
    riskScore: 15,
    riskLevel: 'low',
    riskFactors: [
      {
        id: 'rf7',
        name: 'Weather Conditions',
        level: 'low',
        description: 'Clear weather expected throughout voyage'
      },
      {
        id: 'rf8',
        name: 'Piracy Risk',
        level: 'low',
        description: 'Current route avoids high-risk piracy areas'
      },
      {
        id: 'rf9',
        name: 'Document Compliance',
        level: 'low',
        description: 'All documentation verified and compliant'
      }
    ],
    billOfLading: {
      id: 'bol3',
      documentNumber: 'BOL-SGSTR-78542',
      issueDate: '2025-04-17',
      shipper: {
        name: 'Asian Textile Exports Pte Ltd',
        address: '567 Manufacturing Drive, Singapore',
        contact: '+65 6789 1234'
      },
      consignee: {
        name: 'European Fashion Group',
        address: '890 Clothing Avenue, Berlin, Germany',
        contact: '+49 30 9876 5432'
      },
      notifyParty: {
        name: 'EFG Import Division',
        address: '890 Clothing Avenue, Berlin, Germany',
        contact: '+49 30 9876 1234'
      },
      vessel: {
        name: 'Singapore Star',
        voyage: 'SS-2025-029'
      },
      portOfLoading: 'Singapore',
      portOfDischarge: 'Hamburg, Germany',
      cargo: {
        description: 'Finished Garments - Assorted Clothing Items',
        packages: 3200,
        weight: '28,000 kg',
        measurement: '175 CBM'
      },
      containers: [
        {
          number: 'WXYZ1237894',
          seal: 'SL78901234',
          type: '40ft Standard'
        },
        {
          number: 'ABCD9874563',
          seal: 'SL89012345',
          type: '40ft Standard'
        }
      ],
      termsOfShipment: 'CIF Hamburg',
      freightCharges: 'As Arranged',
      specialRemarks: 'Keep dry. Contains seasonal merchandise.'
    },
    aiSuggestions: [
      'Route appears optimal with no significant concerns',
      'Verify import documentation for EU textile regulations',
      'Check seasonal forecast for arrival time in Hamburg'
    ]
  },
  {
    id: 's4',
    vesselName: 'Dubai Express',
    cargoType: 'Machinery',
    originPort: {
      ...ports[4], // Dubai
      type: 'origin'
    },
    destinationPort: {
      ...ports[5], // Santos
      type: 'destination'
    },
    departureDate: '2025-04-20',
    arrivalDate: '2025-05-18',
    distance: 7850,
    currentPosition: {
      coordinates: [25.2708, 0.0],
      timestamp: '2025-04-28T08:30:00Z'
    },
    riskScore: 65,
    riskLevel: 'medium',
    riskFactors: [
      {
        id: 'rf10',
        name: 'Weather Conditions',
        level: 'medium',
        description: 'Rough seas expected near West African coast'
      },
      {
        id: 'rf11',
        name: 'Piracy Risk',
        level: 'medium',
        description: 'Passing through areas with occasional piracy reports'
      },
      {
        id: 'rf12',
        name: 'Document Compliance',
        level: 'high',
        description: 'Missing certification for some machinery items'
      }
    ],
    billOfLading: {
      id: 'bol4',
      documentNumber: 'BOL-DBEXP-36915',
      issueDate: '2025-04-19',
      shipper: {
        name: 'Middle East Heavy Equipment LLC',
        address: '123 Industrial Zone, Dubai, UAE',
        contact: '+971 4 123 4567'
      },
      consignee: {
        name: 'Brazilian Construction Corp',
        address: '456 Development Street, Sao Paulo, Brazil',
        contact: '+55 11 9876 5432'
      },
      notifyParty: {
        name: 'Brazilian Construction Import Team',
        address: '456 Development Street, Sao Paulo, Brazil',
        contact: '+55 11 9876 1098'
      },
      vessel: {
        name: 'Dubai Express',
        voyage: 'DE-2025-035'
      },
      portOfLoading: 'Dubai, UAE',
      portOfDischarge: 'Santos, Brazil',
      cargo: {
        description: 'Construction Machinery - Excavators, Bulldozers, Parts',
        packages: 45,
        weight: '320,000 kg',
        measurement: '580 CBM'
      },
      containers: [
        {
          number: 'EFGH2345678',
          seal: 'SL90123456',
          type: 'Flat Rack'
        },
        {
          number: 'IJKL3456789',
          seal: 'SL01234567',
          type: 'Open Top'
        },
        {
          number: 'MNOP4567890',
          seal: 'SL12345678',
          type: 'Flat Rack'
        },
        {
          number: 'QRST5678901',
          seal: 'SL23456789',
          type: '40ft High Cube'
        }
      ],
      termsOfShipment: 'FOB Santos',
      freightCharges: 'Collect',
      specialRemarks: 'Heavy lift cargo. Special handling required. Several items require assembly documentation.'
    },
    aiSuggestions: [
      'Urgently obtain missing certifications for machinery items',
      'Consider security measures for piracy risk areas',
      'Prepare for potential custom delays due to documentation issues'
    ]
  },
  {
    id: 's5',
    vesselName: 'Sydney Voyager',
    cargoType: 'Agricultural Products',
    originPort: {
      ...ports[7], // Sydney
      type: 'origin'
    },
    destinationPort: {
      ...ports[0], // Singapore
      type: 'destination'
    },
    departureDate: '2025-04-22',
    arrivalDate: '2025-05-08',
    distance: 3850,
    currentPosition: {
      coordinates: [135.2093, -20.8688],
      timestamp: '2025-04-28T12:45:00Z'
    },
    riskScore: 25,
    riskLevel: 'low',
    riskFactors: [
      {
        id: 'rf13',
        name: 'Weather Conditions',
        level: 'low',
        description: 'Favorable weather throughout the route'
      },
      {
        id: 'rf14',
        name: 'Cargo Spoilage Risk',
        level: 'medium',
        description: 'Temperature-sensitive agricultural products'
      },
      {
        id: 'rf15',
        name: 'Document Compliance',
        level: 'low',
        description: 'All phytosanitary certificates in order'
      }
    ],
    billOfLading: {
      id: 'bol5',
      documentNumber: 'BOL-SYDVY-12458',
      issueDate: '2025-04-21',
      shipper: {
        name: 'Australian Farmers Cooperative',
        address: '789 Harvest Road, Sydney, Australia',
        contact: '+61 2 9876 5432'
      },
      consignee: {
        name: 'Asian Food Distributors Pte Ltd',
        address: '321 Food Street, Singapore',
        contact: '+65 6543 2109'
      },
      notifyParty: {
        name: 'Asian Food Import Division',
        address: '321 Food Street, Singapore',
        contact: '+65 6543 8765'
      },
      vessel: {
        name: 'Sydney Voyager',
        voyage: 'SV-2025-019'
      },
      portOfLoading: 'Sydney, Australia',
      portOfDischarge: 'Singapore',
      cargo: {
        description: 'Fresh Produce - Fruits, Vegetables, Dairy Products',
        packages: 1200,
        weight: '32,000 kg',
        measurement: '85 CBM'
      },
      containers: [
        {
          number: 'UVWX6789012',
          seal: 'SL34567890',
          type: 'Reefer 40ft'
        },
        {
          number: 'YZAB7890123',
          seal: 'SL45678901',
          type: 'Reefer 40ft'
        }
      ],
      termsOfShipment: 'CIF Singapore',
      freightCharges: 'Prepaid',
      specialRemarks: 'Temperature-controlled cargo. Maintain at 2-4°C. Perishable items.'
    },
    aiSuggestions: [
      'Monitor refrigeration systems continuously',
      'Check temperature logs every 4 hours',
      'Prioritize offloading at destination to minimize spoilage'
    ]
  }
];

export const getTotalActiveShipments = (): number => shipments.length;

export const getHighRiskShipments = (): number => 
  shipments.filter(shipment => shipment.riskLevel === 'high').length;

export const getTotalBillsOfLading = (): number => 
  shipments.filter(shipment => shipment.billOfLading).length;
