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
