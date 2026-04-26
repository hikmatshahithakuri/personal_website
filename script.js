$(document).ready(function() {
    // Hide loading overlay
    setTimeout(function() {
        $('.loading-overlay').fadeOut(500);
    }, 1000);

    // AOS Animation Init
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .btn, .service-card, .project-card, .contact-info-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // Scroll Progress Bar
    $(window).scroll(function() {
        const winScroll = $(this).scrollTop();
        const height = $(document).height() - $(window).height();
        const scrolled = (winScroll / height) * 100;
        $('.scroll-progress-bar').css('width', scrolled + '%');
        
        // Show/hide scroll to top button
        if (winScroll > 500) {
            $('.scroll-up-btn').addClass('show');
        } else {
            $('.scroll-up-btn').removeClass('show');
        }
    });
    
    // Scroll to Top
    $('.scroll-up-btn').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
    });
    
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.sidebar').toggleClass('active');
        $(this).find('i').toggleClass('fa-bars fa-times');
    });
    
    // Close sidebar on link click (mobile)
    $('.sidebar-menu li a').click(function() {
        if ($(window).width() <= 991) {
            $('.sidebar').removeClass('active');
            $('.mobile-menu-toggle i').removeClass('fa-times').addClass('fa-bars');
        }
    });
    
    // Typing Animation
    const typedStrings = {
        en: ["Web Developer", "Graphic Designer", "Computer Technician", "Photographer", "Problem Solver"],
        np: ["वेब डेभलपर", "ग्राफिक डिजाइनर", "कम्प्युटर प्राविधिक", "फोटोग्राफर", "समस्या समाधानकर्ता"]
    };
    
    let currentLang = 'en';
    let typedInstance = null;
    
    function initTyping(lang) {
        if (typedInstance) {
            typedInstance.destroy();
        }
        typedInstance = new Typed(".typing", {
            strings: typedStrings[lang],
            typeSpeed: 100,
            backSpeed: 60,
            loop: true
        });
    }
    
    initTyping('en');
    
    // Language Toggle
    $('.lang-btn').click(function() {
        const lang = $(this).data('lang');
        currentLang = lang;
        
        $('.lang-btn').removeClass('active');
        $(this).addClass('active');
        
        if (lang === 'en') {
            $('.en').show();
            $('.np').hide();
        } else {
            $('.en').hide();
            $('.np').show();
        }
        
        initTyping(lang);
    });
    
    // Theme Toggle (Dark/Light Mode)
    const body = $('body');
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.addClass('dark-mode');
    }
    
    $('.theme-toggle').click(function() {
        body.toggleClass('dark-mode');
        localStorage.setItem('theme', body.hasClass('dark-mode') ? 'dark' : 'light');
    });
    
    // Color Picker
    $('.color-picker-trigger').click(function(e) {
        e.stopPropagation();
        $('.color-picker-panel').toggleClass('active');
    });
    
    $(document).click(function() {
        $('.color-picker-panel').removeClass('active');
    });
    
    $('.color-option').click(function(e) {
        e.stopPropagation();
        const color = $(this).data('color');
        document.documentElement.style.setProperty('--primary-color', color);
        
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        document.documentElement.style.setProperty('--primary-dark', `rgb(${r * 0.8}, ${g * 0.8}, ${b * 0.8})`);
        
        localStorage.setItem('themeColor', color);
        $('.color-picker-panel').removeClass('active');
    });
    
    // Load saved color
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        document.documentElement.style.setProperty('--primary-color', savedColor);
    }
    
    // Smooth scroll for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });
    
    // Skill bars animation on scroll
    let skillsAnimated = false;
    function animateSkills() {
        if (!skillsAnimated && $('#skills').length) {
            const skillsOffset = $('#skills').offset().top;
            const windowScroll = $(window).scrollTop();
            const windowHeight = $(window).height();
            
            if (windowScroll + windowHeight > skillsOffset + 100) {
                $('.progress').each(function() {
                    const parentBar = $(this).parent();
                    const skillInfo = parentBar.siblings('.skill-info');
                    const percentage = skillInfo.find('span:last-child').text();
                    $(this).css('width', percentage);
                });
                skillsAnimated = true;
            }
        }
    }
    
    $(window).on('scroll', animateSkills);
    animateSkills();
    
    // Active link highlighting
    $(window).scroll(function() {
        const scrollPos = $(this).scrollTop() + 100;
        $('section').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();
            if (scrollPos >= top && scrollPos <= bottom) {
                const id = $(this).attr('id');
                $('.sidebar-menu li a').removeClass('active');
                $('.sidebar-menu li a[href="#' + id + '"]').addClass('active');
            }
        });
    });
    
    // Input focus effects
    $('.form-group input, .form-group textarea, .form-group select').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Check for pre-filled inputs
    $('.form-group input, .form-group textarea, .form-group select').each(function() {
        if ($(this).val()) {
            $(this).parent().addClass('focused');
        }
    });
});

// ============================================
// EMAILJS INTEGRATION (Updated - All other features unchanged)
// ============================================

