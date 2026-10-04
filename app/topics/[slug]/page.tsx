import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Cpu,
  FileText,
  Gauge,
  Package,
  Search,
  Wifi,
} from "lucide-react";
import { allCatalogProjects, type CatalogProject } from "@/data/projects";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbSchema,
  faqSchema,
  itemListSchema,
} from "@/lib/schema";
import { getCatalogProjectSlug } from "@/lib/catalog";
import {
  getAllTopicHubs,
  getTopicCatalogProjects,
  getTopicComponents,
  getTopicHubBySlug,
  getTopicPosts,
} from "@/lib/topics";

const BASE = "https://rectronx.com";

export function generateStaticParams() {
  return getAllTopicHubs().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopicHubBySlug(slug);
  if (!topic) return {};
  const isPatHub = topic.slug === "projek-akhir-tahun";
  const isIotHub = topic.slug === "iot";

  return {
    title: {
      absolute: isPatHub
        ? "Projek Akhir Tahun: Senarai Idea FYP Elektronik, IoT & Software"
        : isIotHub
          ? "Projek IoT Malaysia: Idea ESP32, Arduino & Sistem Pintar"
        : `${topic.title} | Rectronx Engineering Hub`,
    },
    description: isPatHub
      ? "Senarai Projek Akhir Tahun untuk pelajar Malaysia: idea FYP elektronik, IoT, Arduino, ESP32, software dan AI dengan skop yang realistik."
      : isIotHub
        ? "Senarai projek IoT Malaysia yang realistik untuk FYP: idea ESP32, Arduino, sensor, projek smart, dashboard, komponen, cara uji dan kesilapan biasa."
      : topic.description,
    keywords: topic.keywords,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      title: isIotHub
        ? "Projek IoT Malaysia: Idea ESP32, Arduino & Sistem Pintar"
        : `${topic.title} | Rectronx`,
      description: topic.description,
      url: `${BASE}/topics/${topic.slug}`,
      type: "website",
    },
  };
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getTopicHubBySlug(slug);
  if (!topic) notFound();

  const isPatHub = topic.slug === "projek-akhir-tahun";
  const isIotHub = topic.slug === "iot";
  const projects = isIotHub
    ? getCuratedIotProjects()
    : getTopicCatalogProjects(topic, isPatHub ? 30 : 18);
  const components = getTopicComponents(topic, 8);
  const posts = getTopicPosts(topic, isIotHub ? 10 : 6);
  const faqs = isPatHub ? projekAkhirTahunFaqs : isIotHub ? projekIotFaqs : [
    {
      q: `What is included in the ${topic.title} hub?`,
      a: `This hub connects related Rectronx catalog titles, electronics components, blog guides and project scope notes for ${topic.title}.`,
    },
    {
      q: "Are these project ideas fixed-price packages?",
      a: "No. They are project guide and scope references. Actual quotation depends on selected features, deadline, hardware, software and documentation requirements.",
    },
    {
      q: "Can Rectronx help choose the safest FYP scope?",
      a: "Yes. Rectronx can help choose a realistic scope, suitable components, testing method, report structure and demo plan.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24" lang={isIotHub ? "ms-MY" : undefined}>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: BASE },
          { name: "Topics", url: `${BASE}/topics` },
          { name: topic.title, url: `${BASE}/topics/${topic.slug}` },
        ])}
      />
      <JsonLd schema={faqSchema(faqs)} />
      <JsonLd
        schema={itemListSchema(
          projects.slice(0, 10).map((project, index) => ({
            name: project.title,
            url: `${BASE}/catalog/${getCatalogProjectSlug(project)}`,
            position: index + 1,
          }))
        )}
      />

      <section className="bg-brand-navy px-4 pb-16 pt-8 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/topics"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
          >
            <ArrowLeft size={15} />
            All topic hubs
          </Link>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-blue">
            {topic.eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {isPatHub
              ? "Projek Akhir Tahun: Senarai Idea FYP Elektronik, IoT, Arduino dan Software"
              : isIotHub
                ? "Projek IoT Malaysia untuk Projek Akhir Tahun"
              : topic.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300">
            {topic.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {topic.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-blue-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          {isPatHub && <ProjekAkhirTahunPillar projects={projects} />}
          {isIotHub && <ProjekIotPillar projects={projects} />}

          {!isPatHub && !isIotHub && (
            <HubSection title="Related Project Titles" icon={<Search size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/catalog/${getCatalogProjectSlug(project)}`}
                    className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                  >
                    <p className="text-sm font-bold leading-6 text-brand-navy">{project.title}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </HubSection>
          )}

          {components.length > 0 && (
            <HubSection title="Related Components" icon={<Cpu size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                {components.map((component) => (
                  <Link
                    key={component.slug}
                    href={`/components/${component.slug}`}
                    className="rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                  >
                    <p className="text-sm font-bold text-brand-navy">{component.name}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{component.tagline}</p>
                  </Link>
                ))}
              </div>
            </HubSection>
          )}

          {posts.length > 0 && (
            <HubSection
              title={isPatHub ? "Panduan Projek Akhir Tahun Berkaitan" : isIotHub ? "Panduan Projek IoT Berkaitan" : "Related Guides"}
              icon={<FileText size={20} />}
            >
              <div className="space-y-3">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="block rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-blue hover:shadow-sm"
                  >
                    <p className="font-bold text-brand-navy">{post.title}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{post.excerpt}</p>
                  </Link>
                ))}
              </div>
            </HubSection>
          )}
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-lg font-bold text-brand-navy">Why This Hub Matters</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              {(isPatHub ? [
                "Senang cari tajuk ikut bidang: elektronik, IoT, Arduino, ESP32, software dan AI.",
                "Setiap cadangan disambung ke katalog, komponen, panduan dan servis yang relevan.",
                "Membantu pelajar pilih skop yang boleh disiapkan dan boleh diterangkan masa viva.",
                "Dibina sebagai halaman utama untuk carian Projek Akhir Tahun Malaysia.",
              ] : isIotHub ? [
                "Mengumpulkan carian projek IoT, projek smart dan IoT project dalam satu halaman utama.",
                "Memilih idea yang ada input, proses, output dan kaedah ujian yang boleh diterangkan.",
                "Menghubungkan tajuk projek kepada komponen, panduan teknikal dan contoh sistem sebenar.",
                "Membezakan panduan pembelajaran daripada perkhidmatan bantuan projek Rectronx.",
              ] : [
                "Connects related project titles, components and guides.",
                "Helps students choose a realistic scope.",
                "Improves topical authority for Malaysian engineering searches.",
                "Supports AI search with structured Q&A and internal links.",
              ]).map((item) => (
                <li key={item} className="flex gap-2">
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              Other Hubs
            </p>
            <div className="space-y-2">
              {getAllTopicHubs()
                .filter((item) => item.slug !== topic.slug)
                .slice(0, 8)
                .map((item) => (
                  <Link
                    key={item.slug}
                    href={`/topics/${item.slug}`}
                    className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-blue-50 hover:text-brand-blue"
                  >
                    {item.title}
                    <Package size={14} />
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

const projekAkhirTahunFaqs = [
  {
    q: "Apa maksud Projek Akhir Tahun?",
    a: "Projek Akhir Tahun ialah projek kemuncak pelajar diploma atau ijazah untuk membuktikan kemahiran teknikal, penyelesaian masalah, dokumentasi dan pembentangan. Untuk bidang kejuruteraan dan teknologi, projek biasanya melibatkan prototaip elektronik, sistem IoT, aplikasi web, mobile app atau model AI yang boleh diuji.",
  },
  {
    q: "Apakah contoh tajuk Projek Akhir Tahun yang sesuai untuk pelajar elektronik?",
    a: "Contoh tajuk yang sesuai termasuk sistem parkir pintar, sistem amaran banjir, pengesan kebocoran gas, RFID attendance, smart locker, pemantauan tenaga, smart agriculture dan sistem kawalan akses. Tajuk yang baik perlu ada masalah jelas, komponen yang mudah diperoleh, data ujian dan demo yang stabil.",
  },
  {
    q: "Adakah projek IoT sesuai untuk Projek Akhir Tahun?",
    a: "Ya. Projek IoT sangat sesuai kerana ia menggabungkan sensor, mikropengawal seperti ESP32 atau Arduino, sambungan internet, dashboard dan notifikasi. Skop perlu dikawal supaya pelajar boleh siap, uji dan terangkan sistem dengan jelas semasa viva.",
  },
  {
    q: "Bagaimana nak pilih tajuk FYP yang tidak terlalu susah?",
    a: "Pilih tajuk yang mempunyai komponen tersedia, kos munasabah, objektif boleh diukur, dan fungsi demo yang jelas. Elakkan tajuk yang memerlukan sensor mahal, dataset besar, sambungan industri sebenar atau integrasi terlalu banyak dalam masa singkat.",
  },
];

const projekIotFaqs = [
  {
    q: "Apa itu projek IoT?",
    a: "Projek IoT ialah sistem yang membaca data daripada sensor atau peranti, memproses data menggunakan controller seperti ESP32, kemudian menghantar status kepada dashboard, database atau sistem notifikasi. Projek yang baik juga mempunyai output yang boleh diuji seperti relay, buzzer, motor atau amaran.",
  },
  {
    q: "Apakah projek IoT yang sesuai untuk Projek Akhir Tahun?",
    a: "Contoh yang sesuai termasuk sistem amaran banjir, pengairan pintar, pemantauan tenaga, parking pintar, RFID attendance, pemantauan kualiti udara dan tracking GPS. Pilih satu masalah utama dan pastikan setiap fungsi boleh diuji semasa demo.",
  },
  {
    q: "Adakah ESP32 lebih sesuai daripada Arduino untuk projek IoT?",
    a: "ESP32 biasanya lebih mudah untuk projek WiFi kerana WiFi dan Bluetooth sudah terbina dalam. Arduino masih sesuai untuk kawalan sensor atau motor yang tidak memerlukan internet, atau apabila modul komunikasi berasingan memang sebahagian daripada skop pembelajaran.",
  },
  {
    q: "Apa beza projek smart dengan projek IoT?",
    a: "Projek smart boleh membuat keputusan automatik secara tempatan tanpa internet. Projek IoT pula mempunyai sambungan rangkaian untuk menghantar data, menerima arahan atau menyimpan rekod. Satu projek boleh menjadi kedua-duanya apabila ia mempunyai automasi tempatan dan dashboard internet.",
  },
  {
    q: "Perlukah projek IoT mempunyai mobile app?",
    a: "Tidak semestinya. Dashboard web, Blynk, Firebase, Telegram atau paparan tempatan sudah mencukupi jika ia menyokong objektif projek. Mobile app hanya patut ditambah apabila pengguna benar-benar memerlukan kawalan atau notifikasi melalui telefon.",
  },
  {
    q: "Bagaimana cara membuktikan projek IoT berfungsi?",
    a: "Uji keadaan normal, amaran, kegagalan sensor dan gangguan rangkaian. Rekod masa respons, bacaan sensor, kadar penghantaran data, status output serta bukti dashboard supaya keputusan boleh dimasukkan ke dalam laporan dan diterangkan semasa viva.",
  },
];

const iotIdeaCategories = [
  {
    title: "Pertanian & Alam Sekitar",
    description: "Pemantauan tanah, cuaca, air, rumah hijau dan amaran banjir dengan data yang boleh direkod.",
    examples: "Smart irrigation, flood alert, greenhouse, kolam ikan",
  },
  {
    title: "Rumah & Bangunan Pintar",
    description: "Automasi lampu, kipas, pintu, tenaga dan keselamatan dengan kawalan tempatan serta dashboard.",
    examples: "Smart home, access control, energy monitor, fire alert",
  },
  {
    title: "Kampus & Pendidikan",
    description: "Sistem kehadiran, parking, bilik darjah dan pengurusan aset yang mempunyai rekod pengguna.",
    examples: "RFID attendance, smart parking, asset tracking, classroom monitor",
  },
  {
    title: "Keselamatan & Tracking",
    description: "GPS, GSM, sensor gerakan dan butang kecemasan untuk mengesan peristiwa serta menghantar amaran.",
    examples: "Vehicle tracker, panic button, fall alert, anti-theft",
  },
  {
    title: "Tenaga & Industri",
    description: "Pemantauan voltan, arus, getaran dan runtime mesin dengan perhatian kepada keselamatan elektrik.",
    examples: "Energy meter, solar monitor, machine condition, cold storage",
  },
  {
    title: "Kesihatan Bukan Klinikal",
    description: "Prototype pendidikan untuk trend bacaan dan peringatan, tanpa mendakwa sebagai peranti perubatan.",
    examples: "Medicine reminder, activity monitor, occupancy alert",
  },
];

const iotProjectGroups = [
  {
    slug: "alam-sekitar",
    title: "Pertanian & Alam Sekitar",
    description: "Projek dengan data tanah, cuaca, air atau keadaan persekitaran yang boleh diuji berulang kali.",
    ids: [4, 55, 60, 61, 70, 134],
  },
  {
    slug: "rumah-bangunan",
    title: "Rumah & Bangunan Pintar",
    description: "Automasi, kawalan akses dan pemantauan bangunan dengan output fizikal serta rekod digital.",
    ids: [11, 17, 57, 72, 73, 78],
  },
  {
    slug: "kampus-pendidikan",
    title: "Kampus & Pendidikan",
    description: "Sistem untuk kehadiran, parking, bilik, perpustakaan dan pengurusan aset di kampus.",
    ids: [24, 53, 54, 62, 66, 133],
  },
  {
    slug: "keselamatan-tracking",
    title: "Keselamatan & Tracking",
    description: "GPS, GSM dan sensor kecemasan untuk mengesan lokasi atau peristiwa dan menghantar amaran.",
    ids: [6, 48, 51, 59, 77, 86],
  },
  {
    slug: "tenaga-industri",
    title: "Tenaga & Industri",
    description: "Pemantauan elektrik, solar, struktur dan mesin dengan kaedah ujian yang mengutamakan keselamatan.",
    ids: [16, 42, 49, 63, 139, 142],
  },
  {
    slug: "kesihatan-sokongan",
    title: "Kesihatan & Sokongan Pengguna",
    description: "Prototype pendidikan untuk amaran, peringatan dan trend bacaan tanpa tuntutan perubatan klinikal.",
    ids: [5, 56, 69, 95, 100, 136],
  },
] as const;

function getCuratedIotProjects(): CatalogProject[] {
  const projectsById = new Map(allCatalogProjects.map((project) => [project.id, project]));

  return iotProjectGroups.flatMap((group) =>
    group.ids.map((id) => projectsById.get(id)).filter((project): project is CatalogProject => Boolean(project)),
  );
}

function ProjekIotPillar({ projects }: { projects: ReturnType<typeof getTopicCatalogProjects> }) {
  const projectsById = new Map(projects.map((project) => [project.id, project]));

  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">Ringkasan Cepat</p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy">
          Projek IoT yang kuat bermula dengan masalah dan bukti ujian, bukan dashboard semata-mata.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Halaman ini ialah pusat rujukan untuk pelajar Malaysia yang mencari projek IoT,
          IoT project ideas atau projek smart. Pilih satu input yang boleh diukur, satu proses
          yang jelas dan satu output yang boleh ditunjukkan. Selepas aliran asas stabil,
          barulah tambah database, graf, notifikasi atau mobile app.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Masalah dan pengguna sasaran yang jelas",
            "Sensor atau input yang sesuai dengan objektif",
            "Output, dashboard atau amaran yang boleh didemonstrasi",
            "Pelan ujian dengan data dan batasan yang jujur",
          ].map((item) => (
            <div key={item} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <HubSection title="Idea Projek Smart Mengikut Kategori" icon={<Cpu size={20} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          {iotIdeaCategories.map((category) => (
            <div key={category.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-brand-navy">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <p className="mt-4 text-xs font-semibold leading-5 text-brand-blue">{category.examples}</p>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection title="36 Idea Projek IoT untuk FYP" icon={<Search size={20} />}>
        <div className="space-y-6">
          {iotProjectGroups.map((group) => (
            <section key={group.slug} data-project-group={group.slug} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-lg font-bold text-brand-navy">{group.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{group.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {group.ids.map((id) => {
                  const project = projectsById.get(id);
                  if (!project) return null;

                  return (
                    <Link
                      key={project.id}
                      href={`/catalog/${getCatalogProjectSlug(project)}`}
                      data-curated-project="true"
                      className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-brand-blue hover:bg-blue-50"
                    >
                      <h4 className="text-sm font-bold leading-6 text-brand-navy">{project.title}</h4>
                      <p className="mt-2 text-xs font-semibold text-slate-500">{project.tags.slice(0, 4).join(" / ")}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </HubSection>

      <HubSection title="Cara Sistem IoT Berfungsi" icon={<Wifi size={20} />}>
        <div className="grid gap-3 md:grid-cols-5">
          {[
            ["01", "Input", "Sensor, RFID, GPS, kamera atau butang membaca keadaan sebenar."],
            ["02", "Controller", "ESP32, Arduino atau Raspberry Pi memproses bacaan dan peraturan."],
            ["03", "Connection", "WiFi, GSM, LoRa, Bluetooth atau rangkaian tempatan menghantar data."],
            ["04", "Platform", "Dashboard, database atau aplikasi menyimpan dan memaparkan status."],
            ["05", "Action", "Sistem menghantar amaran atau mengawal relay, motor, buzzer dan paparan."],
          ].map(([number, title, text]) => (
            <div key={number} className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-bold text-brand-blue">{number}</p>
              <h3 className="mt-2 font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-xs leading-5 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection title="Cara Uji Projek IoT" icon={<Gauge size={20} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Ujian fungsi", "Uji keadaan normal, warning dan danger. Pastikan output berubah mengikut bacaan atau input."],
            ["Ujian komunikasi", "Rekod masa penghantaran, kehilangan sambungan dan apa yang berlaku apabila WiFi atau internet terputus."],
            ["Ujian sensor", "Bandingkan dengan rujukan yang sesuai, ulang bacaan dan nyatakan kesan kedudukan serta persekitaran."],
            ["Ujian demo", "Jalankan keseluruhan aliran berkali-kali menggunakan bekalan kuasa, hotspot dan setup yang sama seperti viva."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection title="Kesilapan Biasa Projek IoT" icon={<AlertTriangle size={20} />}>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
          <ul className="grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
            {[
              "Memilih terlalu banyak sensor dan platform untuk satu semester.",
              "Membina dashboard sebelum bacaan sensor dan output tempatan stabil.",
              "Menggunakan bekalan kuasa lemah untuk ESP32, relay, servo atau modul GSM.",
              "Mendakwa bacaan tepat tanpa kalibrasi, perbandingan atau batasan sensor.",
              "Tiada data log, jadual keputusan atau ukuran masa respons untuk laporan.",
              "Bergantung sepenuhnya pada WiFi tanpa hotspot dan demo backup.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <AlertTriangle size={16} className="mt-1 shrink-0 text-amber-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </HubSection>

      <HubSection title="Contoh Produk & Sistem Rectronx" icon={<Gauge size={20} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Smart Parking System", "Sensor slot, RFID, pembayaran dan dashboard operasi masa nyata.", "/products/smart-parking"],
            ["Smart Plant Monitor", "ESP32, enam sensor, Firebase, aplikasi Flutter dan kawalan pam.", "/products/smart-plant-monitor"],
            ["Fleet Tracking Dashboard", "GPS, sejarah laluan dan pemantauan operasi kenderaan.", "/products/fleet-tracking"],
            ["Attendance & Access Control", "RFID, biometrik dan rekod akses untuk organisasi.", "/products/attendance-access-control"],
          ].map(([title, text, href]) => (
            <Link key={href} href={href} className="rounded-xl border border-slate-200 bg-white p-5 hover:border-brand-blue">
              <h3 className="font-bold text-brand-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              <p className="mt-4 text-sm font-semibold text-brand-blue">Lihat sistem</p>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Soalan Lazim Projek IoT" icon={<FileText size={20} />}>
        <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white px-5">
          {projekIotFaqs.map((faq) => (
            <details key={faq.q} className="group py-5">
              <summary className="cursor-pointer list-none pr-6 font-bold text-brand-navy marker:content-none">
                {faq.q}
              </summary>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </HubSection>

      <section className="rounded-2xl bg-brand-navy p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">Perlu Bantuan Projek?</p>
        <h2 className="mt-3 text-2xl font-bold">Sudah ada tajuk tetapi belum pasti skop dan komponen?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
          Halaman ini ialah panduan pembelajaran. Untuk semakan skop, pemilihan komponen,
          pembangunan prototype atau dashboard, lihat perkhidmatan IoT Rectronx.
        </p>
        <Link
          href="/services/iot-project-malaysia"
          className="mt-6 inline-flex rounded-lg bg-brand-blue px-5 py-3 text-sm font-bold text-white hover:bg-blue-500"
        >
          Bantuan membina projek IoT di Malaysia
        </Link>
      </section>
    </>
  );
}

const pillarCategories = [
  {
    title: "Projek Elektronik Tahun Akhir",
    description: "Sesuai untuk pelajar elektrik, elektronik, mekatronik dan politeknik yang perlu tunjuk litar, sensor, aktuator dan prototaip fizikal.",
    terms: ["Arduino", "RFID", "GSM", "Relay", "Sensor", "Biometric"],
  },
  {
    title: "Projek IoT dan ESP32",
    description: "Pilihan kuat untuk demo moden kerana data boleh dihantar ke dashboard, Telegram, Blynk, Firebase atau mobile app.",
    terms: ["IoT", "ESP32", "Blynk", "Firebase", "Telegram", "Dashboard"],
  },
  {
    title: "Projek Software, Website dan App",
    description: "Sesuai untuk pelajar sains komputer atau IT yang mahu sistem dengan login, database, admin panel, laporan dan notifikasi.",
    terms: ["Web", "App", "Firebase", "PHP", "Python", "Database"],
  },
  {
    title: "Projek AI dan Machine Learning",
    description: "Gunakan AI untuk skop yang realistik seperti klasifikasi imej, ramalan, dashboard analitik atau computer vision ringan.",
    terms: ["AI", "ML", "OpenCV", "Python", "Prediction", "Camera"],
  },
];

function ProjekAkhirTahunPillar({ projects }: { projects: ReturnType<typeof getTopicCatalogProjects> }) {
  return (
    <>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-widest text-brand-blue">
          Senarai Projek Akhir Tahun
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy">
          Cari tajuk ikut bidang, bukan sekadar pilih tajuk yang nampak menarik.
        </h2>
        <p className="mt-4 text-sm leading-7 text-slate-600">
          Untuk pelajar Malaysia, tajuk Projek Akhir Tahun yang kuat biasanya ada masalah
          sebenar, komponen yang mudah diperoleh, fungsi demo yang jelas dan keputusan yang
          boleh diuji. Halaman ini susun idea FYP mengikut kategori supaya pelajar boleh
          mula daripada senarai tajuk, kemudian terus semak komponen, panduan dan skop yang
          lebih realistik.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {[
            "Projek elektronik tahun akhir",
            "Projek IoT menggunakan ESP32 atau Arduino",
            "Projek software, website dan mobile app",
            "Projek AI/ML yang sesuai untuk pelajar",
          ].map((item) => (
            <div key={item} className="flex gap-2 rounded-xl bg-slate-50 p-3 text-sm font-semibold text-slate-700">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <HubSection title="Kategori Tajuk Popular" icon={<Package size={20} />}>
        <div className="grid gap-4 sm:grid-cols-2">
          {pillarCategories.map((category) => (
            <div key={category.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-brand-navy">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {category.terms.slice(0, 5).map((term) => (
                  <span key={term} className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-brand-blue">
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </HubSection>

      <HubSection title="30 Tajuk FYP Yang Mudah Difahami Panel" icon={<Search size={20} />}>
        <div className="rounded-2xl border border-slate-200 bg-white">
          <div className="grid grid-cols-[48px_1fr] border-b border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-widest text-slate-400 sm:grid-cols-[56px_1fr_180px]">
            <span>No</span>
            <span>Tajuk Projek</span>
            <span className="hidden sm:block">Bidang</span>
          </div>
          {projects.slice(0, 30).map((project, index) => (
            <Link
              key={project.id}
              href={`/catalog/${getCatalogProjectSlug(project)}`}
              className="grid grid-cols-[48px_1fr] gap-2 border-b border-slate-100 px-4 py-3 text-sm transition-colors last:border-b-0 hover:bg-blue-50/60 sm:grid-cols-[56px_1fr_180px]"
            >
              <span className="font-bold text-slate-400">{String(index + 1).padStart(2, "0")}</span>
              <span className="font-semibold leading-6 text-brand-navy">{project.title}</span>
              <span className="hidden text-xs font-semibold text-slate-500 sm:block">
                {project.tags.slice(0, 2).join(" / ")}
              </span>
            </Link>
          ))}
        </div>
      </HubSection>

      <HubSection title="Cara Pilih Tajuk Yang Selamat" icon={<CheckCircle2 size={20} />}>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              title: "Boleh demo",
              text: "Pastikan ada fungsi yang panel boleh lihat: sensor baca data, motor bergerak, dashboard berubah atau notifikasi diterima.",
            },
            {
              title: "Boleh diuji",
              text: "Sediakan ukuran seperti masa respon, ketepatan bacaan, jarak komunikasi, jumlah rekod atau perbandingan sebelum/selepas.",
            },
            {
              title: "Boleh diterangkan",
              text: "Elakkan skop terlalu besar. Tajuk yang baik lebih mudah dijawab semasa viva kerana aliran sistem jelas.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-bold text-brand-navy">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </div>
          ))}
        </div>
      </HubSection>
    </>
  );
}

function HubSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-brand-blue">
          {icon}
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-brand-navy">{title}</h2>
      </div>
      {children}
    </section>
  );
}
