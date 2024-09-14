const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

// Variabel untuk mengendalikan scroll otomatis
let isAutoScrolling = false;

// Menonaktifkan scroll otomatis
function disableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "auto";
  document.body.classList.add("no-scroll"); // Tambahkan kelas no-scroll untuk mencegah scroll
  stopAudio();
}

// Mengaktifkan scroll dan memulai audio
function enableScroll() {
  rootElement.style.scrollBehavior = "smooth";
  document.body.classList.remove("no-scroll"); // Hapus kelas no-scroll untuk mengaktifkan scroll
  playAudio();
}

// Memutar audio
function playAudio() {
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// Menghentikan audio
function stopAudio() {
  song.pause();
  audioIcon.classList.remove("bi-disc");
  audioIcon.classList.add("bi-pause-circle");
  isPlaying = false;
}

// Menangani klik pada ikon audio
audioIconWrapper.onclick = function () {
  if (isPlaying) {
    stopAudio();
  } else {
    playAudio();
  }
};

// Menonaktifkan scroll saat halaman dimuat
disableScroll();

// Menampilkan Nama dari URL dan Mengisi Input
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get("n") || ""; // Mengambil nama dari parameter url
const pronoun = urlParams.get("p") || "Bapak/Ibu/Saudara/i"; // Mengambil kata ganti dari parameter URL
const namaContainer1 = document.querySelector(".hero p span");
const namaContainer2 = document.querySelector(".hero h4 span");
namaContainer1.innerText = `${pronoun}`.replace(/ ,$/, "");
namaContainer2.innerText = `${nama}`.replace(/ ,$/, ","); // Menampilkan nama dan kata ganti di elemen

document.querySelector("#nama").value = nama; // Mengisi nilai input dengan nama

// Menangani klik pada tombol "Buka Undangan"
document
  .getElementById("viewInvitation")
  .addEventListener("click", function () {
    const invitationSection = document.getElementById("hero");
    const homeSection = document.getElementById("home");

    // Tambahkan kelas animasi ke section undangan
    invitationSection.classList.add("animate-out");

    // Tunggu animasi selesai, lalu sembunyikan section undangan dan tampilkan section home
    setTimeout(() => {
      // Sembunyikan section undangan sepenuhnya
      invitationSection.style.display = "none";

      // Tampilkan section home
      homeSection.style.display = "block";
      homeSection.classList.add("show");

      // Gulir halaman ke atas
      window.scrollTo(0, 0);

      // Aktifkan auto scroll
      isAutoScrolling = true;
      startAutoScroll();
    }, 1001); // Sesuaikan dengan durasi animasi
  });

// Auto Scroll
function startAutoScroll() {
  const scrollSpeed = 0.5; // kecepatan scroll (semakin kecil semakin lambat)
  let scrollPosition = 0;

  function autoScroll() {
    if (isAutoScrolling) {
      // Scroll halaman
      window.scrollTo(0, scrollPosition);
      scrollPosition += scrollSpeed;

      // Reset scroll position jika sudah mencapai akhir halaman
      if (scrollPosition >= document.body.scrollHeight) {
        scrollPosition = 0;
      }

      // Panggil fungsi autoScroll lagi dengan requestAnimationFrame
      requestAnimationFrame(autoScroll);
    }
  }

  // Mulai auto scroll
  autoScroll();
}

// Menangani Pengiriman Formulir
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah pengiriman form default
    const data = new FormData(form); // mengambil data dari formulir
    const action = e.target.action; // Mendapatkan URL untuk pengirim formulir
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!"); // Menampilkan pesan setelah formulir dikirim
    });
  });
});
