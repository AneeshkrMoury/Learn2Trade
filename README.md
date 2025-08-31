Learn2Trade: Stock Market Education & Simulator
Learn2Trade is an interactive web application designed to educate beginners on the fundamentals of the stock market. It combines a comprehensive, bilingual learning curriculum with a realistic, risk-free virtual trading simulator tailored for the Indian market.
Table of Contents
About The Project
Key Features
Tech Stack
Application Flow
Getting Started
Project Structure
About The Project
The world of stock market investing can be intimidating for newcomers. Learn2Trade aims to bridge this knowledge gap by providing a safe and structured environment for users to learn and practice. The application breaks down complex financial topics into easy-to-understand modules and allows users to apply their knowledge in a realistic trading simulator without risking real money.
This project is specifically designed with the Indian user in mind, featuring local stock data, currency formatting, and market-specific terminology.
Key Features
Comprehensive Learning Hub:
36 Detailed Modules: A full curriculum covering everything from "What is a Stock?" to "Investor Psychology."
Rich, Visual Content: Modules include clear explanations, relatable analogies, key takeaways, and visual aids like comparison tables, bar charts, pie charts, and process diagrams.
Interactive Quizzes: Test your knowledge after learning new concepts.
Realistic Indian Trading Simulator:
Live Simulated Data: Trade real Indian stocks like RELIANCE, TCS, and HDFCBANK with dynamically updating prices.
Authentic Interface: Features a Market Depth (Order Book) panel, OHLC (Open, High, Low, Close) data, and live volume.
Indian Market Conventions: All financial values are formatted in Indian Rupees (₹) with the Indian numbering system. The trading modal uses standard terms like "Quantity," "CNC" (Delivery), and "MIS" (Intraday).
Secure User Authentication:
Full Auth Flow: Complete user registration, login, and secure password reset functionality.
OTP Verification: New accounts are verified via a simulated One-Time Password to ensure email validity.
Personalized Experience & Progress Tracking:
User Dashboard: A home screen that greets the user by name and displays their overall learning progress.
Dynamic Learning Path: The dashboard intelligently suggests the next uncompleted tutorials.
Detailed Profile: A profile screen summarizes learning achievements, quiz scores, and detailed simulator performance metrics (Portfolio Value, P/L, etc.).
Multi-language Support:
Fully Internationalized: The entire application, including all 36 learning modules, is available in both English and Hindi.
Easy Switching: Users can select their preferred language on both the login screen and their profile settings.
Tech Stack
Frontend: React, TypeScript (initially, then refactored to JavaScript)
Styling: Tailwind CSS
Charting Library: Recharts
State Management: React Hooks (useState, useEffect, useCallback)
Client-Side Storage: Browser Local Storage (via a custom useLocalStorageState hook)
Prop Validation (JS Version): prop-types
Application Flow
Entry Point (index.html): The browser loads the main HTML file, which sets up the page and uses a CDN-based import map to load React, Recharts, and other libraries.
Initialization (index.tsx): The React application is mounted to the root DOM element.
Central Controller (App.tsx): This is the core component. It manages all major application states, including the current user, portfolio data, learning progress, and selected language. It also runs the real-time stock price simulation.
Authentication (AuthScreen.tsx): If no user is logged in (checked from local storage), this component is rendered. It handles all aspects of login, registration, and password recovery.
Main Application: Once a user is logged in, App.tsx renders the main UI, which is controlled by the TabNavigator at the bottom of the screen.
Screen Rendering: Based on the active tab, the corresponding screen component (HomeScreen, LearnScreen, etc.) is displayed. All necessary data and functions are passed down from App.tsx as props.
Getting Started
This project is configured to run directly in a modern browser without a local build step, thanks to its use of a CDN import map.
Clone the repository:
code
Bash
git clone <your-repository-url>
Navigate to the project directory:
code
Bash
cd <project-directory>
Serve the files:
You can use any simple local HTTP server. One of the easiest ways is using npx:
code
Bash
npx serve
This will start a server and provide you with a local URL (e.g., http://localhost:3000).
Open in browser:
Open the provided URL in your web browser to use the application.
Project Structure
The codebase is organized into a modular and easy-to-understand structure:
code
Code
/
├── components/
│   ├── icons.tsx               # Reusable SVG icon components
│   └── screens/
│       ├── AuthScreen.tsx      # Handles user login, registration, etc.
│       ├── HomeScreen.tsx      # The main dashboard
│       ├── LearnScreen.tsx     # Displays tutorials and quizzes
│       ├── ProfileScreen.tsx   # User progress and settings
│       └── TradeScreen.tsx     # The virtual trading simulator
│
├── data/
│   └── mockData.ts             # Contains all tutorial, quiz, and stock data
│
├── hooks/
│   └── useLocalStorageState.ts # Custom hook for persisting state
│
├── App.tsx                     # Main application component (state management, routing)
├── constants.ts                # Application-wide constants
├── index.html                  # The main HTML entry point
├── index.tsx                   # Renders the React app
├── translations.ts             # Contains all English and Hindi text strings
└── types.ts                    # TypeScript type definitions for the project
