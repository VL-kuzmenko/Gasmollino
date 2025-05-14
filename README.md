# Gasmollino

**Gasmollino** is a sleek, glassmorphic web application designed to help users discover the most cost-effective token swap routes on the Solana blockchain. It features a custom wallet connection interface, a user-friendly swap calculator, and detailed route information to enhance the swapping experience.

---

## 🚀 Features

- **Custom Wallet Integration**: Seamlessly connect your Solana wallet with a uniquely styled interface.
- **Swap Calculator**: Input token amounts and receive real-time swap estimates.
- **Route Details**: Gain insights into the swap path, including AMMs involved and price impact.
- **Responsive Design**: Optimized for both desktop and mobile devices.

---

## 🧰 Tech Stack

- **Framework**: Next.js (App Router with Server Components)
- **Styling**: CSS Modules with a glassmorphic design approach
- **Blockchain Integration**:
  - `@solana/wallet-adapter-react`
  - `@solana/wallet-adapter-react-ui`
- **API**: [Jupiter Aggregator API](https://quote-api.jup.ag)

---

## 📦 Installation

```bash
git clone https://github.com/VL-kuzmenko/Gasmollino.git
cd gasmollino
npm install
# or
yarn install
npm run dev
```
