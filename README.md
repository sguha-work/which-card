# 💳 Which Card?
### *Maximize your time, optimize your money.*

Ever stood at a checkout counter and wondered, *"Which card should I swipe to procrastinate this payment for as long as humanly possible?"* 💸 

We've all been there. Banks love to hide your due dates in fine print, but **Which Card?** brings them front and center. Our mission is simple: to help you keep your money in your pocket for the longest time allowed by law (and your bank’s statement cycle). 🚀

---

## ✨ Features that Make You a Financial Ninja

*   **🎯 The "Smart Swipe" Recommendation**: At any given second, we tell you exactly which card gives you the maximum days to repay. 
*   **⏰ Proactive Bill Alerts**: Never miss a payment again. We'll wave a red flag if any bill is due within the next 7 days.
*   **🛡️ Conservative Calculations**: We use the `Generation Date + 1` logic. Why? Because banks are sneaky and sometimes process statements late at night. We’d rather you be safe than sorry.
*   **💎 Liquid Glass Interface**: A premium, macOS-inspired UI that makes managing debt feel... surprisingly elegant.
*   **🔒 Privacy First**: Your data stays where it belongs—on your device. We use Local Storage, meaning no servers, no logins, and zero tracking.

---

## 🛠️ The Tech Stack

Built with modern, high-performance tools for a silky-smooth experience:

-   **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/) (for that type-safe goodness)
-   **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/) (using the latest and greatest)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/) (for those buttery transitions)
-   **Icons**: [Lucide React](https://lucide.dev/) (clean and crisp)

---

## 🚀 How to Use

1.  **Clone & Install**:
    ```bash
    git clone https://github.com/sguha-work/which-card.git
    cd which-card
    npm install
    ```
2.  **Launch the App**:
    ```bash
    npm run dev
    ```
3.  **Add Your Arsenal**: Go to **Manage Cards** and enter your card titles along with their bill generation and payment dates (just the day of the month!).
4.  **Swipe Wisely**: Check the Home screen every time you're about to buy something. We’ll show you the "Best to Use" card and exactly how many days of interest-free freedom you have left.

---

## 📝 A Note on Logic

We calculate your statement dates using `x+1` (where `x` is your generation date). This accounts for the fact that transactions made on the generation date itself might fall into either the old or new cycle depending on the bank's cutoff time. **We play it safe so your wallet doesn't take the hit.**

---

*Built with ❤️ for people who love their rewards points but hate their interest rates.*
