'use client';

import { useEffect, useRef, useState } from 'react';
import grapesjsMjml from 'grapesjs-mjml';

const SimpleEmailEditor = () => {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editor, setEditor] = useState(null);
  const initializedRef = useRef(false);
  const retriedRef = useRef(false);

  useEffect(() => {
    const initEditor = async () => {
      try {
        if (initializedRef.current) return;

        // Load GrapesJS CSS if not already present
        const existingCss = document.querySelector("link[href*='grapes.min.css']");
        if (!existingCss) {
          const cssLink = document.createElement('link');
          cssLink.rel = 'stylesheet';
          cssLink.href = 'https://unpkg.com/grapesjs@0.22.12/dist/css/grapes.min.css';
          document.head.appendChild(cssLink);
          await new Promise((resolve) => {
            cssLink.onload = resolve;
            setTimeout(resolve, 1000);
          });
        }

        const grapesjs = await import('grapesjs');

        if (!editorRef.current) {
          if (!retriedRef.current) {
            retriedRef.current = true;
            setTimeout(initEditor, 50);
            return;
          }
          throw new Error('Editor container not found');
        }

        editorRef.current.innerHTML = '';

        const ed = (grapesjs.default || grapesjs).init({
          container: editorRef.current,
          height: '720px',
          width: '100%',
          storageManager: false,
          fromElement: false,
          plugins: [grapesjsMjml],
          canvas: {
            styles: [
              'https://unpkg.com/grapesjs@0.22.12/dist/css/grapes.min.css',
            ],
          },
        });

        // Helper: add a text trait with placeholder allowing dynamic variables
        const dynHint = 'You can use variables like {{first_name}}, {{order.total}}';

        const { BlockManager: bm, DomComponents: dc } = ed;

        // Custom component: HERO
        dc.addType('hero-block', {
          isComponent: (el) => el?.getAttribute && el.getAttribute('data-gjs-type') === 'hero-block',
          model: {
            defaults: {
              name: 'Hero',
              attributes: { 'data-gjs-type': 'hero-block' },
              droppable: true,
              stylable: false,
              components:
                '<mj-section background-color="#f5f5ff" padding="20px 0">\
                  <mj-column>\
                    <mj-image css-class="hero-image" width="600px" src="https://via.placeholder.com/600x200?text=Hero" alt="Hero" />\
                    <mj-text css-class="hero-title" font-size="24px" font-weight="700">Hello {{first_name}},</mj-text>\
                    <mj-text css-class="hero-subtitle" color="#555">We picked some products you might like.</mj-text>\
                    <mj-button css-class="hero-button" background-color="#007bff" color="#fff" href="#">Shop Now</mj-button>\
                  </mj-column>\
                </mj-section>',
              traits: [
                { type: 'text', name: 'title', label: 'Title', placeholder: dynHint, changeProp: 1 },
                { type: 'text', name: 'subtitle', label: 'Subtitle', placeholder: dynHint, changeProp: 1 },
                { type: 'text', name: 'btnText', label: 'Button Text', placeholder: 'Shop Now', changeProp: 1 },
                { type: 'text', name: 'btnLink', label: 'Button Link', placeholder: '{{cta_url}} or https://', changeProp: 1 },
                { type: 'text', name: 'image', label: 'Image URL', placeholder: 'https://...', changeProp: 1 },
                { type: 'text', name: 'if', label: 'Conditional flag (data-if)', placeholder: 'user.is_vip', changeProp: 1 },
              ],
            },
            init() {
              const update = () => {
                const titleComp = this.find('.hero-title')[0];
                const subComp = this.find('.hero-subtitle')[0];
                const imgComp = this.find('.hero-image')[0];
                const btnComp = this.find('.hero-button')[0];
                const title = this.get('title');
                const subtitle = this.get('subtitle');
                const img = this.get('image');
                const btnText = this.get('btnText');
                const btnLink = this.get('btnLink');
                const cond = this.get('if');
                if (titleComp && title) titleComp.set('content', title);
                if (subComp && subtitle) subComp.set('content', subtitle);
                if (imgComp && img) imgComp.addAttributes({ src: img });
                if (btnComp) {
                  if (btnText) btnComp.set('content', btnText);
                  if (btnLink) btnComp.addAttributes({ href: btnLink });
                }
                const root = this;
                if (cond) root.addAttributes({ 'data-if': cond });
              };
              this.on('change:title change:subtitle change:image change:btnText change:btnLink change:if', update);
            },
          },
        });

        // Custom component: PRODUCT GRID (2 columns)
        dc.addType('product-grid', {
          isComponent: (el) => el?.getAttribute && el.getAttribute('data-gjs-type') === 'product-grid',
          model: {
            defaults: {
              name: 'Product Grid',
              attributes: { 'data-gjs-type': 'product-grid' },
              components:
                '<mj-section padding="0">\
                  <mj-column>\
                    <mj-image css-class="p1-image" src="https://via.placeholder.com/280x180?text=Product+1"></mj-image>\
                    <mj-text css-class="p1-title" font-weight="700">Product A</mj-text>\
                    <mj-text css-class="p1-price" color="#2e7d32">$19.99</mj-text>\
                    <mj-button css-class="p1-btn" href="#" background-color="#111" color="#fff">Buy</mj-button>\
                  </mj-column>\
                  <mj-column>\
                    <mj-image css-class="p2-image" src="https://via.placeholder.com/280x180?text=Product+2"></mj-image>\
                    <mj-text css-class="p2-title" font-weight="700">Product B</mj-text>\
                    <mj-text css-class="p2-price" color="#2e7d32">$24.99</mj-text>\
                    <mj-button css-class="p2-btn" href="#" background-color="#111" color="#fff">Buy</mj-button>\
                  </mj-column>\
                </mj-section>',
              traits: [
                { type: 'checkbox', name: 'showPrices', label: 'Show prices', valueTrue: 'true', valueFalse: 'false', changeProp: 1 },
                { type: 'text', name: 'if', label: 'Conditional flag (data-if)', placeholder: 'cart.has_recommendations', changeProp: 1 },
              ],
            },
            init() {
              const update = () => {
                const show = this.get('showPrices');
                const p1 = this.find('.p1-price')[0];
                const p2 = this.find('.p2-price')[0];
                if (p1) p1.addAttributes({ style: show === 'false' ? 'display:none' : '' });
                if (p2) p2.addAttributes({ style: show === 'false' ? 'display:none' : '' });
                const cond = this.get('if');
                if (cond) this.addAttributes({ 'data-if': cond });
              };
              this.on('change:showPrices change:if', update);
            },
          },
        });

        // Custom component: CTA BANNER
        dc.addType('cta-banner', {
          isComponent: (el) => el?.getAttribute && el.getAttribute('data-gjs-type') === 'cta-banner',
          model: {
            defaults: {
              name: 'CTA Banner',
              attributes: { 'data-gjs-type': 'cta-banner' },
              components:
                '<mj-section background-color="#eef7ff" padding="20px">\
                  <mj-column>\
                    <mj-text css-class="cta-title" font-size="20px" font-weight="700">Don\'t miss out</mj-text>\
                    <mj-button css-class="cta-button" background-color="#007bff" color="#fff" href="#">Get Offer</mj-button>\
                  </mj-column>\
                </mj-section>',
              traits: [
                { type: 'text', name: 'title', label: 'Title', placeholder: dynHint, changeProp: 1 },
                { type: 'text', name: 'btnText', label: 'Button Text', changeProp: 1 },
                { type: 'text', name: 'btnLink', label: 'Button Link', changeProp: 1 },
                { type: 'color', name: 'bg', label: 'Background', changeProp: 1 },
              ],
            },
            init() {
              const update = () => {
                const title = this.get('title');
                const t = this.find('.cta-title')[0];
                if (title && t) t.set('content', title);
                const btnText = this.get('btnText');
                const btnLink = this.get('btnLink');
                const b = this.find('.cta-button')[0];
                if (b && btnText) b.set('content', btnText);
                if (b && btnLink) b.addAttributes({ href: btnLink });
                const bg = this.get('bg');
                const sec = this.find('mj-section')[0];
                if (bg && sec) sec.addAttributes({ 'background-color': bg });
              };
              this.on('change:title change:btnText change:btnLink change:bg', update);
            },
          },
        });

        // Custom component: FOOTER
        dc.addType('footer-block', {
          isComponent: (el) => el?.getAttribute && el.getAttribute('data-gjs-type') === 'footer-block',
          model: {
            defaults: {
              name: 'Footer',
              attributes: { 'data-gjs-type': 'footer-block' },
              components:
                '<mj-section background-color="#111" padding="20px">\
                  <mj-column>\
                    <mj-text css-class="f-company" color="#fff">{{company_name}} · All rights reserved</mj-text>\
                    <mj-text css-class="f-address" color="#9e9e9e" font-size="12px">{{company_address}}</mj-text>\
                    <mj-text color="#9e9e9e" font-size="12px">\
                      <a class="f-unsub" href="#" style="color:#90caf9">Unsubscribe</a>\
                    </mj-text>\
                  </mj-column>\
                </mj-section>',
              traits: [
                { type: 'text', name: 'company', label: 'Company Name', placeholder: '{{company_name}}', changeProp: 1 },
                { type: 'text', name: 'address', label: 'Address', placeholder: '{{company_address}}', changeProp: 1 },
                { type: 'text', name: 'unsub', label: 'Unsubscribe URL', placeholder: '{{unsubscribe_url}} or https://', changeProp: 1 },
              ],
            },
            init() {
              const update = () => {
                const c = this.find('.f-company')[0];
                const a = this.find('.f-address')[0];
                const u = this.find('.f-unsub')[0];
                const company = this.get('company');
                const address = this.get('address');
                const unsub = this.get('unsub');
                if (c && company) c.set('content', company + ' · All rights reserved');
                if (a && address) a.set('content', address);
                if (u && unsub) u.addAttributes({ href: unsub });
              };
              this.on('change:company change:address change:unsub', update);
            },
          },
        });

        // Register blocks
        bm.add('hero', { label: 'Hero', category: 'Business', content: { type: 'hero-block' } });
        bm.add('product-grid', { label: 'Product Grid', category: 'Business', content: { type: 'product-grid' } });
        bm.add('cta-banner', { label: 'CTA Banner', category: 'Business', content: { type: 'cta-banner' } });
        bm.add('footer', { label: 'Footer', category: 'Business', content: { type: 'footer-block' } });

        // Basic palette similar to common email builders
        bm.add('mj-title', {
          label: 'Title',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-text font-size="24px" font-weight="700">I\'m a new title block</mj-text></mj-column></mj-section>',
        });

        bm.add('mj-paragraph', {
          label: 'Paragraph',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-text color="#333">I\'m a new paragraph block.</mj-text></mj-column></mj-section>',
        });

        bm.add('mj-list', {
          label: 'List',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-text><ul style="padding-left:18px;margin:0"><li>Item one</li><li>Item two</li></ul></mj-text></mj-column></mj-section>',
        });

        bm.add('mj-button', {
          label: 'Button',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-button href="#" background-color="#007bff" color="#fff">Click me</mj-button></mj-column></mj-section>',
        });

        bm.add('mj-image', {
          label: 'Image',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-image src="https://via.placeholder.com/600x200?text=Image" alt="image" /></mj-column></mj-section>',
        });

        bm.add('mj-divider', {
          label: 'Divider',
          category: 'Content',
          content:
            '<mj-section><mj-column><mj-divider border-color="#e0e0e0" /></mj-column></mj-section>',
        });

        bm.add('mj-spacer', {
          label: 'Spacer',
          category: 'Content',
          content: '<mj-section><mj-column><mj-spacer height="20px" /></mj-column></mj-section>',
        });

        bm.add('mj-social', {
          label: 'Social',
          category: 'Content',
          content: '<mj-section><mj-column><mj-social /></mj-column></mj-section>',
        });

        bm.add('mj-raw', {
          label: 'HTML',
          category: 'Advanced',
          content: '<mj-raw><!-- Custom HTML here --></mj-raw>',
        });

        // Initial template
        ed.setComponents(`
          <mjml>
            <mj-body background-color="#ffffff">
              <mj-section padding="10px 0">
                <mj-column>
                  <mj-text align="center" font-size="20px">🎉 Email Editor is Ready</mj-text>
                </mj-column>
              </mj-section>
              <mj-wrapper data-gjs-type="hero-block"></mj-wrapper>
              <mj-wrapper data-gjs-type="product-grid"></mj-wrapper>
              <mj-wrapper data-gjs-type="cta-banner"></mj-wrapper>
              <mj-wrapper data-gjs-type="footer-block"></mj-wrapper>
            </mj-body>
          </mjml>
        `);

        setEditor(ed);
        setIsLoading(false);
        initializedRef.current = true;
      } catch (err) {
        console.error(err);
        setError(`Editor failed to load: ${err}`);
        setIsLoading(false);
      }
    };

    initEditor();

    return () => {
      if (!initializedRef.current) return;
      try {
        editor?.destroy?.();
      } catch {
        /* noop */
      }
      initializedRef.current = false;
    };
  }, []);

  const handleExport = () => {
    if (!editor) return;
    try {
      const html = editor.getHtml();
      const css = editor.getCss();
      const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Email Template</title><style>body{margin:0;padding:0;font-family:Arial,sans-serif;}${css}</style></head><body>${html}</body></html>`;
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'email-template.html';
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
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
            <button onClick={() => window.location.reload()} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Reload Page</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">📧 Email Editor</h1>
          <div className="flex gap-3">
            <button onClick={handleExport} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">📤 Export HTML</button>
            <button onClick={() => (window.location.href = '/')} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">🏠 Home</button>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="relative w-full h-full" style={{ minHeight: '640px' }}>
          <div ref={editorRef} className="w-full h-full bg-white rounded-lg shadow-sm border border-gray-200" />
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


