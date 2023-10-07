const square1 = document.getElementById("square1");
const square2 = document.getElementById("square2");
const square3 = document.getElementById("square3");
const winner = document.getElementById("winner");
let result =0;
const generateButton = document.getElementById("generate-button");
let backgroundSound = new Audio('./audio/packground.mp3');
let tingSound = new Audio('./audio/ting.mp3');
let winnerSound = new Audio('./audio/winer.mp3');
let isGenerating = false;
let interval;
let arr = [0,1,2,3,4,5,1,5,6,7,1];
document.body.addEventListener("mousemove", function () {
    backgroundSound.play()
})
window.addEventListener('load', function() {
    backgroundSound.play();
  });
document.addEventListener('DOMContentLoaded', function() {
    backgroundSound.play();
});
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function updateSquares() {
    let x = arr[generateRandomNumber(0, 9)];
    console.log(x);
    const value1 = Number(x);
    const value2 = generateRandomNumber(0, 9);
    const value3 = generateRandomNumber(0, 9);
    
    square1.textContent = value1;
    square2.textContent = value2;
    square3.textContent = value3;
    result = value1 * 100 + value2 * 10 + value3;
    if (!isGenerating) {
        clearInterval(interval);     
        // Sử dụng anime.js để tạo hiệu ứng đảo số
        const animations = [
            anime({
                targets: square1,
                scale: [1, 0.9],
                duration: 500,
                easing: 'easeInOutQuad'
            }),
            anime({
                targets: square2,
                scale: [1, 0.8],
                duration: 500,
                easing: 'easeInOutQuad'
            }),
            anime({
                targets: square3,
                scale: [1, 0.8],
                duration: 500,
                easing: 'easeInOutQuad'
            })
        ];

        anime({
            targets: animations,
            complete: () => {
                setTimeout(() => {
                    alert(`Random Result: ${result}`);
                    generateButton.textContent = "Quay số";
                }, 300); // Sau khi hoàn thành hiệu ứng, hiển thị kết quả sau 500ms
            }
        });
    } else {
       // Sử dụng anime.js để tạo hiệu ứng đảo số khi đang quay số
        anime({
            targets: [square1, square2, square3],
            scale: [0.8, 1],
            duration: 500,
            easing: 'easeInOutQuad'
        });
    }
}

generateButton.addEventListener("click", function () {
    if (!isGenerating) {
        generateButton.textContent = "Dừng lại";
        tingSound.play();
        isGenerating = true;
        interval = setInterval(updateSquares, 40); // Cập nhật số liên tục mỗi 200ms
    } else {
        console.log(result);
        clearInterval(interval);
        generateButton.textContent = "Quay số";
        showNotification();
        backgroundSound.volume=0.5;
        winnerSound.play();
        isGenerating = false;
        
    }
});



// Lấy tham chiếu đến các phần tử trong DOM
var overlay = document.getElementById('overlay');
var notificationWrapper = document.getElementById('notification-wrapper');
var closeButton = document.getElementById('close-button');

// Hàm hiển thị thông báo và overlay
function showNotification() {
    overlay.style.display = 'block';
    notificationWrapper.style.display = 'block';
    console.log(result);
    winner.innerText = result;
}

// Hàm ẩn thông báo và overlay
function hideNotification() {
    overlay.style.display = 'none';
    notificationWrapper.style.display = 'none';
}

// Gắn sự kiện click vào nút đóng thông báo
closeButton.addEventListener('click', function() {
    hideNotification();
});

// Sử dụng hàm showNotification để hiển thị thông báo khi cần
// Ví dụ: showNotification();


