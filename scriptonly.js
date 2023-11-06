        // JavaScript code
        const questionDatabases = {
            'Geography': [
                {
                    question: "1 What is the capital of France?",
                    options: [
                        { text: "Paris", correct: true },
                        { text: "Berlin", correct: false },
                        { text: "London", correct: false },
                        { text: "Madrid", correct: false },
                    ],
                    remark: "Paris is the capital of France."
                },
                {
                    question: "2 What is the capital of Nepal?",
                    options: [
                        { text: "Kathmandu", correct: true },
                        { text: "Berlin", correct: false },
                        { text: "London", correct: false },
                        { text: "Madrid", correct: false },
                    ],
                    remark: "Kathmandu is the capital of Nepal."
                },
                {
                    question: "3 What is the capital of India?",
                    options: [
                        { text: "Paris", correct: false },
                        { text: "New Delhi", correct: true },
                        { text: "London", correct: false },
                        { text: "Madrid", correct: false },
                    ],
                    remark: "New Delhi is the capital of India."
                },
                {
                    question: "4 What is the capital of China?",
                    options: [
                        { text: "Paris", correct: false },
                        { text: "Berlin", correct: false },
                        { text: "London", correct: false },
                        { text: "Beijing", correct: true },
                    ],
                    remark: "Beijing is the capital of China."
                },
                {
                    question: "5 What is the capital of Bangladesh?",
                    options: [
                        { text: "Paris", correct: false },
                        { text: "Berlin", correct: false },
                        { text: "Dhaka", correct: true },
                        { text: "Madrid", correct: false },
                    ],
                    remark: "Dhaka is the capital of Bangladesh."
                },
                // Add more questions and options for Geography category
            ],
            'History': [
                {
                    question: "1 What event triggered World War I?",
                    options: [
                        { text: "Assassination of Archduke Franz Ferdinand", correct: true },
                        { text: "Atomic bombing of Hiroshima", correct: false },
                        { text: "Discovery of America", correct: false },
                        { text: "French Revolution", correct: false },
                    ],
                    remark: "The assassination of Archduke Franz Ferdinand triggered World War I."
                },
                // Add more questions and options for History category
            ],
            // Add more categories as needed
        };

        const mixedCategories = {
            'Mixedquestions1': {
                'History': 0,
                'Geography': 5,
            },
            'Mixedquestions2': {
                'Geography': 0,
                'History': 0,
				'Mixedquestions1': 4,
            }
        };

        Object.keys(questionDatabases).forEach(category => {
            if (category.startsWith('Mixedquestions')) {
                delete questionDatabases[category];
            }
        });

        Object.keys(mixedCategories).forEach(mixedCategoryName => {
            const mixedCategoryConfig = mixedCategories[mixedCategoryName];
            const mixedCategoryQuestions = [];

            Object.keys(mixedCategoryConfig).forEach(category => {
                const categoryQuestions = questionDatabases[category];
                if (categoryQuestions) {
                    mixedCategoryQuestions.push(...categoryQuestions.slice(0, mixedCategoryConfig[category]));
                }
            });
            questionDatabases[mixedCategoryName] = mixedCategoryQuestions;
        });

        // Function to shuffle an array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Function to initialize the quiz
        function initializeQuiz() {
            // Get the selected category and shuffle flag from the data attributes
            const questionContainer = document.querySelector('.quiz');
            const selectedCategory = questionContainer.getAttribute('data-category');
            const shuffleQuestions = questionContainer.getAttribute('data-shuffle-questions') === 'true';

            // Shuffle questions if the shuffle flag is true
            if (shuffleQuestions) {
                shuffleArray(questionDatabases[selectedCategory]);
            }

            const submitButton = document.getElementById('submit-button');
            const scoreDisplay = document.getElementById('score-display');
            let score = 0; // Initialize the score variable
            const questions = questionDatabases[selectedCategory];

            questions.forEach((questionData, questionIndex) => {
                const questionElement = document.createElement('div');
                questionElement.classList.add('question');
                questionElement.innerHTML = `<p>${questionData.question}</p>`;

                questionData.options.forEach((optionData, optionIndex) => {
                    const optionElement = document.createElement('div');
                    optionElement.classList.add('option');
                    optionElement.textContent = optionData.text;
                    optionElement.setAttribute('data-correct', optionData.correct);

                    let answered = false; // Track if this question has been answered

                    optionElement.addEventListener('click', () => {
                        if (answered) {
                            return; // Do nothing if already answered
                        }

                        // Remove any previous selection
                        const options = questionElement.querySelectorAll('.option');
                        options.forEach(o => o.classList.remove('correct', 'incorrect'));

                        // Check if the clicked option is correct
                        if (optionData.correct) {
                            optionElement.classList.add('correct');
                            score++; // Increase the score for correct answers
                        } else {
                            optionElement.classList.add('incorrect');
                            // Find the correct answer and highlight it in green
                            const correctAnswer = questionElement.querySelector('.option[data-correct="true"]');
                            correctAnswer.classList.add('correct');
                        }

                        answered = true; // Set answered flag
                        options.forEach(o => {
                            o.style.pointerEvents = 'none'; // Disable click events on all options
                        });

                        // Show the remarks for the question
                        const remarkElement = questionElement.querySelector('.remark');
                        remarkElement.style.display = 'block';
						
						questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    });

                    questionElement.appendChild(optionElement);
                });

                // Add a remark element within each question's container
                if (questionData.remark) {
                    const remarkElement = document.createElement('p');
                    remarkElement.classList.add('remark');
                    remarkElement.textContent = questionData.remark;
                    remarkElement.style.display = 'none'; // Initially hidden
                    questionElement.appendChild(remarkElement);
                }

                questionContainer.appendChild(questionElement);
            });

            submitButton.addEventListener('click', () => {
                const scoreBox = document.querySelector('.score-box');
                scoreBox.style.display = 'block'; // Show the score box
                scoreDisplay.textContent = `Your Score: ${score} out of ${questions.length}`;

                // Scroll to the score display
                scoreBox.scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Call the initializeQuiz function to start the quiz
        initializeQuiz();
