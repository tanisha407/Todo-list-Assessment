
// const API_URL = "http://localhost:5000/api/todos";

// window.onload = () => {
//   fetchTodos();

//   // Hide unimplemented features
//   document.getElementById("prevBtn").style.display = "none";
//   document.getElementById("nextBtn").style.display = "none";
//   document.getElementById("searchInput").style.display = "none";
//   document.getElementById("stats").style.display = "none";
// };

// // Fetch and display all todos
// function fetchTodos() {
//   fetch(API_URL)
//     .then(res => res.json())
//     .then(response => {
//       const data = response.data;
//       displayTodos(data);
//     })
//     .catch(err => {
//       console.error("Failed to fetch todos:", err);
//     });
// }

// // Display a list of todos
// function displayTodos(data) {
//   const container = document.getElementById("todo-list");
//   container.innerHTML = "";

//   data.forEach(todo => {
//     const div = document.createElement("div");
//     div.className = "todo";
//     div.innerHTML = `
//       <p><strong>${todo.title}</strong>: ${todo.description || ""}</p>
//       <p>Status: ${todo.status}</p>
//       <div class="todo-actions">
//         <button onclick="deleteTodo(${todo.id})">🗑 Delete</button>
//         ${todo.status === "pending" ? `<button onclick="updateTodo(${todo.id})">✅ Mark Completed</button>` : ""}
//       </div>
//     `;
//     container.appendChild(div);
//   });
// }

// // Add a new todo
// function addTodo() {
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;

//   if (!title) return alert("Title is required!");

//   fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title, description })
//   })
//     .then(res => res.json())
//     .then(() => {
//       document.getElementById("title").value = "";
//       document.getElementById("description").value = "";
//       fetchTodos();
//     })
//     .catch(err => {
//       console.error("Failed to add todo:", err);
//     });
// }

// // Delete a todo by ID
// function deleteTodo(id) {
//   fetch(`${API_URL}/${id}`, {
//     method: "DELETE"
//   })
//     .then(() => fetchTodos())
//     .catch(err => console.error("Failed to delete todo:", err));
// }

// // Mark a todo as completed
// function updateTodo(id) {
//   fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status: "completed" })
//   })
//     .then(() => fetchTodos())
//     .catch(err => console.error("Failed to update todo:", err));
// }

// // Filter todos by status (all, pending, completed)
// function filterTodos(status) {
//   fetch(API_URL)
//     .then(res => res.json())
//     .then(response => {
//       let data = response.data;

//       if (status === "pending") {
//         data = data.filter(todo => todo.status === "pending");
//       } else if (status === "completed") {
//         data = data.filter(todo => todo.status === "completed");
//       }

//       displayTodos(data);
//     })
//     .catch(err => {
//       console.error("Failed to filter todos:", err);
//     });
// }



// const API_URL = "http://localhost:5000/api/todos";
// let currentPage = 1;
// let totalTodos = 0;
// let currentFilter = "all";
// let currentSearch = "";

// // Load todos & stats on page load
// window.onload = () => {
//   fetchTodos();
//   fetchStats();
// };

// // Fetch todos with pagination, search, and filters
// // function fetchTodos() {
// //   let url = `${API_URL}?page=${currentPage}&limit=5`;
// //   if (currentSearch) url += `&search=${currentSearch}`;

// //   fetch(url)
// //     .then(res => res.json())
// //     .then(response => {
// //       let data = response.data;

// //       if (currentFilter === "pending") {
// //         data = data.filter(todo => todo.status === "pending");
// //       } else if (currentFilter === "completed") {
// //         data = data.filter(todo => todo.status === "completed");
// //       }

// //       const container = document.getElementById("todo-list");
// //       container.innerHTML = "";

// //       if (data.length === 0) {
// //         container.innerHTML = "<p>No tasks found.</p>";
// //         return;
// //       }

// //       data.forEach(todo => {
// //         const div = document.createElement("div");
// //         div.className = "todo";
// //         div.innerHTML = `
// //           <p><strong>${todo.title}</strong>: ${todo.description || ""}</p>
// //           <p>Status: ${todo.status}</p>
// //           <div class="todo-actions">
// //             <button onclick="deleteTodo(${todo.id})">🗑 Delete</button>
// //             ${todo.status === "pending" ? `<button onclick="updateTodo(${todo.id})">✅ Mark Completed</button>` : ""}
// //           </div>
// //         `;
// //         container.appendChild(div);
// //       });
// //     })
// //     .catch(err => {
// //       console.error("Failed to fetch todos:", err);
// //     });
// // }

// function fetchTodos() {
//   let url = `${API_URL}?page=${currentPage}&limit=5`;
//   if (currentSearch) url += `&search=${currentSearch}`;

//   fetch(url)
//     .then(res => res.json())
//     .then(response => {
//       let data = response.data;
//       let meta = response.meta;

//       if (currentFilter === "pending") {
//         data = data.filter(todo => todo.status === "pending");
//       } else if (currentFilter === "completed") {
//         data = data.filter(todo => todo.status === "completed");
//       }

//       const container = document.getElementById("todo-list");
//       container.innerHTML = "";

//       if (data.length === 0) {
//         container.innerHTML = "<p>No tasks found.</p>";
//         document.getElementById("prevBtn").style.display = "none";
//         document.getElementById("nextBtn").style.display = "none";
//         return;
//       }

//       data.forEach(todo => {
//         const div = document.createElement("div");
//         div.className = "todo";
//         div.innerHTML = `
//           <p><strong>${todo.title}</strong>: ${todo.description || ""}</p>
//           <p>Status: ${todo.status}</p>
//           <div class="todo-actions">
//             <button onclick="deleteTodo(${todo.id})">🗑 Delete</button>
//             ${todo.status === "pending" ? `<button onclick="updateTodo(${todo.id})">✅ Mark Completed</button>` : ""}
//           </div>
//         `;
//         container.appendChild(div);
//       });

