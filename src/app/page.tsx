import {
  site,
  facts,
  expertise,
  projects,
  experience,
  skills,
  education,
} from "@/content/site";

const nav = [
  ["01", "Portfolio", "#portfolio"],
  ["02", "Resume", "#resume"],
  ["03", "Skills", "#skills"],
  ["04", "Contact", "#contact"],
] as const;

function SectionHead({ n, title, id }: { n: string; title: string; id: string }) {
  return (
    <div id={id} className="mb-8 flex items-baseline gap-3 border-b border-[var(--line)] pb-3">
      <span className="text-[var(--accent)]">§{n}</span>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 z-10 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#top" className="font-semibold">
            <span className="text-[var(--accent)]">~/</span>scott<em className="not-italic text-[var(--accent)]">haeger</em>
          </a>
          <ul className="hidden gap-6 text-sm sm:flex">
            {nav.map(([n, label, href]) => (
              <li key={href}>
                <a href={href} className="text-[var(--dim)] hover:text-[var(--ink)]">
                  <span className="text-[var(--accent)]">{n}</span> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main id="top" className="mx-auto max-w-6xl px-5">
        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="panel mb-8 grid grid-cols-2 gap-px text-xs sm:grid-cols-4">
            <div className="p-3"><span className="label">Dwg</span><br />SH-001</div>
            <div className="p-3"><span className="label">Rev</span><br />v1</div>
            <div className="p-3"><span className="label">Sheet</span><br />01/01</div>
            <div className="p-3"><span className="label">Loc</span><br />{site.location}</div>
          </div>
          <p className="label mb-3">{site.role}</p>
          <h1 className="max-w-4xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
            {site.headline.replace(/\.$/, "")}
            <span className="cursor" />
          </h1>
          <p className="mt-6 max-w-3xl text-[var(--dim)]">{site.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a href="#portfolio" className="border border-[var(--accent)] bg-[var(--accent)] px-4 py-2 font-semibold text-[var(--bg)] hover:opacity-90">
              View portfolio
            </a>
            <a href="#resume" className="border border-[var(--line)] px-4 py-2 hover:border-[var(--accent)]">
              Read resume
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-2 gap-px border border-[var(--line)] bg-[var(--line)] sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.k} className="bg-[var(--panel)] p-4">
                <dt className="label">{f.k}</dt>
                <dd className="mt-1 text-lg text-[var(--accent2)]">{f.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Portfolio */}
        <section className="py-12">
          <SectionHead n="01" title="Portfolio" id="portfolio" />
          <div className="mb-8 flex flex-wrap gap-2">
            {expertise.map((e) => (
              <span key={e} className="chip">{e}</span>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p, i) => (
              <article
                key={p.id}
                className={`panel flex flex-col p-5 ${i === 0 ? "md:col-span-2" : ""}`}
              >
                <p className="label">Fig. {i + 1} · {p.tag}</p>
                <h3 className="mt-1 text-lg font-semibold">{p.title}</h3>
                <p className="mt-3 text-[var(--dim)]">{p.blurb}</p>
                {p.bullets.length > 0 && (
                  <ul className="mt-3 space-y-2 text-sm">
                    {p.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="text-[var(--accent)]">›</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-auto flex flex-wrap gap-2 pt-4">
                  {p.stack.map((s) => (
                    <span key={s} className="chip text-[var(--accent2)]">{s}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Resume */}
        <section className="py-12">
          <SectionHead n="02" title="Resume" id="resume" />
          <ol className="border-l border-[var(--line)]">
            {experience.map((x) => (
              <li key={x.period + x.org} className="relative pb-8 pl-6">
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 bg-[var(--accent)]" />
                <p className="label">{x.period}</p>
                <h3 className="font-semibold">{x.title}</h3>
                <p className="text-[var(--accent2)]">{x.org}</p>
                <p className="mt-1 max-w-3xl text-sm text-[var(--dim)]">{x.note}</p>
              </li>
            ))}
          </ol>
          <div className="panel mt-4 p-5">
            <p className="label mb-2">Education</p>
            <ul className="space-y-1 text-sm">
              {education.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section className="py-12">
          <SectionHead n="03" title="Skills" id="skills" />
          <div className="grid gap-4 md:grid-cols-3">
            {skills.map((g) => (
              <div key={g.group} className="panel p-5">
                <p className="label mb-3">{g.group}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <span key={i} className="chip">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="py-12">
          <SectionHead n="04" title="Contact" id="contact" />
          <div className="panel p-5">
            <p className="text-[var(--dim)]">
              <span className="text-[var(--accent)]">$</span> mail{" "}
              <a className="text-[var(--accent2)] underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="mt-12 border-t border-[var(--line)] py-6 text-center text-xs text-[var(--dim)]">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </footer>
    </>
  );
}
