const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector(".audio-icon-wrapper");
const audioIcon = document.querySelector(".audio-icon-wrapper i");
const song = document.querySelector("#song");
let isPlaying = false;

// Menonaktifkan scroll
function disableScroll() {
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  window.onscroll = function () {
    window.scrollTo(scrollTop, scrollLeft);
  };

  rootElement.style.scrollBehavior = "auto";
}
1;

// Mengaktifkan scroll dan memulai audio
function enableScroll() {
  window.onscroll = function () {};
  rootElement.style.scrollBehavior = "smooth";
  playAudio();
}

// Memutar audio
function playAudio() {
  audioIconWrapper.style.display = "flex";
  song.play();
  isPlaying = true;
}

// Menangani klik pada ikon audio
audioIconWrapper.onclick = function () {
  if (isPlaying) {
    song.pause();
    audioIcon.classList.remove("bi-disc");
    audioIcon.classList.add("bi-pause-circle");
  } else {
    song.play();
    audioIcon.classList.add("bi-disc");
    audioIcon.classList.remove("bi-pause-circle");
  }

  isPlaying = !isPlaying;
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

document.querySelector("#nama").value = nama; // Mengiis nilai input dengan nama

// Animasi
// script.js
document
  .getElementById("viewInvitation")
  .addEventListener("click", function () {
    const invitationSection = document.getElementById("hero");
    const homeSection = document.getElementById("home");

    // Tambahkan kelas animasi ke section undangan
    invitationSection.classList.add("animate-out");

    // Tambahkan kelas untuk mencegah scroll
    document.body.classList.add("no-scroll");

    // Tunggu animasi selesai, lalu sembunyikan section undangan dan tampilkan section home
    setTimeout(() => {
      // Sembunyikan section undangan sepenuhnya
      invitationSection.style.display = "none";

      // Tampilkan section home
      homeSection.style.display = "block";
      homeSection.classList.add("show");

      // Gulir halaman ke atas
      window.scrollTo(0, 0);

      // Kembalikan scroll ke keadaan normal
      document.body.classList.remove("no-scroll");
    }, 1001); // Sesuaikan dengan durasi animasi
  });

// Menangani Pengiriman Formulir
window.addEventListener("load", function () {
  const form = document.getElementById("my-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Mencegah pengiriman form default
    const data = new FormData(form); // mengambil data dari formulir
    const action = e.target.action; // Mendapatkan URL untuk pengirim formuler
    fetch(action, {
      method: "POST",
      body: data,
    }).then(() => {
      alert("Konfirmasi Kehadiran Berhasil Terkirim!"); // Menampilkan pesan setelah formulir dikirim
    });
  });
});

// Auto Scroll
