document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       STORAGE KEYS (must match admin.js)
       ========================================================================== */
    const STORE_PRODUCTS   = 'admin_products';
    const STORE_INDUSTRIES = 'admin_industries';
    const STORE_INQUIRIES  = 'admin_inquiries';

    /* ==========================================================================
       RICH DEFAULT PRODUCT DATA (full specs + applications for modal)
       Fallback if localStorage is empty or admin hasn't seeded yet.
       ========================================================================== */
    const DEFAULT_PRODUCTS = [
        {
            id: 'pp', name: 'Polypropylene (PP)', category: 'polyolefins', badge: 'Virgin',
            image: 'assets/hero_granules.png',
            description: "High-purity homopolymer and copolymer granules optimized for injection molding of automotive parts, consumer goods, and thin-wall packaging. Processed under tight temperature bounds providing uniform molecular weight distribution with outstanding chemical resistance.",
            mfi: '12.0 - 25.0', density: '0.90 - 0.91', tensile: '32 MPa',
            specs: { "Melt Flow Index (MFI)": "12.0 - 25.0 g/10min (230°C / 2.16kg)", "Density": "0.90 - 0.91 g/cm³", "Tensile Yield Strength": "32 - 35 MPa", "Flexural Modulus": "1350 - 1500 MPa", "Izod Impact (Notched)": "3.5 - 5.0 kJ/m² (at 23°C)", "Melting Temperature": "163°C - 168°C" },
            applications: ["Automotive Bumpers & Interior Door Panels", "Thin-Walled Food Packaging Containers", "Consumer Housewares & Storage Bins", "Battery Housings & Industrial Covers", "Living Hinges & Snaps Assemblies"]
        },
        {
            id: 'hdpe', name: 'High-Density Polyethylene (HDPE)', category: 'polyolefins', badge: 'Virgin',
            image: 'assets/about_lab.png',
            description: "High molecular weight granules offering outstanding tensile strength, impact resistance, and chemical barriers. They exhibit exceptional environmental stress-cracking resistance (ESCR), low-temperature impact strength, and high stiffness. Perfect for blow molding and pipe extrusion.",
            mfi: '0.1 - 2.0', density: '0.94 - 0.96', tensile: 'Flex: 1000 MPa',
            specs: { "Melt Flow Index (MFI)": "0.1 - 2.0 g/10min (190°C / 2.16kg)", "Density": "0.94 - 0.96 g/cm³", "Tensile Strength at Break": "22 - 28 MPa", "Flexural Modulus": "1000 - 1200 MPa", "Izod Impact (Notched)": "8.0 - 12.0 kJ/m² (at 23°C)", "Melting Temperature": "130°C - 135°C" },
            applications: ["Blow-molded Industrial Chemical Barrels", "High-Pressure Water & Gas Pipes", "Household Chemical Bottles (Detergents/Shampoos)", "Crates, Pallets, and Heavy Waste Bins", "Geomembranes for waste landfill containment systems"]
        },
        {
            id: 'ldpe', name: 'Low-Density Polyethylene (LDPE)', category: 'polyolefins', badge: 'Virgin',
            image: 'assets/about_factory.png',
            description: "Highly flexible granules with excellent flow characteristics and moisture resistance. Delivers exceptional optical properties, high flexibility, and great melt strength, making them ideal for high-speed blown film co-extrusion. The industry choice for packaging.",
            mfi: '2.0 - 7.0', density: '0.918 - 0.925', tensile: 'Elong > 500%',
            specs: { "Melt Flow Index (MFI)": "2.0 - 7.0 g/10min (190°C / 2.16kg)", "Density": "0.918 - 0.925 g/cm³", "Elongation at Break": "> 550%", "Tensile Yield Strength": "10 - 13 MPa", "Melting Temperature": "105°C - 115°C", "Film Haze Value": "< 5.5% (for 30 micron film)" },
            applications: ["High-speed Blown Packaging Film & Food Wrap", "Squeeze Bottles & Cosmetic Tubes", "Industrial Shrink wraps & Pallet covers", "Lamination & Barrier Coatings on Kraft paper", "Agricultural Mulching Protective Sleeves"]
        },
        {
            id: 'lldpe', name: 'Linear LDPE (LLDPE)', category: 'polyolefins', badge: 'Compounded',
            image: 'assets/hero_granules.png',
            description: "Granules featuring narrow molecular weight distribution, yielding superior puncture resistance and tensile strength for stretch wrapping. The linear molecular structure allows for thinner film designs while maintaining high puncture strength.",
            mfi: '1.0 - 2.0', density: '0.919 - 0.924', tensile: 'Dart: 120g',
            specs: { "Melt Flow Index (MFI)": "1.0 - 2.0 g/10min (190°C / 2.16kg)", "Density": "0.919 - 0.924 g/cm³", "Dart Impact Resistance": "120 - 150 g", "Tensile Tear Strength (MD/TD)": "140 / 350 g/25um", "Ultimate Elongation": "600 - 800%", "Melting Temperature": "120°C - 124°C" },
            applications: ["Pallet Cargo Stretch Films & Cling Wraps", "Heavy-Duty Soil & Fertilizers Bags", "Lining Membranes for Industrial Tanks", "Greenhouse Covering Films", "Injection Molded Flexible Caps and Closures"]
        },
        {
            id: 'abs', name: 'Acrylonitrile Butadiene Styrene (ABS)', category: 'engineering', badge: 'Engineering',
            image: 'assets/about_lab.png',
            description: "Rigid, structurally stable engineering plastic granules. Exhibits superior dimensional stability, impact strength, and structural rigidity with excellent scratch resistance and gloss levels ensuring premium aesthetics for electronics housings and automotive interior panels.",
            mfi: '15.0 - 30.0', density: '1.04 - 1.06', tensile: 'Izod: 200 J/m',
            specs: { "Melt Flow Index (MFI)": "15.0 - 30.0 g/10min (220°C / 10kg)", "Density": "1.04 - 1.06 g/cm³", "Tensile Strength at Yield": "42 - 48 MPa", "Izod Impact Strength (Notched)": "180 - 240 J/m (at 23°C)", "Vicat Softening Temp": "95°C - 105°C (50N, 50°C/h)", "Mold Shrinkage Rate": "0.4 - 0.7%" },
            applications: ["Consumer Electronic Housings (Routers, Monitors)", "Household Kitchen Appliance Trims & Parts", "Automotive Grilles & Decorative Interiors", "Toy Assemblies & Protective Helmets", "Structural Enclosures & Utility Spools"]
        },
        {
            id: 'eco', name: 'EcoNova Bio-Granules (PLA/PHA)', category: 'eco', badge: 'Bio-Based',
            image: 'assets/about_factory.png',
            description: "Completely biodegradable and compostable bio-polymer granules sourced from cornstarch and organic sugars. Certified compostable under EN 13432 and ASTM D6400, leaving zero microplastic residue behind in soil environments.",
            mfi: '3.0 - 8.0', density: '1.24 - 1.25', tensile: 'Melt: 160°C',
            specs: { "Melt Flow Index (MFI)": "3.0 - 8.0 g/10min (190°C / 2.16kg)", "Density": "1.24 - 1.25 g/cm³", "Tensile Strength at Yield": "50 - 60 MPa", "Flexural Modulus": "3000 - 3500 MPa", "Melting Point": "155°C - 165°C", "Bio-Based Carbon Content": "> 98%" },
            applications: ["Compostable Single-use Packaging Film", "Eco-friendly Organic Agricultural Mulch Films", "Disposable Cutlery & Catering Food Service Trays", "3D Printing Filaments & Structural Prototyping", "Organic Cosmetics Packaging Caps"]
        }
    ];

    const DEFAULT_INDUSTRIES = [
        { id: 'auto', name: 'Automotive', icon: 'fa-solid fa-car-side', description: 'Manufacturers convert our PP and ABS granules into impact-resistant bumpers, lightweight dashboard assemblies, interior door panels, and under-hood components.', tags: ['Bumpers', 'Dashboards', 'Trims', 'Engine Covers'] },
        { id: 'pack', name: 'Packaging', icon: 'fa-solid fa-box-open', description: 'High-speed packaging lines convert our HDPE and LDPE materials into strong food wraps, flexible bags, industrial drums, and cosmetic containers.', tags: ['Shrink Films', 'Containers', 'Crates', 'Cosmetic Bottles'] },
        { id: 'med', name: 'Healthcare & Medical', icon: 'fa-solid fa-kit-medical', description: 'Undergoing sterilization standards, our medical-grade polymers are processed into sterile syringes, fluid IV tubes, hospital trays, and diagnostic equipment shells.', tags: ['Syringes', 'IV Tubes', 'Trays', 'Housing Units'] },
        { id: 'const', name: 'Construction & Infrastructure', icon: 'fa-solid fa-building', description: 'Our high-density PE is extruded into long-lasting pressure pipes, protective cable sleeves, moisture membranes, and composite structural panels.', tags: ['PE Pipes', 'Conduits', 'Geo-membranes', 'Fittings'] },
        { id: 'cons', name: 'Consumer Goods', icon: 'fa-solid fa-couch', description: 'Supplying injection molders with highly flowable PP and ABS for outdoor patio furniture, home appliances, toy parts, and storage organizers.', tags: ['Appliances', 'Furniture', 'Toys', 'Storage Boxes'] },
        { id: 'agri', name: 'Agriculture', icon: 'fa-solid fa-wheat-awn', description: 'LLDPE and eco-based granules are extruded into high-puncture greenhouse coverings, soil mulching films, and high-tensile packaging nets.', tags: ['Greenhouse Films', 'Mulch Film', 'Drip Irrigation', 'Nets'] },
    ];

    /* ==========================================================================
       LOAD FROM LOCALSTORAGE (admin-managed data)
       ========================================================================== */
    function loadFromStorage(key, fallback) {
        try {
            const raw = localStorage.getItem(key);
            const parsed = raw ? JSON.parse(raw) : null;
            return (parsed && parsed.length > 0) ? parsed : fallback;
        } catch { return fallback; }
    }

    // Seed defaults into localStorage if not set (first run)
    if (!localStorage.getItem(STORE_PRODUCTS))   localStorage.setItem(STORE_PRODUCTS,   JSON.stringify(DEFAULT_PRODUCTS));
    if (!localStorage.getItem(STORE_INDUSTRIES)) localStorage.setItem(STORE_INDUSTRIES, JSON.stringify(DEFAULT_INDUSTRIES));

    /* ==========================================================================
       RENDER PRODUCTS GRID (dynamically from localStorage)
       ========================================================================== */
    const productsGrid   = document.getElementById('products-grid');
    const filterButtons  = document.querySelectorAll('.filter-btn');
    let currentFilter    = 'all';
    // Current modal product reference (for dynamic lookup)
    let allProducts = [];

    function renderProductsGrid() {
        allProducts = loadFromStorage(STORE_PRODUCTS, DEFAULT_PRODUCTS);

        if (!productsGrid) return;

        if (allProducts.length === 0) {
            productsGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted);">
                <i class="fa-solid fa-box" style="font-size:2.5rem;display:block;margin-bottom:1rem;opacity:0.4;"></i>
                <p style="font-family:var(--font-heading);font-weight:700;font-size:1.1rem;">No products available</p>
                <span style="font-size:0.85rem;">Products will appear here once added in the admin panel.</span>
            </div>`;
            return;
        }

        const isEcoCategory = (cat) => cat === 'eco';

        productsGrid.innerHTML = allProducts.map(p => {
            const isEco = isEcoCategory(p.category);
            const specsHtml = [
                p.mfi     ? `<div class="spec-brief"><span class="spec-label">MFI (g/10min)</span><span class="spec-val">${escHtml(p.mfi)}</span></div>` : '',
                p.density ? `<div class="spec-brief"><span class="spec-label">Density (g/cm³)</span><span class="spec-val">${escHtml(p.density)}</span></div>` : '',
                p.tensile ? `<div class="spec-brief"><span class="spec-label">Tensile / Key Spec</span><span class="spec-val">${escHtml(p.tensile)}</span></div>` : '',
            ].join('');

            const btnClass = isEco ? 'btn btn-green open-modal-btn' : 'btn btn-secondary open-modal-btn';

            return `
                <div class="product-card${isEco ? ' eco' : ''}"
                     data-category="${escHtml(p.category)}"
                     data-product-id="${escHtml(p.id)}">
                    <div class="product-img-wrapper">
                        <span class="product-badge">${escHtml(p.badge || 'General')}</span>
                        ${p.image
                            ? `<img src="${escHtml(p.image)}" alt="${escHtml(p.name)}" onerror="this.style.display='none'">`
                            : `<div style="width:100%;height:200px;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:2.5rem;"><i class="fa-solid fa-box"></i></div>`
                        }
                    </div>
                    <div class="product-info">
                        <h3>${escHtml(p.name)}</h3>
                        <p>${escHtml(p.description)}</p>
                        ${specsHtml ? `<div class="product-specs-summary">${specsHtml}</div>` : ''}
                        <button class="${btnClass}">Technical Specs</button>
                    </div>
                </div>
            `;
        }).join('');

        // Re-attach filter
        applyFilter(currentFilter);

        // Re-attach modal button listeners
        productsGrid.querySelectorAll('.product-card').forEach(card => {
            const btn = card.querySelector('.open-modal-btn');
            const productId = card.getAttribute('data-product-id');
            if (btn) {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    openProductModal(productId);
                });
            }
        });

        // Re-observe new elements for reveal animation
        productsGrid.querySelectorAll('.product-card').forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       RENDER INDUSTRIES GRID (dynamically from localStorage)
       ========================================================================== */
    const industriesGrid = document.getElementById('industries-grid');

    function renderIndustriesGrid() {
        const industries = loadFromStorage(STORE_INDUSTRIES, DEFAULT_INDUSTRIES);

        if (!industriesGrid) return;

        if (industries.length === 0) {
            industriesGrid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:4rem;color:var(--text-muted);">
                <i class="fa-solid fa-industry" style="font-size:2.5rem;display:block;margin-bottom:1rem;opacity:0.4;"></i>
                <p style="font-family:var(--font-heading);font-weight:700;font-size:1.1rem;">No industries listed</p>
                <span style="font-size:0.85rem;">Industries will appear here once added in the admin panel.</span>
            </div>`;
            return;
        }

        industriesGrid.innerHTML = industries.map(ind => {
            const tagsHtml = (ind.tags || []).map(t => `<span class="tag">${escHtml(t)}</span>`).join('');
            return `
                <div class="industry-card reveal">
                    <div class="industry-content" style="transform:translateY(0);">
                        <div class="industry-icon" style="opacity:1;transform:scale(1);">
                            <i class="${escHtml(ind.icon || 'fa-solid fa-industry')}"></i>
                        </div>
                        <h3>${escHtml(ind.name)}</h3>
                        <p class="industry-desc" style="opacity:1;">${escHtml(ind.description)}</p>
                        <div class="industry-products-tags" style="opacity:1;">${tagsHtml}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Re-observe new cards for reveal animation
        industriesGrid.querySelectorAll('.industry-card').forEach(el => {
            revealObserver.observe(el);
        });
    }

    /* ==========================================================================
       LISTEN FOR ADMIN PANEL CHANGES (cross-tab localStorage events)
       ========================================================================== */
    window.addEventListener('storage', (e) => {
        if (e.key === STORE_PRODUCTS)   renderProductsGrid();
        if (e.key === STORE_INDUSTRIES) renderIndustriesGrid();
    });

    /* ==========================================================================
       HEADER & NAVIGATION CONTROL
       ========================================================================== */
    const header       = document.getElementById('header');
    const navLinks     = document.getElementById('nav-links');
    const menuToggle   = document.getElementById('menu-toggle');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Header scroll background glow
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Mobile navigation toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Scroll active link tracking
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let currentSection = 'home';
        const scrollPosition = window.scrollY + 120;
        sections.forEach(section => {
            if (scrollPosition >= section.offsetTop && scrollPosition < section.offsetTop + section.offsetHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        navLinkItems.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
        });
    });

    /* ==========================================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ==========================================================================
       PRODUCT GRID FILTER
       ========================================================================== */
    function applyFilter(filter) {
        currentFilter = filter;
        const cards = productsGrid ? productsGrid.querySelectorAll('.product-card') : [];
        cards.forEach(card => {
            const cat = card.getAttribute('data-category');
            const show = filter === 'all' || (filter === 'eco' ? cat === 'eco' : cat === filter);
            card.style.display = show ? 'flex' : 'none';
        });
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilter(button.getAttribute('data-filter'));
        });
    });

    /* ==========================================================================
       SPECIFICATIONS DETAIL MODAL
       ========================================================================== */
    const modalOverlay = document.getElementById('detail-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');

    function openProductModal(productId) {
        // Look up product from current localStorage data (includes admin-added products)
        const storageProduct = allProducts.find(p => p.id === productId);
        if (!storageProduct) return;

        const isEco = storageProduct.category === 'eco';

        // Build specs table — use stored specs object if available, else build from mfi/density/tensile fields
        let specsSource = storageProduct.specs && Object.keys(storageProduct.specs).length > 0
            ? storageProduct.specs
            : buildSpecsFromFields(storageProduct);

        let specsHtml = '';
        for (const [key, value] of Object.entries(specsSource)) {
            specsHtml += `
                <div class="modal-spec-item">
                    <span class="label">${escHtml(key)}</span>
                    <span class="value">${escHtml(value)}</span>
                </div>
            `;
        }

        // Build applications list — use stored array if available
        const apps = Array.isArray(storageProduct.applications) && storageProduct.applications.length > 0
            ? storageProduct.applications
            : [];

        const appsHtml = apps.length > 0
            ? apps.map(app => `<span class="modal-app-tag">${escHtml(app)}</span>`).join('')
            : `<span class="modal-app-tag">Contact us for application details</span>`;

        const subtitle = storageProduct.subtitle || storageProduct.name;

        modalBody.innerHTML = `
            <div class="modal-header-section">
                <div class="modal-image">
                    ${storageProduct.image
                        ? `<img src="${escHtml(storageProduct.image)}" alt="${escHtml(storageProduct.name)}" onerror="this.style.display='none'">`
                        : `<div style="width:100%;height:200px;background:var(--bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--text-muted);font-size:3rem;border-radius:12px;"><i class="fa-solid fa-box"></i></div>`
                    }
                </div>
                <div class="modal-title-info">
                    <span class="modal-tag ${isEco ? 'eco' : ''}">${escHtml(storageProduct.badge || 'General')}</span>
                    <h3>${escHtml(storageProduct.name)}</h3>
                    <p class="subtitle">${escHtml(subtitle)}</p>
                </div>
            </div>

            <div class="modal-description">
                <p>${escHtml(storageProduct.description)}</p>
            </div>

            <h4 style="font-family:var(--font-heading);font-size:1.2rem;border-bottom:1px solid var(--border-color);padding-bottom:0.5rem;margin-top:1rem;">Typical Material Specifications</h4>
            <div class="modal-specs-table">${specsHtml || '<p style="color:var(--text-muted);font-size:0.9rem;">No specifications provided.</p>'}</div>

            <div class="modal-applications">
                <h4>Manufacturing End Applications</h4>
                <div class="modal-apps-list">${appsHtml}</div>
            </div>

            <div style="display:flex;gap:1rem;margin-top:1rem;">
                <a href="#contact" class="btn btn-primary" style="flex:1;" onclick="closeModalDirectly('${escHtml(storageProduct.name)}')">
                    Request Quote & Sample
                </a>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function buildSpecsFromFields(p) {
        const specs = {};
        if (p.mfi)     specs['Melt Flow Index (MFI)'] = p.mfi;
        if (p.density) specs['Density (g/cm³)']        = p.density;
        if (p.tensile) specs['Key Spec']               = p.tensile;
        return specs;
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    window.closeModalDirectly = (productTitle) => {
        closeModal();
        const formResin = document.getElementById('form-resin');
        if (formResin) {
            for (let i = 0; i < formResin.options.length; i++) {
                if (productTitle.toLowerCase().includes(formResin.options[i].text.toLowerCase().split(' ')[0])) {
                    formResin.selectedIndex = i;
                    break;
                }
            }
        }
    };

    /* ==========================================================================
       FORMS & INTERACTIVE TOAST NOTIFICATION
       ========================================================================== */
    const toast         = document.getElementById('toast-message');
    const toastText     = document.getElementById('toast-text');
    const contactForm   = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    function showToast(message, isEco = false) {
        toastText.textContent = message;
        toast.classList.toggle('eco', isEco);
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 4000);
    }

    // Contact Form submission — stores inquiry in localStorage for admin panel
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('form-submit-btn');
        const originalText = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `Processing Inquiry <i class="fa-solid fa-spinner fa-spin"></i>`;

        const name    = document.getElementById('form-name').value.trim();
        const company = document.getElementById('form-company').value.trim();
        const email   = document.getElementById('form-email').value.trim();
        const phone   = document.getElementById('form-phone').value.trim();
        const resin   = document.getElementById('form-resin').value;
        const process = document.getElementById('form-process').value;
        const message = document.getElementById('form-message').value.trim();

        setTimeout(() => {
            // Save inquiry to localStorage for admin panel
            let inquiries = [];
            try { inquiries = JSON.parse(localStorage.getItem(STORE_INQUIRIES) || '[]'); } catch {}
            inquiries.push({
                id: 'inq_' + Date.now(),
                name, company, email, phone, resin, process, message,
                date: new Date().toISOString(),
                status: 'new'
            });
            localStorage.setItem(STORE_INQUIRIES, JSON.stringify(inquiries));

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            showToast(`Thank you! Inquiry for ${resin} granules has been sent on behalf of ${company}.`);
            contactForm.reset();
        }, 1500);
    });

    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        newsletterForm.reset();
        showToast(`Subscribed! Tech Bulletins will be sent to ${email}.`, true);
    });

    /* ==========================================================================
       HELPER: HTML escape
       ========================================================================== */
    function escHtml(str) {
        return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    /* ==========================================================================
       INIT — render both dynamic sections on page load
       ========================================================================== */
    renderProductsGrid();
    renderIndustriesGrid();
});