// Initialize EmailJS - REPLACE WITH YOUR PUBLIC KEY
// Go to EmailJS Dashboard → Account → API Keys → Copy Public Key
emailjs.init("MCwxCtmC5fN8smpz8");  // 🔁 यहाँ आफ्नो Public Key राख्नुहोस्

// Contact Form Handler with EmailJS
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    // Helper function to show toast notification
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toastNotification');
        if (!toast) return;
        
        const toastIcon = toast.querySelector('.toast-icon i');
        const toastTitle = toast.querySelector('.toast-content h4');
        const toastMessage = toast.querySelector('.toast-content p');
        
        if (type === 'success') {
            toastIcon.className = 'fas fa-check-circle';
            toastTitle.textContent = 'Success!';
            toast.style.borderLeftColor = '#2ecc71';
        } else {
            toastIcon.className = 'fas fa-exclamation-circle';
            toastTitle.textContent = 'Error!';
            toast.style.borderLeftColor = '#e74c3c';
        }
        
        toastMessage.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
        
        const closeBtn = toast.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.onclick = () => toast.classList.remove('show');
        }
    }
    
    // Helper function to show form status
    function showFormStatus(message, type) {
        if (!formStatus) return;
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
    
    // Helper function to escape HTML
    function escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const country = document.getElementById('country').value;
            const message = document.getElementById('message').value.trim();
            
            // Validation
            if (!name || !email || !message) {
                showFormStatus('Please fill in all required fields', 'error');
                showToast('Please fill in all required fields', 'error');
                return;
            }
            
            if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                showFormStatus('Please enter a valid email address', 'error');
                showToast('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Create email HTML for admin (you) - Same beautiful template
            const adminEmailHTML = `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; margin: 0; padding: 20px; }
                        .email-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 5px 20px rgba(0,0,0,0.1); }
                        .email-header { background: linear-gradient(135deg, #e74c3c, #c0392b); color: white; padding: 30px; text-align: center; }
                        .email-header h2 { margin: 0; font-size: 24px; }
                        .email-header p { margin: 10px 0 0; opacity: 0.9; }
                        .email-body { padding: 30px; }
                        .info-section { margin-bottom: 25px; }
                        .info-label { font-weight: bold; color: #e74c3c; margin-bottom: 5px; }
                        .info-value { background: #f8f9fa; padding: 10px 15px; border-radius: 8px; margin-top: 5px; }
                        .message-box { background: #fff3e0; padding: 20px; border-radius: 10px; border-left: 4px solid #e74c3c; margin-top: 20px; }
                        .reply-note { background: #e8f4fd; padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 14px; }
                        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
                    </style>
                </head>
                <body>
                    <div class="email-container">
                        <div class="email-header">
                            <h2>📬 New Contact Form Message</h2>
                            <p>From your portfolio website</p>
                        </div>
                        <div class="email-body">
                            <div class="info-section">
                                <div class="info-label">👤 Name:</div>
                                <div class="info-value">${escapeHtml(name)}</div>
                            </div>
                            <div class="info-section">
                                <div class="info-label">✉️ Email:</div>
                                <div class="info-value">${escapeHtml(email)}</div>
                            </div>
                            <div class="info-section">
                                <div class="info-label">📞 Phone:</div>
                                <div class="info-value">${escapeHtml(phone) || 'Not provided'}</div>
                            </div>
                            <div class="info-section">
                                <div class="info-label">🌍 Country:</div>
                                <div class="info-value">${escapeHtml(country) || 'Not specified'}</div>
                            </div>
                            <div class="info-section">
                                <div class="info-label">💬 Message:</div>
                                <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                            </div>
                            <div class="reply-note">
                                <strong>To reply to this message:</strong><br>
                                Simply click "Reply" in your email client. The sender's email address is: <strong>${escapeHtml(email)}</strong>
                            </div>
                        </div>
                        <div class="footer">
                            <p>This message was sent from your portfolio website contact form.</p>
                            <p>© ${new Date().getFullYear()} Hikmat Shahi Thakuri Portfolio</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            try {
                // Send email using EmailJS
                // REPLACE THESE THREE VALUES with your actual credentials from EmailJS
                const result = await emailjs.send(
                    'service_a3vjnog',      // 🔁 Service ID (from Email Services)
                    'template_rbzl5du',     // 🔁 Template ID (from Email Templates)
                    {
                        to_email: 'hikmatshahithakuri2076@gmail.com',
                        from_name: name,
                        from_email: email,
                        phone: phone || 'Not provided',
                        country: country || 'Not specified',
                        message: message,
                        html_body: adminEmailHTML
                    }
                );
                
                if (result && result.status === 200) {
                    showFormStatus('✓ Message sent successfully! you will receive reply on your email please check your email.', 'success');
                    showToast('Message sent successfully! I will check and reply soon.you will receive reply on your email please check your email.', 'success');
                    contactForm.reset();
                    
                    // Remove focused class from all inputs
                    document.querySelectorAll('.form-group').forEach(group => {
                        group.classList.remove('focused');
                    });
                } else {
                    throw new Error('Failed to send email');
                }
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                showFormStatus('❌ Failed to send message. Please try again or contact me directly.', 'error');
                showToast('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});