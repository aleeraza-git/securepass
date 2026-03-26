# 🔐 SecurePass — Password Strength Checker & Generator

> Idea by **Tala Ahmad Mufarrij**

A professional cybersecurity web tool for analyzing password strength and generating secure passwords. Built with Next.js, TypeScript, TailwindCSS, and the zxcvbn algorithm.

---

## ✨ Features

- **Password Generator** — custom length (6–40 chars), toggle uppercase/lowercase/numbers/symbols, animated generation
- **Strength Checker** — real-time scoring with visual meter (Very Weak → Very Strong)
- **Crack Time Estimate** — realistic time-to-crack using zxcvbn (Dropbox algorithm)
- **Entropy Score** — mathematical bits of entropy calculated from charset and length
- **Improvement Tips** — real-time suggestions to strengthen your password
- **Character Breakdown** — count of each character type used
- **100% Client-Side** — nothing is ever sent to a server
- **Cyberpunk UI** — dark terminal-inspired design with animations

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 14 | React framework |
| TypeScript | Type safety |
| TailwindCSS | Styling |
| Framer Motion | Animations |
| zxcvbn | Password strength algorithm |
| Vercel | Free hosting |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/securepass.git
cd securepass
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Deployment (Free on Vercel)

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/securepass.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"Add New Project"**
3. Import your `securepass` repository
4. Click **Deploy** — that's it!

Your app will be live at: `https://securepass.vercel.app`

---

## 📂 Project Structure

```
securepass/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── page.tsx            # Home / Hero page
│   ├── generator/
│   │   └── page.tsx        # Password Generator tool
│   ├── checker/
│   │   └── page.tsx        # Strength Checker tool
│   └── about/
│       └── page.tsx        # About page
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer with credit
│   ├── StrengthMeter.tsx   # Animated strength bar
│   └── TipsPanel.tsx       # Improvement suggestions
├── lib/
│   └── password.ts         # Core logic (analyze + generate)
├── styles/
│   └── globals.css         # Global styles + animations
├── tailwind.config.ts
├── next.config.js
└── tsconfig.json
```

---

## 🔒 Privacy

- All analysis is done **100% in the browser**
- No passwords are stored or transmitted
- No external API calls for password data

---

## 📄 License

MIT — Free to use and modify.

---

*Idea by Tala Ahmad Mufarrij · Built with Next.js + Vercel*
