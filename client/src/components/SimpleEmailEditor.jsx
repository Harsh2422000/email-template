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
          styleManager: {
            sectors: [
              {
                name: 'Typography',
                open: true,
                properties: [
                  'color',
                  { property: 'font-size', name: 'Font size' },
                  { property: 'font-weight', name: 'Weight' },
                  { property: 'line-height', name: 'Line height' },
                  { property: 'font-family', name: 'Font' },
                  { property: 'text-align', name: 'Align' },
                  'text-decoration',
                ],
              },
              {
                name: 'Spacing',
                properties: [
                  { property: 'padding' },
                  { property: 'margin' },
                ],
              },
              {
                name: 'Decorations',
                properties: [
                  'background-color',
                  'border',
                  'border-radius',
                ],
              },
            ],
          },
          canvas: {
            styles: [
              'https://unpkg.com/grapesjs@0.22.12/dist/css/grapes.min.css',
            ],
          },
        });

        // Helper: add a text trait with placeholder allowing dynamic variables
        const dynHint = 'You can use variables like {{first_name}}, {{order.total}}';

        const { BlockManager: bm, DomComponents: dc } = ed;

        // Layout wrapper with configurable outer background, card border and radius
        dc.addType('email-frame', {
          isComponent: (el) => el?.getAttribute && el.getAttribute('data-gjs-type') === 'email-frame',
          model: {
            defaults: {
              name: 'Email Frame',
              attributes: { 'data-gjs-type': 'email-frame' },
              droppable: true,
              stylable: false,
              bodyBg: '#f3f4f6',
              cardBg: '#ffffff',
              showBorder: 'true',
              borderColor: '#d1d5db',
              borderWidth: 2,
              borderRadius: 10,
              components:
                '<mj-section css-class="outer" padding="24px 16px" background-color="#f3f4f6">\
                  <mj-column>\
                    <mj-section css-class="card" background-color="#ffffff" border="2px solid #d1d5db" border-radius="10px" padding="0">\
                      <mj-column padding="0">\
                        <!-- Header logo -->\
                        <mj-image css-class="header-logo" padding="24px 24px 0 24px" width="72px" align="center" src="https://dummyimage.com/144x144/111827/ffffff&text=IB" alt="ItsBot" />\
                        <mj-text css-class="title" padding="8px 24px 12px 24px" align="center" font-size="22px" font-weight="700">Reset your password</mj-text>\
                        <mj-text css-class="lead" padding="0 24px" align="center" color="#6b7280">We heard that you lost your password. Use the button below to reset it.</mj-text>\
                        <mj-image css-class="hero" padding="16px 24px 0 24px" width="600px" src="" alt="Hero" />\
                        <mj-button css-class="cta" padding="16px 24px" background-color="#16a34a" color="#ffffff" href="#">Reset your password</mj-button>\
                        <mj-text css-class="alt-link" padding="0 24px 12px 24px" align="center" color="#2563eb">Can\'t click the button? Copy this link: {{reset_url}}</mj-text>\
                        <mj-text css-class="closing" padding="0 24px 12px 24px" align="center">Thanks,<br/>The ItsBot Team</mj-text>\
                        <mj-divider border-width="1px" border-color="#f3f4f6" padding="0 24px" />\
                        <!-- Footer inside card -->\
                        <mj-text css-class="f-company" padding="16px 24px 4px 24px" align="center" color="#9ca3af" font-size="12px">{{company_name}} • All rights reserved</mj-text>\
                        <mj-text css-class="f-address" padding="0 24px 20px 24px" align="center" color="#9ca3af" font-size="12px">{{company_address}}</mj-text>\
                      </mj-column>\
                    </mj-section>\
                  </mj-column>\
                </mj-section>',
              traits: [
                { type: 'color', name: 'bodyBg', label: 'Outer background', changeProp: 1 },
                { type: 'color', name: 'cardBg', label: 'Card background', changeProp: 1 },
                { type: 'checkbox', name: 'showBorder', label: 'Show border', valueTrue: 'true', valueFalse: 'false', changeProp: 1, default: 'true' },
                { type: 'color', name: 'borderColor', label: 'Border color', changeProp: 1 },
                { type: 'number', name: 'borderWidth', label: 'Border width', min: 0, max: 8, changeProp: 1 },
                { type: 'number', name: 'borderRadius', label: 'Radius', min: 0, max: 24, changeProp: 1 },
                { type: 'text', name: 'logo', label: 'Logo URL', changeProp: 1 },
                { type: 'text', name: 'title', label: 'Title', changeProp: 1 },
                { type: 'text', name: 'lead', label: 'Lead text', changeProp: 1 },
                { type: 'text', name: 'hero', label: 'Hero image URL', changeProp: 1 },
                { type: 'text', name: 'ctaText', label: 'CTA text', changeProp: 1 },
                { type: 'text', name: 'ctaLink', label: 'CTA link', changeProp: 1 },
                { type: 'text', name: 'altLink', label: 'Alt link text', changeProp: 1 },
                { type: 'text', name: 'company', label: 'Company', changeProp: 1 },
                { type: 'text', name: 'address', label: 'Address', changeProp: 1 },
              ],
            },
            init() {
              const update = () => {
                const body = this.em.getWrapper().find('mj-body')[0];
                const card = this.find('.card')[0];
                const logo = this.get('logo');
                const title = this.get('title');
                const lead = this.get('lead');
                const hero = this.get('hero');
                const ctaText = this.get('ctaText');
                const ctaLink = this.get('ctaLink');
                const altLink = this.get('altLink');
                const company = this.get('company');
                const address = this.get('address');
                const logoComp = this.find('.header-logo')[0];
                const titleComp = this.find('.title')[0];
                const leadComp = this.find('.lead')[0];
                const heroComp = this.find('.hero')[0];
                const ctaComp = this.find('.cta')[0];
                const altComp = this.find('.alt-link')[0];
                const compComp = this.find('.f-company')[0];
                const addrComp = this.find('.f-address')[0];
                const bodyBg = this.get('bodyBg');
                const cardBg = this.get('cardBg');
                const showBorder = this.get('showBorder');
                const borderColor = this.get('borderColor') || '#d1d5db';
                const borderWidth = this.get('borderWidth');
                const borderRadius = this.get('borderRadius');
                if (body && bodyBg) body.addAttributes({ 'background-color': bodyBg });
                if (card) {
                  if (cardBg) card.addAttributes({ 'background-color': cardBg });
                  const width = typeof borderWidth === 'number' ? `${borderWidth}px` : '1px';
                  const border = showBorder === 'false' ? '0' : `${width} solid ${borderColor}`;
                  card.addAttributes({ border });
                  if (typeof borderRadius === 'number') card.addAttributes({ 'border-radius': `${borderRadius}px` });
                }
                if (logoComp && logo) logoComp.addAttributes({ src: logo });
                if (titleComp && title) titleComp.set('content', title);
                if (leadComp && lead) leadComp.set('content', lead);
                if (heroComp && hero) heroComp.addAttributes({ src: hero });
                if (ctaComp) {
                  if (ctaText) ctaComp.set('content', ctaText);
                  if (ctaLink) ctaComp.addAttributes({ href: ctaLink });
                }
                if (altComp && altLink) altComp.set('content', altLink);
                if (compComp && company) compComp.set('content', `${company} • All rights reserved`);
                if (addrComp && address) addrComp.set('content', address);
              };
              this.on('change:bodyBg change:cardBg change:showBorder change:borderColor change:borderWidth change:borderRadius change:logo change:title change:lead change:hero change:ctaText change:ctaLink change:altLink change:company change:address', update);
              update();
            },
          },
        });

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
                    <mj-image css-class="hero-image" width="600px" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?fit=crop&w=600&h=200" alt="Hero" />\
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
                    <mj-image css-class="p1-image" src="https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRdKd7ZZCVQCCV2vVb5cm0ggjP2oSgBPmkfuhdIU6yVGkOnoQZK4ykdwseGI5HNPVlhH9VvQixlHh4DS3U3dB3skFafQni4"></mj-image>\
                    <mj-text css-class="p1-title" font-weight="700">Product A</mj-text>\
                    <mj-text css-class="p1-price" color="#2e7d32">$19.99</mj-text>\
                    <mj-button css-class="p1-btn" href="#" background-color="#111" color="#fff">Buy</mj-button>\
                  </mj-column>\
                  <mj-column>\
                    <mj-image css-class="p2-image" src="https://strenzo.in/cdn/shop/files/Piscot_Black.jpg?v=1726047965&width=1920"></mj-image>\
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
        bm.add('email-frame', { label: 'Email Frame', category: 'Layout', content: { type: 'email-frame' } });
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

        // ItsBot Subscription Expiry Reminder Template
        ed.setComponents(`
          <mjml>
            <mj-head>
              <mj-attributes>
                <mj-all font-family="Inter, Arial, sans-serif" />
                <mj-text color="#374151" font-size="16px" line-height="1.6" />
                <mj-section padding="0" />
              </mj-attributes>
              <mj-style>
                .main-content { background-color: #f3f4f6; }
                .footer-dark { background-color: #374151; }
              </mj-style>
            </mj-head>
            <mj-body background-color="#ffffff">
              <!-- Header with Dynamic Company Logo -->
              <mj-section padding="40px 20px 20px 20px">
                <mj-column>
                  <mj-image align="center" width="120px" src="{{company_logo_url}}" alt="{{company_name}}" />
                </mj-column>
              </mj-section>

              <!-- Main Content Area with Light Gray Background -->
              <mj-section css-class="main-content" background-color="#f3f4f6" padding="40px 20px">
                <mj-column>
                  <!-- Main Heading -->
                  <mj-text align="center" font-size="28px" font-weight="700" color="#1f2937" padding="0 0 32px 0">
                    {{email_subject}}
                  </mj-text>
                  
                  <!-- Greeting -->
                  <mj-text align="center" color="#374151" font-size="16px" padding="0 0 24px 0">
                    Hi {{user_name}},
                  </mj-text>
                  
                  <!-- Main Message -->
                  <mj-text align="center" color="#374151" font-size="16px" line-height="1.6" padding="0 20px 16px 20px">
                    We wanted to give you a heads-up that your subscription <strong>({{subscription_plan}})</strong> is <strong>due to expire in {{days_remaining}} days</strong>. To ensure a seamless experience and continued access to our platform, we kindly remind you to renew your subscription at your earliest convenience.
                  </mj-text>
                  
                  <!-- Thank you message -->
                  <mj-text align="center" color="#374151" font-size="16px" line-height="1.6" padding="0 20px 32px 20px">
                    Thank you for your continued support. We value your association with us and look forward to serving you further.
                  </mj-text>
                  
                  <!-- Closing -->
                  <mj-text align="center" color="#374151" font-size="16px" padding="0 0 8px 0">
                    {{closing_greeting}},
                  </mj-text>
                  <mj-text align="center" color="#374151" font-size="16px" font-weight="600" padding="0 0 0 0">
                    The {{company_name}} Team
                  </mj-text>
                </mj-column>
              </mj-section>

              <!-- Footer with Dark Background -->
              <mj-section css-class="footer-dark" background-color="#374151" padding="32px 20px">
                <mj-column>
                  <!-- Dynamic Company Logo in Footer -->
                  <mj-image align="center" width="100px" src="{{company_logo_url}}" alt="{{company_name}}" padding="0 0 24px 0" />
                  
                  <!-- Footer Links with Dynamic URLs -->
                  <mj-text align="center" color="#9ca3af" font-size="14px" padding="0 0 16px 0">
                    <a href="{{contact_us_url}}" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Contact Us</a>
                    <span style="color:#6b7280;">|</span>
                    <a href="{{privacy_policy_url}}" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Privacy Policy</a>
                    <span style="color:#6b7280;">|</span>
                    <a href="{{terms_conditions_url}}" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Terms & Conditions</a>
                    <span style="color:#6b7280;">|</span>
                    <a href="{{support_url}}" style="color:#9ca3af;text-decoration:none;margin:0 8px;">Support</a>
                  </mj-text>
                  
                  <!-- Dynamic Copyright -->
                  <mj-text align="center" color="#6b7280" font-size="14px">
                    © {{current_year}} {{company_name}}. All Rights Reserved.
                  </mj-text>
                </mj-column>
              </mj-section>
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


