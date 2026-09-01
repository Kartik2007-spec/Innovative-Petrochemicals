/* ==========================================================================
   INNOVATIVE PETROCHEMICALS — Admin Panel JavaScript
   ========================================================================== */

'use strict';

const SESSION_KEY = 'innovative_admin_session';
const STORE = {
    products: 'admin_products',
    industries: 'admin_industries',
    inquiries: 'admin_inquiries',
    settings: 'admin_settings',
    credentials: 'admin_credentials',
};

/* ===================================================
   AUTHENTICATION GUARD
   =================================================== */
function checkAuth() {
    const session = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!session) {
        window.location.href = 'admin-login.html';
        return false;
    }
    return true;
}

if (!checkAuth()) throw new Error('Unauthorized');

/* ===================================================
   STORAGE HELPERS
   =================================================== */
function load(key, fallback = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch { return fallback; }
}

function save(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/* ===================================================
   DEFAULT DATA
   =================================================== */
const DEFAULT_PRODUCTS = [
    {
        id: 'pp', name: 'Polypropylene (PP)', category: 'polyolefins', badge: 'Virgin',
        description: 'High-purity homopolymer and copolymer granules optimized for injection molding of automotive parts, consumer goods, and thin-wall packaging. Processed under tight temperature bounds providing uniform molecular weight distribution with outstanding chemical resistance.',
        mfi: '12.0 - 25.0', density: '0.90 - 0.91', tensile: '32 MPa',
        image: 'assets/hero_granules.png',
        specs: { "Melt Flow Index (MFI)": "12.0 - 25.0 g/10min (230°C / 2.16kg)", "Density": "0.90 - 0.91 g/cm³", "Tensile Yield Strength": "32 - 35 MPa", "Flexural Modulus": "1350 - 1500 MPa", "Izod Impact (Notched)": "3.5 - 5.0 kJ/m² (at 23°C)", "Melting Temperature": "163°C - 168°C" },
        applications: ["Automotive Bumpers & Interior Door Panels", "Thin-Walled Food Packaging Containers", "Consumer Housewares & Storage Bins", "Battery Housings & Industrial Covers", "Living Hinges & Snaps Assemblies"]
    },
    {
        id: 'hdpe', name: 'High-Density Polyethylene (HDPE)', category: 'polyolefins', badge: 'Virgin',
        description: 'High molecular weight granules offering outstanding tensile strength, impact resistance, and chemical barriers. They exhibit exceptional environmental stress-cracking resistance (ESCR) and high stiffness. Perfect for blow molding and pipe extrusion.',
        mfi: '0.1 - 2.0', density: '0.94 - 0.96', tensile: 'Flex: 1000 MPa',
        image: 'assets/about_lab.png',
        specs: { "Melt Flow Index (MFI)": "0.1 - 2.0 g/10min (190°C / 2.16kg)", "Density": "0.94 - 0.96 g/cm³", "Tensile Strength at Break": "22 - 28 MPa", "Flexural Modulus": "1000 - 1200 MPa", "Izod Impact (Notched)": "8.0 - 12.0 kJ/m² (at 23°C)", "Melting Temperature": "130°C - 135°C" },
        applications: ["Blow-molded Industrial Chemical Barrels", "High-Pressure Water & Gas Pipes", "Household Chemical Bottles (Detergents/Shampoos)", "Crates, Pallets, and Heavy Waste Bins", "Geomembranes for waste landfill containment systems"]
    },
    {
        id: 'ldpe', name: 'Low-Density Polyethylene (LDPE)', category: 'polyolefins', badge: 'Virgin',
        description: 'Highly flexible granules with excellent flow characteristics and moisture resistance. Delivers exceptional optical properties, high flexibility, and great melt strength, ideal for high-speed blown film co-extrusion.',
        mfi: '2.0 - 7.0', density: '0.918 - 0.925', tensile: 'Elong > 500%',
        image: 'assets/about_factory.png',
        specs: { "Melt Flow Index (MFI)": "2.0 - 7.0 g/10min (190°C / 2.16kg)", "Density": "0.918 - 0.925 g/cm³", "Elongation at Break": "> 550%", "Tensile Yield Strength": "10 - 13 MPa", "Melting Temperature": "105°C - 115°C", "Film Haze Value": "< 5.5% (for 30 micron film)" },
        applications: ["High-speed Blown Packaging Film & Food Wrap", "Squeeze Bottles & Cosmetic Tubes", "Industrial Shrink wraps & Pallet covers", "Lamination & Barrier Coatings on Kraft paper", "Agricultural Mulching Protective Sleeves"]
    },
    {
        id: 'lldpe', name: 'Linear LDPE (LLDPE)', category: 'polyolefins', badge: 'Compounded',
        description: 'Granules featuring narrow molecular weight distribution, yielding superior puncture resistance and tensile strength for stretch wrapping. The linear molecular structure allows for thinner film designs.',
        mfi: '1.0 - 2.0', density: '0.919 - 0.924', tensile: 'Dart: 120g',
        image: 'assets/hero_granules.png',
        specs: { "Melt Flow Index (MFI)": "1.0 - 2.0 g/10min (190°C / 2.16kg)", "Density": "0.919 - 0.924 g/cm³", "Dart Impact Resistance": "120 - 150 g", "Tensile Tear Strength (MD/TD)": "140 / 350 g/25um", "Ultimate Elongation": "600 - 800%", "Melting Temperature": "120°C - 124°C" },
        applications: ["Pallet Cargo Stretch Films & Cling Wraps", "Heavy-Duty Soil & Fertilizers Bags", "Lining Membranes for Industrial Tanks", "Greenhouse Covering Films", "Injection Molded Flexible Caps and Closures"]
    },
    {
        id: 'abs', name: 'Acrylonitrile Butadiene Styrene (ABS)', category: 'engineering', badge: 'Engineering',
        description: 'Rigid, structurally stable engineering plastic granules. Exhibits superior dimensional stability, impact strength, and structural rigidity with excellent scratch resistance and gloss levels.',
        mfi: '15.0 - 30.0', density: '1.04 - 1.06', tensile: 'Izod: 200 J/m',
        image: 'assets/about_lab.png',
        specs: { "Melt Flow Index (MFI)": "15.0 - 30.0 g/10min (220°C / 10kg)", "Density": "1.04 - 1.06 g/cm³", "Tensile Strength at Yield": "42 - 48 MPa", "Izod Impact Strength (Notched)": "180 - 240 J/m (at 23°C)", "Vicat Softening Temp": "95°C - 105°C (50N, 50°C/h)", "Mold Shrinkage Rate": "0.4 - 0.7%" },
        applications: ["Consumer Electronic Housings (Routers, Monitors)", "Household Kitchen Appliance Trims & Parts", "Automotive Grilles & Decorative Interiors", "Toy Assemblies & Protective Helmets", "Structural Enclosures & Utility Spools"]
    },
    {
        id: 'eco', name: 'EcoNova Bio-Granules (PLA/PHA)', category: 'eco', badge: 'Bio-Based',
        description: 'Completely biodegradable and compostable bio-polymer granules sourced from cornstarch and organic sugars. Certified compostable under EN 13432 and ASTM D6400, leaving zero microplastic residue.',
        mfi: '3.0 - 8.0', density: '1.24 - 1.25', tensile: 'Melt: 160°C',
        image: 'assets/about_factory.png',
        specs: { "Melt Flow Index (MFI)": "3.0 - 8.0 g/10min (190°C / 2.16kg)", "Density": "1.24 - 1.25 g/cm³", "Tensile Strength at Yield": "50 - 60 MPa", "Flexural Modulus": "3000 - 3500 MPa", "Melting Point": "155°C - 165°C", "Bio-Based Carbon Content": "> 98%" },
        applications: ["Compostable Single-use Packaging Film", "Eco-friendly Organic Agricultural Mulch Films", "Disposable Cutlery & Catering Food Service Trays", "3D Printing Filaments & Structural Prototyping", "Organic Cosmetics Packaging Caps"]
    }
];

const DEFAULT_INDUSTRIES = [
    { id: 'auto', name: 'Automotive', icon: 'fa-solid fa-car-side', description: 'Manufacturers convert our PP and ABS granules into impact-resistant bumpers, lightweight dashboard assemblies, interior door panels, and under-hood components.', tags: ['Bumpers', 'Dashboards', 'Trims', 'Engine Covers'] },
    { id: 'pack', name: 'Packaging', icon: 'fa-solid fa-box-open', description: 'High-speed packaging lines convert our HDPE and LDPE materials into strong food wraps, flexible bags, industrial drums, and cosmetic containers.', tags: ['Shrink Films', 'Containers', 'Crates', 'Cosmetic Bottles'] },
    { id: 'med', name: 'Healthcare & Medical', icon: 'fa-solid fa-kit-medical', description: 'Our medical-grade polymers are processed into sterile syringes, fluid IV tubes, hospital trays, and diagnostic equipment shells.', tags: ['Syringes', 'IV Tubes', 'Trays', 'Housing Units'] },
    { id: 'const', name: 'Construction & Infrastructure', icon: 'fa-solid fa-building', description: 'Our high-density PE is extruded into long-lasting pressure pipes, protective cable sleeves, moisture membranes, and composite structural panels.', tags: ['PE Pipes', 'Conduits', 'Geo-membranes', 'Fittings'] },
    { id: 'cons', name: 'Consumer Goods', icon: 'fa-solid fa-couch', description: 'Supplying injection molders with highly flowable PP and ABS for outdoor patio furniture, home appliances, toy parts, and storage organizers.', tags: ['Appliances', 'Furniture', 'Toys', 'Storage Boxes'] },
    { id: 'agri', name: 'Agriculture', icon: 'fa-solid fa-wheat-awn', description: 'LLDPE and eco-based granules are extruded into high-puncture greenhouse coverings, soil mulching films, and high-tensile packaging nets.', tags: ['Greenhouse Films', 'Mulch Film', 'Drip Irrigation', 'Nets'] },
];

const DEFAULT_SETTINGS = {
    heroHeadline: 'Precision Engineered Polymer Granules',
    heroSubtext: 'We supply premium-grade plastic raw material granules to manufacturers worldwide. Transforming industrial standards with high-purity materials for advanced injection molding, extrusion, and blow molding.',
    stat1Label: 'Tons Annual Capacity', stat1Value: '50K+',
    address: 'MIDC Central, Kondivita\nAndheri East, Mumbai - 400093',
    email1: 'innovativepetrochemicals@gmail.com',
    email2: 'sales.innovative@gmail.com',
    phone: '+91 9167514502'
};

const DEFAULT_CREDENTIALS = { username: 'admin', password: 'admin123' };

/* Initialize defaults if not already set — or if data version changed */
const DATA_VERSION = 'v2'; // Bump this to force a re-seed of defaults
const storedVersion = localStorage.getItem('admin_data_version');

if (storedVersion !== DATA_VERSION) {
    // Re-seed with enriched defaults
    save(STORE.products,   DEFAULT_PRODUCTS);
    save(STORE.industries, DEFAULT_INDUSTRIES);
    save(STORE.settings,   DEFAULT_SETTINGS);
    save(STORE.credentials, DEFAULT_CREDENTIALS);
    if (!localStorage.getItem(STORE.inquiries)) save(STORE.inquiries, []);
    localStorage.setItem('admin_data_version', DATA_VERSION);
} else {
    if (!localStorage.getItem(STORE.products))   save(STORE.products,   DEFAULT_PRODUCTS);
    if (!localStorage.getItem(STORE.industries)) save(STORE.industries, DEFAULT_INDUSTRIES);
    if (!localStorage.getItem(STORE.inquiries))  save(STORE.inquiries,  []);
    if (!localStorage.getItem(STORE.settings))   save(STORE.settings,   DEFAULT_SETTINGS);
    if (!localStorage.getItem(STORE.credentials)) save(STORE.credentials, DEFAULT_CREDENTIALS);
}

/* ===================================================
   STATE
   =================================================== */
let products = load(STORE.products, DEFAULT_PRODUCTS);
let industries = load(STORE.industries, DEFAULT_INDUSTRIES);
let inquiries = load(STORE.inquiries, []);
let settings = load(STORE.settings, DEFAULT_SETTINGS);
let credentials = load(STORE.credentials, DEFAULT_CREDENTIALS);

let currentInquiryId = null;
let currentProductEditId = null;
let currentIndustryEditId = null;
let activeInquiryFilter = 'all';
let confirmCallback = null;

/* ===================================================
   TOAST
   =================================================== */
let toastTimer;
function showToast(msg, isError = false) {
    const toast = document.getElementById('admin-toast');
    const text = document.getElementById('admin-toast-text');
    const icon = document.getElementById('toast-icon');
    text.textContent = msg;
    toast.className = 'admin-toast' + (isError ? ' error' : '');
    icon.className = isError ? 'fa-solid fa-circle-xmark' : 'fa-solid fa-circle-check';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.add('hidden'), 3500);
}

