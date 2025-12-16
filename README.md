# BuoySense - Flood Monitoring Dashboard

<img width="2495" height="1299" alt="image" src="https://github.com/user-attachments/assets/033d04e6-19b5-4a32-be69-ef9e7eeeca58" />
<img width="2506" height="1301" alt="image" src="https://github.com/user-attachments/assets/7958587d-d77e-4571-8957-3e8a7cdb2cb3" />

A real-time IoT flood monitoring system dashboard built with Next.js 16, featuring interactive 3D buoy visualization, live sensor data tracking, and comprehensive analytics.

## 🌊 Overview

BuoySense is a comprehensive flood monitoring platform that provides real-time water level tracking, environmental sensor data, and predictive analytics through an intuitive web interface. The system integrates IoT buoy sensors deployed across multiple rivers and waterways to prevent flood disasters.

## ✨ Features

### 📊 Dashboard & Analytics
- **Real-time Overview Cards**: Active buoys, rivers monitored, water levels, and active alerts
- **Water Level Trends**: 24-hour monitoring data with multi-river comparison
- **Alert Distribution**: Weekly alert trends by severity (Critical, Warning, Info)
- **Interactive 3D Buoy Model**: Three.js visualization with drag-to-rotate controls
- **Buoy Status Map**: Real-time connectivity status for all deployed buoys

### 🗺️ Map View
- **Mapbox Integration**: Interactive map with dark/light mode support
- **Weather Overlay**: Real-time weather data from OpenWeather API
- **Buoy Markers**: GPS-located buoys with status indicators
- **Live Data Popups**: Temperature, humidity, and weather conditions
- **Navigation Controls**: Zoom, rotate, and navigate to buoy details

### 📈 Advanced Analytics
- **Water Level Analytics**: Comprehensive charts with historical data
- **Turbulence Heatmap**: Current flow and turbulence visualization
- **Risk Assessment Heatmap**: Flood risk analysis across monitored areas
- **Data Export**: CSV, JSON, and PDF report generation
- **Customizable Filters**: Time period and location-based filtering

### 🎯 Buoy Management
- **Buoy List**: Sortable table with real-time status updates
- **Add New Buoy**: Modal form with validation
- **Individual Buoy Profiles**: Detailed specifications and sensor data
- **3D Model Viewer**: Interactive buoy visualization on detail pages
- **Communication Logs**: Recent transmission history
- **Environmental Sensors**: Temperature, humidity, and tilt readings

### 🔔 Alerts & Notifications
- **Real-time Alerts**: Critical, warning, and info severity levels
- **Alert List**: Sortable and filterable alert table
- **Alert Charts**: Visual representation of alert trends
- **Notification Dropdown**: Quick access to recent alerts
- **Mark as Read/Delete**: Alert management features

### ⚙️ Settings & Configuration
- **User Profile Management**: Update name and account details
- **LoRa Network Config**: Frequency and baud rate settings
- **API Key Management**: IoT gateway integration
- **Alert Preferences**: Customizable notification settings
- **Password Management**: Secure password updates
- **System Information**: Version, database, and API status

### 📄 Reporting
- **PDF Report Generation**: Professional formatted reports using jsPDF
- **CSV Export**: Raw data spreadsheet export
- **JSON Export**: Structured data format
- **Individual Buoy Reports**: Detailed per-buoy analysis
- **Analytics Reports**: Comprehensive system-wide analytics

### 🎨 UI/UX Features
- **Dark/Light Mode**: System-wide theme toggle
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Smooth Animations**: Polished transitions and interactions
- **Loading States**: Skeleton loaders and spinners
- **Error Handling**: User-friendly error messages
- **Accessibility**: WCAG compliant components

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 16 with Turbopack
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks
- **Routing**: Next.js App Router

### Data Visualization
- **Charts**: Recharts
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Maps**: Mapbox GL JS 2.15.0, React Map GL 7.1.7

### APIs & Integration
- **Mapping**: Mapbox API
- **Weather**: OpenWeather API
- **IoT Communication**: LoRa 915MHz
- **Data Export**: jsPDF, jspdf-autotable

### Development Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Type Checking**: TypeScript strict mode

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Git

