document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('uploadForm');
    const message = document.getElementById('message');
    const videosList = document.getElementById('videosList');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const thumbnail = document.getElementById('thumbnail').value;
        const video_id = document.getElementById('video_id').value;

        // Validate form inputs
        if (!title || !thumbnail || !video_id) {
            message.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Please fill out all fields.
                </div>
            `;
            return;
        }

        // Get existing videos from local storage
        const videos = JSON.parse(localStorage.getItem('videos')) || [];

        // Add new video to the list
        videos.push({
            title: title,
            thumbnail: thumbnail,
            video_id: video_id
        });

        // Save updated videos list to local storage
        localStorage.setItem('videos', JSON.stringify(videos));

        // Show success message
        message.innerHTML = `
            <div class="alert alert-success" role="alert">
                Upload complete! <a href="#" onclick="location.reload();" class="alert-link">Refresh</a>.
            </div>
        `;

        // Clear the form fields
        form.reset();

        // Update the list of videos
        updateVideosList();
    });

    function updateVideosList() {
        const videos = JSON.parse(localStorage.getItem('videos')) || [];
        videosList.innerHTML = ''; // Clear existing content

        videos.forEach((video, index) => {
            const card = document.createElement('div');
            card.classList.add('col-md-4', 'mb-4');
            card.innerHTML = `
                <div class="card">
                    <img src="${video.thumbnail}" class="card-img-top" alt="Video Thumbnail">
                    <div class="card-body">
                        <h5 class="card-title">${video.title}</h5>
                        <p class="card-text">Some description for ${video.title}.</p>
                        <a href="https://www.youtube.com/embed/${video.video_id}" class="btn btn-primary">Watch Video</a>
                        <button class="btn btn-danger mt-2" onclick="deleteVideo(${index})">Delete</button>
                    </div>
                </div>
            `;
            videosList.appendChild(card);
        });
    }

    window.deleteVideo = function (index) {
        let videos = JSON.parse(localStorage.getItem('videos')) || [];
        videos.splice(index, 1); // Remove video at specified index
        localStorage.setItem('videos', JSON.stringify(videos));
        updateVideosList(); // Refresh the video list
    };

    // Initialize videos list on load
    updateVideosList();
});
