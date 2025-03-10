document.addEventListener("DOMContentLoaded", () => {
    const ticketContainer = document.getElementById("ticketContainer");
    const addTicketBtn = document.getElementById("addTicket");

    // Task 2: Adding Support Tickets Dynamically
    addTicketBtn.addEventListener("click", addTicket);

    function addTicket() {
        // Get values from input fields
        const customerInput = document.getElementById("customerName");
        const issueInput = document.getElementById("issueDescription");
        const priorityInput = document.getElementById("priorityLevel");

        const customerName = customerInput.value.trim();
        const issueDescription = issueInput.value.trim();
        const priority = priorityInput.value;

        // Ensure fields are filled before creating a ticket
        if (customerName === "" || issueDescription === "") {
            alert("Please enter both customer name and issue description!");
            return;
        }

        // Create a new ticket element
        const ticket = document.createElement("div");
        ticket.classList.add("ticket");

        // Add priority class if it's high
        if (priority === "High") {
            ticket.classList.add("high-priority");
        }

        // Create and set elements for the ticket
        const nameElement = document.createElement("h3");
        nameElement.textContent = customerName;

        const issueElement = document.createElement("p");
        issueElement.textContent = issueDescription;

        const priorityElement = document.createElement("p");
        priorityElement.textContent = "Priority: " + priority;

        // Create resolve button
        const resolveBtn = document.createElement("button");
        resolveBtn.textContent = "Resolve";
        resolveBtn.classList.add("resolve-btn");

        // Task 4: Implementing Ticket Resolution with Event Bubbling
        resolveBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Prevents event bubbling
            ticketContainer.removeChild(ticket);
        });

        // Create edit button
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.classList.add("edit-btn");

         // Task 5: Inline Editing for Support Tickets
         editBtn.addEventListener("click", () => {
            enableEditing(ticket, nameElement, issueElement, priorityElement);
        });

        // Append elements to ticket
        ticket.appendChild(nameElement);
        ticket.appendChild(issueElement);
        ticket.appendChild(priorityElement);
        ticket.appendChild(editBtn);
        ticket.appendChild(resolveBtn);
        ticketContainer.appendChild(ticket);

        // Clear input fields after adding a ticket
        customerInput.value = "";
        issueInput.value = "";
    }

    // Task 5: Enable Inline Editing for Support Tickets
    function enableEditing(ticket, nameElement, issueElement, priorityElement) {
        const nameInput = document.createElement("input");
        nameInput.type = "text";
        nameInput.value = nameElement.textContent;

        const issueInput = document.createElement("input");
        issueInput.type = "text";
        issueInput.value = issueElement.textContent;

        const prioritySelect = document.createElement("select");
        ["Low", "Medium", "High"].forEach(level => {
            const option = document.createElement("option");
            option.value = level;
            option.textContent = level;
            if (level === priorityElement.textContent.replace("Priority: ", "")) {
                option.selected = true;
            }
            prioritySelect.appendChild(option);
        });

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.classList.add("save-btn");

        saveBtn.addEventListener("click", () => {
            nameElement.textContent = nameInput.value;
            issueElement.textContent = issueInput.value;
            priorityElement.textContent = "Priority: " + prioritySelect.value;

            ticket.replaceChild(nameElement, nameInput);
            ticket.replaceChild(issueElement, issueInput);
            ticket.replaceChild(priorityElement, prioritySelect);
            ticket.replaceChild(editBtn, saveBtn);
        });

        ticket.replaceChild(nameInput, nameElement);
        ticket.replaceChild(issueInput, issueElement);
        ticket.replaceChild(prioritySelect, priorityElement);
        ticket.replaceChild(saveBtn, ticket.querySelector(".edit-btn"));
    }

    // Task 4: Event Bubbling Demonstration
    ticketContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("ticket")) {
            console.log("Support ticket clicked!");
        }
    });