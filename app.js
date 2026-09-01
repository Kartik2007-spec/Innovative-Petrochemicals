document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       TECHNICAL SPECIFICATIONS DATASET
       ========================================================================== */
    const productData = {
        pp: {
            title: "Polypropylene (PP)",
            badge: "Virgin Resin",
            isEco: false,
            image: "assets/hero_granules.png",
            subtitle: "High-Purity Homopolymer & Copolymer Granules",
            description: "PolyNova's Polypropylene (PP) granules are processed to high-purity standards under tight temperature bounds, providing uniform molecular weight distribution. This yields high tensile yield strength and outstanding chemical resistance. Optimized for injection molding processes where thin walls, thermal dimensional stability, and hinge-bending properties are required. Excellent resistance to chemical solvents, bases, and acids.",
            specs: {
                "Melt Flow Index (MFI)": "12.0 - 25.0 g/10min (230°C / 2.16kg)",
                "Density": "0.90 - 0.91 g/cm³",
                "Tensile Yield Strength": "32 - 35 MPa",
                "Flexural Modulus": "1350 - 1500 MPa",
                "Izod Impact (Notched)": "3.5 - 5.0 kJ/m² (at 23°C)",
                "Melting Temperature": "163°C - 168°C"
            },
            applications: ["Automotive Bumpers & Interior Door Panels", "Thin-Walled Food Packaging Containers", "Consumer Housewares & Storage Bins", "Battery Housings & Industrial Covers", "Living Hinges & Snaps Assemblies"]
        },
        hdpe: {
            title: "High-Density Polyethylene (HDPE)",
            badge: "Virgin Resin",
            isEco: false,
            image: "assets/about_lab.png",
            subtitle: "High-Molecular-Weight Rigid Polymers",
            description: "Our HDPE granules are optimized for blow molding, pipe extrusion, and injection molding. They exhibit exceptional environmental stress-cracking resistance (ESCR), low-temperature impact strength, and high stiffness. Crucial for heavy-duty containers, chemical barrels, and high-pressure fluid transportation conduits where zero-leakage durability is paramount.",
            specs: {
                "Melt Flow Index (MFI)": "0.1 - 2.0 g/10min (190°C / 2.16kg)",
                "Density": "0.94 - 0.96 g/cm³",
                "Tensile Strength at Break": "22 - 28 MPa",
                "Flexural Modulus": "1000 - 1200 MPa",
                "Izod Impact (Notched)": "8.0 - 12.0 kJ/m² (at 23°C)",
                "Melting Temperature": "130°C - 135°C"
            },
            applications: ["Blow-molded Industrial Chemical Barrels", "High-Pressure Water & Gas Pipes", "Household Chemical Bottles (Detergents/Shampoos)", "Crates, Pallets, and Heavy Waste Bins", "Geomembranes for waste landfill containment systems"]
        },
        ldpe: {
            title: "Low-Density Polyethylene (LDPE)",
            badge: "Virgin Resin",
            isEco: false,
            image: "assets/about_factory.png",
            subtitle: "Highly Flexible Blown Film Polymers",
            description: "PolyNova LDPE granules deliver exceptional optical properties, high flexibility, and great melt strength, making them ideal for high-speed blown film co-extrusion. They provide excellent sealability, tear resistance, and barrier properties for medical, industrial, and food packaging packaging lines.",
            specs: {
                "Melt Flow Index (MFI)": "2.0 - 7.0 g/10min (190°C / 2.16kg)",
                "Density": "0.918 - 0.925 g/cm³",
                "Elongation at Break": "> 550%",
                "Tensile Yield Strength": "10 - 13 MPa",
                "Melting Temperature": "105°C - 115°C",
                "Film Haze Value": "< 5.5% (for 30 micron film)"
            },
            applications: ["High-speed Blown Packaging Film & Food Wrap", "Squeeze Bottles & Cosmetic Tubes", "Industrial Shrink wraps & Pallet covers", "Lamination & Barrier Coatings on Kraft paper", "Agricultural Mulching Protective Sleeves"]
        },
        lldpe: {
            title: "Linear Low-Density Polyethylene (LLDPE)",
            badge: "Compounded Compound",
            isEco: false,
            image: "assets/hero_granules.png",
            subtitle: "High-Tensile Blown Film & Linear Extrusion Polymers",
            description: "LLDPE granules provide high puncture resistance, tensile toughness, and flexibility compared to traditional LDPE. The linear molecular structure allows for thinner film designs (down-gauging) while maintaining high puncture strength, crucial for cargo stretch wrapping and heavy-duty shipping liners.",
            specs: {
                "Melt Flow Index (MFI)": "1.0 - 2.0 g/10min (190°C / 2.16kg)",
                "Density": "0.919 - 0.924 g/cm³",
                "Dart Impact Resistance": "120 - 150 g",
                "Tensile Tear Strength (MD/TD)": "140 / 350 g/25um",
                "Ultimate Elongation": "600 - 800%",
                "Melting Temperature": "120°C - 124°C"
            },
            applications: ["Pallet Cargo Stretch Films & Cling Wraps", "Heavy-Duty Soil & Fertilizers Bags", "Lining Membranes for Industrial Tanks", "Greenhouse Covering Films", "Injection Molded Flexible Caps and Closures"]
        },
        abs: {
            title: "Acrylonitrile Butadiene Styrene (ABS)",
            badge: "Engineering Resin",
            isEco: false,
            image: "assets/about_lab.png",
            subtitle: "High-Impact Rigid Engineering Compounds",
            description: "PolyNova engineering-grade ABS granules exhibit superior dimensional stability, impact strength, and structural rigidity. They showcase excellent scratch resistance and gloss levels, ensuring premium aesthetics for electronics housings, home appliances, and automotive interior panels.",
            specs: {
                "Melt Flow Index (MFI)": "15.0 - 30.0 g/10min (220°C / 10kg)",
                "Density": "1.04 - 1.06 g/cm³",
                "Tensile Strength at Yield": "42 - 48 MPa",
                "Izod Impact Strength (Notched)": "180 - 240 J/m (at 23°C)",
                "Vicat Softening Temp": "95°C - 105°C (50N, 50°C/h)",
                "Mold Shrinkage Rate": "0.4 - 0.7%"
            },
            applications: ["Consumer Electronic Housings (Routers, Monitors)", "Household Kitchen Appliance Trims & Parts", "Automotive Grilles & Decorative Interiors", "Toy Assemblies & Protective Helmets", "Structural Enclosures & Utility Spools"]
        },
        eco: {
            title: "EcoNova Bio-Granules (PLA/PHA)",
            badge: "Bio-Based Compostable",
            isEco: true,
            image: "assets/about_factory.png",
            subtitle: "100% Biodegradable & Compostable Starch Compounds",
            description: "PolyNova's flagship EcoNova line utilizes polylactic acid (PLA) blended with polyhydroxyalkanoate (PHA) to achieve standard structural polymer properties. Derived completely from organic starch sugars. Certified compostable under EN 13432 and ASTM D6400, leaving zero microplastic residue behind in soil environments.",
            specs: {
                "Melt Flow Index (MFI)": "3.0 - 8.0 g/10min (190°C / 2.16kg)",
                "Density": "1.24 - 1.25 g/cm³",
                "Tensile Strength at Yield": "50 - 60 MPa",
                "Flexural Modulus": "3000 - 3500 MPa",
                "Melting Point": "155°C - 165°C",
                "Bio-Based Carbon Content": "> 98%"
            },
            applications: ["Compostable Single-use Packaging Film", "Eco-friendly Organic Agricultural Mulch Films", "Disposable Cutlery & Catering Food Service Trays", "3D Printing Filaments & Structural Prototyping", "Organic Cosmetics Packaging Caps"]
        }
    };

    /* ==========================================================================
       HEADER & NAVIGATION CONTROL
       ========================================================================== */
    const header = document.getElementById('header');
    const navLinks = document.getElementById('nav-links');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Header scroll background glow
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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
        const scrollPosition = window.scrollY + 120; // offset header padding

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       SCROLL REVEAL (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       PRODUCT GRID FILTER
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state of buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const categoryFilter = button.getAttribute('data-filter');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (categoryFilter === 'all') {
                    card.style.display = 'flex';
                } else if (categoryFilter === 'eco') {
                    if (card.classList.contains('eco')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                } else {
                    if (cardCategory === categoryFilter) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    /* ==========================================================================
       SPECIFICATIONS DETAIL MODAL
       ========================================================================== */
    const modalOverlay = document.getElementById('detail-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalBody = document.getElementById('modal-body');

    function openProductModal(productId) {
        const product = productData[productId];
        if (!product) return;

        // Build specifications key-value table
        let specsHtml = '';
        for (const [key, value] of Object.entries(product.specs)) {
            specsHtml += `
                <div class="modal-spec-item">
                    <span class="label">${key}</span>
                    <span class="value">${value}</span>
                </div>
            `;
        }

        // Build typical applications list tags
        let appsHtml = '';
        product.applications.forEach(app => {
            appsHtml += `<span class="modal-app-tag">${app}</span>`;
        });

        // Set modal content HTML
        modalBody.innerHTML = `
            <div class="modal-header-section">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="modal-title-info">
                    <span class="modal-tag ${product.isEco ? 'eco' : ''}">${product.badge}</span>
                    <h3>${product.title}</h3>
                    <p class="subtitle">${product.subtitle}</p>
                </div>
            </div>
            
            <div class="modal-description">
                <p>${product.description}</p>
            </div>
            
            <h4 style="font-family: var(--font-heading); font-size: 1.2rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem; margin-top: 1rem;">Typical Material Specifications</h4>
            <div class="modal-specs-table">
                ${specsHtml}
            </div>
            
            <div class="modal-applications">
                <h4>Manufacturing End Applications</h4>
                <div class="modal-apps-list">
                    ${appsHtml}
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                <a href="#contact" class="btn btn-primary" style="flex: 1;" onclick="closeModalDirectly('${product.title}')">
                    Request Quote & Sample
                </a>
            </div>
        `;

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Attach listeners to product buttons
    document.querySelectorAll('.product-card').forEach(card => {
        const btn = card.querySelector('.open-modal-btn');
        const productId = card.getAttribute('data-product-id');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(productId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content area
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Handle closing modal when clicking request quote within modal
    window.closeModalDirectly = (productTitle) => {
        closeModal();
        
        // Auto-select product in contact form dropdown
        const formResin = document.getElementById('form-resin');
        if (formResin) {
            // Find option matching title keyword
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
    const toast = document.getElementById('toast-message');
    const toastText = document.getElementById('toast-text');
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    function showToast(message, isEco = false) {
        toastText.textContent = message;
        
        if (isEco) {
            toast.classList.add('eco');
        } else {
            toast.classList.remove('eco');
        }
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // Contact Form submission mockup
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = document.getElementById('form-submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Disable button during submitting simulation
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Processing Inquiry <i class="fa-solid fa-spinner fa-spin"></i>`;

        const company = document.getElementById('form-company').value;
        const resinSelected = document.getElementById('form-resin').value;

        setTimeout(() => {
            // Re-enable and reset form
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            showToast(`Thank you! Inquiry for ${resinSelected} granules has been sent on behalf of ${company}.`);
            contactForm.reset();
        }, 1500);
    });

    // Newsletter form submission mockup
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('newsletter-email').value;
        newsletterForm.reset();

        showToast(`Subscribed! Tech Bulletins will be sent to ${email}.`, true);
    });
});
