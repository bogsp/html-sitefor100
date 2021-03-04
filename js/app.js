// Register Plugins
gsap.registerPlugin(ScrollTrigger);

// Durations
const durationFast = .5;
const durationMid = .8;
const durationSlow = 1;
var staggerFrom = 'center';
if (screen.width <= 425) {
    staggerFrom = 'start';
}

// Utilities Animations
const fadeIn = (element, visibility = 1, display = 'block') => {
    element.style.display = display;
    gsap.fromTo(element, { opacity: 0 }, { opacity: visibility, duration: durationFast });
}

const fadeOut = (element, visibility = 1, display = 'block') => {
    gsap.fromTo(element, { opacity: visibility }, {
        opacity: 0,
        duration: durationFast,
        onComplete: () => {
            element.style.display = 'none';
        }
    });
}

// Content Animations
// fade in from top
const fadeFromTop = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        y: '-100%',
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from bottom
const fadeFromBottom = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        y: '100%',
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from left
const fadeFromLeft = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: '-100%',
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// fade in from right
const fadeFromRight = (element, del = 0, target = null, tf = false, sf = staggerFrom) => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: target ? target : element,
            start: tf ? 'top center' : 'top bottom',
            toggleActions: 'restart pause resume reverse'
        },
        x: '100%',
        opacity: 0,
        duration: durationFast,
        stagger: {
            from: sf,
            amount: durationFast
        },
        delay: del
    })
}

// Mobile Menu
const header = document.querySelector('header');
const logo = header.querySelectorAll('.logo');

const hamburger = header.querySelector('.hamburger');
hamburger.classList.add('closed');

const navLinksContainer = header.querySelector('.nav-links');
const navLinks = navLinksContainer.children;
gsap.to(navLinks, { opacity: 0, duration: 0 });

const overlay = header.querySelector('.overlay');
gsap.to(overlay, { x: 100, opacity: 0, duration: 0 });

const openMobileNav = () => {
    gsap.to(overlay, { x: 0, opacity: 1, duration: .3 })
    gsap.to(navLinks, { x: 0, opacity: 1, stagger: .1, duration: .2 });
}

const closeMobileNav = () => {
    gsap.to(navLinks, { x: '500%', opacity: 0, duration: .5, stagger: 0 })
    gsap.to(overlay, { x: '100%', opacity: 0, duration: durationFast });
}

if (screen.width <= 425) {

    hamburger.addEventListener('click', () => {
        if (hamburger.classList.contains('closed') && !hamburger.classList.contains('open')) {
            hamburger.classList.add('open');
            hamburger.classList.remove('closed');
            openMobileNav();
            navLinksContainer.style.pointerEvents = 'all';
        } else {
            hamburger.classList.remove('open');
            hamburger.classList.add('closed');
            closeMobileNav();
            navLinksContainer.style.pointerEvents = 'none';
        }
    });
} else {
    gsap.to(navLinks, { opacity: 1, duration: 0 });
    gsap.from(header, { y: -150, duration: durationFast, delay: .5 })
}

// Footer
const footer = document.querySelector('footer');
if (footer) {
    const copyright = footer.querySelector('.copyright');
    fadeFromBottom(copyright, .5, footer);

    const social = footer.querySelector('.social').children;
    fadeFromBottom(social, .5, footer, false, 'end');

}

