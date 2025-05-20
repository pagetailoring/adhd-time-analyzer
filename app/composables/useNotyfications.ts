export function useNotifications() {
  const { displayInUi } = useNuxtUiToast()

  function consoleIt(icon: string, messege: string) {
    console.log(icon, messege)
  }

  function display(messege: string, duration = 2000, color = 'info', icon = 'clock') {
    displayInUi(messege, duration, color, icon)
    consoleIt('💬', messege)
  }

  function displayWarning(messege: string, duration = 3000, color = 'warning' as UiColors) {
    displayInUi(messege, duration, color, 'melt')
    consoleIt('👀', messege)
  }

  function displayDelete(messege: string, duration = 3000, color = 'warning' as UiColors) {
    displayInUi(messege, duration, color, 'trash')
    consoleIt('🗑️', messege)
  }

  function displayError(messege: string, duration = 9000, color = 'error' as UiColors) {
    displayInUi(messege, duration, color, 'error')
    consoleIt('🔴 😱', messege)
  }

  return { display, displayDelete, displayError, displayWarning }
}
