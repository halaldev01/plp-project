// JavaScript for handling the post creation form submission
document.getElementById('create-post-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the default form submission
  
  const title = document.getElementById('post-title').value;
  const imageUrl = document.getElementById('post-image').value;
  const content = document.getElementById('post-content').value;

  // Check if all fields are filled
  if (title && content) {
    // Create a post preview
    alert('Your post has been created successfully!');
    
    // For now, you can log the post content to the console (or you can send it to a server)
    console.log('Post Title:', title);
    console.log('Image URL:', imageUrl);
    console.log('Post Content:', content);

    // Optionally, store in localStorage or send it to a backend server

    // Clear form fields
    document.getElementById('post-title').value = '';
    document.getElementById('post-image').value = '';
    document.getElementById('post-content').value = '';
  } else {
    alert('Please fill in all required fields!');
  }
});

// Select DOM elements for comments
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');
const commentsList = document.querySelector('.comments-list');

// Function to create a comment element
function createComment(author, text) {
  const commentDiv = document.createElement('div');
  commentDiv.classList.add('comment');

  const commentAuthor = document.createElement('p');
  commentAuthor.classList.add('comment-author');
  commentAuthor.textContent = `${author}:`;

  const commentContent = document.createElement('p');
  commentContent.classList.add('comment-text');
  commentContent.textContent = text;

  commentDiv.appendChild(commentAuthor);
  commentDiv.appendChild(commentContent);

  return commentDiv;
}

// Event listener for comment form submission
commentForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  const comment = commentText.value.trim();

  if (comment !== "") {
    const newComment = createComment("Anonymous", comment);

    // Append the new comment to the comments section
    commentsList.appendChild(newComment);

    // Optionally save comments in localStorage
    saveComment(comment);

    // Clear the textarea after submission
    commentText.value = "";
  }
});

// Save comment to localStorage
function saveComment(comment) {
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));
}

// Load comments from localStorage
function loadComments() {
  const savedComments = JSON.parse(localStorage.getItem("comments")) || [];
  savedComments.forEach(comment => {
    const newComment = createComment("Anonymous", comment);
    commentsList.appendChild(newComment);
  });
}

// Load comments when the page is loaded
window.addEventListener('DOMContentLoaded', loadComments);
