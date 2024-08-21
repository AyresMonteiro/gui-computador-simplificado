import { exportAlgorithmToString, importAlgorithmFromString, resizeSlots } from './flow.js'
import { showError } from './utils.js'

export async function importCode() {
  const fileInput = document.createElement('input')

  fileInput.type = 'file'
  fileInput.accept = '.txt'

  fileInput.addEventListener('change', async (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onload = async (e) => {
      const algorithm = e.target.result

      const lines = algorithm
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)

      const slotsInputElement = document.getElementById('slots-input')

      if (!slotsInputElement) {
        showError('Erro de Importação: Input de Slots não encontrado!')
      }

      slotsInputElement.value = lines.length
      resizeSlots(lines.length)

      importAlgorithmFromString(lines)
    }

    reader.readAsText(file)
  })

  fileInput.click()
}

export async function exportCode(numberOfSlots) {
  try {
    const algorithm = exportAlgorithmToString(numberOfSlots).join('\n')

    const blob = new Blob([algorithm], { type: 'text/plain' })

    const timestamp = new Date().toISOString().replaceAll(/[^\d]/g, '')

    const filename = `cs_algorithm_${timestamp}.txt`

    const a = document.createElement('a')

    a.download = filename
    a.href = URL.createObjectURL(blob)
    a.click()
  } catch (e) {
    showError('Erro de Exportação: ${e.message}')
    return
  }
}
