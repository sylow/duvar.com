import { COPY, type Lang } from '~/data/domain'

const STORAGE_KEY = 'duvar-lang'

// Turkish by default (and on the server); a saved choice is applied on mount.
export function useLang() {
  const lang = useState<Lang>('duvar-lang', () => 'tr')
  const t = computed(() => COPY[lang.value])

  onMounted(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      if (s === 'tr' || s === 'en') lang.value = s
    } catch {}
  })

  function setLang(l: Lang) {
    lang.value = l
    try { localStorage.setItem(STORAGE_KEY, l) } catch {}
  }

  return { lang, t, setLang }
}
