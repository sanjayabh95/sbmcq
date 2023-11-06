// JavaScript code
        const questionDatabases = {
            &#39;Geography&#39;: [
                {
                    question: &quot;1 What is the capital of France?&quot;,
                    options: [
                        { text: &quot;Paris&quot;, correct: true },
                        { text: &quot;Berlin&quot;, correct: false },
                        { text: &quot;London&quot;, correct: false },
                        { text: &quot;Madrid&quot;, correct: false },
                    ],
                    remark: &quot;Paris is the capital of France.&quot;
                },
                {
                    question: &quot;2 What is the capital of Nepal?&quot;,
                    options: [
                        { text: &quot;Kathmandu&quot;, correct: true },
                        { text: &quot;Berlin&quot;, correct: false },
                        { text: &quot;London&quot;, correct: false },
                        { text: &quot;Madrid&quot;, correct: false },
                    ],
                    remark: &quot;Kathmandu is the capital of Nepal.&quot;
                },
                {
                    question: &quot;3 What is the capital of India?&quot;,
                    options: [
                        { text: &quot;Paris&quot;, correct: false },
                        { text: &quot;New Delhi&quot;, correct: true },
                        { text: &quot;London&quot;, correct: false },
                        { text: &quot;Madrid&quot;, correct: false },
                    ],
                    remark: &quot;New Delhi is the capital of India.&quot;
                },
                {
                    question: &quot;4 What is the capital of China?&quot;,
                    options: [
                        { text: &quot;Paris&quot;, correct: false },
                        { text: &quot;Berlin&quot;, correct: false },
                        { text: &quot;London&quot;, correct: false },
                        { text: &quot;Beijing&quot;, correct: true },
                    ],
                    remark: &quot;Beijing is the capital of China.&quot;
                },
                {
                    question: &quot;5 What is the capital of Bangladesh?&quot;,
                    options: [
                        { text: &quot;Paris&quot;, correct: false },
                        { text: &quot;Berlin&quot;, correct: false },
                        { text: &quot;Dhaka&quot;, correct: true },
                        { text: &quot;Madrid&quot;, correct: false },
                    ],
                    remark: &quot;Dhaka is the capital of Bangladesh.&quot;
                },
                // Add more questions and options for Geography category
            ],
            &#39;History&#39;: [
                {
                    question: &quot;1 What event triggered World War I?&quot;,
                    options: [
                        { text: &quot;Assassination of Archduke Franz Ferdinand&quot;, correct: true },
                        { text: &quot;Atomic bombing of Hiroshima&quot;, correct: false },
                        { text: &quot;Discovery of America&quot;, correct: false },
                        { text: &quot;French Revolution&quot;, correct: false },
                    ],
                    remark: &quot;The assassination of Archduke Franz Ferdinand triggered World War I.&quot;
                },
                // Add more questions and options for History category
            ],
            // Add more categories as needed
        };

        const mixedCategories = {
            &#39;Mixedquestions1&#39;: {
                &#39;History&#39;: 0,
                &#39;Geography&#39;: 5,
            },
            &#39;Mixedquestions2&#39;: {
                &#39;Geography&#39;: 0,
                &#39;History&#39;: 0,
				&#39;Mixedquestions1&#39;: 4,
            }
        };

        Object.keys(questionDatabases).forEach(category =&gt; {
            if (category.startsWith(&#39;Mixedquestions&#39;)) {
                delete questionDatabases[category];
            }
        });

        Object.keys(mixedCategories).forEach(mixedCategoryName =&gt; {
            const mixedCategoryConfig = mixedCategories[mixedCategoryName];
            const mixedCategoryQuestions = [];

            Object.keys(mixedCategoryConfig).forEach(category =&gt; {
                const categoryQuestions = questionDatabases[category];
                if (categoryQuestions) {
                    mixedCategoryQuestions.push(...categoryQuestions.slice(0, mixedCategoryConfig[category]));
                }
            });
            questionDatabases[mixedCategoryName] = mixedCategoryQuestions;
        });

        // Function to shuffle an array
        function shuffleArray(array) {
            for (let i = array.length - 1; i &gt; 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Function to initialize the quiz
        function initializeQuiz() {
            // Get the selected category and shuffle flag from the data attributes
            const questionContainer = document.querySelector(&#39;.quiz&#39;);
            const selectedCategory = questionContainer.getAttribute(&#39;data-category&#39;);
            const shuffleQuestions = questionContainer.getAttribute(&#39;data-shuffle-questions&#39;) === &#39;true&#39;;

            // Shuffle questions if the shuffle flag is true
            if (shuffleQuestions) {
                shuffleArray(questionDatabases[selectedCategory]);
            }

            const submitButton = document.getElementById(&#39;submit-button&#39;);
            const scoreDisplay = document.getElementById(&#39;score-display&#39;);
            let score = 0; // Initialize the score variable
            const questions = questionDatabases[selectedCategory];

            questions.forEach((questionData, questionIndex) =&gt; {
                const questionElement = document.createElement(&#39;div&#39;);
                questionElement.classList.add(&#39;question&#39;);
                questionElement.innerHTML = `<p>${questionData.question}</p>`;

                questionData.options.forEach((optionData, optionIndex) =&gt; {
                    const optionElement = document.createElement(&#39;div&#39;);
                    optionElement.classList.add(&#39;option&#39;);
                    optionElement.textContent = optionData.text;
                    optionElement.setAttribute(&#39;data-correct&#39;, optionData.correct);

                    let answered = false; // Track if this question has been answered

                    optionElement.addEventListener(&#39;click&#39;, () =&gt; {
                        if (answered) {
                            return; // Do nothing if already answered
                        }

                        // Remove any previous selection
                        const options = questionElement.querySelectorAll(&#39;.option&#39;);
                        options.forEach(o =&gt; o.classList.remove(&#39;correct&#39;, &#39;incorrect&#39;));

                        // Check if the clicked option is correct
                        if (optionData.correct) {
                            optionElement.classList.add(&#39;correct&#39;);
                            score++; // Increase the score for correct answers
                        } else {
                            optionElement.classList.add(&#39;incorrect&#39;);
                            // Find the correct answer and highlight it in green
                            const correctAnswer = questionElement.querySelector(&#39;.option[data-correct=&quot;true&quot;]&#39;);
                            correctAnswer.classList.add(&#39;correct&#39;);
                        }

                        answered = true; // Set answered flag
                        options.forEach(o =&gt; {
                            o.style.pointerEvents = &#39;none&#39;; // Disable click events on all options
                        });

                        // Show the remarks for the question
                        const remarkElement = questionElement.querySelector(&#39;.remark&#39;);
                        remarkElement.style.display = &#39;block&#39;;
						
						questionElement.scrollIntoView({ behavior: &#39;smooth&#39;, block: &#39;center&#39; });
                    });

                    questionElement.appendChild(optionElement);
                });

                // Add a remark element within each question&#39;s container
                if (questionData.remark) {
                    const remarkElement = document.createElement(&#39;p&#39;);
                    remarkElement.classList.add(&#39;remark&#39;);
                    remarkElement.textContent = questionData.remark;
                    remarkElement.style.display = &#39;none&#39;; // Initially hidden
                    questionElement.appendChild(remarkElement);
                }

                questionContainer.appendChild(questionElement);
            });

            submitButton.addEventListener(&#39;click&#39;, () =&gt; {
                const scoreBox = document.querySelector(&#39;.score-box&#39;);
                scoreBox.style.display = &#39;block&#39;; // Show the score box
                scoreDisplay.textContent = `Your Score: ${score} out of ${questions.length}`;

                // Scroll to the score display
                scoreBox.scrollIntoView({ behavior: &#39;smooth&#39;, block: &#39;center&#39; });
            });
        }

        // Call the initializeQuiz function to start the quiz
        initializeQuiz();