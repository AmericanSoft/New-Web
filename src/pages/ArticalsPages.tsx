import React from "react";


export type ArticleSection = {
  id: string;
  heading: string;
  /** Accepts ReactNode or string (HTML allowed) */
  content: React.ReactNode | string;
};

export interface ArticlePageProps {
  title: string;
  coverUrl: string;
  coverAlt?: string;
  /** If provided, used as the article body via dangerouslySetInnerHTML */
  contentHtml?: string;
  /** Alternative to contentHtml – render structured sections */
  sections?: ArticleSection[];
  /** Optional meta */
  author?: string;
  date?: string; // e.g., "16 سبتمبر 2025"
  readTime?: string; // e.g., "7 دقائق قراءة"
  tags?: string[];
  category?: string; // قسم المقال
  rtl?: boolean;
}

const SeparatorDot: React.FC = () => (
  <span aria-hidden className="mx-2 text-slate-400">•</span>
);

const ArticleMeta: React.FC<Pick<ArticlePageProps, "author" | "date" | "readTime">> = ({ author, date, readTime }) => {
  if (!author && !date && !readTime) return null;
  return (
    <div className="mt-3 flex flex-wrap items-center text-sm text-slate-600">
      {author && <span className="font-medium text-slate-700">{author}</span>}
      {author && (date || readTime) && <SeparatorDot />}
      {date && <time>{date}</time>}
      {date && readTime && <SeparatorDot />}
      {readTime && <span>{readTime}</span>}
    </div>
  );
};

function TagPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 bg-white/60 backdrop-blur-sm">
      {children}
    </span>
  );
}

const MetaOverlay: React.FC<Pick<ArticlePageProps, "date" | "tags" | "category" | "rtl">> = ({ date, tags, category, rtl }) => {
  if (!date && !tags?.length && !category) return null;

  // show up to 3 tags and +N if more
  const shown = (tags || []).slice(0, 3);
  const more = Math.max(0, (tags?.length || 0) - shown.length);

  return (
    <div
      className={
        "pointer-events-auto absolute bottom-4 " +
        (rtl ? "left-4" : "right-4") +
        " max-w-[92%]"
      }
    >
      <div className="flex items-center gap-2 rounded-xl bg-white/85 px-3 py-2 shadow-md ring-1 ring-black/5 backdrop-blur-md">
        {category && <TagPill>{category}</TagPill>}
        {date && <TagPill>{date}</TagPill>}
        {shown.map((t) => (
          <TagPill key={t}>{t}</TagPill>
        ))}
        {more > 0 && <TagPill>{`+${more}`}</TagPill>}
      </div>
    </div>
  );
};

export default function ArticlePage({
  title,
  coverUrl,
  coverAlt = "",
  contentHtml,
  sections,
  author,
  date,
  readTime,
  tags,
  category,
  rtl,
}: ArticlePageProps) {
  const dir = rtl ? "rtl" : "ltr";

  return (
    <div dir={dir} className="min-h-screen bg-white text-slate-900">
      {/* HERO IMAGE (Full width) */}
      <figure className="relative w-full">
        <img
          src={coverUrl}
          alt={coverAlt}
          className="block h-[40svh] w-full object-cover sm:h-[52svh] md:h-[60svh]"
          loading="eager"
        />
        {/* Subtle gradient at bottom to help overlay contrast */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 to-transparent" />
        {/* Meta overlay: bottom-right on LTR, bottom-left on RTL */}
        <MetaOverlay date={date} tags={tags} category={category} rtl={rtl} />
      </figure>

      {/* CONTENT WRAPPER */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* TITLE */}
        <header className="pt-8">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <ArticleMeta author={author} date={date} readTime={readTime} />
        </header>

        {/* ARTICLE BODY */}
        <article className="prose prose-slate max-w-none py-6 prose-img:rounded-xl prose-a:text-teal-700 hover:prose-a:underline rtl:prose-headings:text-right rtl:prose-p:text-right">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : sections?.length ? (
            sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="!mt-8 text-slate-900">{s.heading}</h2>
                {typeof s.content === "string" ? (
                  <div dangerouslySetInnerHTML={{ __html: s.content }} />
                ) : (
                  s.content
                )}
              </section>
            ))
          ) : (
            <p className="text-slate-600">
              لا يوجد محتوى بعد. مرّر إما <code>contentHtml </code> أو <code>sections</code>.
            </p>
          )}
        </article>

        {/* Optional footer tags (for long tag lists) */}
        {tags?.length ? (
          <footer className="pb-12">
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  {t}
                </span>
              ))}
            </div>
          </footer>
        ) : (
          <footer className="pb-12" />
        )}
      </main>
    </div>
  );
}
