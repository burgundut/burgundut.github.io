// Phrases to display
const phrases = [
    "Benevolence Unleashed: Radiant, Grateful, Unstoppable, Nobility Determined, Yourself",
    "Brightly Unveiling Resilience, Growth, Uniqueness, Nobility, Determination, Youthful",
    "Breaking Uncharted Realms, Guiding Unwavering Navigators, Determined, Yule",
    // Add more phrases as needed
];

// Function to generate a random phrase from the array
function generateRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    const randomPhrase = phrases[randomIndex];

    // Split the phrase into words
    const words = randomPhrase.split(' ');

    // Create HTML for the styled phrase with line breaks
    const styledPhrase = words.map(word => `<span class="first-letter">${word.charAt(0)}</span>${word.slice(1)}<br>`).join('');

    document.getElementById("random-phrase").innerHTML = styledPhrase;
}

// Run the generation function when the page loads
window.onload = generateRandomPhrase;

// Load JSON data from the "projects.json" file
fetch('projects.json')
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById('cardContainer');
        const categoryFilter = document.getElementById("categoryFilter");
        const subcategoryFilter = document.getElementById("subcategoryFilter");

        // Define a list of categories and their corresponding subcategories
        const categories = [
            {
                name: "Python",
                subcategories: ["Data Science", "Games", "Automation", "AI / ML"]
            },
            {
                name: "React",
                subcategories: ["Microinteractions", "Loaders", "Animations", "Carousels / Sliders", "Menus", "Forms", "Modals / Pop-up's"]
            },
            {
                name: "Full-Stack",
                subcategories: ["Phishing / Clones", "Redesign"]
            }
        ];

        // Function to populate the category dropdown
        function populateCategoryDropdown() {
            categoryFilter.innerHTML = '<option value="All">All</option>';
            categories.forEach(category => {
                categoryFilter.innerHTML += `<option value="${category.name}">${category.name}</option>`;
            });
        }

        // Function to update the subcategory dropdown based on the selected category
        function updateSubcategoryDropdown(selectedCategory) {
            subcategoryFilter.innerHTML = '<option value="All">All</option>';
            if (selectedCategory !== 'All') {
                const selectedCategoryObj = categories.find(category => category.name === selectedCategory);
                selectedCategoryObj.subcategories.forEach(subcategory => {
                    subcategoryFilter.innerHTML += `<option value="${subcategory}">${subcategory}</option>`;
                });
            }
        }

        // Function to create a project card
        function createProjectCard(project) {
            const card = document.createElement("div");
            card.className = "card";

            const image = document.createElement("img");
            image.className = "img";
            image.src = project.image;
            image.alt = project.title;

            const icon = document.createElement("div");
            const iconImage = document.createElement("img");
            iconImage.className = "icon";
            iconImage.src = project.icon;
            iconImage.alt = "Console Icon";
            icon.appendChild(iconImage);

            const iconHover = document.createElement("div");
            iconHover.className = "iconHover";

            const eyeIcon = document.createElement("img");
            eyeIcon.src = "./assets/eye.png";
            eyeIcon.alt = "Eye Icon";
            eyeIcon.style.cursor = "pointer";

            eyeIcon.addEventListener("click", function () {
                const videoLink = project.videoLink;
                const videoFrame = document.getElementById("videoFrame");
                videoFrame.src = videoLink;

                const modal = document.getElementById("videoModal");
                const overlay = document.getElementById("modalOverlay");
                modal.style.display = "block";
                overlay.style.display = "block";

                const closeButton = document.getElementById("closeVideo");
                closeButton.addEventListener("click", function () {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                    videoFrame.src = ""; // Stop the video
                });

                overlay.addEventListener("click", function () {
                    modal.style.display = "none";
                    overlay.style.display = "none";
                    videoFrame.src = ""; // Stop the video
                });
            });

            const codeIcon = document.createElement("img");
            codeIcon.src = "./assets/code.png";
            codeIcon.alt = "Code Icon";
            codeIcon.style.cursor = "pointer";

            codeIcon.addEventListener("click", function () {
                window.open(project.link, '_blank');
            });

            iconHover.appendChild(eyeIcon);
            iconHover.appendChild(codeIcon);

            card.appendChild(image);
            card.appendChild(icon);
            card.appendChild(iconHover);

            return card;
        }

        // Event listener for category dropdown
        categoryFilter.addEventListener('change', () => {
            const selectedCategory = categoryFilter.value;
            updateSubcategoryDropdown(selectedCategory);
            filterAndDisplayProjects(selectedCategory, subcategoryFilter.value, data);
        });

        // Event listener for subcategory dropdown
        subcategoryFilter.addEventListener('change', () => {
            const selectedCategory = categoryFilter.value;
            const selectedSubcategory = subcategoryFilter.value;
            filterAndDisplayProjects(selectedCategory, selectedSubcategory, data);
        });

        // Function to filter and display projects based on the selected category and subcategory
        function filterAndDisplayProjects(selectedCategory, selectedSubcategory, data) {
            // Clear the previous projects from cardContainer
            cardContainer.innerHTML = '';

            // Filter the projects and render them
            data.projects.forEach(project => {
                if (
                    (selectedCategory === "All" || project.category === selectedCategory) &&
                    (selectedSubcategory === "All" || project.subcategory === selectedSubcategory)
                ) {
                    const projectCard = createProjectCard(project);
                    cardContainer.appendChild(projectCard);
                }
            });
        }

        // Initialize the category dropdown and display all projects by default
        populateCategoryDropdown();
        filterAndDisplayProjects('All', 'All', data);
    })
    .catch(error => {
        console.error("Error loading JSON data: " + error);
    });

