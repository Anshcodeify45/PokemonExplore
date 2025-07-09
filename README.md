Pokémon Explorer


Explore detailed information about Pokémon, including images, stats, and types—all fetched from the PokéAPI. Built with Next.js, TypeScript, and Tailwind CSS, this app delivers a responsive and engaging Pokédex experience.

🔗 Live Site: https://pokemonexplore.onrender.com

🚀 Features
⚡ Browse a list of Pokémon with images and names

🔍 Click to view detailed stats, types, and abilities

🔄 Statically generated pages using getStaticPaths and getStaticProps

💡 Responsive design with Tailwind CSS

🌐 Fast performance and optimized SEO with Next.js

🛠️ Tech Stack
Framework: Next.js

Language: TypeScript

Styling: Tailwind CSS

API: PokéAPI

Hosting: Render

📂 Project Structure
arduino
Copy
Edit
pokemon-explorer/
├── public/
├── src/
│   ├── pages/
│   │   ├── index.tsx          // Home page with Pokémon list
│   │   └── pokemon/
│   │       └── [id].tsx       // Pokémon details page
│   └── styles/
│       └── globals.css
├── package.json
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md


📦 Installation
git clone https://github.com/Anshcodeify45/PokemonExplore.git
cd PokemonExplore
npm install
npm run dev

🧪 Scripts
npm run dev – Start development server

npm run build – Build for production

npm run start – Start production server

npm run lint – Run ESLint

📈 Performance Note
Some Pokémon detail pages may exceed optimal size due to rich data. Consider lazy loading or pagination for future optimization.

📸 Preview

Explore dynamic routes like /pokemon/1, /pokemon/25, etc.

🙌 Acknowledgments
PokéAPI for the free Pokémon data

Next.js

Tailwind CSS

📄 License
This project is open source and available under the MIT License.