### Clone Repository
```bash
git clone https://github.com/hannie404/buoy-sense-app-dashboard.git
cd buoy-sense-app-dashboard
```

### Install Dependencies
```bash
pnpm install --legacy-peer-deps
# or
npm install --legacy-peer-deps
```

### Environment Variables
Create a `.env.local` file in the root directory:

```env
# Mapbox API Key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_access_token_here

# OpenWeather API Key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

**Get API Keys:**
- Mapbox: https://account.mapbox.com/access-tokens/
- OpenWeather: https://openweathermap.org/api

### Run Development Server
```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Build & Deploy

### Production Build
```bash
pnpm build
pnpm start
```

### Deploy to Vercel
```bash
vercel deploy
```

Make sure to add environment variables in your Vercel project settings.

## 📂 Project Structure

```
buoy-sense-app-dashboard/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Dashboard home page
│   ├── analytics/               # Analytics page
│   ├── alerts/                  # Alerts page
│   ├── buoys/                   # Buoy list and detail pages
│   ├── login/                   # Authentication page
│   ├── map/                     # Map view page
│   ├── notifications/           # Notifications page
│   └── settings/                # Settings page
├── components/                   # React components
│   ├── ui/                      # Radix UI components
│   ├── buoy-3d-viewer.tsx       # Three.js 3D model viewer
│   ├── map-view-enhanced.tsx    # Mapbox integration
│   ├── export-data.tsx          # PDF/CSV/JSON export
│   └── ...                      # Other components
├── lib/                         # Utility functions
│   ├── auth.ts                  # Authentication logic
│   ├── mock-data.ts             # Sample data
│   └── utils.ts                 # Helper functions
├── public/                      # Static assets
│   ├── buoy.glb                 # 3D buoy model
│   └── ...                      # Icons and images
├── styles/                      # Global styles
├── .env.local                   # Environment variables
├── next.config.mjs              # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS config
└── tsconfig.json                # TypeScript config
```

## 🔐 Authentication

Default login credentials:
- **Email**: admin@buoysense.com
- **Password**: admin123

For production, replace with proper authentication (NextAuth, Clerk, etc.).

## 🎯 Usage Guide

### Adding a New Buoy
1. Navigate to **Buoys** page
2. Click **Add New Buoy** button
3. Fill in buoy details (ID, name, location, river, coordinates)
4. Click **Add Buoy** to save

### Viewing Analytics
1. Go to **Analytics** page
2. Use filters to select time period and specific buoys
3. Click **Apply Filters** to update charts
4. Export data using **CSV**, **JSON**, or **PDF** buttons

### Map Navigation
1. Visit **Map View** page
2. Click on buoy markers to see weather and status
3. Use **View Full Details** to navigate to buoy profile
4. Toggle dark/light mode for different map styles

### Generating Reports
1. Go to individual buoy page (`/buoys/B001`)
2. Scroll to bottom and click **Download Report**
3. PDF will be generated with all buoy data and charts

## 🔧 Configuration

### LoRa Network Settings
- Frequency: 868 MHz (EU) / 915 MHz (US)
- Baud Rate: 115200
- Communication Protocol: LoRaWAN

### Sensor Specifications
- **Water Level**: Ultrasonic sensor (HC-SR04)
- **Tilt Detection**: MPU-6050 gyroscope
- **Temperature/Humidity**: DHT22
- **Power**: 5W solar panel + 3.7V LiPo battery
- **Transmission**: LoRa 915MHz

## 📊 Data Flow

```
IoT Buoy Sensors → LoRa Gateway → API Server → Dashboard
                                      ↓
                               Database Storage
```

## 🐛 Known Issues

- React Map GL 8.x incompatible with Next.js 16 Turbopack (using v7.1.7)
- Middleware warning in Next.js 16 (use proxy instead)

## 🔮 Future Enhancements

- [ ] Real-time WebSocket integration for live updates
- [ ] Machine learning flood prediction models
- [ ] Mobile app (React Native)
- [ ] Multi-language support
- [ ] Historical data comparison
- [ ] Advanced user roles and permissions
- [ ] SMS/Email alert notifications
- [ ] Integration with government flood warning systems
