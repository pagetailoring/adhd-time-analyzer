export function useNotifications() {
  const toast = useToast()

  function consolIt(message: string) {
    console.log(message)
  }

  function display(title: string, duration = 2000) {
    if (duration > 1) consolIt(title)
    toast.add({
      title: title,
      icon: 'i-lucide-circle-check',
      duration,
    })
  }

  function displayWarning(title: string, duration = 3000, color = 'warning' as NuxtUiColor) {
    consolIt(title)

    toast.add({
      title,
      color,
      icon: 'i-lucide-trash',
      duration,
    })
  }

  function displayDelete(title: string, duration = 3000, color = 'warning' as NuxtUiColor) {
    displayWarning(title, duration, color)
  }

  function displayError(title: string, duration = 9000, color = 'error' as NuxtUiColor) {
    displayWarning(title, duration, color)
  }

  return { consolIt, display, displayDelete, displayError, displayWarning }
}