/* ===================================================
   TABS & NAVIGATION
   =================================================== */
const tabs = ['dashboard', 'inquiries', 'products', 'industries', 'settings'];

function switchTab(tabName) {
    tabs.forEach(t => {
        document.getElementById(`tab-${t}`).classList.add('hidden');
        document.getElementById(`nav-${t}`)?.classList.remove('active');
    });
    document.getElementById(`tab-${tabName}`)?.classList.remove('hidden');
    document.getElementById(`nav-${tabName}`)?.classList.add('active');

    const titles = {
        dashboard: 'Dashboard', inquiries: 'Manage Inquiries',
        products: 'Products Manager', industries: 'Industries Manager', settings: 'Site Settings'
    };
    document.getElementById('topbar-title').textContent = titles[tabName] || tabName;

    // Load tab content
    if (tabName === 'dashboard') renderDashboard();
    if (tabName === 'inquiries') renderInquiries();
    if (tabName === 'products') renderProducts();
    if (tabName === 'industries') renderIndustries();
    if (tabName === 'settings') renderSettings();
}

document.querySelectorAll('.nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        const tab = item.dataset.tab;
        switchTab(tab);
        // Close sidebar on mobile after clicking
        if (window.innerWidth < 900) closeSidebar();
    });
});

// Quick action buttons
document.querySelectorAll('.quick-action-btn[data-tab]').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        switchTab(tab);
        if (btn.dataset.action === 'add') {
            setTimeout(() => {
                if (tab === 'products') document.getElementById('show-add-product-form')?.click();
                if (tab === 'industries') document.getElementById('show-add-industry-form')?.click();
            }, 100);
        }
    });
});

