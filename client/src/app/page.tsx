import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Email Template Editor
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Create beautiful, responsive email templates with our drag-and-drop editor powered by GrapesJS and MJML.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Features</h2>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Drag & Drop Components
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              MJML Support for Responsive Emails
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Live Preview
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              HTML Export
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Pre-built Components
            </li>
          </ul>
        </div>

        {/* Main Editor Button */}
        <div className="mb-8">
          <Link
            href="/simple"
            className="inline-flex items-center justify-center px-16 py-5 text-xl font-bold text-white bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl shadow-xl hover:from-emerald-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-200"
          >
            🚀 START EMAIL EDITOR
          </Link>
          <p className="text-sm text-gray-600 mt-2 text-center">Simplified version - guaranteed to work!</p>
        </div>

        {/* Alternative Editors */}
        {/* <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">Alternative Versions:</h3>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href="/fixed"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              ✅ Fixed Version
            </Link>
            <Link
              href="/email"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📧 Full Version
            </Link>
          </div>
        </div> */}

        {/* Other Editor Options */}
        {/* <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Other Options & Testing:</h3>
        </div> */}
        
        {/* <div className="flex gap-3 items-center flex-col sm:flex-row flex-wrap">
          <Link
            href="/quick"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-green-600 text-white gap-2 hover:bg-green-700 font-medium text-sm h-10 px-4"
          >
            ⚡ Quick Test
          </Link>
          <Link
            href="/working"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-orange-600 text-white gap-2 hover:bg-orange-700 font-medium text-sm h-10 px-4"
          >
            🔧 Simple Editor
          </Link>
          <Link
            href="/editor"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 font-medium text-sm h-10 px-4"
          >
            🎨 Original Editor
          </Link>
          <Link
            href="/cdn"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-purple-600 text-white gap-2 hover:bg-purple-700 font-medium text-sm h-10 px-4"
          >
            🌐 CDN Version
          </Link>
          <Link
            href="/debug"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-red-600 text-white gap-2 hover:bg-red-700 font-medium text-sm h-10 px-4"
          >
            🐛 Debug Info
          </Link>
          <a
            className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm h-10 px-4"
            href="https://grapesjs.com/docs/"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Docs
          </a>
        </div> */}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
