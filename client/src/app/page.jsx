import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />

        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Email Template Editor</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">Create beautiful, responsive email templates with our drag-and-drop editor powered by GrapesJS and MJML.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Features</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>Drag & Drop Components</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>MJML Support for Responsive Emails</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>Live Preview</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>HTML Export</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span>Business Blocks (Hero, Product Grid, CTA, Footer)</li>
          </ul>
        </div>

        <div className="mb-8">
          <Link href="/simple" className="inline-flex items-center justify-center px-16 py-5 text-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-xl hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200">🚀 START EMAIL EDITOR</Link>
          <p className="text-sm text-gray-600 mt-2 text-center">Simplified version - now in JavaScript</p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
          Learn
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
          Examples
        </a>
        <a className="flex items-center gap-2 hover:underline hover:underline-offset-4" href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
          <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}