// Dashboard "View All" inquiry card link
document.querySelector('.dash-card-link[data-tab="inquiries"]')?.addEventListener('click', () => switchTab('inquiries'));

/* ===================================================
   SIDEBAR TOGGLE
   =================================================== */
const sidebar = document.getElementById('sidebar');
const mainWrapper = document.querySelector('.main-wrapper');

function closeSidebar() {
    sidebar.classList.remove('open');
    document.getElementById('sidebar-overlay')?.remove();
}

document.getElementById('sidebar-toggle').addEventListener('click', () => {
    if (window.innerWidth < 900) {
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            const overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            overlay.id = 'sidebar-overlay';
            overlay.addEventListener('click', closeSidebar);
            document.body.appendChild(overlay);
        } else {
            document.getElementById('sidebar-overlay')?.remove();
        }
    } else {
        sidebar.classList.toggle('collapsed');
        mainWrapper.classList.toggle('expanded');
    }
});

/* ===================================================
   LOGOUT
   =================================================== */
document.getElementById('btn-logout').addEventListener('click', e => {
    e.preventDefault();
    confirmAction('Log Out', 'Are you sure you want to log out?', () => {
        sessionStorage.removeItem(SESSION_KEY);
        localStorage.removeItem(SESSION_KEY);
        window.location.href = 'admin-login.html';
    });
});

