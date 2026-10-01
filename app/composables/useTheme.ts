// Follows the visitor's system light/dark setting — no toggle.
export function useTheme() {
  onMounted(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => document.body.setAttribute('data-theme', mq.matches ? 'dark' : 'light')
    apply()
    mq.addEventListener('change', apply)
  })
}
