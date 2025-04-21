// script.js

// Get DOM elements
const newTitle = document.getElementById('new-title');
const newContent = document.getElementById('new-content');
const postsContainer = document.getElementById('posts-container');

// Initialize an empty array for posts
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Function to display posts
function displayPosts() {
  postsContainer.innerHTML = '';
  posts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <div class="post-actions">
        <button class="edit-btn" onclick="editPost(${index})">Edit</button>
        <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
      </div>
    `;
    postsContainer.appendChild(postElement);
  });
}

// Function to add a new post
function addPost() {
  const title = newTitle.value;
  const content = newContent.value;

  if (title && content) {
    const newPost = { title, content };
    posts.push(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));
    newTitle.value = '';
    newContent.value = '';
    displayPosts();
  } else {
    alert('Please fill out both fields');
  }
}

// Function to edit a post
function editPost(index) {
  const post = posts[index];
  newTitle.value = post.title;
  newContent.value = post.content;
  
  // Change the Add button to Update
  const addButton = document.querySelector('.post-form button');
  addButton.textContent = 'Update Post';
  addButton.setAttribute('onclick', `updatePost(${index})`);
}

// Function to update an existing post
function updatePost(index) {
  const title = newTitle.value;
  const content = newContent.value;

  if (title && content) {
    posts[index] = { title, content };
    localStorage.setItem('posts', JSON.stringify(posts));
    newTitle.value = '';
    newContent.value = '';
    
    // Change the button back to Add
    const addButton = document.querySelector('.post-form button');
    addButton.textContent = 'Add Post';
    addButton.setAttribute('onclick', 'addPost()');
    
    displayPosts();
  } else {
    alert('Please fill out both fields');
  }
}

// Function to delete a post
function deletePost(index) {
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  displayPosts();
}

// Initialize the display of posts
displayPosts();