//       // Show/hide pagination buttons
//       document.getElementById("prevBtn").style.display = meta.hasPrevPage ? "inline-block" : "none";
//       document.getElementById("nextBtn").style.display = meta.hasNextPage ? "inline-block" : "none";
//     })
//     .catch(err => {
//       console.error("Failed to fetch todos:", err);
//     });
// }


// // Add new todo
// function addTodo() {
//   const title = document.getElementById("title").value;
//   const description = document.getElementById("description").value;

//   if (!title) return alert("Title is required!");

//   fetch(API_URL, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ title, description })
//   })
//     .then(res => res.json())
//     .then(() => {
//       document.getElementById("title").value = "";
//       document.getElementById("description").value = "";
//       fetchTodos();
//       fetchStats();
//     })
//     .catch(err => console.error("Failed to add todo:", err));
// }

// // Delete a todo
// function deleteTodo(id) {
//   fetch(`${API_URL}/${id}`, { method: "DELETE" })
//     .then(() => {
//       fetchTodos();
//       fetchStats();
//     })
//     .catch(err => console.error("Failed to delete todo:", err));
// }

// // Mark as completed
// function updateTodo(id) {
//   fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status: "completed" })
//   })
//     .then(() => {
//       fetchTodos();
//       fetchStats();
//     })
//     .catch(err => console.error("Failed to update todo:", err));
// }

// // Pagination
// function nextPage() {
//   currentPage++;
//   fetchTodos();
// }

// function prevPage() {
//   if (currentPage > 1) {
//     currentPage--;
//     fetchTodos();
//   }
// }

// // Filter by status
// function filterTodos(status) {
//   currentFilter = status;
//   fetchTodos();
// }

// // Handle search
// function handleSearch() {
//   currentSearch = document.getElementById("searchInput").value.trim();
//   fetchTodos();
// }

// // Fetch completed/pending stats
// function fetchStats() {
//   fetch(`${API_URL}/stats`)
//     .then(res => res.json())
//     .then(response => {
//       const { pending, completed } = response.data;
//       document.getElementById("pending-count").textContent = pending;
//       document.getElementById("completed-count").textContent = completed;
//     })
//     .catch(err => {
//       console.error("Failed to fetch stats:", err);
//     });
// }


const API_URL = "http://localhost:5000/api/todos";
let currentPage = 1;
let currentFilter = "all";
let currentSearch = "";

// Load todos & stats on page load
window.onload = () => {
  fetchTodos();
  fetchStats();
};

// Fetch todos with pagination, search, and filters
function fetchTodos() {
  let url = `${API_URL}?page=${currentPage}&limit=5`;
  if (currentSearch) url += `&search=${encodeURIComponent(currentSearch)}`;

  fetch(url)
    .then(res => res.json())
    .then(response => {
      let data = response.data;
      let meta = response.meta;

      // Apply client-side filter
      if (currentFilter === "pending") {
        data = data.filter(todo => todo.status === "pending");
      } else if (currentFilter === "completed") {
        data = data.filter(todo => todo.status === "completed");
      }

      const container = document.getElementById("todo-list");
      container.innerHTML = "";

      if (data.length === 0) {
        container.innerHTML = "<p>No tasks found.</p>";
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        return;
      }

      data.forEach(todo => {
        const div = document.createElement("div");
        div.className = "todo";
        div.innerHTML = `
          <p><strong>${todo.title}</strong>: ${todo.description || ""}</p>
          <p>Status: ${todo.status}</p>
          <div class="todo-actions">
            <button onclick="deleteTodo(${todo.id})">🗑 Delete</button>
            ${todo.status === "pending" ? `<button onclick="updateTodo(${todo.id})">✅ Mark Completed</button>` : ""}
          </div>
        `;
        container.appendChild(div);
      });

      // Handle pagination buttons
      document.getElementById("prevBtn").style.display = meta.hasPrevPage ? "inline-block" : "none";
      document.getElementById("nextBtn").style.display = meta.hasNextPage ? "inline-block" : "none";
    })
    .catch(err => {
      console.error("Failed to fetch todos:", err);
    });
}

// Add new todo
function addTodo() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (!title) return alert("Title is required!");

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      fetchTodos();
      fetchStats();
    })
    .catch(err => console.error("Failed to add todo:", err));
}

// Delete a todo
function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, { method: "DELETE" })
    .then(() => {
      fetchTodos();
      fetchStats();
    })
    .catch(err => console.error("Failed to delete todo:", err));
}

// Mark a todo as completed
function updateTodo(id) {
  fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "completed" })
  })
    .then(() => {
      fetchTodos();
      fetchStats();
    })
    .catch(err => console.error("Failed to update todo:", err));
}

// Pagination buttons
function nextPage() {
  currentPage++;
  fetchTodos();
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchTodos();
  }
}

// Filter todos by status
function filterTodos(status) {
  currentFilter = status;
  currentPage = 1;
  fetchTodos();
}

// Search todos by keyword
function handleSearch() {
  currentSearch = document.getElementById("searchInput").value.trim();
  currentPage = 1;
  fetchTodos();
}

// Fetch stats for completed and pending tasks
function fetchStats() {
  fetch(`${API_URL}/stats`)
    .then(res => res.json())
    .then(response => {
      const { pending, completed } = response.data;
      document.getElementById("pending-count").textContent = pending;
      document.getElementById("completed-count").textContent = completed;
    })
    .catch(err => {
      console.error("Failed to fetch stats:", err);
    });
}