/* ===================================================
   TOPBAR CLOCK
   =================================================== */
function updateClock() {
    const now = new Date();
    document.getElementById('topbar-time').textContent = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
updateClock();
setInterval(updateClock, 30000);

/* ===================================================
   CONFIRM MODAL
   =================================================== */
function confirmAction(title, text, onConfirm) {
    confirmCallback = onConfirm;
    document.getElementById('confirm-modal-title').textContent = title;
    document.getElementById('confirm-modal-text').textContent = text;
    document.getElementById('confirm-modal').classList.remove('hidden');
}

document.getElementById('confirm-ok-btn').addEventListener('click', () => {
    document.getElementById('confirm-modal').classList.add('hidden');
    if (typeof confirmCallback === 'function') confirmCallback();
    confirmCallback = null;
});

['confirm-modal-close', 'confirm-cancel-btn'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        document.getElementById('confirm-modal').classList.add('hidden');
        confirmCallback = null;
    });
});

/* ===================================================
   DASHBOARD
   =================================================== */
function renderDashboard() {
    document.getElementById('dash-inquiry-count').textContent = inquiries.length;
    document.getElementById('dash-product-count').textContent = products.length;
    document.getElementById('dash-industry-count').textContent = industries.length;

    // Last login time
    const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY) || '{}');
    if (session.loginTime) {
        document.getElementById('dash-last-login').textContent = new Date(session.loginTime).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' });
    }

    // Update inquiry badge
    const newCount = inquiries.filter(i => i.status === 'new').length;
    const badge = document.getElementById('inquiry-badge');
    badge.textContent = newCount;
    badge.style.display = newCount > 0 ? 'inline-block' : 'none';

    // Recent inquiries (last 4)
    const list = document.getElementById('dash-inquiry-list');
    const recent = [...inquiries].reverse().slice(0, 4);
    if (recent.length === 0) {
        list.innerHTML = `<div class="empty-state small"><i class="fa-solid fa-inbox"></i><p>No inquiries yet</p></div>`;
    } else {
        list.innerHTML = recent.map(inq => `
            <div class="dash-inquiry-item" data-id="${inq.id}" onclick="openInquiryModal('${inq.id}')">
                <div>
                    <div class="dash-inquiry-name">${esc(inq.name)}</div>
                    <div class="dash-inquiry-company">${esc(inq.company || '')} · ${esc(inq.resin)}</div>
                </div>
                <span class="status-badge ${inq.status}">${inq.status}</span>
            </div>
        `).join('');
    }
}

/* ===================================================
   INQUIRIES
   =================================================== */
