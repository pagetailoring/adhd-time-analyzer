export function useNuxtUiToast() {
  const toast = useToast()

  const icons: Record<string, string> = {
    clock: 'lucide:clock-8',
    // check: 'i-lucide-circle-check',
    trash: 'i-lucide-trash',
    error: 'tdesign:notification-error',
    melt: 'game-icons:melting-ice-cube',
    // packman: 'iconoir:pacman',
  }

  function displayInUi(messege: string, duration = 2000, clr = 'info', icon = 'clock') {
    const color = clr as NuxtUiColor
    toast.add({
      title: messege,
      icon: icons[icon],
      color,
      duration,
    })
  }

  return { displayInUi }
}
