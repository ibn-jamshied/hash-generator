const API_URL = 'https://your-worker-url.workers.dev'; // 🔁 این آدرس را با آدرس Cloudflare Worker خودت جایگزین کن

async function generateHash() {
  const input = document.getElementById('textInput').value;
  if (!input) {
    alert('لطفاً متن وارد کنید');
    return;
  }

  const resBox = document.getElementById('result');
  resBox.innerHTML = 'در حال پردازش...';

  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });

    const data = await res.json();
    const hashes = data.hashes;

    resBox.innerHTML = '';

    for (const [type, value] of Object.entries(hashes)) {
      const box = document.createElement('div');
      box.className = 'hash-box';
      box.innerText = `${type.toUpperCase()}: ${value}`;
      box.onclick = () => {
        navigator.clipboard.writeText(value);
        box.innerHTML += `<div class="copied">کپی شد</div>`;
        setTimeout(() => {
          const copied = box.querySelector('.copied');
          if (copied) copied.remove();
        }, 1000);
      };
      resBox.appendChild(box);
    }

  } catch (err) {
    resBox.innerHTML = 'خطا در ارتباط با سرور';
    console.error(err);
  }
}