function renderInquiries() {
    const tbody = document.getElementById('inquiries-tbody');
    const empty = document.getElementById('inquiries-empty');

    let filtered = inquiries.filter(inq => {
        if (activeInquiryFilter !== 'all' && inq.status !== activeInquiryFilter) return false;
        const q = document.getElementById('inquiry-search').value.toLowerCase();
        if (q) {
            return (inq.name + inq.company + inq.email + inq.resin).toLowerCase().includes(q);
        }
        return true;
    });

    if (filtered.length === 0) {
        tbody.innerHTML = '';
        empty.style.display = 'flex';
        document.getElementById('inquiries-table').style.display = 'none';
    } else {
        empty.style.display = 'none';
        document.getElementById('inquiries-table').style.display = '';
        tbody.innerHTML = filtered.map((inq, idx) => `
            <tr onclick="openInquiryModal('${inq.id}')">
                <td style="color:var(--text-muted)">${idx + 1}</td>
                <td style="color:var(--text-primary);font-weight:600;">${esc(inq.name)}</td>
                <td>${esc(inq.company || '—')}</td>
                <td>${esc(inq.email)}</td>
                <td>${esc(inq.resin)}</td>
                <td>${formatDate(inq.date)}</td>
                <td><span class="status-badge ${inq.status}">${inq.status}</span></td>
                <td onclick="event.stopPropagation()">
                    <div class="table-action-btns">
                        <button class="tbl-btn" title="View" onclick="openInquiryModal('${inq.id}')"><i class="fa-solid fa-eye"></i></button>
                        <button class="tbl-btn danger" title="Delete" onclick="deleteInquiry('${inq.id}')"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Update badge
    const newCount = inquiries.filter(i => i.status === 'new').length;
    const badge = document.getElementById('inquiry-badge');
    badge.textContent = newCount;
    badge.style.display = newCount > 0 ? '' : 'none';
}

// Filter chips
document.querySelectorAll('.filter-chip').forEach(chip => {
    chip.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        activeInquiryFilter = chip.dataset.status;
        renderInquiries();
    });
});

document.getElementById('inquiry-search').addEventListener('input', renderInquiries);

// Clear all
document.getElementById('clear-inquiries-btn').addEventListener('click', () => {
    if (inquiries.length === 0) return;
    confirmAction('Clear All Inquiries', 'This will permanently delete all inquiry records. Are you sure?', () => {
        inquiries = [];
        save(STORE.inquiries, inquiries);
        renderInquiries();
        renderDashboard();
        showToast('All inquiries cleared.');
    });
});

// Delete single inquiry
window.deleteInquiry = (id) => {
    confirmAction('Delete Inquiry', 'Permanently delete this inquiry?', () => {
        inquiries = inquiries.filter(i => i.id !== id);
        save(STORE.inquiries, inquiries);
        renderInquiries();
        renderDashboard();
        showToast('Inquiry deleted.');
    });
};

// Inquiry modal
window.openInquiryModal = (id) => {
    const inq = inquiries.find(i => i.id === id);
    if (!inq) return;
    currentInquiryId = id;

    document.getElementById('inquiry-modal-title').textContent = `Inquiry from ${inq.name}`;
    document.getElementById('inquiry-modal-body').innerHTML = `
        <div class="inquiry-detail-grid">
            <div class="inquiry-detail-item"><label>Full Name</label><p>${esc(inq.name)}</p></div>
            <div class="inquiry-detail-item"><label>Company</label><p>${esc(inq.company || '—')}</p></div>
            <div class="inquiry-detail-item"><label>Work Email</label><p>${esc(inq.email)}</p></div>
            <div class="inquiry-detail-item"><label>Phone</label><p>${esc(inq.phone || '—')}</p></div>
            <div class="inquiry-detail-item"><label>Resin Required</label><p>${esc(inq.resin)}</p></div>
            <div class="inquiry-detail-item"><label>Process</label><p>${esc(inq.process || '—')}</p></div>
            <div class="inquiry-detail-item"><label>Date Received</label><p>${formatDate(inq.date)}</p></div>
            <div class="inquiry-detail-item"><label>Status</label><p><span class="status-badge ${inq.status}">${inq.status}</span></p></div>
        </div>
        <div class="inquiry-message-block">
            <label>Message / Requirements</label>
            <p>${esc(inq.message || '(No message provided)')}</p>
        </div>
    `;
    document.getElementById('inquiry-modal').classList.remove('hidden');
};

document.getElementById('inquiry-modal-close').addEventListener('click', () => {
    document.getElementById('inquiry-modal').classList.add('hidden');
});

document.getElementById('inquiry-resolve-btn').addEventListener('click', () => {
    updateInquiryStatus(currentInquiryId, 'resolved');
    document.getElementById('inquiry-modal').classList.add('hidden');
});

document.getElementById('inquiry-pending-btn').addEventListener('click', () => {
    updateInquiryStatus(currentInquiryId, 'pending');
    document.getElementById('inquiry-modal').classList.add('hidden');
});

document.getElementById('inquiry-delete-btn').addEventListener('click', () => {
    document.getElementById('inquiry-modal').classList.add('hidden');
    window.deleteInquiry(currentInquiryId);
});

function updateInquiryStatus(id, status) {
    const inq = inquiries.find(i => i.id === id);
    if (inq) {
        inq.status = status;
        save(STORE.inquiries, inquiries);
        renderInquiries();
        renderDashboard();
        showToast(`Inquiry marked as ${status}.`);
    }
}

/* ===================================================
   PRODUCTS
   =================================================== */
function renderProducts() {
    const grid = document.getElementById('admin-products-grid');
    const empty = document.getElementById('products-empty');

    if (products.length === 0) {
        grid.innerHTML = '';
        empty.style.display = 'flex';
    } else {
        empty.style.display = 'none';
        grid.innerHTML = products.map(p => {
            const hasImg = p.image;
            const imgHtml = hasImg
                ? `<img class="admin-product-img" src="${esc(p.image)}" alt="${esc(p.name)}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                   <div class="admin-product-img-placeholder" style="display:none;"><i class="fa-solid fa-box"></i></div>`
                : `<div class="admin-product-img-placeholder"><i class="fa-solid fa-box"></i></div>`;
            return `
                <div class="admin-product-card">
                    <span class="admin-product-category-tag">${esc(p.category)}</span>
                    ${imgHtml}
                    <div class="admin-product-info">
                        <div class="admin-product-badge">${esc(p.badge || 'General')}</div>
                        <div class="admin-product-name">${esc(p.name)}</div>
                        <div class="admin-product-desc">${esc(p.description)}</div>
                        <div class="admin-product-actions">
                            <button class="btn-admin-secondary" style="flex:1;justify-content:center;font-size:0.78rem;padding:0.4rem 0.7rem;" onclick="editProduct('${p.id}')">
                                <i class="fa-solid fa-pen"></i> Edit
                            </button>
                            <button class="btn-admin-danger" style="padding:0.4rem 0.8rem;" onclick="deleteProduct('${p.id}')">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
}

// Add product form
document.getElementById('show-add-product-form').addEventListener('click', () => {
    currentProductEditId = null;
    document.getElementById('product-form-title').innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Product';
    clearProductForm();
    document.getElementById('product-form-panel').classList.remove('hidden');
    document.getElementById('product-form-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

['hide-product-form', 'cancel-product-form'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        document.getElementById('product-form-panel').classList.add('hidden');
        currentProductEditId = null;
    });
});

function clearProductForm() {
    ['prod-name', 'prod-category', 'prod-badge', 'prod-description', 'prod-mfi', 'prod-density', 'prod-tensile', 'prod-image-url'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    document.getElementById('product-edit-id').value = '';
    document.getElementById('product-image-preview').classList.add('hidden');
    document.getElementById('product-image-prompt').style.display = 'flex';
}

window.editProduct = (id) => {
    const p = products.find(p => p.id === id);
    if (!p) return;
    currentProductEditId = id;
    document.getElementById('product-form-title').innerHTML = '<i class="fa-solid fa-pen"></i> Edit Product';
    document.getElementById('product-edit-id').value = id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-badge').value = p.badge || '';
    document.getElementById('prod-description').value = p.description;
    document.getElementById('prod-mfi').value = p.mfi || '';
    document.getElementById('prod-density').value = p.density || '';
    document.getElementById('prod-tensile').value = p.tensile || '';
    document.getElementById('prod-image-url').value = p.image || '';
    if (p.image) {
        const preview = document.getElementById('product-image-preview');
        preview.src = p.image;
        preview.classList.remove('hidden');
        document.getElementById('product-image-prompt').style.display = 'none';
    }
    document.getElementById('product-form-panel').classList.remove('hidden');
    document.getElementById('product-form-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.deleteProduct = (id) => {
    confirmAction('Delete Product', 'Permanently delete this product from the catalog?', () => {
        products = products.filter(p => p.id !== id);
        save(STORE.products, products);
        renderProducts();
        renderDashboard();
        showToast('Product deleted.');
    });
};

document.getElementById('save-product-btn').addEventListener('click', () => {
    const name = document.getElementById('prod-name').value.trim();
    const desc = document.getElementById('prod-description').value.trim();
    if (!name || !desc) { showToast('Product name and description are required.', true); return; }

    const imageUrl = document.getElementById('prod-image-url').value.trim() || '';

    const productData = {
        id: currentProductEditId || 'prod_' + Date.now(),
        name,
        category: document.getElementById('prod-category').value,
        badge: document.getElementById('prod-badge').value.trim() || 'General',
        description: desc,
        mfi: document.getElementById('prod-mfi').value.trim(),
        density: document.getElementById('prod-density').value.trim(),
        tensile: document.getElementById('prod-tensile').value.trim(),
        image: imageUrl,
    };

    if (currentProductEditId) {
        const idx = products.findIndex(p => p.id === currentProductEditId);
        if (idx !== -1) products[idx] = productData;
        showToast('Product updated successfully!');
    } else {
        products.push(productData);
        showToast('Product added successfully!');
    }

    save(STORE.products, products);
    renderProducts();
    renderDashboard();
    document.getElementById('product-form-panel').classList.add('hidden');
    clearProductForm();
    currentProductEditId = null;
});

// Image upload preview
const productImageZone = document.getElementById('product-image-zone');
const prodImageInput = document.getElementById('prod-image');

productImageZone.addEventListener('click', () => prodImageInput.click());

productImageZone.addEventListener('dragover', e => { e.preventDefault(); productImageZone.style.borderColor = 'var(--accent-teal)'; });
productImageZone.addEventListener('dragleave', () => { productImageZone.style.borderColor = ''; });
productImageZone.addEventListener('drop', e => {
    e.preventDefault();
    productImageZone.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file);
});

prodImageInput.addEventListener('change', () => {
    const file = prodImageInput.files[0];
    if (file) handleImageFile(file);
});

function handleImageFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const preview = document.getElementById('product-image-preview');
        preview.src = e.target.result;
        preview.classList.remove('hidden');
        document.getElementById('product-image-prompt').style.display = 'none';
        document.getElementById('prod-image-url').value = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Image URL preview on input
document.getElementById('prod-image-url').addEventListener('input', (e) => {
    const url = e.target.value.trim();
    const preview = document.getElementById('product-image-preview');
    if (url) {
        preview.src = url;
        preview.classList.remove('hidden');
        document.getElementById('product-image-prompt').style.display = 'none';
    } else {
        preview.classList.add('hidden');
        document.getElementById('product-image-prompt').style.display = 'flex';
    }
});

/* ===================================================
   INDUSTRIES
   =================================================== */
function renderIndustries() {
    const list = document.getElementById('industries-admin-list');
    const empty = document.getElementById('industries-empty');

    if (industries.length === 0) {
        list.innerHTML = '';
        empty.style.display = 'flex';
    } else {
        empty.style.display = 'none';
        list.innerHTML = industries.map(ind => `
            <div class="industry-admin-item">
                <div class="industry-admin-icon">
                    <i class="${esc(ind.icon)}"></i>
                </div>
                <div class="industry-admin-info">
                    <div class="industry-admin-name">${esc(ind.name)}</div>
                    <div class="industry-admin-desc">${esc(ind.description)}</div>
                    <div class="industry-admin-tags" style="margin-top:0.35rem;">
                        ${ind.tags.map(t => `<span class="industry-tag">${esc(t)}</span>`).join('')}
                    </div>
                </div>
                <div class="industry-admin-actions">
                    <button class="tbl-btn" title="Edit" onclick="editIndustry('${ind.id}')"><i class="fa-solid fa-pen"></i></button>
                    <button class="tbl-btn danger" title="Delete" onclick="deleteIndustry('${ind.id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `).join('');
    }
}

document.getElementById('show-add-industry-form').addEventListener('click', () => {
    currentIndustryEditId = null;
    document.getElementById('industry-form-title').innerHTML = '<i class="fa-solid fa-plus-circle"></i> Add New Industry';
    clearIndustryForm();
    document.getElementById('industry-form-panel').classList.remove('hidden');
    document.getElementById('industry-form-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

['hide-industry-form', 'cancel-industry-form'].forEach(id => {
    document.getElementById(id).addEventListener('click', () => {
        document.getElementById('industry-form-panel').classList.add('hidden');
        currentIndustryEditId = null;
    });
});

function clearIndustryForm() {
    ['ind-name', 'ind-icon', 'ind-description', 'ind-tags'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('industry-edit-id').value = '';
}

window.editIndustry = (id) => {
    const ind = industries.find(i => i.id === id);
    if (!ind) return;
    currentIndustryEditId = id;
    document.getElementById('industry-form-title').innerHTML = '<i class="fa-solid fa-pen"></i> Edit Industry';
    document.getElementById('industry-edit-id').value = id;
    document.getElementById('ind-name').value = ind.name;
    document.getElementById('ind-icon').value = ind.icon;
    document.getElementById('ind-description').value = ind.description;
    document.getElementById('ind-tags').value = ind.tags.join(', ');
    document.getElementById('industry-form-panel').classList.remove('hidden');
    document.getElementById('industry-form-panel').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.deleteIndustry = (id) => {
    confirmAction('Delete Industry', 'Permanently delete this industry entry?', () => {
        industries = industries.filter(i => i.id !== id);
        save(STORE.industries, industries);
        renderIndustries();
        renderDashboard();
        showToast('Industry deleted.');
    });
};

document.getElementById('save-industry-btn').addEventListener('click', () => {
    const name = document.getElementById('ind-name').value.trim();
    const icon = document.getElementById('ind-icon').value.trim();
    const desc = document.getElementById('ind-description').value.trim();
    if (!name || !icon || !desc) { showToast('Name, icon, and description are required.', true); return; }

    const tags = document.getElementById('ind-tags').value.split(',').map(t => t.trim()).filter(Boolean);

    const indData = {
        id: currentIndustryEditId || 'ind_' + Date.now(),
        name, icon, description: desc, tags
    };

    if (currentIndustryEditId) {
        const idx = industries.findIndex(i => i.id === currentIndustryEditId);
        if (idx !== -1) industries[idx] = indData;
        showToast('Industry updated successfully!');
    } else {
        industries.push(indData);
        showToast('Industry added successfully!');
    }

    save(STORE.industries, industries);
    renderIndustries();
    renderDashboard();
    document.getElementById('industry-form-panel').classList.add('hidden');
    clearIndustryForm();
    currentIndustryEditId = null;
});

/* ===================================================
   SETTINGS
   =================================================== */
function renderSettings() {
    const s = settings;
    setVal('set-hero-headline', s.heroHeadline);
    setVal('set-hero-subtext', s.heroSubtext);
    setVal('set-stat1-label', s.stat1Label);
    setVal('set-stat1-value', s.stat1Value);
    setVal('set-address', s.address);
    setVal('set-email1', s.email1);
    setVal('set-email2', s.email2);
    setVal('set-phone', s.phone);
    setVal('set-username', credentials.username);
}

function setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
}

document.getElementById('save-settings-btn').addEventListener('click', () => {
    settings = {
        heroHeadline: document.getElementById('set-hero-headline').value.trim(),
        heroSubtext: document.getElementById('set-hero-subtext').value.trim(),
        stat1Label: document.getElementById('set-stat1-label').value.trim(),
        stat1Value: document.getElementById('set-stat1-value').value.trim(),
        address: document.getElementById('set-address').value.trim(),
        email1: document.getElementById('set-email1').value.trim(),
        email2: document.getElementById('set-email2').value.trim(),
        phone: document.getElementById('set-phone').value.trim(),
    };
    save(STORE.settings, settings);
    showToast('Site settings saved!');
});

document.getElementById('reset-settings-btn').addEventListener('click', () => {
    confirmAction('Reset Settings', 'Reset all site settings to defaults?', () => {
        settings = { ...DEFAULT_SETTINGS };
        save(STORE.settings, settings);
        renderSettings();
        showToast('Settings reset to defaults.');
    });
});

document.getElementById('update-credentials-btn').addEventListener('click', () => {
    const currentPass = document.getElementById('set-current-pass').value;
    const newPass = document.getElementById('set-new-pass').value;
    const confirmPass = document.getElementById('set-confirm-pass').value;
    const newUsername = document.getElementById('set-username').value.trim();

    if (currentPass !== credentials.password) {
        showToast('Current password is incorrect.', true);
        return;
    }
    if (newPass && newPass !== confirmPass) {
        showToast('New passwords do not match.', true);
        return;
    }
    if (!newUsername) {
        showToast('Username cannot be empty.', true);
        return;
    }

    credentials.username = newUsername;
    if (newPass) credentials.password = newPass;
    save(STORE.credentials, credentials);
    document.getElementById('set-current-pass').value = '';
    document.getElementById('set-new-pass').value = '';
    document.getElementById('set-confirm-pass').value = '';
    showToast('Credentials updated successfully!');
});

/* ===================================================
   INTEGRATION: Receive inquiries from main site
   (The main website contact form should call
    window.storeInquiry(data) or we listen to localStorage)
   =================================================== */
window.addEventListener('storage', (e) => {
    if (e.key === STORE.inquiries) {
        inquiries = JSON.parse(e.newValue || '[]');
        renderDashboard();
    }
});

/* ===================================================
   HELPERS
   =================================================== */
function esc(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
    if (!dateStr) return '—';
    try {
        return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
}

/* ===================================================
   INIT
   =================================================== */
renderDashboard();
