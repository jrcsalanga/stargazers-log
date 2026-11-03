const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function renderRepositories(repositories) {
  const fragment = document.createDocumentFragment();

  for (const repository of repositories) {
    const item = document.createElement("li");
    item.className = "repository";

    const heading = document.createElement("h2");
    const link = document.createElement("a");
    link.href = repository.url;
    link.textContent = repository.name;
    heading.append(link);

    const description = document.createElement("p");
    description.textContent = repository.description;

    const date = document.createElement("time");
    date.dateTime = repository.starred_at;
    date.textContent = `Starred on ${repository.starred_at}`;

    item.append(heading, description, date);
    fragment.append(item);
  }

  repositoryList.replaceChildren(fragment);
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a list.");
    }

    renderRepositories(repositories);
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    console.error("Could not load starred repositories:", error);
  }
}

loadRepositories();
