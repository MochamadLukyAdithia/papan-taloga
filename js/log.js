
      const gridSize = 10;
      const grid = document.getElementById("grid");
      const deck = document.getElementById("deck");
      let base = 3;
      let target = 27;
      let expectedLength = 3;
      let selectedCard = null;
      let cardCounts = {};
      let draggedCard = null;
      let draggedCardNumber = null;

      // Initialize card counts
      function resetCardCounts() {
        for (let i = 2; i <= 9; i++) {
          cardCounts[i] = 10;
        }
      }
      resetCardCounts();

      const problems = [
        { base: 2, target: 8, length: 3 },
        { base: 3, target: 27, length: 3 },
        { base: 4, target: 64, length: 3 },
        { base: 5, target: 125, length: 3 },
        { base: 6, target: 216, length: 3 },
        { base: 7, target: 49, length: 2 },
        { base: 7, target: 343, length: 3 },
        { base: 8, target: 64, length: 2 },
        { base: 4, target: 16, length: 2 },
        { base: 5, target: 25, length: 2 },
        { base: 8, target: 512, length: 3 },
        { base: 9, target: 81, length: 2 },
        { base: 2, target: 32, length: 5 },
      ];

      const updateSoal = () => {
        const randomProblem = problems[Math.floor(Math.random() * problems.length)];
        base = randomProblem.base;
        target = randomProblem.target;
        expectedLength = randomProblem.length;

        document.getElementById("base").textContent = base;
        document.getElementById("target").textContent = target;
      };

      const handleCellClick = (e) => {
        const cell = e.target;
        if (selectedCard !== null) {
          if (cell.textContent === "") {
            cell.textContent = selectedCard;
            cell.classList.add("filled", `filled-${selectedCard}`);
            cardCounts[selectedCard]--;
            updateCardDisplay(selectedCard);
            selectedCard = null;
            document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));
          }
        } else if (cell.textContent !== "") {
          const number = parseInt(cell.textContent);
          cell.textContent = "";
          cell.classList.remove("filled", `filled-${number}`);
          cardCounts[number]++;
          updateCardDisplay(number);
        }
      };

      const handleDragOver = (e) => {
        e.preventDefault();
        e.target.classList.add("drop-target");
      };

      const handleDragLeave = (e) => {
        e.target.classList.remove("drop-target");
      };

      const handleDrop = (e) => {
        e.preventDefault();
        const cell = e.target;
        cell.classList.remove("drop-target");

        if (draggedCardNumber !== null && cell.textContent === "") {
          cell.textContent = draggedCardNumber;
          cell.classList.add("filled", `filled-${draggedCardNumber}`);
          cardCounts[draggedCardNumber]--;
          updateCardDisplay(draggedCardNumber);
          draggedCardNumber = null;
        }
      };

      function createGrid() {
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < gridSize * gridSize; i++) {
          const cell = document.createElement("div");
          cell.className = "grid-cell w-10 h-10 flex items-center justify-center text-lg font-bold rounded-lg";
          cell.dataset.index = i;
          
          cell.addEventListener("click", handleCellClick);
          cell.addEventListener("dragover", handleDragOver);
          cell.addEventListener("dragleave", handleDragLeave);
          cell.addEventListener("drop", handleDrop);
          
          fragment.appendChild(cell);
        }
        
        grid.innerHTML = "";
        grid.appendChild(fragment);
      }

      function createDeck() {
        const fragment = document.createDocumentFragment();
        
        const colors = {
          2: "bg-gradient-to-br from-blue-500 to-blue-700",
          3: "bg-gradient-to-br from-orange-500 to-red-600",
          4: "bg-gradient-to-br from-purple-500 to-purple-700",
          5: "bg-gradient-to-br from-green-500 to-green-700",
          6: "bg-gradient-to-br from-cyan-500 to-cyan-700",
          7: "bg-gradient-to-br from-yellow-500 to-orange-600",
          8: "bg-gradient-to-br from-pink-500 to-rose-600",
          9: "bg-gradient-to-br from-gray-600 to-gray-800",
        };

        for (let i = 2; i <= 9; i++) {
          const cardContainer = document.createElement("div");
          cardContainer.className = "flex flex-col items-center";

          const cardStack = document.createElement("div");
          cardStack.className = "card-stack";
          cardStack.id = `stack-${i}`;

          for (let j = 0; j < 3; j++) {
            const card = document.createElement("div");
            card.className = `card ${colors[i]}`;
            card.textContent = i;
            card.setAttribute("data-number", i);
            card.draggable = true;

            card.addEventListener("dragstart", (e) => {
              if (cardCounts[i] > 0) {
                draggedCardNumber = i;
                e.dataTransfer.setData("text/plain", i.toString());
                card.classList.add("dragging");
              }
            });

            card.addEventListener("dragend", () => {
              card.classList.remove("dragging");
              draggedCardNumber = null;
            });

            cardStack.appendChild(card);
          }

          cardStack.addEventListener("click", () => {
            if (cardCounts[i] > 0) {
              document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));
              selectedCard = i;
              cardStack.children[0].classList.add("card-selected");
            }
          });

          const countLabel = document.createElement("div");
          countLabel.className = "text-sm font-bold text-white mt-2 glass-morphism px-3 py-1 rounded-full";
          countLabel.textContent = `×${cardCounts[i]}`;
          countLabel.id = `count-${i}`;

          cardContainer.appendChild(cardStack);
          cardContainer.appendChild(countLabel);
          fragment.appendChild(cardContainer);
        }
        
        deck.innerHTML = "";
        deck.appendChild(fragment);
      }

      function updateCardDisplay(number) {
        const stack = document.getElementById(`stack-${number}`);
        const count = cardCounts[number];
        const countLabel = document.getElementById(`count-${number}`);

        countLabel.textContent = `×${count}`;

        if (count === 0) {
          stack.style.opacity = "0.3";
          stack.style.cursor = "not-allowed";
        } else {
          stack.style.opacity = "1";
          stack.style.cursor = "pointer";
        }
      }

      function getMatrix() {
        const cells = document.querySelectorAll("#grid .grid-cell");
        const matrix = [];
        for (let r = 0; r < gridSize; r++) {
          matrix[r] = [];
          for (let c = 0; c < gridSize; c++) {
            const cellValue = cells[r * gridSize + c].textContent;
            matrix[r][c] = cellValue === "" ? null : parseInt(cellValue);
          }
        }
        return matrix;
      }

      function checkDiagonals(matrix, baseNumber, requiredLength) {
        for (let startRow = 0; startRow <= gridSize - requiredLength; startRow++) {
          for (let startCol = 0; startCol <= gridSize - requiredLength; startCol++) {
            let consecutiveCount = 0;
            for (let i = 0; i < requiredLength; i++) {
              if (matrix[startRow + i][startCol + i] === baseNumber) {
                consecutiveCount++;
              } else {
                break;
              }
            }
            if (consecutiveCount === requiredLength) return true;
          }
        }

        for (let startRow = 0; startRow <= gridSize - requiredLength; startRow++) {
          for (let startCol = requiredLength - 1; startCol < gridSize; startCol++) {
            let consecutiveCount = 0;
            for (let i = 0; i < requiredLength; i++) {
              if (matrix[startRow + i][startCol - i] === baseNumber) {
                consecutiveCount++;
              } else {
                break;
              }
            }
            if (consecutiveCount === requiredLength) return true;
          }
        }

        return false;
      }

      function clearGrid() {
        const cells = document.querySelectorAll("#grid .grid-cell");
        cells.forEach((cell) => {
          cell.textContent = "";
          cell.classList.remove("filled", ...cell.classList);
          cell.classList.add("grid-cell", "w-10", "h-10", "flex", "items-center", "justify-center", "text-lg", "font-bold", "rounded-lg");
        });

        selectedCard = null;
        document.querySelectorAll(".card-selected").forEach((c) => c.classList.remove("card-selected"));

        // Reset card counts and recreate deck
        resetCardCounts();
        createDeck();
        for (let i = 2; i <= 9; i++) {
          updateCardDisplay(i);
        }
      }

      function checkAnswer() {
        const matrix = getMatrix();
        const isCorrect = checkDiagonals(matrix, base, expectedLength);

        if (isCorrect) {
          const alertBox = document.getElementById("alertBox");
          alertBox.classList.remove("hidden");
          setTimeout(() => {
            alertBox.classList.add("hidden");
            clearGrid();
            updateSoal();
          }, 2000);
        } else {
          const wrongAlertBox = document.getElementById("wrongAlertBox");
          wrongAlertBox.classList.remove("hidden");
          setTimeout(() => {
            wrongAlertBox.classList.add("hidden");
          }, 1500);
        }
      }

      // Initialize game
      updateSoal();
      createGrid();
      createDeck();

      for (let i = 2; i <= 9; i++) {
        updateCardDisplay(i);
      }
