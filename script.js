
let allEmployees = [];


async function fetchEmployees() {
    const loadingMessage = document.getElementById("loading-message");

    try {
        loadingMessage.style.display = "block";

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const users = await response.json();

        allEmployees = users;

        loadingMessage.style.display = "none";

        renderEmployees(allEmployees);

    } catch (error) {
        loadingMessage.style.display = "none";
        console.error("Failed to fetch employees:", error);
    }
}


function renderEmployees(employees) {
    const employeeContainer = document.getElementById("employee-container");

    employeeContainer.innerHTML = "";

    employees.forEach((user) => {
        const employeeCard = document.createElement("article");
        employeeCard.classList.add("employee-card");

        employeeCard.innerHTML = `
            <h3 class="employee-name">${user.name}</h3>
            <p class="employee-email">${user.email}</p>
            <p class="employee-phone">${user.phone}</p>
            <p class="employee-website">${user.website}</p>
            <p class="employee-company">${user.company.name}</p>
        `;

        employeeContainer.appendChild(employeeCard);
    });
}


function searchEmployees() {
    const searchValue = document
        .getElementById("search")
        .value.toLowerCase();

    const filteredEmployees = allEmployees.filter((employee) => {
        return (
            employee.name.toLowerCase().includes(searchValue) ||
            employee.email.toLowerCase().includes(searchValue)
        );
    });

    renderEmployees(filteredEmployees);
}


document
    .getElementById("search")
    .addEventListener("input", searchEmployees);


fetchEmployees();
