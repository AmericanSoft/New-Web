import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_ASSETS_HOST = "https://sfgukli.american-softwares.com";

function getFileWithQuery(u: string) {
  const m = u.match(/([^/?#]+(\?.*)?)$/);
  return m ? m[1] : u;
}

function normalizeHost(h: string) {
  return (h || "").replace(/\/+$/, "");
}

function buildCandidates(raw: string, assetsHost: string, debug = false): string[] {
  const host = normalizeHost(assetsHost);
  const current =
    typeof window !== "undefined" ? normalizeHost(window.location.origin) : "";

  const url = String(raw || "").trim();
  if (!url) return [];

  const isAbs = /^https?:\/\//i.test(url);
  const isRootAbs = url.startsWith("/");

  const fileWithQuery = getFileWithQuery(url);

  // تحويلات مفيدة
  const storageish = url
    .replace(/\/public\/(storage\/)?/i, "/storage/")
    .replace(/\/public\/projects\//i, "/storage/projects/");

  // لو السيرفر بيرجع 410 على /projects/ حوّل للـ storage
  const projectsToStorage = url.replace(/\/projects\//i, "/storage/projects/");

  const list: string[] = [];

  // 1) جرّب كما هو
  if (isAbs) list.push(url);
  else if (isRootAbs) {
    list.push(host + url);
    if (current && !current.includes("american-softwares.com")) list.push(current + url);
  }

  // 2) /public/ -> /storage/
  if (storageish !== url) {
    const sAbs = storageish.startsWith("/") ? storageish : `/${storageish}`;
    list.push(host + sAbs);
    if (current && !current.includes("american-softwares.com")) list.push(current + sAbs);
  }

  // 3) /projects/ -> /storage/projects/
  if (projectsToStorage !== url && projectsToStorage !== storageish) {
    const pAbs = projectsToStorage.startsWith("/") ? projectsToStorage : `/${projectsToStorage}`;
    list.push(host + pAbs);
    if (current && !current.includes("american-softwares.com")) list.push(current + pAbs);
  }

  // 4) مسارات قياسية باسم الملف فقط
  const basePaths = [
    `/storage/projects/${fileWithQuery}`,
    `/index.php/storage/projects/${fileWithQuery}`,
    `/projects/${fileWithQuery}`,
    `/index.php/projects/${fileWithQuery}`,
    // المسار الحرفي داخل cPanel اللي ذكرتُه
    `/laravel_app/storage/app/public/projects/${fileWithQuery}`,
    `/index.php/laravel_app/storage/app/public/projects/${fileWithQuery}`,
  ];
  for (const p of basePaths) {
    list.push(host + p);
    if (current && !current.includes("american-softwares.com")) list.push(current + p);
  }

  const unique = Array.from(new Set(list));

  if (debug) {
    // اطبع كل المرشحين في الـConsole، هتساعدك تعرف فين الوقفة
    // eslint-disable-next-line no-console
    console.debug("[SmartImg] candidates for", raw, unique);
  }
  return unique;
}

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  assetsHost?: string;
  fallbackSrc?: string;
  tryList?: string[];
  debug?: boolean;
};

export default function SmartImg({
  src,
  alt,
  className,
  assetsHost = DEFAULT_ASSETS_HOST,
  fallbackSrc = "/project.png",
  tryList,
  debug = true, // خلّيها true وقت الديبج
  ...rest
}: Props) {
  const candidates = useMemo(
    () => (tryList?.length ? tryList : buildCandidates(String(src || ""), assetsHost, debug)),
    [src, assetsHost, tryList, debug]
  );

  const [idx, setIdx] = useState(0);
  const [current, setCurrent] = useState<string | undefined>(candidates[0]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setIdx(0);
    setFailed(false);
    setCurrent(candidates[0]);
  }, [candidates]);

  const onError = () => {
    const next = idx + 1;
    if (next < candidates.length) {
      setIdx(next);
      setCurrent(candidates[next]);
    } else {
      setFailed(true);
    }
  };

  if (failed) {
    return <img src={fallbackSrc} alt={alt} className={className} {...rest} />;
  }

  return (
    <img
      src={current}
      alt={alt}
      onError={onError}
      className={className}
      loading="lazy"
      {...rest}
    />
  );
}
