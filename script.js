document.addEventListener("DOMContentLoaded", async function () {
    const listSurat = document.getElementById("listSurat");
    
    try {
        // Ambil daftar surat dari API
        const response = await fetch("https://api.alquran.cloud/v1/surah");
        const data = await response.json();

        data.data.forEach(surat => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <strong>${surat.number}. ${surat.englishName}</strong> - ${surat.numberOfAyahs} Ayat
            `;
            listItem.addEventListener("click", () => tampilkanAyat(surat.number));
            listSurat.appendChild(listItem);
        });
    } catch (error) {
        console.error("Gagal mengambil daftar surat:", error);
    }
});

// Fungsi untuk menampilkan ayat, audio, dan terjemahan
async function tampilkanAyat(suratID) {
    try {
        const response = await fetch(`https://api.alquran.cloud/v1/surah/${suratID}`);
        const translationResponse = await fetch(`https://api.alquran.cloud/v1/surah/${suratID}/id.indonesian`);
        
        const data = await response.json();
        const translationData = await translationResponse.json();

        const ayatContainer = document.getElementById("ayatContainer");
        ayatContainer.innerHTML = ""; // Kosongkan sebelum menampilkan

        data.data.ayahs.forEach((ayat, index) => {
            const ayatHTML = `
                <div class="ayat">
                    <p class="arabic">${ayat.text}</p>
                    <p class="translation">${translationData.data.ayahs[index].text}</p>
                    <audio controls>
                        <source src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayat.number}.mp3" type="audio/mpeg">
                        Browser tidak mendukung audio.
                    </audio>
                </div>
            `;
            ayatContainer.innerHTML += ayatHTML;
        });
    } catch (error) {
        console.error("Gagal mengambil ayat:", error);
    }
}