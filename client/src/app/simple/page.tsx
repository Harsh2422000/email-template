'use client';

import dynamic from 'next/dynamic';

const SimpleEmailEditor = dynamic(() => import('../../components/SimpleEmailEditor'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Loading Simple Editor...</h2>
        <p className="text-gray-600">Minimal setup - should work!</p>
      </div>
    </div>
  )
});

export default function SimpleEditorPage() {
  return <SimpleEmailEditor />;
}
