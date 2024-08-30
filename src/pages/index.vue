<script setup lang="ts" generic="T extends any, O extends any">
import { useToast } from 'primevue/usetoast'

defineOptions({
  name: 'IndexPage',
})

const toast = useToast()

const directoryHandle = ref<FileSystemDirectoryHandle>()

const files = [
  new File([], 'version.dll'),
  new File([], 'dlssg_to_fsr3_amd_is_better.dll'),
]

async function pickDir() {
  directoryHandle.value = await (window as any).showDirectoryPicker().catch(() => {
    // eslint-disable-next-line no-console
    console.log('Picking directory failed')
  })
  if (directoryHandle.value) {
    toast.add({
      severity: 'info',
      summary: 'Selected directory',
      detail: directoryHandle.value?.name,
      life: 3000,
    })
  }
  return directoryHandle.value
}

async function createFiles(files: File[]) {
  if (!directoryHandle.value)
    return

  const tasks = files.map(async (file) => {
    const fileHandle = await directoryHandle.value!.getFileHandle(file.name, {
      create: true,
    })
    const writable = await fileHandle.createWritable()
    await writable.write(file)
    await writable.close()
  })

  await Promise.all(tasks)
  toast.add({
    severity: 'success',
    summary: 'Created files',
    detail: files.map(file => file.name).join(', '),
    life: 3000,
  })
}
</script>

<template>
  <div b="base 2" mx-auto min-h-100 w-250>
    <div flex="~" items-center p-4>
      <span flex-1 text-start text-lg font-bold>DLSSg to FSR3</span>
      <div flex="~" justify-end gap-4>
        <Button class="" label="CHOOSE DIR" @click="pickDir()" />
        <Button severity="warn" label="Copy DLLs" @click="createFiles(files)" />
      </div>
    </div>

    <div b="base t" flex="~ col">
      <div
        v-for="file in files"
        :key="file.name"
        b="b base"
        flex items-center gap-2 px-4 py-2
      >
        <div i-carbon:gears />
        <span font-mono>{{ file.name }}</span>
      </div>
    </div>
  </div>
  <Toast />
</template>
