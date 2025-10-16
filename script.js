const stars = document.querySelectorAll("#stars span");
const comment = document.getElementById("comment");
const submitBtn = document.getElementById("submitBtn");
const feedbackItems = document.getElementById("feedbackItems");

let selectedRating = 0;

stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = star.dataset.value;
    updateStars(selectedRating);
  });
});

function updateStars(rating) {
  stars.forEach((s, index) => {
    s.classList.toggle("active", index < rating);
  });
}

submitBtn.addEventListener("click", () => {
  const feedbackText = comment.value.trim();
  if (selectedRating === 0 || feedbackText === "") {
    alert("⚠️ Please give a rating and write a comment!");
    return;
  }

  const feedback = {
    rating: selectedRating,
    text: feedbackText,
    date: new Date().toLocaleString(),
  };

  saveFeedback(feedback);
  displayFeedback();
  comment.value = "";
  selectedRating = 0;
  updateStars(0);
  alert("✅ Thank you for your feedback!");
});

function saveFeedback(feedback) {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
}

function displayFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbackItems.innerHTML = "";

  feedbacks.forEach((fb) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="stars-display">${"⭐".repeat(fb.rating)}</div>
      <p>${fb.text}</p>
      <small>${fb.date}</small>
    `;
    feedbackItems.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", displayFeedback);