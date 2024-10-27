document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
  
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchValue = document.getElementById("search").value;
      fetchUsers(searchValue);
    });
  
    function fetchUsers(query) {
      const url = `https://api.github.com/search/users?q=${query}`;
      fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then(response => response.json())
        .then(data => {
          displayUsers(data.items);
        })
        .catch(error => console.error('Error fetching users:', error));
    }
  
    function displayUsers(users) {
      userList.innerHTML = ""; // Clear previous results
      users.forEach(user => {
        const userItem = document.createElement("li");
        userItem.innerHTML = `
          <img class="avatar" src="${user.avatar_url}" alt="${user.login}">
          <a href="${user.html_url}" target="_blank">${user.login}</a>
        `;
        userItem.addEventListener("click", () => {
          fetchRepos(user.login);
        });
        userList.appendChild(userItem);
      });
    }
  
    function fetchRepos(username) {
      const url = `https://api.github.com/users/${username}/repos`;
      fetch(url, {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then(response => response.json())
        .then(data => {
          displayRepos(data);
        })
        .catch(error => console.error('Error fetching repos:', error));
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = ""; // Clear previous repos
      repos.forEach(repo => {
        const repoItem = document.createElement("li");
        repoItem.innerHTML = `
          <a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description || 'No description'}
        `;
        reposList.appendChild(repoItem);
      });
    }
  });
  