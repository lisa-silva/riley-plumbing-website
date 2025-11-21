// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    // Initialize animations
    initAnimations();
    
    // Initialize service recommender
    initServiceRecommender();
    
    // Initialize form handling
    initForms();
    
    // Initialize mobile menu
    initMobileMenu();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Service Recommender
function initServiceRecommender() {
    const problemButtons = document.querySelectorAll('.problem-btn');
    const solutionDiv = document.getElementById('problem-solution');
    
    const solutions = {
        'burst-pipe': {
            title: '🚰 Emergency Burst Pipe Repair',
            description: 'This is a plumbing emergency that needs immediate attention to prevent water damage.',
            actions: [
                'Shut off main water valve immediately',
                'Call our 24/7 emergency line: (510) 690-5197',
                'We\'ll dispatch a plumber within 60 minutes',
                'Typical repair time: 2-4 hours'
            ],
            price: '$200 - $800',
            urgency: 'HIGH'
        },
        'clogged-drain': {
            title: '🪠 Clogged Drain Clearing',
            description: 'We use professional drain snakes and hydro-jetting to clear stubborn clogs.',
            actions: [
                'Same-day service available',
                'Camera inspection to identify root cause',
                'Prevent future clogs with our maintenance plan',
                'Guaranteed to clear your drain'
            ],
            price: '$150 - $500',
            urgency: 'MEDIUM'
        },
        'no-hot-water': {
            title: '🔥 No Hot Water Repair',
            description: 'Water heater issues can range from simple fixes to full replacements.',
            actions: [
                'Diagnose water heater issue same-day',
                'Repair or replace as needed',
                'Energy-efficient options available',
                'All major brands serviced'
            ],
            price: '$100 - $600 (repair) | $800 - $2,500 (replace)',
            urgency: 'MEDIUM'
        },
        'leaking-faucet': {
            title: '💧 Leaking Faucet Repair',
            description: 'Fix annoying drips and save water with our faucet repair service.',
            actions: [
                'Fix most leaks in 1-2 hours',
                'Quality parts with warranty',
                'Save up to 10% on water bills',
                'Evening appointments available'
            ],
            price: '$75 - $250',
            urgency: 'LOW'
        },
        'running-toilet': {
            title: '🚽 Running Toilet Repair',
            description: 'Stop water waste and that annoying running sound.',
            actions: [
                'Fix internal components causing the run',
                'Replace flapper, fill valve as needed',
                'Check for leaks and seal properly',
                'Quiet operation restored'
            ],
            price: '$50 - $200',
            urgency: 'LOW'
        }
    };

    problemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const problem = this.dataset.problem;
            const solution = solutions[problem];
            
            if (solution) {
                solutionDiv.style.display = 'block';
                solutionDiv.innerHTML = `
                    <h3>${solution.title}</h3>
                    <p>${solution.description}</p>
                    <div class="urgency-badge ${solution.urgency.toLowerCase()}">${solution.urgency} PRIORITY</div>
                    <h4>What We'll Do:</h4>
                    <ul>
                        ${solution.actions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                    <div class="price-estimate">
                        <strong>Estimated Cost:</strong> ${solution.price}
                    </div>
                    <div class="solution-actions">
                        <button class="btn-primary" onclick="openEmergencyChat()">Schedule Repair</button>
                        <button class="btn-secondary" onclick="callNow()">Call Now: (510) 690-5197</button>
                    </div>
                `;
                
                // Scroll to solution
                solutionDiv.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Price Calculator
function updateEstimate() {
    const serviceType = document.getElementById('service-type').value;
    const urgency = document.getElementById('urgency').value;
    const resultDiv = document.getElementById('estimate-result');
    
    const prices = {
        'leaky-faucet': { standard: '$75 - $150', urgent: '$100 - $200', emergency: '$150 - $250' },
        'clogged-drain': { standard: '$150 - $300', urgent: '$200 - $400', emergency: '$250 - $500' },
        'water-heater': { standard: '$100 - $400', urgent: '$150 - $500', emergency: '$200 - $600' },
        'toilet-repair': { standard: '$50 - $150', urgent: '$75 - $200', emergency: '$100 - $250' },
        'pipe-repair': { standard: '$200 - $500', urgent: '$300 - $700', emergency: '$400 - $800' }
    };
    
    if (serviceType && prices[serviceType]) {
        const price = prices[serviceType][urgency] || prices[serviceType]['standard'];
        resultDiv.innerHTML = `
            <h3>Your Estimate</h3>
            <p class="estimate-price">${price}</p>
            <p><small>Final price may vary based on specific situation. No hidden fees.</small></p>
        `;
    } else {
        resultDiv.innerHTML = '<p>Select service type to see estimate</p>';
    }
}

// Emergency Chat Modal
function openEmergencyChat() {
    // In a real implementation, this would open a chat modal
    // For now, redirect to phone call
    window.location.href = 'tel:510-690-5197';
}

function openPriceCalculator() {
    document.querySelector('.price-calculator').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToServices() {
    document.querySelector('#services').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function callNow() {
    window.location.href = 'tel:510-690-5197';
}

function scheduleService() {
    document.querySelector('#contact').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Form Handling
function initForms() {
    const serviceForm = document.getElementById('service-request-form');
    
    if (serviceForm) {
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            
            // Show success message
            alert(`Thanks ${name}! We'll call you within 30 minutes to schedule your service.`);
            this.reset();
            
            // In real implementation, send to backend
            console.log('Form submitted:', Object.fromEntries(formData));
        });
    }
}

// Animations
function initAnimations() {
    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .review-card, .calculator').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Review Modal
function openReviewModal() {
    // In real implementation, open a review modal
    // For now, redirect to Yelp or show instructions
    alert('Please leave us a review on Yelp or Google! Your feedback helps us serve you better.');
}
