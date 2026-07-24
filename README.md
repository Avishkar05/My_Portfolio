# My Portfolio (React + Tailwind CDN + Framer Motion)

Modern multi-page portfolio for GitHub Pages with:

- HashRouter-based routing (no 404 refresh issues on GitHub Pages)
- Dynamic dark/light mode with persistence
- Glassmorphic cards and motion animations
- Skill-based project filtering
- EmailJS-powered contact form

## Tech Stack

- React (CRA)
- Tailwind CSS via CDN utility classes
- Framer Motion
- Lucide React icons
- React Router DOM (HashRouter)
- EmailJS browser SDK

## Local Development

```bash
npm install
npm start
```

## EmailJS Setup (Step-by-Step)

1. Install EmailJS SDK:
   ```bash
   npm install @emailjs/browser
   ```
2. Go to [https://www.emailjs.com](https://www.emailjs.com) and create an account.
3. Add an **Email Service** (Gmail/Outlook/etc.) and copy the **Service ID**.
4. Create an **Email Template** and copy the **Template ID**.
5. Open **Account > API Keys** and copy your **Public Key**.
6. Create a `.env` file in the project root with:
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=your_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key
   ```
7. Restart the dev server after adding `.env`:
   ```bash
   npm start
   ```

The contact form now handles loading, success, and error states.

## GitHub Pages Deployment

This project is configured for:

- `homepage`: `https://avishkar05.github.io/My_Portfolio`
- deploy command:
  ```bash
  npm run deploy
  ```

Because the app uses `HashRouter`, deep links such as `#/projects/lawify` work correctly on GitHub Pages.

## Resume PDF

Place your resume file at:

`public/resume.pdf`

Then the Resume page will automatically show the embedded viewer and download button.
