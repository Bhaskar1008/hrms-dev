export const CHANNEL_PARTNER_CONFIG = {
    tabs: [
      { id: 'all', label: 'All', count: 105 },
      { id: 'open', label: 'Open', count: 10 },
      { id: 'contacted', label: 'Contacted', count: 1 },
      { id: 'converted', label: 'Converted', count: 0 },
      { id: 'failed', label: 'Failed', count: 0 }
    ],
    types: [
      { id: 'self', label: 'Self' },
      { id: 'team', label: 'Team' }
    ],
    dropdownOptions: [
      { value: '', label: 'Select' },
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' }
    ],
    mockData: {
      all: [
        {
          date: '08/03/2025',
          type: 'SELF',
          user: {
            avatar: 'IM',
            name: 'Isabella Mendoza',
            company: 'ID266575420'
          },
          status: 'OPEN',
          email: 'isabellamendoza@gmail.com',
          mobile: '+63 9234567890',
          location: 'Iloilo City',
          workExperience: 'No',
          previousCompany: '-'
        },
        {
          date: '25/04/2025',
          type: 'TEAM',
          user: {
            avatar: 'VB',
            name: 'VitalShield Brokers',
            company: 'ID3789654123'
          },
          status: 'OPEN',
          email: 'anareyes@gmail.com',
          mobile: '+63 9345678901',
          location: 'Vigan City',
          representative: 'Ana Reyes',
          designation: 'Health Insurance Broker'
        }
      ],
      open: [
        {
          date: '08/03/2025',
          type: 'SELF',
          user: {
            avatar: 'MS',
            name: 'Miguel Santos',
            company: 'ID266575420'
          },
          status: 'OPEN',
          email: 'miguelsantos@gmail.com',
          mobile: '+63 9841321906',
          location: 'Davao City',
          workExperience: 'No',
          previousCompany: 'Mabuhay Health Insurance'
        }
      ],
      contacted: [
        {
          date: '08/03/2025',
          type: 'SELF',
          user: {
            avatar: 'RR',
            name: 'Rafael Reyes',
            company: 'ID266575420'
          },
          status: 'CONTACTED',
          email: 'rafaelreyes@gmail.com',
          mobile: '+63 8867134219',
          location: 'Baguio City',
          workExperience: 'No',
          previousCompany: 'Luzon Health Innovations Inc.'
        }
      ],
      converted: [],
      failed: []
    }
  };