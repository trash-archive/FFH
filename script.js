// State management
let isLoaded = false;
let isBloomin = false;
let clickCount = 0;
let clickTimer = null;

// Initialize on page load
window.onload = () => {
    // Start initial flower growth animation
    setTimeout(() => {
        document.body.classList.remove("not-loaded");
        // Mark as loaded after initial animation completes (6 seconds for all elements)
        setTimeout(() => {
            isLoaded = true;
            console.log('Flowers fully loaded - easter egg now available');
        }, 6000);
    }, 1000);
};

// Triple-click detection for easter egg
document.body.addEventListener('click', function(e) {
    // Only allow activation after initial load is complete
    if (!isLoaded) {
        console.log('Still loading... please wait');
        return;
    }

    // Don't count clicks on the message or close button
    if (e.target.closest('.hani-message')) {
        return;
    }

    clickCount++;
    
    // Reset counter after 1 second of no clicks
    clearTimeout(clickTimer);
    clickTimer = setTimeout(() => {
        clickCount = 0;
    }, 1000);

    // Activate easter egg on 3rd click
    if (clickCount === 3) {
        activateEasterEgg();
        clickCount = 0;
    }
});

// Activate the easter egg (bloom then show message)
function activateEasterEgg() {
    if (isBloomin) {
        return; // Already blooming or bloomed
    }

    isBloomin = true;
    console.log('Easter egg activated - starting bloom animation');
    
    // Add blooming class to all flowers
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.classList.add('blooming');
    });

    // Wait for bloom animation to complete (1.2s transition time) then show message
    setTimeout(() => {
        showHaniMessage();
    }, 3000);
}

// Show the hidden message
function showHaniMessage() {
    const message = document.getElementById('haniMessage');
    message.classList.add('show');
    console.log('Showing hidden message');
}

// Close the hidden message and reverse bloom
function closeHaniMessage() {
    const message = document.getElementById('haniMessage');
    message.classList.remove('show');
    
    console.log('Closing message - starting unbloom animation');
    
    // Wait for message fade out, then trigger unbloom
    setTimeout(() => {
        unbloomFlowers();
    }, 500);
}

// Reverse the blooming animation
function unbloomFlowers() {
    const flowers = document.querySelectorAll('.flower');
    flowers.forEach(flower => {
        flower.classList.remove('blooming');
    });
    
    // Reset blooming state after animation completes
    setTimeout(() => {
        isBloomin = false;
        console.log('Flowers returned to non-bloomed state');
    }, 1200);
}

// Event listeners for close button
document.getElementById('closeBtn').addEventListener('click', closeHaniMessage);

// Also allow clicking on the message background to close
document.getElementById('haniMessage').addEventListener('click', function(e) {
    if (e.target === this) {
        closeHaniMessage();
    }
});

// Keyboard shortcut - ESC to close message
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const message = document.getElementById('haniMessage');
        if (message.classList.contains('show')) {
            closeHaniMessage();
        }
    }
});

// Debug helper - shows current state
window.addEventListener('keydown', function(e) {
    if (e.key === 'd' && e.ctrlKey) {
        console.log('Debug Info:', {
            isLoaded,
            isBloomin,
            clickCount
        });
    }
});