document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggleButton');
    const video = document.getElementById('video');

    let isAutoPlay = false;
    let currentVideoIndex = -1;

    async function loadVideoFiles() {
        const response = await fetch('video-directory.json');
        const data = await response.json();
        return data.videoFiles;
    }

    let videoFiles;

    loadVideoFiles().then(files => {
        videoFiles = files;
        toggleButton.addEventListener('click', function () {
            isAutoPlay = !isAutoPlay;
            if (isAutoPlay) {
                toggleButton.textContent = '일할게요';
                toggleButton.classList.add('active');
                playRandomVideo();
            } else {
                toggleButton.textContent = '도와줘요';
                toggleButton.classList.remove('active');
                video.pause();
            }
        });
        
        // 동영상 재생이 끝났을 때 다음 동영상 재생
        video.addEventListener('ended', function () {
            if (isAutoPlay) {
                playRandomVideo();
            }
        });
    });

    function playRandomVideo() {
        if (videoFiles && videoFiles.length > 0) {
            currentVideoIndex = Math.floor(Math.random() * videoFiles.length);
            const videoFile = videoFiles[currentVideoIndex];
            video.src = videoFile;
            video.muted = false;
            video.load();
            video.play();
        } else {
            console.error('동영상 파일이 없습니다.');
        }
    }
});
