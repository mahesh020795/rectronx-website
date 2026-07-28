import type { ReactNode } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Cpu, FileText, Package, Search } from "lucide-react";
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

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const topic = getTopicHubBySlug(params.slug);
  if (!topic) return {};
  const isPatHub = topic.slug === "projek-akhir-tahun";

  return {
    title: {
      absolute: isPatHub
        ? "Projek Akhir Tahun: Senarai Idea FYP Elektronik, IoT & Software"
        : `${topic.title} | Rectronx Engineering Hub`,
    },
    description: isPatHub
      ? "Senarai Projek Akhir Tahun untuk pelajar Malaysia: idea FYP elektronik, IoT, Arduino, ESP32, software dan AI dengan skop yang realistik."
      : topic.description,
    keywords: topic.keywords,
    alternates: { canonical: `/topics/${topic.slug}` },
    openGraph: {
      title: `${topic.title} | Rectronx`,
      description: topic.description,
      url: `${BASE}/topics/${topic.slug}`,
      type: "website",
    },
  };
}

export default function TopicPage({ params }: { params: { slug: string } }) {
  const topic = getTopicHubBySlug(params.slug);
  if (!topic) notFound();

  const isPatHub = topic.slug === "projek-akhir-tahun";
  const projects = getTopicCatalogProjects(topic, isPatHub ? 30 : 18);
  const components = getTopicComponents(topic, 8);
  const posts = getTopicPosts(topic, 6);
  const faqs = isPatHub ? projekAkhirTahunFaqs : [
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
    <main className="min-h-screen bg-slate-50 pt-24">
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

          {!isPatHub && (
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
            <HubSection title={isPatHub ? "Panduan Projek Akhir Tahun Berkaitan" : "Related Guides"} icon={<FileText size={20} />}>
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
