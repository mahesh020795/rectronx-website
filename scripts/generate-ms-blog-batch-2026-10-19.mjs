import fs from "node:fs";
import path from "node:path";

const posts = [
  {
    slug: "seni-bina-projek-iot-sensor-gateway-cloud-dashboard",
    title: "Seni Bina Projek IoT untuk FYP: Sensor, Gateway, Cloud dan Dashboard",
    excerpt: "Panduan menyusun seni bina projek IoT yang jelas daripada sensor hingga dashboard, termasuk aliran data, kegagalan rangkaian dan kaedah ujian.",
    category: "IoT",
    summary: `Seni bina projek IoT menerangkan bagaimana data bergerak daripada dunia fizikal kepada pengguna. Bagi projek akhir tahun, rajah yang baik perlu menunjukkan sensor, pengawal atau edge device, rangkaian, servis cloud, pangkalan data dan dashboard sebagai blok yang berbeza. Setiap anak panah mesti mempunyai maksud: jenis data, protokol, arah komunikasi dan tindakan apabila sambungan gagal.

Skop yang kukuh tidak memerlukan semua teknologi. Satu ESP32, satu jenis sensor, satu saluran komunikasi dan satu dashboard sudah mencukupi jika pelajar dapat membuktikan ketepatan bacaan, penghantaran, penyimpanan dan pemulihan selepas gangguan. Seni bina patut dibina daripada keperluan projek, bukan daripada senarai modul yang popular.`,
    sections: [
      ["Empat lapisan yang perlu dipisahkan", `Lapisan penderiaan memperoleh bacaan dan mesti menyatakan unit, julat serta kadar sampel. Lapisan edge menapis, menanda masa atau membuat keputusan tempatan. Lapisan komunikasi menghantar mesej melalui WiFi, Ethernet, LoRaWAN atau rangkaian selular. Lapisan aplikasi menyimpan, memaparkan dan menghasilkan amaran. Pisahkan lapisan ini dalam rajah supaya perubahan pada dashboard tidak dianggap sebagai perubahan pada litar sensor.

Jika projek menggunakan MQTT, peranti menerbitkan mesej kepada topic dan aplikasi melanggan topic yang berkaitan. Spesifikasi MQTT menerangkan corak publish/subscribe dan tahap Quality of Service, tetapi QoS tidak menggantikan reka bentuk aplikasi seperti deduplication, timestamp dan semakan mesej lama. Jika menggunakan HTTP, nyatakan endpoint, kaedah request dan respons ralat.`],
      ["Reka bentuk aliran data", `Tetapkan format payload sebelum menulis keseluruhan kod. Contoh medan yang berguna ialah device_id, timestamp, nilai, unit, status sensor dan nombor versi format. Jangan simpan nombor tanpa unit atau identiti peranti. Tentukan juga sama ada masa datang daripada peranti, gateway atau server. Untuk sistem yang membandingkan peranti, satu sumber masa yang konsisten lebih penting daripada paparan masa yang cantik.

Dashboard mesti menjawab soalan pengguna. Graf trend sesuai untuk perubahan mengikut masa, kad status sesuai untuk keadaan semasa, dan jadual event sesuai untuk audit. Elakkan memaparkan sepuluh graf yang tidak menyokong objektif projek.`],
      ["Apa berlaku apabila Internet terputus", `Projek IoT yang matang menerangkan degraded mode. Peranti boleh meneruskan kawalan tempatan, menyimpan sejumlah bacaan dalam buffer dan menghantar semula apabila sambungan pulih. Tentukan had buffer dan tingkah laku apabila penuh. Jangan mendakwa sistem real-time jika data sebenarnya tiba lewat selepas reconnect.

Uji sekurang-kurangnya cold start, kehilangan WiFi, server tidak respons, sensor tercabut dan kuasa dipulihkan. Catat tempoh reconnect, jumlah rekod hilang dan sama ada output fizikal kekal dalam keadaan selamat. Bukti ini lebih bernilai daripada demo yang hanya berjalan dalam keadaan ideal.`],
      ["Rajah yang patut masuk laporan", `Sediakan satu context diagram untuk pengguna dan sistem luar, satu block diagram untuk hardware, satu deployment diagram untuk peranti-gateway-cloud, dan satu sequence diagram bagi aliran utama. Gunakan nama yang sama dalam rajah, kod, database dan laporan. Jika blok dipanggil node_sensor_01 dalam sistem, jangan tukar kepada smart device tanpa penjelasan dalam bab lain.

Senaraikan trust boundary seperti Internet awam dan servis pihak ketiga. Ini membantu pelajar menerangkan di mana authentication, encryption dan validation diperlukan.`],
    ],
    validation: ["Bandingkan bacaan asal pada serial monitor dengan rekod database.", "Putuskan rangkaian dan ukur masa pemulihan serta data yang hilang.", "Hantar payload rosak untuk memastikan aplikasi menolak atau menandainya.", "Ulang ujian selepas power cycle dan simpan log dengan timestamp."],
    mistakes: ["Melukis cloud sebagai satu kotak tanpa servis atau aliran data.", "Mencampurkan kawalan kritikal dengan dashboard yang bergantung pada Internet.", "Tidak menentukan unit, timestamp atau identiti peranti.", "Menganggap mesej dihantar bermaksud mesej sudah disimpan dengan betul."],
    faq: [["Adakah projek IoT wajib menggunakan cloud?", "Tidak. Sistem dalam rangkaian tempatan masih boleh menjadi IoT jika peranti berkomunikasi dan menyediakan fungsi rangkaian. Pilih cloud hanya apabila akses jauh, penyimpanan atau analitik memang diperlukan."], ["MQTT atau HTTP lebih baik?", "Tiada jawapan tunggal. MQTT sesuai untuk publish/subscribe dan telemetri berterusan; HTTP mudah untuk request-response dan integrasi web. Nilai keperluan, keselamatan, rangkaian dan kemudahan ujian."]],
    refs: [["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"], ["NIST IoT Device Cybersecurity Capability Core Baseline", "https://www.nist.gov/publications/iot-device-cybersecurity-capability-core-baseline"]],
    links: [["Cari tajuk projek IoT", "/catalog?category=iot-embedded"], ["Lihat komponen ESP32", "/components/esp32"], ["Gunakan ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Bincang skop projek", "/contact"]],
  },
  {
    slug: "pengurusan-kuasa-projek-iot-kira-arus-regulator-brownout",
    title: "Pengurusan Kuasa Projek IoT: Cara Kira Arus, Pilih Regulator dan Elak Brownout",
    excerpt: "Panduan kuasa untuk projek IoT: bina power budget, semak regulator, ukur voltan ketika beban puncak dan diagnosis brownout ESP32 secara sistematik.",
    category: "Electronics",
    summary: `Masalah kuasa ialah punca biasa projek IoT restart, sensor memberi bacaan pelik atau komunikasi terputus. Voltan yang tertulis pada adapter sahaja tidak membuktikan bekalan stabil. Pelajar perlu menilai voltan input, keupayaan arus, kecekapan regulator, arus puncak setiap beban, kehilangan pada kabel dan sambungan ground.

Power budget ialah anggaran awal, bukan pengganti ukuran. Selepas mengira jumlah arus, ukur voltan pada papan ketika WiFi menghantar, relay bertukar, motor bermula atau modem selular membuat sambungan. Brownout berlaku apabila voltan jatuh di bawah keperluan litar untuk tempoh yang cukup mengganggu operasi.`,
    sections: [
      ["Bina power budget yang realistik", `Senaraikan setiap beban dengan voltan, arus biasa, arus puncak dan duty cycle. Gunakan datasheet atau ukuran, bukan angka rawak daripada kedai. Tambahkan margin untuk variasi komponen dan aktiviti serentak. Jangan campur arus pada rail 12 V dan 3.3 V secara terus; kuasa serta kecekapan converter perlu dipertimbangkan apabila menukar rail.

Contohnya, relay mungkin hanya aktif seketika tetapi arus coil tetap membebankan rail pada saat kritikal. Motor dan modem mempunyai lonjakan yang jauh lebih tinggi daripada bacaan idle. Saiz bekalan berdasarkan keadaan paling berat yang munasabah, bukan keadaan meja ketika semua output mati.`],
      ["Pilih regulator dan laluan kuasa", `Semak julat input, voltan output, arus berterusan, keupayaan thermal dan kecekapan regulator. Linear regulator mudah tetapi beza voltan didarab arus menjadi haba. Buck converter biasanya lebih sesuai untuk turun daripada 12 V ke 5 V pada arus lebih tinggi, tetapi layout, ripple dan spesifikasi modul masih penting.

Asingkan laluan motor atau relay daripada rail logik jika beban menghasilkan noise besar, sambil mengekalkan rujukan ground yang betul apabila signal perlu dikongsi. Tambahkan flyback diode pada coil DC apabila modul tidak menyediakannya. Jangan bekalkan motor daripada pin 3.3 V papan pembangunan.`],
      ["Kapasitor bukan penyelesaian ajaib", `Bulk capacitor berhampiran kemasukan kuasa boleh membantu lonjakan berfrekuensi lebih rendah, manakala decoupling capacitor kecil berhampiran pin bekalan IC membantu arus transient tempatan. Nilai dan susun atur perlu mengikut datasheet serta guideline papan. Kapasitor tidak boleh membaiki adapter yang terlalu kecil, wayar terlalu nipis atau regulator yang overheating.

Guideline ESP32 Espressif mencadangkan bekalan 3.3 V dengan keupayaan arus yang mencukupi, kapasitor pada kemasukan bekalan dan decoupling berhampiran pin digital. Papan pembangunan tertentu sudah mempunyai sebahagian komponen ini, tetapi beban luaran masih perlu direka dengan betul.`],
      ["Diagnosis brownout langkah demi langkah", `Mula dengan log serial dan catat masa restart. Ukur voltan pada input papan, bukan hanya pada terminal adapter. Uji satu beban pada satu masa, kemudian gabungkan keadaan puncak. Tukar kabel USB yang pendek dan berkualiti, periksa breadboard, connector longgar dan ground return. Jika simptom berubah apabila radio atau relay aktif, fokus kepada supply transient dan coupling noise.

Untuk bukti laporan, rekod voltan minimum, keadaan beban, bilangan restart dalam tempoh ujian dan perubahan selepas pembaikan. Elakkan mendakwa satu kapasitor menyelesaikan semuanya tanpa ujian A/B.`],
    ],
    validation: ["Ukur voltan idle dan semasa beban puncak pada titik input papan.", "Jalankan WiFi, relay dan motor mengikut kombinasi worst case.", "Ulang power cycle sekurang-kurangnya sepuluh kali dan rekod restart.", "Pantau suhu regulator dan hentikan ujian jika komponen terlalu panas."],
    mistakes: ["Menjumlah arus purata tetapi mengabaikan arus puncak.", "Menggunakan rating adapter sebagai bukti voltan sampai ke papan.", "Menyambung motor terus kepada rail logik.", "Menambah kapasitor tanpa mencari voltage drop atau thermal limit."],
    faq: [["Berapa ampere diperlukan untuk ESP32?", "Tiada satu angka untuk semua projek. Kira ESP32 bersama sensor, radio, relay dan beban lain, kemudian ukur keadaan puncak. Ikut guideline dan datasheet papan atau modul yang sebenar."], ["Adakah adapter arus lebih tinggi merosakkan litar?", "Beban menarik arus mengikut keperluannya jika voltan dan polariti betul. Namun adapter, regulator, connector dan perlindungan tetap mesti sesuai; rating arus besar tidak membenarkan voltan yang salah."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"], ["Texas Instruments: Power Supply Bypassing", "https://www.ti.com/lit/an/scea042/scea042.pdf"]],
    links: [["Panduan bekalan kuasa ESP32", "/blog/bekalan-kuasa-esp32-sensor-relay-projek-pelajar"], ["Komponen ESP32", "/components/esp32"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Bincang projek elektronik", "/contact"]],
  },
  {
    slug: "data-sensor-iot-timestamp-unit-validasi",
    title: "Data Sensor IoT Berkualiti: Timestamp, Unit, Missing Data dan Validasi",
    excerpt: "Cara menghasilkan data sensor IoT yang boleh dipercayai untuk analisis dan laporan projek akhir tahun, daripada timestamp hingga pengendalian missing data.",
    category: "IoT",
    summary: `Dashboard yang cantik tidak menjadikan data sensor berkualiti. Data projek IoT perlu mempunyai maksud yang jelas, masa yang boleh dibandingkan, unit yang konsisten, identiti sumber dan status kualiti. Tanpa elemen ini, pelajar sukar membuktikan sama ada perubahan graf datang daripada persekitaran, sensor, rangkaian atau kesilapan perisian.

Reka bentuk data patut bermula sebelum kutipan. Tentukan data dictionary, kadar sampel, peraturan validasi, kaedah mengesan rekod hilang dan polisi menyimpan data mentah. Jangan membersihkan data secara senyap sehingga keputusan nampak lebih baik.`,
    sections: [
      ["Bina data dictionary", `Untuk setiap medan, catat nama, jenis data, unit, julat munasabah, sumber dan sama ada medan wajib. Contoh temperature_c lebih jelas daripada value1. Bezakan reading sensor daripada setpoint dan status output. Sertakan device_id serta firmware_version apabila beberapa peranti atau versi kod digunakan.

Julat validasi bukan semestinya julat fizikal mutlak. Ia boleh menjadi julat operasi projek yang ditetapkan dengan alasan. Rekod di luar julat boleh ditanda invalid atau suspicious, tetapi jangan terus dibuang tanpa jejak.`],
      ["Timestamp dan zon masa", `Gunakan format yang tidak mengelirukan dan simpan offset zon masa atau UTC. RFC 3339 mentakrifkan format timestamp Internet berasaskan profil ISO 8601. Contoh dengan Z menunjukkan UTC, manakala +08:00 menunjukkan offset Malaysia. Paparan dashboard boleh ditukar kepada masa tempatan selepas penyimpanan.

Nyatakan siapa menghasilkan timestamp. Jam peranti boleh hanyut atau reset jika tiada real-time clock dan synchronisation. Masa server pula menunjukkan masa diterima, bukan semestinya masa bacaan dibuat. Jika kedua-duanya penting, simpan measured_at dan received_at secara berasingan.`],
      ["Missing data, duplicate dan outlier", `Gunakan sequence number atau kadar sampel jangkaan untuk mengesan jurang. Missing data tidak patut diganti dengan sifar kerana sifar mungkin nilai sebenar. Tandakan null atau status missing dan jelaskan kaedah imputasi jika analisis memerlukannya. Duplicate boleh muncul selepas retry rangkaian, jadi gabungan device_id dan measurement_id membantu deduplication.

Outlier perlu disiasat. Semak wiring, bekalan kuasa, had sensor, perubahan persekitaran dan log komunikasi. Median filter boleh menahan spike, tetapi filter juga boleh menyembunyikan event sebenar. Laporkan data mentah dan data diproses secara berasingan.`],
      ["Validasi daripada sensor hingga database", `Bandingkan bacaan peranti pada serial monitor dengan payload rangkaian dan rekod database untuk timestamp yang sama. Ini menguji transformasi unit dan parsing. Gunakan input rujukan atau alat perbandingan yang sesuai; perbandingan dengan sensor kedua yang sama tidak semestinya membuktikan ketepatan mutlak.

Untuk laporan, nyatakan resolution, repeatability yang diperhatikan, kadar kehilangan paket dan peraturan exclusion. Jangan gunakan perkataan accurate tanpa kaedah, rujukan dan uncertainty yang munasabah.`],
    ],
    validation: ["Semak 100 rekod berurutan untuk jurang sequence dan duplicate.", "Bandingkan nilai serial, payload dan database bagi timestamp sama.", "Masukkan nilai invalid untuk menguji validation dan error logging.", "Eksport data mentah supaya analisis boleh diulang."],
    mistakes: ["Menyimpan nombor tanpa unit atau device_id.", "Menggunakan masa tempatan tanpa offset.", "Menggantikan semua missing data dengan sifar.", "Membuang outlier tanpa rekod atau justifikasi."],
    faq: [["Perlu simpan data mentah atau data ditapis?", "Simpan data mentah apabila ruang dan privasi membenarkan, kemudian simpan kaedah atau versi pemprosesan. Ini membolehkan keputusan diaudit dan analisis diulang."], ["Berapa kerap sensor perlu dibaca?", "Kadar sampel bergantung pada kelajuan fenomena, response time sensor, kuasa, rangkaian dan objektif. Lebih kerap tidak semestinya lebih baik jika sensor belum stabil atau data hanya berulang."]],
    refs: [["RFC 3339: Date and Time on the Internet", "https://www.rfc-editor.org/info/rfc3339/"], ["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]],
    links: [["Idea projek IoT", "/blog/iot-project-ideas-2025"], ["Katalog projek", "/catalog"], ["Database komponen", "/components"], ["Bincang pelan pengujian", "/contact"]],
  },
  {
    slug: "keselamatan-projek-iot-api-key-authentication-firebase-rules",
    title: "Keselamatan Projek IoT Pelajar: API Key, Authentication dan Firebase Rules",
    excerpt: "Panduan keselamatan praktikal untuk projek IoT pelajar: lindungi secret, hadkan akses data, uji Firebase Rules dan dokumentasikan risiko secara jujur.",
    category: "IoT",
    summary: `Keselamatan projek IoT bukan sekadar menambah halaman login. Sistem perlu mengenal peranti dan pengguna, menghadkan tindakan mengikut peranan, melindungi data, mengurus konfigurasi serta merekod keadaan penting. Bagi projek akhir tahun, skop kecil yang diuji lebih baik daripada mendakwa sistem secure tanpa threat model.

Mulakan dengan aset dan risiko: data pengguna, arahan relay, lokasi GPS, credential WiFi, token servis dan kunci pentadbir. Kemudian tentukan siapa patut membaca, menulis atau mengubah setiap aset. NIST IR 8259A menyediakan baseline keupayaan seperti identiti peranti, konfigurasi, perlindungan data, kawalan akses, kemas kini dan kesedaran status keselamatan.`,
    sections: [
      ["Bezakan API key, secret dan identiti", `Tidak semua API key mempunyai sifat sama. Sesetengah key ialah identifier projek yang direka berada dalam aplikasi klien, tetapi akses sebenar mesti dikawal oleh rules, authentication dan restriction servis. Private key service account, password, token refresh dan server key ialah rahsia dan tidak boleh dimasukkan dalam repository awam atau firmware yang mudah dibaca.

Gunakan fail environment untuk pembangunan dan secret manager atau konfigurasi server bagi deployment. Tambahkan fail secret ke .gitignore, tetapi fahami bahawa menghapus fail selepas commit tidak semestinya menghapus secret daripada sejarah Git. Rotate credential yang pernah terdedah.`],
      ["Authentication tidak sama dengan authorization", `Authentication menjawab siapa pengguna; authorization menjawab apa yang dibenarkan. Pengguna yang berjaya login tidak patut mendapat akses kepada semua rekod. Reka path data supaya owner atau role boleh diperiksa. Untuk peranti, gunakan identiti berasingan jika platform menyokongnya dan elakkan satu credential dikongsi oleh semua prototaip.

Firebase menerangkan penggunaan Authentication bersama Security Rules. Rules boleh memeriksa request.auth dan uid. Uji akses sah dan akses yang patut ditolak menggunakan emulator atau test rules. Jangan kekalkan test mode pada deployment kerana akses terbuka boleh membenarkan pihak luar membaca atau menulis data.`],
      ["Threat model yang sesuai untuk FYP", `Lukis aliran data dan tandakan trust boundary: peranti, rangkaian WiFi, Internet, cloud, aplikasi dan panel pentadbir. Senaraikan ancaman mudah seperti credential bocor, pengguna melihat data orang lain, replay arahan, payload terlalu besar, input tidak sah dan peranti hilang. Bagi setiap ancaman, nyatakan kawalan dan baki risiko.

Jangan janji keselamatan mutlak. Nyatakan bahawa prototaip telah diuji untuk senario tertentu, contohnya unauthenticated write ditolak dan user A tidak dapat membaca data user B.`],
      ["Logging dan kemas kini", `Log event keselamatan yang berguna seperti login gagal, perubahan role, arahan actuator dan perubahan konfigurasi. Jangan log password atau token penuh. Pastikan log mempunyai timestamp dan identiti tindakan. Hadkan retention supaya data sensitif tidak disimpan tanpa sebab.

Jika projek menyokong OTA, periksa mekanisme pengesahan imej dan rollback yang disediakan platform. Jika tidak menyokong OTA, nyatakan proses kemas kini fizikal dan limitasinya. Software update ialah sebahagian penting lifecycle, bukan ciri hiasan.`],
    ],
    validation: ["Pastikan request tanpa login ditolak pada path peribadi.", "Uji user A tidak boleh mengubah data user B.", "Imbas repository untuk secret dan rotate apa-apa credential ujian yang terdedah.", "Rekod event pentadbir tanpa menyimpan token atau password."],
    mistakes: ["Menganggap halaman login sudah melindungi database.", "Menggunakan Firebase test mode untuk demo awam.", "Meletakkan service-account key dalam aplikasi klien.", "Menulis tuntutan secure tanpa threat model atau negative test."],
    faq: [["Adakah Firebase API key mesti dirahsiakan?", "Firebase menjelaskan bahawa API key tertentu mengenal pasti projek dan bukan satu-satunya kawalan akses. Namun key perlu dihadkan kepada API berkaitan, sementara service-account private key dan server credential mesti kekal rahsia. Security Rules tetap wajib."], ["Perlu bina encryption sendiri?", "Tidak. Gunakan protokol dan library yang diselenggara seperti TLS yang disediakan platform. Cryptography buatan sendiri meningkatkan risiko dan sukar divalidasi dalam skop pelajar."]],
    refs: [["NIST IR 8259A IoT Cybersecurity Baseline", "https://www.nist.gov/publications/iot-device-cybersecurity-capability-core-baseline"], ["Firebase Security Checklist", "https://firebase.google.com/support/guides/security-checklist"], ["Firebase Rules and Authentication", "https://firebase.google.com/docs/rules/rules-and-auth"]],
    links: [["Katalog projek IoT", "/catalog?category=iot-embedded"], ["Panduan projek Firebase", "/blog/aplikasi-mobile-firebase-projek-akhir-tahun"], ["Topik IoT", "/topics/iot"], ["Hubungi Rectronx", "/contact"]],
  },
  {
    slug: "projek-iot-luar-bangunan-wifi-lora-4g",
    title: "Projek IoT Luar Bangunan: Pilih WiFi, LoRa atau 4G Mengikut Jarak dan Kuasa",
    excerpt: "Perbandingan praktikal WiFi, LoRa atau LoRaWAN dan 4G untuk projek IoT luar bangunan berdasarkan liputan, data, kuasa, gateway dan ujian tapak.",
    category: "IoT",
    summary: `Pemilihan rangkaian untuk projek IoT luar bangunan tidak boleh dibuat berdasarkan jarak iklan sahaja. Liputan dipengaruhi antena, frekuensi, halangan, ketinggian, gangguan, kuasa penghantaran dan peraturan tempatan. WiFi, LoRa atau LoRaWAN dan 4G menyelesaikan masalah yang berbeza.

Mulakan dengan jumlah data, kekerapan penghantaran, latency, sumber kuasa, kawasan deployment, akses kepada gateway dan kos operasi. Jalankan site survey atau ujian lapangan di lokasi sebenar. Keputusan makmal dalam jarak lima meter tidak membuktikan sistem sesuai untuk ladang, sungai atau kawasan bandar.`,
    sections: [
      ["Bila WiFi sesuai", `WiFi praktikal apabila access point tersedia, jarak sederhana, data lebih besar atau integrasi IP terus diperlukan. Ia sesuai untuk rumah hijau, bangunan kampus atau kawasan berhampiran router. Kekurangannya ialah penggunaan kuasa dan liputan yang bergantung kuat pada tapak. Reconnect, pertukaran SSID dan kehilangan Internet perlu diuji.

Jangan letakkan password WiFi dalam screenshot laporan atau repository. Untuk deployment institusi, rangkaian mungkin mempunyai captive portal atau polisi yang tidak sesuai untuk mikropengawal.`],
      ["Bila LoRa atau LoRaWAN sesuai", `LoRa ialah teknologi radio; LoRaWAN ialah protokol rangkaian dengan end device, gateway, network server dan application server. LoRaWAN direka untuk LPWA dan peranti berkuasa bateri, tetapi payload kecil dan duty cycle perlu dihormati. Ia bukan pilihan untuk video atau data kadar tinggi.

Jika menggunakan sambungan LoRa point-to-point, jangan memanggilnya LoRaWAN. Nyatakan frekuensi, spreading factor, bandwidth, kuasa, antena dan topologi. Semak pelan frekuensi serta keperluan pengawal selia Malaysia sebelum deployment sebenar.`],
      ["Bila 4G sesuai", `Rangkaian selular sesuai apabila lokasi mempunyai liputan operator tetapi tiada infrastruktur tempatan. Modem memerlukan SIM, pelan data dan bekalan kuasa yang mampu menghadapi arus puncak. Liputan pada telefon tidak semestinya sama dengan prestasi antena modem dalam enclosure.

Reka firmware untuk reconnect, timeout, backoff dan penggunaan data. Simpan data sementara apabila rangkaian tiada. Pantau perubahan teknologi dan ketersediaan rangkaian; elakkan mereka bentuk projek baharu bergantung pada servis lama tanpa semakan operator.`],
      ["Kaedah membuat keputusan", `Bina decision matrix dengan kriteria berwajaran: liputan tapak, tenaga sehari, payload, latency, gateway, kos berulang, keselamatan dan kesukaran integrasi. Beri skor berdasarkan ukuran atau sumber, bukan rasa. Pilihan terbaik ialah yang memenuhi requirement paling penting dengan risiko boleh dikawal.

Untuk ujian lapangan, rekod RSSI atau metrik berkaitan, packet delivery ratio, latency, tenaga dan cuaca pada beberapa titik. Metrik radio antara teknologi tidak semestinya boleh dibandingkan terus; gunakan hasil end-to-end seperti mesej berjaya diterima.`],
    ],
    validation: ["Uji di lokasi sebenar pada beberapa jarak dan halangan.", "Rekod sekurang-kurangnya 100 penghantaran bagi setiap konfigurasi.", "Ukur penggunaan tenaga semasa sleep, transmit dan reconnect.", "Uji pemulihan selepas gateway, router atau rangkaian selular hilang."],
    mistakes: ["Menggunakan tuntutan jarak maksimum sebagai hasil projek.", "Menyamakan LoRa point-to-point dengan LoRaWAN.", "Mengabaikan arus puncak modem dan reka bentuk antena.", "Tidak menyemak frekuensi serta peraturan deployment tempatan."],
    faq: [["Adakah LoRa sentiasa lebih jauh daripada WiFi?", "LoRa direka untuk link budget dan kadar data yang berbeza, tetapi jarak sebenar bergantung pada konfigurasi dan tapak. Ujian lapangan diperlukan; tiada jarak tetap yang boleh dijamin."], ["Perlu bina gateway LoRaWAN sendiri?", "Tidak semestinya. Anda boleh menggunakan gateway sendiri atau rangkaian yang tersedia, tetapi projek mesti menerangkan siapa mengendalikan gateway dan server serta apa berlaku jika servis itu gagal."]],
    refs: [["LoRa Alliance: LoRaWAN for Developers", "https://lora-alliance.org/lorawan-for-developers/"], ["OASIS MQTT Version 5.0", "https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html"]],
    links: [["Panduan node sensor LoRa", "/blog/cara-bina-node-sensor-ladang-lora"], ["Katalog projek IoT", "/catalog?category=iot-embedded"], ["Database komponen", "/components"], ["Bincang pemilihan teknologi", "/contact"]],
  },
  {
    slug: "objektif-projek-akhir-tahun-elektronik-boleh-diukur",
    title: "Cara Tulis Objektif Projek Akhir Tahun Elektronik yang Boleh Diukur",
    excerpt: "Kaedah menulis objektif projek akhir tahun elektronik yang khusus, boleh diuji dan selari dengan masalah, metodologi serta hasil projek.",
    category: "FYP Guide",
    summary: `Objektif projek akhir tahun bukan senarai aktiviti seperti membeli komponen, menulis kod atau menyiapkan laporan. Objektif menerangkan hasil yang hendak dicapai dan dinilai. Bagi projek elektronik atau IoT, setiap objektif patut menghubungkan satu keperluan dengan output sistem dan kaedah pengesahan.

Objektif yang baik membantu mengecilkan skop. Jika ayat tidak boleh dipadankan dengan test case, metrik atau bukti, ayat itu mungkin terlalu umum. Gunakan kata kerja seperti mereka bentuk, membangunkan, mengukur, membandingkan dan menilai, kemudian nyatakan fungsi atau parameter yang benar-benar berada dalam skop.`,
    sections: [
      ["Bezakan aim, objektif dan feature", `Aim ialah tujuan keseluruhan, contohnya membangunkan prototaip pemantauan suhu bilik stor. Objektif memecahkan tujuan itu kepada hasil yang boleh dinilai. Feature pula ialah fungsi sistem seperti notifikasi atau eksport CSV. Satu feature hanya patut menjadi objektif jika ia penting kepada masalah dan akan diuji.

Elakkan ayat seperti "membangunkan sistem yang cekap dan pintar" kerana cekap dan pintar tidak mempunyai definisi. Gantikan dengan hasil khusus, contohnya merekod suhu pada sela yang ditetapkan dan menghasilkan amaran apabila threshold ujian dilampaui.`],
      ["Formula objektif yang boleh diuji", `Gunakan struktur: kata kerja + hasil teknikal + keadaan atau skop + kaedah penilaian. Contoh: "Mereka bentuk nod ESP32 yang merekod suhu dan kelembapan setiap 60 saat untuk penilaian kehilangan data semasa ujian 24 jam." Angka dalam objektif mesti datang daripada requirement atau justifikasi, bukan dipilih untuk kelihatan saintifik.

Jangan menjanjikan accuracy tertentu sebelum memilih rujukan dan prosedur kalibrasi. Jika belum pasti, tulis objektif untuk menilai error atau repeatability di bawah keadaan ujian yang dinyatakan.`],
      ["Selaraskan objektif dengan bab laporan", `Setiap objektif perlu muncul semula dalam metodologi dan keputusan. Bina traceability table dengan lajur objektif, modul, test case, bukti dan lokasi keputusan. Jika objektif menyebut masa respons, Bab 3 mesti menerangkan cara masa diukur dan Bab 4 mesti menunjukkan data, bukan hanya screenshot aplikasi.

Hadkan tiga atau empat objektif utama supaya setiap satu mendapat pengesahan bermakna. Objektif terlalu banyak biasanya menandakan feature list yang belum diprioritikan.`],
      ["Contoh pembaikan ayat", `Ayat lemah: "Untuk menggunakan IoT dalam pertanian." Ayat lebih baik: "Membangunkan prototaip ESP32 yang merekod kelembapan tanah dan status pam ke dashboard bagi dua zon ujian." Ayat lemah: "Untuk mengurangkan pembaziran air." Jika projek tidak mengukur penggunaan air sebelum dan selepas, tuntutan itu sukar dibuktikan. Tukar kepada "menilai tempoh operasi pam di bawah dua kaedah kawalan" jika itu yang mampu diuji.

Objektif bukan ruang promosi. Gunakan perkataan detect, prevent atau optimise hanya apabila definisi, baseline dan eksperimen menyokongnya.`],
    ],
    validation: ["Padankan setiap objektif dengan sekurang-kurangnya satu test case.", "Semak semua kata sifat seperti cepat, tepat dan efisien mempunyai metrik.", "Pastikan data yang diperlukan boleh dikumpul dengan alat tersedia.", "Minta pembaca lain menjelaskan semula objektif tanpa melihat feature list."],
    mistakes: ["Menulis aktiviti pembangunan sebagai objektif kajian.", "Menggunakan perkataan pintar tanpa fungsi atau ukuran.", "Menjanjikan impak sosial yang tidak diukur.", "Mempunyai objektif yang tidak muncul dalam keputusan."],
    faq: [["Berapa objektif sesuai untuk projek akhir tahun?", "Tiada angka universal, tetapi tiga atau empat objektif fokus biasanya lebih mudah dijejak dan diuji. Ikut format institusi dan pastikan setiap objektif mendapat bukti."], ["Boleh letak komponen dalam objektif?", "Boleh jika pemilihan teknologi penting kepada skop, tetapi fokus utama patut pada fungsi atau penilaian. Jangan mengunci komponen terlalu awal jika requirement masih berubah."]],
    refs: [["NIST Engineering Laboratory: Measurement Science", "https://www.nist.gov/el" ]],
    links: [["Cara pilih topik FYP", "/blog/how-to-choose-fyp-topic"], ["Katalog projek", "/catalog"], ["Topik kejuruteraan", "/topics"], ["Bincang objektif projek", "/contact"]],
  },
  {
    slug: "pelan-ujian-projek-akhir-tahun-elektronik",
    title: "Pelan Ujian Projek Akhir Tahun Elektronik: Test Case, Acceptance Criteria dan Bukti",
    excerpt: "Panduan membina pelan ujian FYP elektronik yang boleh diulang, dengan test case, acceptance criteria, data mentah dan bukti untuk viva.",
    category: "FYP Guide",
    summary: `Pelan ujian menukar dakwaan projek kepada bukti. Demo sekali yang berjaya tidak menunjukkan reliability, manakala screenshot tanpa keadaan ujian sukar diaudit. Pelajar perlu menentukan apa yang diuji, input, prosedur, expected result, acceptance criteria dan bukti sebelum menjalankan eksperimen.

Mulakan daripada objektif dan requirement. Functional test membuktikan fungsi, performance test mengukur masa atau throughput, reliability test mengulang operasi, dan fault test menilai tingkah laku apabila sensor, kuasa atau rangkaian bermasalah. Tidak semua projek memerlukan ujian makmal kompleks, tetapi semua memerlukan prosedur yang jelas.`,
    sections: [
      ["Anatomi satu test case", `Berikan ID seperti TC-POWER-01, requirement yang dirujuk, setup, precondition, langkah, input, expected result, acceptance criteria, actual result dan status. Nyatakan versi firmware, wiring dan peralatan kerana perubahan kecil boleh mengubah keputusan. Lampirkan gambar setup atau rajah titik ukuran.

Expected result ialah tingkah laku; acceptance criteria ialah sempadan lulus. "Dashboard memaparkan data" terlalu kabur. "Rekod dengan device_id dan timestamp muncul dalam 10 saat bagi 19 daripada 20 percubaan di rangkaian ujian" boleh dinilai, tetapi threshold mesti dijustifikasikan.`],
      ["Uji keadaan normal dan ralat", `Happy path hanya satu bahagian. Cabut sensor, masukkan input luar julat, matikan router, reboot mikropengawal dan pulihkan kuasa. Output fizikal perlu menuju keadaan selamat apabila input tidak sah. Sistem juga perlu memberitahu pengguna bahawa data stale atau peranti offline, bukan terus memaparkan bacaan lama sebagai bacaan semasa.

Untuk relay atau motor, gunakan beban ujian selamat dan pengawasan yang sesuai. Jangan menguji mains voltage pada breadboard atau tanpa penyeliaan kompeten.`],
      ["Kumpul bukti yang boleh diaudit", `Simpan data mentah dalam CSV, log serial, screenshot bertimestamp, gambar setup dan video ringkas untuk event yang sukar diulang. Namakan fail mengikut test case dan tarikh. Jangan hanya menyimpan screenshot berjaya; rekod kegagalan dan tindakan pembetulan membuktikan proses kejuruteraan.

Dalam Bab 4, ringkaskan keputusan tetapi kekalkan data mentah sebagai lampiran atau repository terkawal. Graf mesti mempunyai paksi, unit, sample count dan keadaan ujian.`],
      ["Daripada keputusan kepada kesimpulan", `Pisahkan failure sistem daripada failure prosedur. Jika sensor belum stabil, ulang selepas warm-up yang ditentukan. Jika alat rujukan tidak sesuai, jangan jadikan angka itu bukti accuracy. Laporkan bilangan percubaan dan variation, bukan hanya purata yang menyembunyikan outlier.

Apabila acceptance criteria gagal, pilih sama ada membaiki reka bentuk, mengecilkan requirement atau menerangkan limitasi. Jangan menukar criteria selepas melihat keputusan tanpa merekod sebab.`],
    ],
    validation: ["Jejak setiap objektif kepada test case dan bukti.", "Jalankan ujian berulang, bukan satu demo berjaya.", "Sertakan sekurang-kurangnya satu fault-recovery test.", "Pastikan graf mempunyai unit, bilangan sampel dan keadaan ujian."],
    mistakes: ["Menulis prosedur selepas keputusan diperoleh.", "Menggunakan pass atau fail tanpa acceptance criteria.", "Memilih screenshot terbaik dan membuang kegagalan.", "Menguji banyak pemboleh ubah serentak tanpa control."],
    faq: [["Berapa kali ujian perlu diulang?", "Ia bergantung pada variability dan tuntutan. Nyatakan bilangan percubaan dan alasan. Untuk fungsi diskret, beberapa puluh percubaan boleh menunjukkan pola; accuracy memerlukan reka bentuk eksperimen yang lebih formal."], ["Adakah video demo dikira bukti?", "Video berguna untuk urutan operasi, tetapi tidak menggantikan data berstruktur, prosedur dan log. Gunakan video bersama test record."]],
    refs: [["NIST/SEMATECH Engineering Statistics Handbook", "https://itl.nist.gov/div898/handbook/index2.htm"]],
    links: [["Checklist ujian IoT sebelum viva", "/blog/test-iot-final-year-project-before-viva"], ["Katalog projek", "/catalog"], ["Panduan projek akhir tahun", "/topics"], ["Bincang pelan ujian", "/contact"]],
  },
  {
    slug: "bill-of-materials-projek-akhir-tahun-elektronik",
    title: "Bill of Materials Projek Akhir Tahun: Komponen, Alternatif dan Risiko Bekalan",
    excerpt: "Cara menyediakan BOM projek elektronik yang boleh dibeli dan diaudit, termasuk part number, spesifikasi kritikal, alternatif serta risiko bekalan.",
    category: "FYP Guide",
    summary: `Bill of Materials atau BOM ialah senarai terkawal semua item yang diperlukan untuk membina versi projek tertentu. BOM yang hanya menulis "sensor", "relay" dan "wayar" tidak cukup untuk pembelian atau troubleshooting. Ia perlu mengenal pasti part, kuantiti, rating, fungsi, sumber dan alternatif yang benar-benar serasi.

BOM membantu pelajar mengesan perubahan, mengawal kos dan mengurangkan risiko komponen tiba lewat. Harga berubah mengikut pembekal dan masa, jadi rekod harga sebagai snapshot bertarikh, bukan janji kos tetap. Jangan pilih komponen hanya kerana tajuk listing kelihatan sesuai.`,
    sections: [
      ["Medan penting dalam BOM", `Gunakan reference seperti U1, R3 atau SENSOR1, nama part, manufacturer part number jika ada, kuantiti, spesifikasi kritikal, package atau connector, voltage, supplier, tarikh semakan dan status. Untuk module generik, simpan pautan, gambar kedua-dua sisi dan marking IC kerana listing yang sama boleh berubah reka bentuk.

Pisahkan komponen wajib, consumable, alat dan item pilihan. Breadboard, terminal, enclosure, kabel serta adapter sering dilupakan walaupun menentukan demo.`],
      ["Tentukan spesifikasi kritikal", `Alternatif hanya sah jika memenuhi parameter yang penting kepada litar dan firmware. Sensor suhu tidak boleh ditukar hanya kerana unit sama; interface, range, accuracy, response time, library dan voltage mungkin berbeza. Untuk regulator, semak input range, output, current, thermal dan pinout. Untuk relay, semak coil voltage, contact rating dan isolation sebenar modul.

Tandakan parameter must match dan parameter yang boleh berubah. Ini menjadikan keputusan pembelian boleh dipertahankan semasa viva.`],
      ["Kawal versi dan perubahan", `Letakkan nombor versi BOM yang sepadan dengan schematic dan firmware. Apabila part ditukar, rekod sebab, tarikh dan kesan pada wiring atau kod. Jangan edit senarai lama tanpa jejak kerana hasil ujian mungkin datang daripada versi hardware yang berbeza.

Simpan satu as-built BOM selepas prototaip siap. Senarai ini mencerminkan apa yang benar-benar dipasang, bukan apa yang dirancang pada proposal.`],
      ["Urus risiko pembelian", `Kenal pasti long lead item dan beli lebih awal hanya selepas interface disahkan. Simpan satu atau dua spare untuk part murah yang mudah rosak, tetapi elakkan membeli banyak sebelum proof of concept. Periksa reputasi pembekal dan kemungkinan counterfeit bagi komponen kritikal.

Gunakan risk register ringkas: part, kemungkinan masalah, impak, tindakan dan alternatif. Risiko boleh berupa stok habis, connector berbeza, voltage tidak serasi atau library tidak lagi diselenggara.`],
    ],
    validation: ["Semak setiap blok schematic mempunyai item BOM.", "Pastikan part number atau gambar modul cukup untuk pembelian semula.", "Uji alternatif pada breadboard sebelum menandainya approved.", "Padankan as-built BOM dengan prototaip akhir dan gambar wiring."],
    mistakes: ["Menggunakan nama generik tanpa rating atau part number.", "Menganggap module alternatif mempunyai pinout sama.", "Mencampurkan harga lama dengan anggaran semasa.", "Tidak merekod perubahan part selepas ujian."],
    faq: [["Perlukah BOM memasukkan software?", "BOM biasanya fokus hardware, tetapi laporan boleh mempunyai senarai software, library dan versi berasingan. Kedua-duanya penting untuk reproducibility."], ["Boleh guna pautan marketplace sebagai part number?", "Ia membantu untuk module generik, tetapi listing boleh berubah. Rekod marking, spesifikasi, gambar dan tarikh semakan bersama pautan."]],
    refs: [["NIST: Supply Chain Risk Management", "https://csrc.nist.gov/projects/cyber-supply-chain-risk-management"]],
    links: [["Database komponen", "/components"], ["Katalog projek", "/catalog"], ["Panduan memilih sensor ESP32", "/blog/best-esp32-sensors-final-year-projects"], ["Hubungi Rectronx", "/contact"]],
  },
  {
    slug: "design-review-projek-elektronik-sebelum-beli-komponen",
    title: "Design Review Projek Elektronik Sebelum Membeli Komponen",
    excerpt: "Checklist design review untuk mengesan isu voltage, pin, kuasa, interface, keselamatan dan testability sebelum pelajar membeli komponen FYP.",
    category: "Electronics",
    summary: `Design review sebelum pembelian mengurangkan risiko modul tidak serasi dan skop berubah selepas wang dibelanjakan. Review bukan mesyuarat formal yang panjang. Ia ialah semakan requirement, block diagram, interface, power budget, pin allocation, risiko dan rancangan ujian oleh pelajar bersama penyelia atau rakan yang memahami projek.

Tujuannya bukan membuktikan reka bentuk sudah sempurna. Tujuannya ialah menemui andaian tersembunyi ketika perubahan masih murah. Setiap keputusan penting perlu mempunyai evidence seperti datasheet, calculation atau prototaip kecil.`,
    sections: [
      ["Mulakan daripada requirement", `Senaraikan pengguna, persekitaran, input, output, response, kuasa, connectivity dan batas keselamatan. Bezakan requirement wajib daripada idea tambahan. Jika projek mesti berjalan luar bangunan, enclosure, suhu, air, antenna dan sumber kuasa menjadi sebahagian reka bentuk, bukan aksesori akhir.

Semak setiap feature menyokong objektif. Buang feature yang tidak mempunyai pengguna, test atau masa pembangunan.`],
      ["Semak semua interface", `Buat interface table untuk setiap sambungan: signal, arah, voltage logic, protocol, connector, pull-up dan pin controller. I2C memerlukan alamat yang tidak bertembung dan pull-up sesuai; UART memerlukan silang TX/RX serta baud; analog memerlukan julat input yang tidak melebihi ADC.

Gunakan datasheet dan schematic papan sebenar. Nama pin pada tutorial mungkin merujuk papan lain. Untuk ESP32, semak input-only, strapping pin dan pin yang digunakan flash sebelum menetapkan GPIO.`],
      ["Power, thermal dan beban", `Lengkapkan power budget dan periksa regulator, kabel, connector serta arus puncak. Tentukan cara motor, relay atau solenoid dipacu; GPIO bukan output kuasa. Semak flyback protection, transistor atau driver, common ground dan isolation jika diperlukan.

Untuk beban mains, jangan bina pada breadboard. Gunakan modul dan enclosure yang sesuai serta penyeliaan orang kompeten. Projek pelajar boleh mendemonstrasikan logik dengan beban voltan rendah jika risiko mains tidak dapat dikawal.`],
      ["Design for test", `Sediakan test point untuk ground, rail dan signal penting. Pastikan connector boleh dicapai dan komponen boleh diganti. Tentukan bagaimana firmware debug dan bagaimana sistem dipulihkan jika konfigurasi salah. Sediakan status LED atau log yang memberi makna, bukan sekadar menyala.

Akhir review dengan action list: isu, pemilik, deadline dan keputusan. Jangan membeli part kritikal sehingga isu voltage, interface dan kuasa ditutup.`],
    ],
    validation: ["Semak datasheet bagi setiap interface kritikal.", "Padankan pin allocation dengan tool atau schematic rasmi.", "Kira power budget termasuk beban puncak.", "Bina proof of concept bagi risiko tertinggi sebelum pembelian penuh."],
    mistakes: ["Membeli semua komponen berdasarkan tajuk projek.", "Menganggap semua module menerima logic 5 V.", "Melupakan alamat I2C, pin boot atau input-only.", "Tidak merancang titik ukuran dan cara debug."],
    faq: [["Siapa patut hadir design review?", "Pelajar, penyelia dan jika boleh seorang rakan yang boleh mencabar andaian. Review kecil dengan bahan lengkap lebih berguna daripada ramai orang tanpa dokumen."], ["Perlu schematic lengkap sebelum review?", "Sekurang-kurangnya block diagram, interface table dan power plan perlu ada. Schematic terperinci boleh melalui review kedua sebelum PCB dibuat."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"]],
    links: [["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Database komponen", "/components"], ["Katalog projek elektronik", "/catalog?category=iot-embedded"], ["Bincang reka bentuk", "/contact"]],
  },
  {
    slug: "rekod-data-eksperimen-laporan-projek-akhir-tahun-iot",
    title: "Cara Rekod Data Eksperimen untuk Laporan Projek Akhir Tahun IoT",
    excerpt: "Panduan merekod eksperimen IoT supaya keputusan boleh diulang, diaudit dan digunakan dengan betul dalam Bab Metodologi serta Bab Keputusan.",
    category: "FYP Guide",
    summary: `Rekod eksperimen ialah jambatan antara prototaip dan kesimpulan. Tanpa catatan versi, setup, masa, input dan data mentah, pelajar mungkin tidak dapat menerangkan mengapa dua ujian memberi hasil berbeza. Rekod yang baik membolehkan orang lain mengulang prosedur dan memahami limitasi.

Sediakan experiment ID sebelum ujian. Simpan hypothesis atau soalan, pemboleh ubah, alat, konfigurasi, prosedur, data mentah, pemerhatian dan keputusan. Jangan bergantung pada ingatan atau chat message yang tidak tersusun.`,
    sections: [
      ["Bina experiment log", `Setiap sesi perlu mempunyai tarikh dan masa dengan zon, nama penguji, lokasi, hardware revision, firmware commit, konfigurasi rangkaian dan alat rujukan. Catat perubahan walaupun nampak kecil seperti kabel, power adapter atau kedudukan sensor. Gambar setup mesti menunjukkan skala atau label yang membantu pembaca.

Gunakan nama fail konsisten, contohnya EXP-07_run-03_raw.csv. Jangan overwrite data lama selepas filter atau calibration; hasil diproses perlu fail berasingan bersama script atau formula.`],
      ["Kawal pemboleh ubah", `Kenal pasti independent variable yang diubah, dependent variable yang diukur dan control variable yang dikekalkan. Jika menguji jarak komunikasi, jangan ubah antena dan kuasa pada masa sama tanpa reka bentuk factorial yang disengajakan. Randomise urutan jika drift masa atau suhu boleh mempengaruhi hasil.

Nyatakan sample interval, sample count, warm-up dan tempoh. Sensor yang memerlukan stabilization tidak boleh dibandingkan menggunakan bacaan pertama sahaja.`],
      ["Jaga integriti data", `Simpan timestamp standard, unit dalam header atau schema, missing value secara eksplisit dan calibration record. Gunakan checksum atau repository bagi fail penting jika perlu. Jangan salin nilai secara manual daripada graf apabila export tersedia kerana transcription error sukar dikesan.

Rekod exclusion dengan sebab. Jika satu run dibuang kerana kuasa terputus, kekalkan rekod bahawa ia berlaku. Selective reporting melemahkan kesimpulan.`],
      ["Tukar data kepada Bab 4", `Mulakan dengan jadual ringkas keadaan ujian dan bilangan sampel. Gunakan graf yang sepadan dengan soalan: time series untuk trend, scatter untuk hubungan, box plot untuk distribution atau confusion matrix untuk classification. Setiap rajah perlu caption yang menerangkan apa, keadaan dan penemuan utama.

Pisahkan observation daripada interpretation. "Voltan turun kepada nilai X ketika relay aktif" ialah observation; "adapter tidak cukup" ialah interpretation yang memerlukan ujian sokongan.`],
    ],
    validation: ["Minta orang lain mengulang satu ujian hanya menggunakan log.", "Padankan setiap graf dengan fail data mentah.", "Semak unit, timezone dan versi firmware direkod.", "Simpan kegagalan serta exclusion bersama justifikasi."],
    mistakes: ["Mengubah fail data mentah selepas eksperimen.", "Tidak merekod firmware atau wiring revision.", "Menggunakan graf tanpa unit atau sample count.", "Membuang run gagal tanpa jejak."],
    faq: [["Excel atau CSV lebih baik?", "CSV mudah diproses dan version-control, manakala spreadsheet sesuai untuk semakan manual. Simpan data mentah dalam format terbuka dan formula analisis secara berasingan."], ["Perlukah semua data masuk laporan?", "Tidak. Laporan boleh menunjukkan ringkasan dan sampel, tetapi data mentah serta prosedur perlu disimpan supaya keputusan boleh diaudit mengikut polisi institusi."]],
    refs: [["RFC 3339 Internet Timestamps", "https://www.rfc-editor.org/info/rfc3339/"], ["NIST/SEMATECH Engineering Statistics Handbook", "https://itl.nist.gov/div898/handbook/index2.htm"]],
    links: [["Pelan ujian IoT sebelum viva", "/blog/test-iot-final-year-project-before-viva"], ["Katalog projek", "/catalog"], ["Topik IoT", "/topics/iot"], ["Bincang metodologi", "/contact"]],
  },
  {
    slug: "common-ground-esp32-sensor-relay-motor",
    title: "Common Ground dalam Projek ESP32, Sensor, Relay dan Motor",
    excerpt: "Penerangan praktikal common ground, laluan arus balik dan pemisahan beban untuk mengelakkan signal tidak stabil dalam projek elektronik ESP32.",
    category: "Electronics",
    summary: `Signal voltage hanya bermakna berbanding satu rujukan. Apabila ESP32 menghantar HIGH kepada driver relay atau membaca output sensor, kedua-dua litar biasanya memerlukan rujukan ground bersama supaya penerima mentafsir voltan dengan betul. Common ground tidak bermaksud semua arus patut dipaksa melalui satu wayar nipis atau semua sistem mesti disambungkan tanpa memikirkan isolation.

Masalah ground sering muncul sebagai bacaan sensor meloncat, komunikasi UART gagal atau ESP32 reset apabila motor bermula. Penyelesaian memerlukan pemahaman laluan arus balik, bukan sekadar menambah wayar GND secara rawak.`,
    sections: [
      ["Apa maksud common ground", `Jika output ESP32 ialah 3.3 V relatif kepada GND ESP32, input driver perlu melihat rujukan yang sama. Dengan dua bekalan DC berasingan tetapi tidak isolated pada signal, sambungkan ground pada titik yang dirancang. Jangan sambung terminal positif antara rail yang berbeza.

Sesetengah modul optocoupler boleh digunakan dengan isolation, tetapi banyak relay module mempunyai jumper atau ground layout yang menghapus isolation. Semak schematic modul, bukan warna board atau label iklan.`],
      ["Laluan arus motor dan relay", `Arus motor tidak patut kembali melalui laluan ground sensor yang sempit. Gunakan routing yang memisahkan arus tinggi dan signal, kemudian satukan pada titik rujukan sesuai berhampiran bekalan atau driver. Tambahkan flyback diode bagi coil DC dan decoupling mengikut datasheet.

Breadboard mempunyai resistance serta contact yang tidak ideal. Motor, servo dan modem boleh menghasilkan voltage drop. Untuk prototaip, gunakan wayar pendek, connector sesuai dan ukur voltan antara ground points ketika beban aktif.`],
      ["Bila ground tidak boleh disambung terus", `Sistem mains, industrial field wiring atau dua peralatan dengan perbezaan potensi memerlukan analisis keselamatan dan mungkin galvanic isolation. Jangan sambung ground oscilloscope atau USB secara sembarangan pada litar mains. Projek pelajar patut menggunakan voltan rendah dan penyeliaan kompeten jika risiko tidak difahami.

Communication interface seperti RS-485 juga mempunyai had common-mode. Isolation bukan aksesori; ia ialah keputusan sistem berdasarkan voltage, fault dan keselamatan.`],
      ["Cara troubleshoot ground", `Matikan kuasa dan periksa continuity pada ground yang sepatutnya berkongsi rujukan. Hidupkan litar, ukur voltage drop antara ground ESP32 dan ground driver semasa beban aktif. Gunakan probe pendek dan titik ukuran jelas. Jika bacaan berubah apabila motor mula, lihat current return dan supply transient.

Uji sensor tanpa beban, kemudian tambah driver dan motor satu demi satu. Rekod konfigurasi yang mencetuskan masalah supaya pembaikan boleh dibuktikan.`],
    ],
    validation: ["Lukis laluan arus bekalan dan arus balik pada schematic.", "Ukur voltage drop antara ground points ketika beban puncak.", "Uji sensor sebelum dan selepas motor atau relay diaktifkan.", "Semak sama ada modul optocoupler benar-benar isolated dalam wiring sebenar."],
    mistakes: ["Menyambung signal antara dua litar tanpa rujukan bersama.", "Membawa arus motor melalui ground sensor.", "Menganggap semua relay module memberikan isolation.", "Menggunakan alat ber-ground pada mains tanpa latihan keselamatan."],
    faq: [["Jika motor guna adapter lain, perlu sambung ground?", "Jika ESP32 mengawal driver tanpa galvanic isolation, biasanya rujukan ground perlu dikongsi. Sambungan tepat bergantung pada driver dan schematic; jangan sambung rail positif yang berlainan."], ["Adakah star ground wajib?", "Tidak untuk semua litar. Ia satu teknik mengawal laluan arus. Layout terbaik bergantung pada frekuensi, arus dan topology. Fokus pada current return yang nyata."]],
    refs: [["Texas Instruments PCB Layout and Decoupling Guidelines", "https://www.ti.com/lit/an/scea042/scea042.pdf"]],
    links: [["Panduan bekalan kuasa ESP32", "/blog/bekalan-kuasa-esp32-sensor-relay-projek-pelajar"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Komponen ESP32", "/components/esp32"], ["Bincang wiring projek", "/contact"]],
  },
  {
    slug: "pull-up-pull-down-floating-input-elektronik",
    title: "Pull-Up, Pull-Down dan Floating Input: Punca Input Digital Tidak Stabil",
    excerpt: "Fahami mengapa input digital terapung, cara resistor pull-up dan pull-down menetapkan keadaan lalai, serta cara menguji button dan sensor dengan betul.",
    category: "Electronics",
    summary: `Input digital berimpedance tinggi boleh bertukar antara HIGH dan LOW apabila tidak dipacu. Keadaan ini dipanggil floating dan boleh menyebabkan button seolah-olah ditekan, interrupt palsu atau relay bertukar tanpa arahan. Resistor pull-up atau pull-down memberikan keadaan lalai yang diketahui sambil membenarkan signal mengatasinya.

Pilihan resistor tidak boleh dibuat hanya berdasarkan satu tutorial. Semak datasheet mikropengawal, voltage logic, leakage current, kelajuan signal, penggunaan kuasa dan noise persekitaran. Internal pull resistor memudahkan prototaip tetapi nilainya mungkin mempunyai julat yang luas.`,
    sections: [
      ["Bagaimana pull-up berfungsi", `Pull-up menyambungkan input kepada rail logic melalui resistor. Apabila switch terbuka, input dibaca HIGH; apabila switch menutup ke ground, input LOW. Resistor mengehadkan arus supaya switch tidak short rail terus ke ground. Pull-down melakukan arah bertentangan dan memberi LOW semasa terbuka.

Logik active-low bukan masalah. Namakan signal seperti BUTTON_N atau relay_active_low dan terangkan dalam kod supaya pembacaan tidak terbalik secara senyap.`],
      ["Pilih internal atau external", `Internal pull sesuai untuk button atau signal pendek dalam banyak prototaip, tetapi tidak semua pin menyediakannya. Dokumentasi ESP32 menyatakan GPIO34 dan ke atas ialah input-only dan tidak mempunyai internal pull-up atau pull-down. Pin khusus berbeza mengikut cip dan papan, jadi semak datasheet.

External resistor memberi nilai terkawal dan boleh diletakkan berhampiran penerima. Nilai terlalu rendah membazir arus ketika signal aktif; terlalu tinggi lebih sensitif kepada leakage dan noise. Nilai sekitar julat kilo-ohm sering digunakan, tetapi pengiraan dan datasheet menentukan pilihan akhir.`],
      ["Button bounce dan noise", `Pull resistor tidak menghapus mechanical bounce. Satu tekanan boleh menghasilkan beberapa transition dalam milisaat. Gunakan debounce software berdasarkan masa atau rangkaian hardware yang direka dengan betul. Jangan menggunakan delay panjang yang menghalang semua tugas jika sistem perlu responsif.

Kabel panjang bertindak sebagai antenna dan menambah capacitance. Untuk persekitaran bising, pertimbangkan shielding, twisted pair, filter, Schmitt-trigger input atau protokol differential daripada membawa GPIO mentah jauh.`],
      ["Kaedah diagnosis", `Ukur voltage input relatif kepada ground dalam keadaan switch terbuka dan tertutup. Jika voltan berada di kawasan pertengahan atau berubah apabila tangan menghampiri, input mungkin floating. Aktifkan internal pull secara eksplisit dalam pinMode atau konfigurasi framework, bukan menganggap default.

Gunakan logic analyser untuk melihat bounce dan pulse ringkas. Rekod bilangan event bagi satu tekanan sebelum dan selepas debounce.`],
    ],
    validation: ["Ukur voltage input bagi semua keadaan switch.", "Uji 100 tekanan dan kira event tambahan.", "Reboot papan untuk memastikan keadaan lalai selamat.", "Semak pin sebenar menyokong internal pull yang digunakan."],
    mistakes: ["Membiarkan input tidak dipacu.", "Menganggap semua GPIO mempunyai internal pull.", "Menyalahkan software sebelum mengukur voltage input.", "Menganggap pull resistor menyelesaikan button bounce."],
    faq: [["Berapa nilai resistor pull-up?", "Ia bergantung pada leakage, capacitance, kelajuan dan penggunaan kuasa. Nilai seperti 4.7 kOhm atau 10 kOhm lazim dalam keadaan tertentu, tetapi semak datasheet dan ukur signal."], ["Boleh guna pull-up dan pull-down serentak?", "Divider boleh menetapkan bias, tetapi untuk input switch biasa ia biasanya tidak perlu dan membazir arus. Gunakan topology yang mempunyai tujuan jelas."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"]],
    links: [["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Panduan pin ESP32 selamat", "/blog/esp32-pinout-safe-gpio-pins-guide"], ["Komponen ESP32", "/components/esp32"], ["Hubungi Rectronx", "/contact"]],
  },
  {
    slug: "pilih-resistor-led-pembahagi-voltan-elektronik",
    title: "Cara Pilih Resistor untuk LED dan Pembahagi Voltan dalam Projek Elektronik",
    excerpt: "Panduan mengira resistor LED dan voltage divider, menyemak kuasa, tolerance, loading serta had input ADC dalam projek elektronik pelajar.",
    category: "Electronics",
    summary: `Resistor bukan dipilih dengan menyalin warna daripada gambar. Untuk LED, resistor menghadkan arus berdasarkan supply voltage, forward voltage dan arus sasaran. Untuk pembahagi voltan, nisbah resistor menentukan output tanpa beban, tetapi input ADC dan leakage menjadikan litar sebenar tidak ideal.

Setiap pengiraan perlu disemak dengan standard value, tolerance dan power dissipation. Ukur prototaip kerana forward voltage LED, supply dan resistor sebenar mempunyai variasi. Jangan gunakan divider sebagai power supply untuk beban yang berubah.`,
    sections: [
      ["Resistor siri LED", `Gunakan R = (Vsupply - Vf) / I. Jika GPIO 3.3 V memacu LED dengan forward voltage 2.0 V pada sasaran 5 mA, anggaran resistor ialah 260 ohm; pilih nilai standard yang selamat seperti 270 atau 330 ohm bergantung brightness. Ini hanya contoh, bukan nilai universal.

Semak arus maksimum GPIO dan jumlah arus papan dalam datasheet. Arus sasaran selalunya boleh lebih rendah daripada rating maksimum LED. Kira kuasa resistor P = I^2R dan pilih rating dengan margin.`],
      ["Pembahagi voltan", `Bagi dua resistor ideal, Vout = Vin x Rbottom / (Rtop + Rbottom). Nilai besar mengurangkan arus divider tetapi meningkatkan source impedance. ADC sample-and-hold mungkin memerlukan impedance lebih rendah atau masa sampling lebih panjang. Nilai kecil membazir kuasa dan membebankan sumber.

Pastikan Vin maksimum termasuk transient menghasilkan Vout di bawah had absolute maximum input. Tambahkan perlindungan yang sesuai jika sumber boleh melebihi jangkaan. Jangan bergantung pada software clamp.`],
      ["Tolerance dan error", `Resistor 1% masih menghasilkan error nisbah berdasarkan kombinasi tolerance. Reference ADC, noise, calibration dan loading juga menyumbang. Jika mengukur bateri, uji beberapa voltan dengan alat rujukan dan fit calibration hanya jika prosedur boleh dipertahankan.

Sensor dengan output impedance atau input dengan leakage mengubah divider. Gunakan model Thevenin untuk memahami source resistance dan loading.`],
      ["Praktikal breadboard", `Ukur resistor sebenar sebelum memasang jika warna sukar dibaca. Pastikan ground common, gunakan probe pada titik yang betul dan mulakan dengan voltage rendah. Untuk LED, polariti salah biasanya tidak menyala; jangan terus mengecilkan resistor tanpa diagnosis.

Dokumentasikan formula, nilai dipilih, nilai diukur dan hasil. Ini menunjukkan keputusan kejuruteraan, bukan trial and error.`],
    ],
    validation: ["Kira worst-case menggunakan voltan dan tolerance maksimum.", "Ukur Vout tanpa beban dan ketika ADC disambungkan.", "Semak kuasa resistor serta arus GPIO.", "Bandingkan beberapa titik input dengan multimeter rujukan."],
    mistakes: ["Menggunakan rating maksimum LED sebagai arus wajib.", "Menganggap divider boleh membekalkan relay atau sensor.", "Mengabaikan impedance ADC dan tolerance.", "Membenarkan input melebihi had absolute maximum."],
    faq: [["Mengapa LED masih terang dengan resistor lebih besar?", "LED moden boleh kelihatan terang pada beberapa milliampere. Nilai lebih besar mengurangkan arus dan biasanya lebih selamat selagi brightness mencukupi."], ["Boleh turunkan 5 V ke 3.3 V dengan divider?", "Divider boleh mengubah signal berimpedance tinggi, bukan menjadi regulator untuk beban berubah. Untuk bekalan kuasa gunakan regulator yang sesuai."]],
    refs: [["Texas Instruments Voltage Divider Calculator", "https://www.ti.com/download/kbase/volt/volt_div3.htm"], ["TI Voltage-Sensing Divider Application Brief", "https://www.ti.com/document-viewer/lit/html/SNAA363/GUID-7B0D26D5-46C0-4D6F-94BC-9579FEFB9A94"]],
    links: [["Database komponen", "/components"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Panduan wiring ESP32", "/blog/common-esp32-wiring-mistakes-fyp-demo"], ["Bincang litar projek", "/contact"]],
  },
  {
    slug: "kapasitor-decoupling-kurangkan-reset-esp32",
    title: "Kapasitor Decoupling: Cara Mengurangkan Reset ESP32 dengan Betul",
    excerpt: "Fahami fungsi decoupling dan bulk capacitor, lokasi pemasangan serta ujian voltage drop untuk menangani reset ESP32 tanpa tekaan.",
    category: "Electronics",
    summary: `ESP32 yang reset ketika WiFi, relay atau sensor aktif mungkin mengalami gangguan bekalan, tetapi menambah kapasitor secara rawak bukan diagnosis. Decoupling capacitor menyediakan laluan impedance rendah untuk arus transient tempatan dan membantu mengurangkan noise pada rail. Bulk capacitor menyokong perubahan beban lebih perlahan. Kedua-duanya melengkapkan bekalan yang betul, bukan menggantikannya.

Nilai kapasitor, ESR, voltage rating, dielectric dan penempatan mempengaruhi hasil. Ikut schematic dan hardware design guideline bagi cip atau papan sebenar. Papan pembangunan sudah mempunyai kapasitor tertentu; beban luaran mungkin memerlukan reka bentuk tambahan pada titik beban.`,
    sections: [
      ["Decoupling berbanding bulk", `Kapasitor kecil seperti 0.1 uF lazim diletakkan sangat dekat dengan pin supply IC untuk transient frekuensi tinggi. Kapasitor bulk yang lebih besar diletakkan pada kemasukan rail atau berhampiran beban untuk perubahan arus lebih lambat. Ini ialah prinsip umum; datasheet menentukan nilai dan susunan khusus.

Trace dan via mempunyai inductance. Kapasitor jauh daripada pin kurang efektif pada frekuensi tinggi. Texas Instruments dan Espressif menekankan penempatan dekat dengan pin atau kemasukan bekalan.`],
      ["Mengapa ESP32 reset", `Punca boleh termasuk adapter lemah, kabel USB resistance tinggi, regulator panas, motor noise, pin EN terganggu, short sekejap atau firmware watchdog. Log serial boleh menunjukkan brownout atau reset reason, tetapi measurement diperlukan untuk mengesahkan punca.

Ukur rail pada papan ketika event berlaku. Multimeter mungkin tidak menangkap transient sangat singkat; oscilloscope lebih sesuai jika tersedia dan digunakan dengan selamat. Walaupun begitu, ujian A/B dengan beban dan bekalan membantu mengecilkan punca.`],
      ["Cara menambah kapasitor dengan selamat", `Semak polariti electrolytic, voltage rating dan keadaan power-off sebelum pemasangan. Letakkan decoupling kecil berhampiran pin atau modul yang memerlukan, dan bulk capacitor berhampiran kemasukan beban mengikut guideline. Elakkan lead panjang. Kapasitor terlalu besar boleh meningkatkan inrush current dan menjejaskan regulator atau switch.

Jangan meletakkan kapasitor pada signal boot, EN atau komunikasi tanpa memahami timing. Penyelesaian power tidak patut mengubah signal secara tidak sengaja.`],
      ["Buktikan pembaikan", `Tetapkan ujian yang konsisten: operasi WiFi, switching relay dan startup beban pada sela tertentu. Rekod bilangan reset, voltan minimum, suhu regulator dan konfigurasi capacitor. Tukar satu faktor pada satu masa.

Jika kabel atau adapter menyelesaikan masalah, nyatakan punca paling mungkin ialah supply path. Jika capacitor membantu tetapi voltage masih di luar spec, reka bentuk belum selesai.`],
    ],
    validation: ["Baca reset reason dan padankan dengan masa beban aktif.", "Ukur rail pada input papan dan titik beban.", "Bandingkan ujian sebelum dan selepas dengan prosedur sama.", "Semak polariti, voltage rating dan suhu semua komponen kuasa."],
    mistakes: ["Menambah electrolytic tanpa memeriksa polariti.", "Meletakkan kapasitor jauh dengan lead panjang.", "Menggunakan kapasitor untuk menutup regulator tidak mencukupi.", "Mengubah beberapa komponen sekali gus dan tidak tahu punca sebenar."],
    faq: [["Berapa nilai kapasitor perlu ditambah?", "Tiada nilai universal. Ikut guideline papan, profile beban dan measurement. Espressif memberikan cadangan pada power entrance dan pin bekalan untuk reka bentuk ESP32, tetapi papan siap mungkin berbeza."], ["Adakah reset ESP32 sentiasa brownout?", "Tidak. Watchdog, exception, pin EN, boot pin, overheating atau firmware juga boleh menyebabkan reset. Gunakan reset log dan ujian berstruktur."]],
    refs: [["Espressif ESP32 Schematic Checklist", "https://docs.espressif.com/projects/esp-hardware-design-guidelines/en/latest/esp32/schematic-checklist.html"], ["Texas Instruments Decoupling Capacitor Guidelines", "https://www.ti.com/lit/an/slaa921/slaa921.pdf"]],
    links: [["Bekalan kuasa ESP32", "/blog/bekalan-kuasa-esp32-sensor-relay-projek-pelajar"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Komponen ESP32", "/components/esp32"], ["Bincang masalah reset", "/contact"]],
  },
  {
    slug: "guna-multimeter-troubleshooting-projek-elektronik-fyp",
    title: "Cara Guna Multimeter untuk Troubleshooting Projek Elektronik FYP dengan Selamat",
    excerpt: "Aliran kerja multimeter untuk memeriksa continuity, voltan dan arus dalam projek voltan rendah, termasuk kesilapan probe yang boleh merosakkan litar.",
    category: "Electronics",
    summary: `Multimeter boleh menjawab tiga soalan asas: adakah sambungan lengkap, adakah voltage sampai ke titik yang betul, dan berapa arus melalui laluan tertentu. Namun mode serta kedudukan probe mengubah cara meter berinteraksi dengan litar. Kesilapan paling berbahaya ialah mengukur voltage ketika lead masih pada current jack kerana meter boleh menjadi laluan short.

Panduan ini fokus pada projek DC voltan rendah seperti ESP32, sensor dan relay. Jangan mengukur mains jika anda tidak terlatih, tidak mempunyai meter serta probe dengan rating sesuai atau tiada penyeliaan kompeten.`,
    sections: [
      ["Pemeriksaan sebelum kuasa", `Periksa wiring secara visual, polarity, connector dan short yang jelas. Dengan kuasa dimatikan dan kapasitor discharged, gunakan continuity untuk memeriksa ground bersama, fuse dan sambungan. Fluke menegaskan continuity perlu diuji tanpa voltage pada litar.

Continuity beep tidak membuktikan connection berkualiti di bawah beban. Resistance contact mungkin berubah apabila arus meningkat, jadi teruskan dengan voltage-drop test ketika sistem beroperasi.`],
      ["Mengukur voltage", `Letakkan lead hitam pada COM dan lead merah pada V/ohm. Pilih DC voltage dan range yang sesuai. Voltage diukur secara parallel antara dua titik. Untuk projek ESP32, ukur adapter, input regulator, rail 5 V atau 3.3 V dan voltage pada beban ketika event berlaku.

Catat titik rujukan. "Voltage sensor 3.3 V" tidak lengkap tanpa menyatakan diukur terhadap ground mana dan keadaan beban.`],
      ["Mengukur arus", `Arus diukur dengan membuka laluan dan memasukkan meter secara series. Pindahkan lead ke current jack yang betul, mulakan pada range tinggi dan semak fuse meter. Jangan letakkan meter dalam mode arus terus merentasi supply; itu menghasilkan short melalui meter.

Selepas selesai, kembalikan lead merah ke voltage jack. Untuk arus transient atau sistem berterusan, current sensor atau oscilloscope dengan shunt mungkin lebih sesuai daripada handheld meter.`],
      ["Aliran diagnosis sistematik", `Mulakan pada sumber dan bergerak ke beban: adapter, regulator, rail, connector, driver, kemudian komponen. Bandingkan keadaan normal dengan keadaan gagal. Jika supply stabil tetapi signal salah, semak logic level, pin configuration dan communication. Jika voltage jatuh ketika beban aktif, fokus kepada resistance laluan dan kemampuan bekalan.

Ambil gambar probe placement dan jadual bacaan. Ini membantu laporan dan mengelakkan angka tanpa konteks.`],
    ],
    validation: ["Sahkan lead berada pada jack yang betul sebelum setiap ukuran.", "Uji continuity hanya selepas kuasa dimatikan dan capacitor discharged.", "Ukur voltage supply ketika idle dan beban puncak.", "Catat mode, range, titik probe dan keadaan sistem."],
    mistakes: ["Mengukur voltage dengan lead pada current jack.", "Menguji resistance atau continuity pada litar hidup.", "Menganggap beep bermaksud sambungan sempurna.", "Menyentuh mains dengan meter atau latihan yang tidak sesuai."],
    faq: [["Mengapa multimeter tunjuk 3.3 V tetapi ESP32 masih reset?", "Meter mungkin tidak menangkap transient pendek. Periksa log reset, kabel, beban dan gunakan oscilloscope jika tersedia serta anda tahu menggunakannya dengan selamat."], ["Boleh ukur arus terus pada terminal bateri?", "Tidak dalam mode arus kerana ia boleh short bateri melalui meter. Arus diukur secara series dengan beban dan perlindungan yang sesuai."]],
    refs: [["Fluke: How to Use a Multimeter", "https://www.fluke.com/en/learn/blog/maintenance-monitoring/how-to-use-a-multimeter-guide"], ["Fluke: What Is Continuity", "https://www.fluke.com/en-us/learn/blog/electrical/what-is-continuity"]],
    links: [["Checklist troubleshooting elektronik", "/blog/checklist-troubleshooting-projek-elektronik-sebelum-demo"], ["Database komponen", "/components"], ["ESP32 Pinout Tool", "/tools/esp32-pinout"], ["Hubungi Rectronx", "/contact"]],
  },
];

const blogDir = path.join(process.cwd(), "content", "blog");

for (const post of posts) {
  const sectionText = post.sections.map(([heading, body]) => `## ${heading}\n\n${body}`).join("\n\n");
  const validationText = post.validation.map((item) => `- ${item}`).join("\n");
  const mistakeText = post.mistakes.map((item) => `- ${item}`).join("\n");
  const faqText = post.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n");
  const vivaText = post.sections
    .map(([heading], index) => `- Bagi bahagian **${heading}**, apakah keputusan reka bentuk ke-${index + 1} yang dibuat dan bukti apakah yang menyokongnya?`)
    .join("\n");
  const referenceText = post.refs.map(([label, url]) => `- [${label}](${url})`).join("\n");
  const linkText = post.links.map(([label, url]) => `- [${label}](${url})`).join("\n");

  const output = `---
title: "${post.title}"
excerpt: "${post.excerpt}"
category: "${post.category}"
date: "2026-10-19"
language: "ms-MY"
---

## Ringkasan Pantas

${post.summary}

${sectionText}

## Pelan Pengesahan

${validationText}

Jalankan ujian dengan satu pemboleh ubah berubah pada satu masa. Simpan konfigurasi, data mentah dan keputusan gagal, bukan hanya screenshot yang berjaya. Untuk projek akhir tahun, bukti yang boleh diulang lebih kuat daripada tuntutan pemasaran. Jika alat atau kaedah tidak cukup untuk mengesahkan sesuatu dakwaan, tulis sebagai limitasi dan cadangkan ujian lanjutan.

## Kesilapan Biasa

${mistakeText}

Kesilapan ini patut dimasukkan dalam risk register atau checklist sebelum demo. Satu isu yang dikesan awal biasanya lebih murah dan lebih mudah diperbaiki daripada perubahan selepas hardware, firmware dan laporan sudah saling bergantung.

## FAQ

${faqText}

## Soalan Viva yang Patut Boleh Dijawab

${vivaText}

Jawapan yang kuat perlu merujuk kepada requirement, datasheet, pengiraan atau data ujian projek sendiri. Untuk topik **${post.title}**, elakkan jawapan seperti "tutorial menggunakan cara ini". Terangkan pilihan yang dibuat, alternatif yang ditolak, keadaan ujian dan limitasi. Jika keputusan belum dapat dibuktikan, nyatakan dengan jujur serta cadangkan eksperimen yang diperlukan. Pendekatan ini menunjukkan bahawa prototaip dibangunkan melalui proses kejuruteraan, bukan sekadar menyalin sambungan dan kod.

## Rujukan Teknikal

${referenceText}

Rujukan di atas digunakan untuk prinsip teknikal. Semak juga datasheet bagi model komponen, revision papan dan versi library yang benar-benar digunakan kerana pin, had elektrik dan tingkah laku boleh berbeza.

## Bacaan dan Langkah Seterusnya

${linkText}
`;

  fs.writeFileSync(path.join(blogDir, `${post.slug}.mdx`), output, "utf8");
}

console.log(`Generated ${posts.length} Malay blog articles.`);
