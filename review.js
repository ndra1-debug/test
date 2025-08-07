document.addEventListener('DOMContentLoaded', () => {
    const submitReviewBtn = document.getElementById('submit-review-btn');
    const nameInput = document.getElementById('name');
    const ratingInput = document.getElementById('rating');
    const reviewInput = document.getElementById('review');

    submitReviewBtn.addEventListener('click', () => {
        const review = {
            name: nameInput.value,
            rating: ratingInput.value,
            review: reviewInput.value
        };

        // In a real application, you would send this to a backend endpoint.
        console.log('Review submitted:', review);
        alert('Thank you for your review!');
    });
});
