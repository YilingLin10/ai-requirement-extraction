## Project overview
This web application allows users to extract structured software requirements from unstructured natural language text using AI models. It features:

- A credit-based system: Users start with 20 free credits
- AI-powered extraction using Hugging Face's `meta-llama/Llama-3.2-3B-Instruct`
- Output in a structured table with categorized results
- Authentication (sign up, sign in, credits tracked per user)
- Mock credit purchase flow

## Tech stack used
- **Frontend:** [Next.js 15 App Router](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Backend:** Next.js API routes
- **Auth:** [NextAuth.js (v5)](https://authjs.dev/)
- **AI Integration:** [Hugging Face Inference API](https://huggingface.co/mistralai/Mistral-7B-v0.1)
- **Database:** [Prisma ORM](https://www.prisma.io/) with [Neon PostgreSQL](https://neon.tech/)
- **Deployment:** [Vercel](https://vercel.com)

## Setup & running instructions
1. Clone the repository
```bash
git clone https://github.com/YilingLin10/ai-requirement-extraction.git
cd ai-requirement-extraction
```
# 2. Install dependencies
```bash
npm install
```

# 3. Set up environment variables
add the following keys to `.env`
```bash
AUTH_SECRET="YOUR_AUTH_SECRET" # Added by `npx auth`. Read more: https://cli.authjs.dev
DATABASE_URL="YOUR_POSTGRES_DATABASE_URL"
HUGGINGFACE_API_KEY="YOUR_HUGGING_FACE_API_KEY"
BASE_URL="http://localhost:3000"
```

# 4. Set up the database
```bash
npx prisma migrate dev
npx prisma generate
```
# 5. Run the dev server
```bash
npm run dev
```

## Link to the deployed Vercel site
https://ai-requirement-extraction.vercel.app/ 