// Slider
const slider = document.querySelector('#slider');
if (slider) {

    // Slider Variables
    var slides = [];
    var currentSlide = null;
    var previousSlide = null;
    var slideCount = 0;
    var slideCounter = 0;
    var slideDuration = 1.5;
    if (screen.width <= 425) slideDuration = 1;
    var slideDelay = 10;

    // Slider Functions
    const moveToRight = slide => {
        gsap.to(slide.slide, { x: '100%', opacity: 1, duration: 0 });
        gsap.to(slide.slideImage, { x: '100%', opacity: 0, duration: 0 });
        gsap.to(slide.slideCopy, { x: '-100%', opacity: 0, duration: 0 });
    }

    // DOM Elements
    const _slides = slider.querySelectorAll('.slide');
    slideCount = _slides.length;

    _slides.forEach((slide, index) => {
        var slideItem = {
            'slide': slide,
            'slideCopy': slide.querySelector('.slide-copy').children,
            'slideImage': slide.querySelector('.slide-img')
        }
        if (index > 0) {
            moveToRight(slideItem);
        }
        slides.push(slideItem);
    })


    const playSlide = slide => {

        gsap.to(currentSlide.slide, {
            x: '-100%',
            duration: slideDuration,
            onComplete: () => {
                moveToRight(currentSlide);

                // set previous slide
                previousSlide = currentSlide;

                // set current slide
                currentSlide = slide;
            }
        })

        var tl = gsap.timeline()
            .to(slide.slide, {
                x: 0,
                duration: slideDuration,
            })
            .to(slide.slideImage, { x: 0, opacity: 1, duration: durationFast })
            .to(slide.slideCopy, { x: 0, opacity: 1, duration: durationFast, stagger: .2, delay: durationFast * -1 });

        timer.restart(true);
    };

    const autoplay = () => {
        // set currentSlide if null
        if (!currentSlide) currentSlide = slides[slideCounter];

        slideCounter++;
        if (slideCounter >= slideCount) slideCounter = 0;

        playSlide(slides[slideCounter]);
    };
    // Timer
    const timer = gsap.delayedCall(slideDelay, autoplay);
    var initSlide = gsap.timeline({ delay: 1 })
        .from(slides[0].slideImage, { x: '100%', opacity: 0, duration: durationFast })
        .from(slides[0].slideCopy, { x: '-100%', opacity: 0, duration: durationFast, stagger: .2, delay: durationFast * -1 });

}

// Section Animations
// Hero Section
const hero = document.querySelector('#hero');
if (hero) {
    const heroChildren = hero.querySelector('.grid-content').children;
    gsap.from(heroChildren, {
        y: 100,
        opacity: 0,
        duration: durationFast,
        stagger: .2,
        delay: durationSlow
    })
}

// Blurbs Section
const blurbsContainer = document.querySelector('#blurbs');
if (blurbsContainer) {
    const blurbsText = blurbsContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(blurbsText);
    const blurbs = blurbsContainer.querySelectorAll('.blurb-container .blurb');
    fadeFromBottom(blurbs, 0, blurbsContainer);

}

// gallery Section
const galleryContainer = document.querySelector('#gallery');
if (galleryContainer) {
    const galleryText = galleryContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(galleryText);
    const gallery = galleryContainer.querySelectorAll('.gallery-container .gallery-img');
    fadeFromBottom(gallery, durationFast, galleryContainer);

    // Lightbox
    var elem = document.createElement("img");
    const lightbox = document.querySelector('.lightbox');

    const showLightbox = (src) => {
        fadeIn(lightbox);
        lightbox.appendChild(elem);
        elem.src = src;
    }

    lightbox.addEventListener('click', () => {
        fadeOut(lightbox);
    });

    gallery.forEach(element => {

        element.addEventListener('click', () => {
            showLightbox(element.querySelector('img').src);
        })
    });
}

// pricing Section
const pricingContainer = document.querySelector('#pricing');
if (pricingContainer) {
    const pricingText = pricingContainer.querySelectorAll('.fade-from-bottom');
    fadeFromBottom(pricingText);
    const pricing = pricingContainer.querySelectorAll('.blurb-container .blurb')
    fadeFromBottom(pricing, durationFast, pricingContainer);
}

// About Section
const aboutContainer = document.querySelector('#about');
if (aboutContainer) {
    const aboutSpecial = aboutContainer.querySelector('.about-headline');
    fadeFromLeft(aboutSpecial);

    const aboutContent = aboutContainer.querySelector('.about-content').children;
    fadeFromBottom(aboutContent, 0, null, false, 'start');

    const aboutProfile = aboutContainer.querySelector('.about-profile');
    fadeFromRight(aboutProfile);
}

// Contact Section
const contactContainer = document.querySelector('#contact');
if (contactContainer) {
    const contactSpecial = contactContainer.querySelector('.contact-headline');
    fadeFromLeft(contactSpecial);

    const contactContent = contactContainer.querySelector('.contact-content').children;
    fadeFromLeft(contactContent, 0, null, false, 'start');

    const contactForm = contactContainer.querySelector('.form-container');
    fadeFromRight(contactForm);
}