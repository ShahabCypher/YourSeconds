# 🕒 YourSeconds

[**YourSeconds**](https://YourSeconds.vercel.app) is a minimalist React application that confronts you with the most finite resource you have: time.

Enter your date of birth and how long you expect to live. The app calculates how many **seconds** you have left and starts a real-time countdown ticking away in red, like a digital alarm clock that never stops.

Your seconds are disappearing. This app lets you watch them.

🔗 https://YourSeconds.vercel.app

---

## ✨ Features

- ⏱️ Real-time countdown of remaining life **in seconds**
- 🌑 Dark mode UI with red digital clock styling
- 🧠 Custom date picker (day / month / year)
- ⚙️ Editable settings (date of birth & lifespan)
- 💾 User data saved in cookies
- 🔄 Automatically resumes countdown on return visits
- 📱 Responsive and mobile-friendly
- 💻 No backend. No accounts. No tracking.

---

## 🧮 How It Works

1. The user enters:
   - Date of birth
   - Expected lifespan in years (default: **80**)
2. The app calculates the estimated end-of-life date.
3. Remaining seconds are calculated using the current system time.
4. A countdown updates every second.
5. User data is stored in browser cookies and reloaded on future visits.

---

## 🛠️ Tech Stack

- **React.js** V19.2
- JavaScript
- TailwindCSS (dark mode styling)
- Browser Cookies (for persistence)
