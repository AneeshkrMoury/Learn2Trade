# 📈 Learn2Trade: Stock Market Education & Simulator  

**Learn2Trade** is an interactive web application designed to educate beginners on the fundamentals of the stock market.  
It combines a comprehensive, bilingual learning curriculum with a realistic, risk-free **virtual trading simulator** tailored for the **Indian market**.

---

## 📑 Table of Contents
- [About The Project](#-about-the-project)  
- [Key Features](#-key-features)  
- [Tech Stack](#-tech-stack)  
- [Application Flow](#-application-flow)  
- [Project Structure](#-project-structure)  

---

## 📝 About The Project  
The world of stock market investing can be intimidating for newcomers.  
**Learn2Trade** bridges this knowledge gap by providing a **safe and structured environment** for users to learn and practice.  

- Breaks down complex financial topics into easy-to-understand modules.  
- Allows users to apply their knowledge in a **realistic trading simulator** without risking real money.  
- Designed specifically for **Indian users**, featuring local stock data, currency formatting, and market-specific terminology.  

---

## 🚀 Key Features  

### 📘 Comprehensive Learning Hub  
- **36 Detailed Modules**: From *"What is a Stock?"* to *"Investor Psychology."*  
- **Rich, Visual Content**: Explanations, analogies, key takeaways, and charts (bar, pie, process diagrams).  
- **Interactive Quizzes**: Reinforce knowledge after each module.  

### 📊 Realistic Indian Trading Simulator  
- **Live Simulated Data**: Trade real Indian stocks like *RELIANCE, TCS, HDFCBANK*.  
- **Authentic Interface**: Market Depth (Order Book), OHLC data, live volume.  
- **Indian Market Conventions**: Values in `₹` using the Indian numbering system.  

### 🔐 Secure User Authentication  
- Full authentication flow: registration, login, password reset.  
- OTP verification for new accounts (simulated).  

### 👤 Personalized Experience & Progress Tracking  
- **User Dashboard**: Greets by name, shows learning progress.  
- **Dynamic Learning Path**: Suggests next uncompleted modules.  
- **Profile Screen**: Summarizes achievements, quiz scores, and trading performance (Portfolio Value, P/L, etc.).  

### 🌐 Multi-language Support  
- Entire app available in **English & Hindi**.  
- Easy switching on login and profile screens.  

---

## 🛠️ Tech Stack  

- **Frontend**: React, TypeScript (initially, later refactored to JavaScript)  
- **Styling**: Tailwind CSS  
- **Charting Library**: Recharts  
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`)  
- **Storage**: Browser Local Storage (`useLocalStorageState` custom hook)  
- **Prop Validation**: `prop-types` (JS version)  

---

## 🔄 Application Flow  

1. **Entry Point (`index.html`)**  
   - Loads the main HTML file and import map for React, Recharts, etc.  

2. **Initialization (`index.tsx`)**  
   - React app mounted to the root DOM element.  

3. **Central Controller (`App.tsx`)**  
   - Manages user state, portfolio data, learning progress, and language selection.  
   - Runs real-time stock price simulation.  

4. **Authentication (`AuthScreen.tsx`)**  
   - If no user is logged in → authentication screen is shown.  
   - Handles login, registration, password recovery.  

5. **Main Application**  
   - Controlled by **TabNavigator** at the bottom.  
   - Screens displayed based on the active tab: Home, Learn, Profile, Trade.  

---
