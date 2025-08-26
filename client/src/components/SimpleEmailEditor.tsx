'use client';

import { useEffect, useRef, useState } from 'react';

const SimpleEmailEditor = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editor, setEditor] = useState<any>(null);
  // Guard against double initialization in React Strict Mode
  const initializedRef = useRef<boolean>(false);
  const retriedRef = useRef<boolean>(false);

  useEffect(() => {
    const initEditor = async () => {
      try {
        if (initializedRef.current) {
          console.log('ℹ️ Editor already initialized, skipping');
          return;
        }
        console.log('🚀 Starting simple email editor...');
        
        // Load CSS first (avoid duplicates)
        console.log('📦 Loading CSS...');
        const existingCss = document.querySelector("link[href*='grapes.min.css']");
        if (!existingCss) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/grapesjs@0.22.12/dist/css/grapes.min.css';
          document.head.appendChild(cssLink);
          await new Promise(resolve => {
            cssLink.onload = resolve;
            setTimeout(resolve, 1000); // fallback
          });
          console.log('✅ CSS loaded');
        } else {
          console.log('ℹ️ CSS already present');
        }
        
        // Import GrapesJS (same as QuickTest)
        console.log('📦 Importing GrapesJS...');
        const grapesjs = await import('grapesjs');
        console.log('✅ GrapesJS imported');
        
        console.log('🔍 Checking editor ref:', editorRef.current);
        
        if (!editorRef.current) {
          if (!retriedRef.current) {
            retriedRef.current = true;
            console.log('⚠️ Ref null, retrying shortly...');
            setTimeout(initEditor, 50);
            return;
          }
          console.log('❌ Editor ref is still null after retry');
          throw new Error('Editor container not found - DOM element is null');
        }

        console.log('✅ Editor ref found, creating editor...');
        // Make sure the container is empty
        editorRef.current.innerHTML = '';
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const ed: any = grapesjs.default.init({
          container: editorRef.current,
          height: '600px',
          width: '100%',
          storageManager: false,
          fromElement: false
        });
        
        initializedRef.current = true;
        console.log('✅ Editor created successfully');
        
        // Add basic blocks
        ed.BlockManager.add('text', {
          label: '📝 Text',
          content: '<div style="padding: 20px; font-family: Arial, sans-serif;"><p style="margin: 0; color: #333;">Click to edit this text</p></div>',
          category: 'Basic'
        });
        
        ed.BlockManager.add('button', {
          label: '🔘 Button',
          content: '<div style="text-align: center; padding: 20px;"><a href="#" style="display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Click Me</a></div>',
          category: 'Basic'
        });
        
        ed.BlockManager.add('image', {
          label: '🖼️ Image',
          content: '<div style="text-align: center; padding: 20px;"><img src="https://via.placeholder.com/400x200/28a745/ffffff?text=Your+Image" alt="Image" style="max-width: 100%; height: auto;"></div>',
          category: 'Basic'
        });

        ed.BlockManager.add('header', {
          label: '📧 Email Header',
          content: '<div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-bottom: 1px solid #dee2e6;"><h1 style="color: #333; margin: 0; font-family: Arial, sans-serif;">Your Company</h1><p style="color: #666; margin: 5px 0 0 0;">Professional Email Template</p></div>',
          category: 'Email Sections'
        });

        ed.BlockManager.add('footer', {
          label: '📄 Email Footer',
          content: '<div style="background: #343a40; color: white; padding: 30px 20px; text-align: center;"><p style="margin: 0 0 10px 0; font-size: 14px;">© 2024 Your Company. All rights reserved.</p><p style="margin: 0; font-size: 12px;"><a href="#" style="color: #17a2b8; text-decoration: none;">Unsubscribe</a> | <a href="mailto:contact@company.com" style="color: #17a2b8; text-decoration: none;">Contact</a></p></div>',
          category: 'Email Sections'
        });
        
        // Set initial content (similar to QuickTest success message)
        ed.setComponents(`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: white;">
            <div style="background: #f8f9fa; padding: 30px 20px; text-align: center; border-bottom: 1px solid #dee2e6;">
              <h1 style="color: #333; margin: 0;">🎉 Email Editor is Working!</h1>
              <p style="color: #666; margin: 5px 0 0 0;">Just like the Quick Test - but with full editing power!</p>
            </div>
            
            <div style="padding: 40px 20px;">
              <h2 style="color: #333; margin: 0 0 20px 0;">Start Building Your Email</h2>
              <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
                🎯 <strong>Drag components</strong> from the left panel<br>
                ✏️ <strong>Click any text</strong> to edit it directly<br>
                🎨 <strong>Customize styling</strong> with the panels<br>
                📤 <strong>Export HTML</strong> when ready
              </p>
              <div style="text-align: center;">
                <a href="#" style="display: inline-block; background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                  Start Editing Now
                </a>
              </div>
            </div>
            
            <div style="background: #343a40; color: white; padding: 20px; text-align: center;">
              <p style="margin: 0; font-size: 14px;">Ready to create amazing email templates!</p>
            </div>
          </div>
        `);
        
        console.log('✅ Initial content set');
        setEditor(ed);
        setIsLoading(false);
        console.log('🎯 Simple email editor ready!');
      } catch (err) {
        console.error('❌ Editor initialization failed:', err);
        setError(`Editor failed to load: ${err}`);
        setIsLoading(false);
      }
    };
    
    // Run initialization (same pattern as QuickTest)
    initEditor();

    return () => {
      // Do not destroy twice
      if (!initializedRef.current) return;
      try {
        editor?.destroy?.();
      } catch (e) {
        console.warn('Editor cleanup error:', e);
      }
      initializedRef.current = false;
    };
  }, []);

  // Remove duplicate cleanup effect to avoid double-destroy

  const handleExport = () => {
    if (!editor) return;
    
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      
      const fullHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email Template</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        ${css}
    </style>
</head>
<body>
    ${html}
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email-template.html';
      a.click();
      URL.revokeObjectURL(url);
      
      console.log('📧 Email template exported');
    } catch (err) {
      console.error('Export failed:', err);
      alert('Export failed: ' + err);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <div className="text-red-600 text-xl mb-4 text-center">❌ Editor Error</div>
          <div className="text-red-700 mb-6 text-center break-words">{error}</div>
          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Reload Page
            </button>
            <button 
              onClick={() => window.location.href = '/quick'} 
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Quick Test Instead
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📧 Simple Email Editor</h1>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📤 Export HTML
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>

      {/* Editor Container */}
      <div className="flex-1 p-4">
        <div className="relative w-full h-full" style={{ minHeight: '600px' }}>
          <div 
            ref={editorRef} 
            className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200"
          />
          {/* Loading overlay as sibling (not a child) to avoid GrapesJS DOM mutations */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-lg border border-gray-200">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-gray-700">Loading editor...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimpleEmailEditor;
