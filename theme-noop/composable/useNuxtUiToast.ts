export function useNuxtUiToast() {
  function displayInUi(messege: string, duration = 2000, clr = 'info', icon = 'clock') {
    console.log('\n', duration, clr, icon)
    console.log(messege, '\n\n')
  }

  return { displayInUi }
}
