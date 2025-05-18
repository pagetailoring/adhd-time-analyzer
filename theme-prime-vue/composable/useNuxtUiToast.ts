// import { useToast } from 'primevue/usetoast'

export function useNuxtUiToast() {
  // const toast = useToast()

  // Toast — only works in the component's setup(), not inside a composable

  function displayInUi(messege: string, duration = 2000, clr = 'info', icon = 'clock') {
    console.log('\n', duration, clr, icon)
    console.log(messege, '\n\n')

    console.log(
      '\n🤦‍♂️',
      'Toast — only works in the component`s setup(), not inside a composable 🤦‍♂️',
      '\n\n'
    )
  }

  return { displayInUi }
}
