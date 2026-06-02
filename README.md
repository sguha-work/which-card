# 💳 Which Card?
### *Maximize your time, optimize your money.*

Ever stood at a checkout counter and wondered, *"Which card should I swipe to procrastinate this payment for as long as humanly possible?"* 💸 

We've all been there. Banks love to hide your due dates in fine print, but **Which Card?** brings them front and center. Our mission is simple: to help you keep your money in your pocket for the longest time allowed by law (and your bank's statement cycle). 🚀

---

## ✨ Features that Make You a Financial Ninja

*   **🎯 The "Smart Swipe" Recommendation**: At any given second, we tell you exactly which card gives you the maximum days to repay. 
*   **⏰ Proactive Bill Alerts**: Never miss a payment again. We'll wave a red flag if any bill is due within the next 7 days.
*   **🛡️ Conservative Calculations**: We use the `Generation Date + 1` logic. Why? Because banks are sneaky and sometimes process statements late at night. We'd rather you be safe than sorry.
*   **💎 Liquid Glass Interface**: A premium, macOS-inspired UI that makes managing debt feel... surprisingly elegant.
*   **🔒 Privacy First — Persistent Local Storage**: Your data stays where it belongs—on your device. We use **IndexedDB** (backed by `navigator.storage.persist`) so your card data survives browser clean-ups, cache clears, and storage-pressure evictions. No servers, no logins, zero tracking.
*   **💾 Import / Export**: Backup your card data as a JSON file at any time and restore it on a new device in one click.

---

## 🗄️ Storage: Why We Upgraded from `localStorage` to IndexedDB

Earlier versions of **Which Card?** stored your card data in `localStorage`. While convenient, `localStorage` has a few well-known limitations:

| Concern | `localStorage` | IndexedDB + `persist()` |
|---|---|---|
| **Eviction risk** | Browser *can* silently wipe it under storage pressure | Durable storage is explicitly requested via `navigator.storage.persist()` — the browser must ask the user before evicting |
| **Capacity** | ~5 MB hard limit per origin | Tens of MBs to GBs (quota-based) |
| **Blocking** | Synchronous — blocks the main thread | Fully async — never jank the UI |
| **Data integrity** | Plain string serialisation | Structured clone — handles complex objects natively |

### What this means for you
- Your cards are now stored in **IndexedDB**, a robust browser database designed for long-lived, offline-capable applications.
- On first launch after upgrading, **existing `localStorage` data is automatically migrated** to IndexedDB — nothing is lost.
- The app calls `navigator.storage.persist()` at startup, upgrading your origin to *persistent* storage mode. In supporting browsers, this means the data will only ever be removed if *you* explicitly clear the site data.

---

## 🛠️ The Tech Stack

Built with modern, high-performance tools for a silky-smooth experience:

-   **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (for that type-safe goodness)
-   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (using the latest and greatest)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) (for those buttery transitions)
-   **Icons**: [Lucide React](https://lucide.dev/) (clean and crisp)
-   **Storage**: [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) via a custom key-value wrapper + [`navigator.storage.persist()`](https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist)

---

## 🚀 How to Use

Getting started with **Which Card?** is easier than paying off a balance!

1.  **Visit the App**: Head over to the live version at [sguha-work.github.io/which-card/](https://sguha-work.github.io/which-card/#/).
2.  **Add Your Cards**: Navigate to the **Manage Cards** page. Enter your card titles and their billing cycle dates (Generation Date and Payment Date).
3.  **Check Before You Swipe**: Make it a habit to check the **Home** page every day before you make a purchase. The app will instantly tell you which card to use for the maximum interest-free period.
4.  **Manage Your Data**:
    *   **Export**: Want to keep a backup? Use the **Export** button on the Manage Cards page to download your card data as a JSON file.
    *   **Import**: Moving to a new browser or device? Simply use the **Import** button to upload your backup and restore your settings instantly.

---

## 💻 Local Development (For the Tech-Savvy)

If you'd like to run the app locally:

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/sguha-work/which-card.git
    cd which-card
    npm install
    ```
2.  **Launch**:
    ```bash
    npm run dev
    ```

---

## 📝 A Note on Logic

We calculate your statement dates using `x+1` (where `x` is your generation date). This accounts for the fact that transactions made on the generation date itself might fall into either the old or new cycle depending on the bank's cutoff time. **We play it safe so your wallet doesn't take the hit.**

---

## 📋 Changelog

### Storage Upgrade — IndexedDB + Persistent Storage
- Replaced `localStorage` with **IndexedDB** for all card data storage.
- Added `navigator.storage.persist()` at app startup to request durable storage from the browser.
- Implemented a one-time automatic migration: existing `localStorage` data is copied to IndexedDB and removed from `localStorage` transparently on first load.
- Import / Export functionality remains fully compatible with the new storage layer.

---

*Built with ❤️ for people who love their rewards points but hate their interest rates.*
