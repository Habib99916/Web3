// Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Category Selector
        const categoryButtons = document.querySelectorAll('.season-btn');
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Animation
                button.style.transform = 'translateY(-3px) scale(1.05)';
                setTimeout(() => {
                    button.style.transform = 'translateY(-3px)';
                }, 200);
            });
        });

        // Watchlist Button
        const watchlistButton = document.querySelector('.follow-btn');
        watchlistButton.addEventListener('click', () => {
            if (watchlistButton.classList.contains('following')) {
                watchlistButton.classList.remove('following');
                watchlistButton.innerHTML = '<i class="fas fa-plus"></i> Add to Watchlist';
            } else {
                watchlistButton.classList.add('following');
                watchlistButton.innerHTML = '<i class="fas fa-check"></i> In Watchlist';
            }
        });

        // Poll Voting
        const pollOptions = document.querySelectorAll('.poll-option');
        pollOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Get current votes
                const votesElement = option.querySelector('.poll-votes');
                let votes = parseInt(votesElement.textContent.replace(/\D/g, ''));
                
                // Increase votes
                votes += Math.floor(Math.random() * 100) + 1; // Random increment for demo
                votesElement.textContent = votes.toLocaleString() + ' votes';
                
                // Update bar width based on new votes
                const totalVotes = Array.from(pollOptions).reduce((total, opt) => {
                    return total + parseInt(opt.querySelector('.poll-votes').textContent.replace(/\D/g, ''));
                }, 0);
                
                const percentage = Math.round((votes / totalVotes) * 100);
                option.querySelector('.poll-bar').style.width = percentage + '%';
                
                // Visual feedback
                option.style.transform = 'translateY(-5px) scale(1.02)';
                setTimeout(() => {
                    option.style.transform = 'translateY(-5px)';
                }, 200);
            });
        });

        // Video Player Modal
        const videoModal = document.getElementById('videoModal');
        const videoFrame = document.getElementById('videoFrame');
        const videoModalTitle = document.getElementById('videoModalTitle');
        const playButtons = document.querySelectorAll('.play-btn');
        const closeModal = document.querySelector('.close-modal');

        playButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const movieCard = button.closest('.movie-card');
                const videoId = movieCard.getAttribute('data-video-id');
                const title = movieCard.getAttribute('data-title');
                
                // For demo purposes, we're using a placeholder video
                const demoVideoId = 'dQw4w9WgXcQ'; // YouTube video ID
                
                videoFrame.src = `https://www.youtube.com/embed/${demoVideoId}?autoplay=1`;
                videoModalTitle.textContent = title;
                videoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        closeModal.addEventListener('click', () => {
            videoModal.classList.remove('active');
            videoFrame.src = '';
            document.body.style.overflow = 'auto';
        });

        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                videoFrame.src = '';
                document.body.style.overflow = 'auto';
            }
        });

        // Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.stat-card, .movie-card, .news-card');
            
            elements.forEach((element, index) => {
                const elementPosition = element.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.2;
                
                if (elementPosition < screenPosition) {
                    element.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
                }
            });
        };

        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('load', animateOnScroll);

        // Search Functionality
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        const searchResults = document.querySelector('.search-results');

        // Debounce function for better performance
        const debounce = (func, delay) => {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func.apply(this, args), delay);
            };
        };

        const performSearch = debounce((searchTerm) => {
            if (searchTerm.length > 2) {
                // Mock API call
                const mockResults = [
                    { title: 'Interstellar', type: 'Movie', year: 2014 },
                    { title: 'Inception', type: 'Movie', year: 2010 },
                    { title: 'The Dark Knight', type: 'Movie', year: 2008 },
                    { title: 'Pulp Fiction', type: 'Movie', year: 1994 },
                    { title: 'The Shawshank Redemption', type: 'Movie', year: 1994 },
                    { title: 'Dune: Part Two', type: 'Movie', year: 2023 },
                    { title: 'Oppenheimer', type: 'Movie', year: 2023 }
                ].filter(item => 
                    item.title.toLowerCase().includes(searchTerm.toLowerCase())
                );

                displayResults(mockResults);
            } else {
                searchResults.style.display = 'none';
            }
        }, 300);

        function displayResults(results) {
            searchResults.innerHTML = '';
            
            if (results.length > 0) {
                searchResults.style.display = 'block';
                results.forEach(result => {
                    const item = document.createElement('div');
                    item.className = 'search-item';
                    item.innerHTML = `
                        <strong>${result.title}</strong>
                        <span>${result.type} (${result.year})</span>
                    `;
                    item.addEventListener('click', () => {
                        alert(`Selected: ${result.title}`);
                        searchInput.value = result.title;
                        searchResults.style.display = 'none';
                    });
                    searchResults.appendChild(item);
                });
            } else {
                searchResults.style.display = 'none';
            }
        }

        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) performSearch(searchTerm);
        });

        searchInput.addEventListener('input', (e) => {
            performSearch(e.target.value.trim());
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                searchResults.style.display = 'none';
            }
        });