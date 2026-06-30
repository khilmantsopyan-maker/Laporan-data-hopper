function tambahBaris() {
    const tbody = document.getElementById("bodyTabel");
    const barisBaru = document.createElement("tr");

    barisBaru.innerHTML = `
        <td><input type="text" class="inp-mesin" placeholder="Misal: 01"></td>
        <td><input type="text" class="inp-injector" placeholder="Misal: Inj A"></td>
        <td><input type="text" class="inp-warna" placeholder="Black"></td>
        <td><input type="number" class="inp-qty" placeholder="1500"></td>
        <td><button class="btn-hapus" onclick="hapusBaris(this)">❌</button></td>
    `;
    tbody.appendChild(barisBaru);
}

function hapusBaris(tombol) {
    const tbody = document.getElementById("bodyTabel");
    if (tbody.rows.length > 1) {
        tombol.parentElement.parentElement.remove();
    } else {
        alert("Minimal harus ada satu baris data!");
    }
}

// Fungsi utama kirim ke WA yang sudah di-update
function kirimWhatsApp() {
    // Ambil data Shift dan Nama Pengisi
    const shift = document.getElementById("inp-shift").value.trim();
    const nama = document.getElementById("inp-nama").value.trim();

    // Validasi agar identitas wajib diisi
    if (!shift || !nama) {
        alert("Mohon isi Shift dan Nama Pengisi terlebih dahulu!");
        return;
    }

    const arrMesin = document.getElementsByClassName("inp-mesin");
    const arrInjector = document.getElementsByClassName("inp-injector");
    const arrWarna = document.getElementsByClassName("inp-warna");
    const arrQty = document.getElementsByClassName("inp-qty");

    let teksMesin = "";
    let totalQtySemua = 0;
    let adaData = false;

    for (let i = 0; i < arrMesin.length; i++) {
        const msn = arrMesin[i].value.trim();
        const inj = arrInjector[i].value.trim();
        const wrn = arrWarna[i].value.trim();
        const qty = arrQty[i].value.trim();

        if (msn && qty) {
            adaData = true;
            totalQtySemua += Number(qty);
            const formatQty = Number(qty).toLocaleString('id-ID');
            teksMesin += `🤖 *Mesin ${msn}* | ${inj || '-'} | ${wrn || '-'} | ${formatQty} Pcs\n`;
        }
    }

    if (!adaData) {
        alert("Silahkan isi minimal satu data Mesin dan Qty!");
        return;
    }

    const opsiTanggal = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const hariIni = new Date().toLocaleDateString('id-ID', opsiTanggal);

    // Susun Format Pesan Akhir dengan menyertakan Shift dan Nama
    const pesanFinal = `📋 *LAPORAN DATA PRODUKSI*\n📅 _${hariIni}_\n` +
                       `⏱️ *Shift :* ${shift}\n` +
                       `👤 *Nama Pengisi :* ${nama}\n\n` +
                       `*No. Mesin | Injector | Warna | Qty*\n` +
                       `────────────────────────\n` +
                       teksMesin +
                       `────────────────────────\n` +
                       `*Total Qty Keseluruhan:* ${totalQtySemua.toLocaleString('id-ID')} Pcs\n` +
                       `_Dilaporkan via Sistem Web App_`;

    navigator.clipboard.writeText(pesanFinal);

    const teksUrl = encodeURIComponent(pesanFinal);
    window.open(`https://api.whatsapp.com/send?text=${teksUrl}`, '_blank');
}

function resetSemua() {
    if (confirm("Apakah Anda yakin ingin mengosongkan semua data?")) {
        // Kosongkan Shift dan Nama
        document.getElementById("inp-shift").value = "";
        document.getElementById("inp-nama").value = "";
        
        // Kembalikan tabel ke baris pertama kosong
        const tbody = document.getElementById("bodyTabel");
        tbody.innerHTML = `
            <tr>
                <td><input type="text" class="inp-mesin" placeholder="Misal: 01"></td>
                <td><input type="text" class="inp-injector" placeholder="Misal: Inj A"></td>
                <td><input type="text" class="inp-warna" placeholder="Black"></td>
                <td><input type="number" class="inp-qty" placeholder="1500"></td>
                <td><button class="btn-hapus" onclick="hapusBaris(this)">❌</button></td>
            </tr>
        `;
    }
}