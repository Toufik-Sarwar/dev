// script.js
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatBody = document.getElementById('chat-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const typing = document.getElementById('typing');


//carsot glow efect
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

//hero v2 sectionP
// Typed.js initialization for Hero V2
// Ensure the Typed.js CDN is added in your HTML first
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('typed-custom')) {
        new Typed('#typed-custom', {
            strings: ['Web Designer', 'Web Developer', 'UI Specialist'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }
});




// Skill Bar Animation on Scroll
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.dataset.width;
        progressBar.style.width = value;
    });
}

function hideProgress() {
    progressBars.forEach(progressBar => {
        progressBar.style.width = '0%';
    });
}

// চেক করবে ইউজার স্কিল সেকশনে পৌঁছেছে কি না
window.addEventListener('scroll', () => {
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos) {
        showProgress();
    } else {
        hideProgress(); // আবার উপরে গেলে রিসেট হবে
    }
});



// স্লাইড ওয়াকশেকসন
const slider = document.querySelector('.work-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
    isDown = false;
});
slider.addEventListener('mouseup', () => {
    isDown = false;
});
slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // স্ক্রল স্পিড
    slider.scrollLeft = scrollLeft - walk;
});



//forncontact forn
document.getElementById('portfolioContactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.innerText = 'পাঠানো হচ্ছে...'; // বাটন টেক্সট পরিবর্তন

    // EmailJS দিয়ে মেসেজ পাঠানো
    emailjs.sendForm('service_kzgjiqx', 'template_mhxuomh', this)
        .then(function() {
            alert('সফলভাবে পাঠানো হয়েছে! আমি খুব শীঘ্রই আপনার সাথে যোগাযোগ করব।');
            btn.innerText = 'মেসেজ পাঠান';
            document.getElementById('portfolioContactForm').reset(); // ফর্ম খালি করা
        }, function(error) {
            alert('দুঃখিত! মেসেজটি পাঠানো যায়নি। আবার চেষ্টা করুন।');
            console.log('FAILED...', error);
            btn.innerText = 'মেসেজ পাঠান';
        });
});






// চ্যাট উইন্ডো ওপেন/ক্লোজ
chatToggle.onclick = () => chatWindow.classList.toggle('d-none');
document.getElementById('close-chat').onclick = () => chatWindow.classList.add('d-none');

// স্মার্ট উত্তর ডেটাবেস (কি-ওয়ার্ডের তালিকা)
const smartReplies = [
    {
        keywords: ["বাজেট", "টাকা", "price", "cost", "budget"],
        reply: "আমার প্রজেক্ট সাধারণত ১০ হাজার টাকা থেকে শুরু হয়। তবে আপনার রিকোয়ারমেন্ট অনুযায়ী এটি কম-বেশি হতে পারে।"
    },
    {
        keywords: ["কেমন আছ", "কেমন আছেন", "hi", "hello", "hey", "সালাম"],
        reply: "আলহামদুলিল্লাহ, আমি ভালো আছি! আপনি কেমন আছেন? আপনার প্রজেক্ট নিয়ে আমি কীভাবে সাহায্য করতে পারি?"
    },
    {
        keywords: ["ডেলিভারি", "সময়", "সময়", "time", "delivery", "duration"],
        reply: "সাধারণত একটি ছোট প্রজেক্ট ৩-৫ দিন এবং বড় প্রজেক্ট ৭-১৫ দিন সময় লাগে।"
    },
    {
        keywords: ["দক্ষতা", "স্কিল", "skill", "tools", "টেকনোলজি"],
        reply: "আমি প্রধানত HTML5, CSS3, Bootstrap 5, এবং JavaScript ব্যবহার করে রেসপন্সিভ ডিজাইন তৈরি করি।"
    },
    {
        keywords: ["ধন্যবাদ", "thanks", "thank you"],
        reply: "আপনাকেও ধন্যবাদ! আপনার সাথে কাজ করার অপেক্ষায় রইলাম।"
    }
];

function sendMessage() {
    const rawText = userInput.value.trim();
    if (!rawText) return;

    // টেক্সটকে ছোট হাতের অক্ষরে রূপান্তর (যাতে English Keywords সহজে মেলে)
    const text = rawText.toLowerCase();

    // ইউজারের মেসেজ স্ক্রিনে দেখানো
    chatBody.innerHTML += `<div class="msg user-msg">${rawText}</div>`;
    userInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // টাইপিং অ্যানিমেশন দেখানো (৩টি ডট)
    typing.classList.remove('d-none');
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        typing.classList.add('d-none');
        
        let botResponse = "দুঃখিত, আমি আপনার প্রশ্নটি বুঝতে পারিনি। বিস্তারিত জানতে সরাসরি আমাকে হোয়াটসঅ্যাপে মেসেজ দিতে পারেন!";

        // লুপ চালিয়ে কি-ওয়ার্ড ম্যাচ করা (আংশিক মিল খুঁজবে)
        for (let item of smartReplies) {
            let found = item.keywords.some(key => text.includes(key));
            if (found) {
                botResponse = item.reply;
                break;
            }
        }

        // সায়েদ-এর উত্তর (ছবিসহ)
        chatBody.innerHTML += `
            <div class="d-flex align-items-end gap-2 mb-2">
                <img src="YOUR_PHOTO.jpg" class="rounded-circle border border-primary shadow-sm" width="30" height="30">
                <div class="msg bot-msg">${botResponse}</div>
            </div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1500); // ১.৫ সেকেন্ড টাইপিং ইফেক্ট
}

// বাটন ক্লিক ও এন্টার বাটন ইভেন্ট
sendBtn.onclick = sendMessage;
userInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
