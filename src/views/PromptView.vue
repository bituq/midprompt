<script setup lang="ts">
import { useStore } from "@/store";
import { Configuration, OpenAIApi } from "openai";
import { onMounted, ref } from "vue";

const store = useStore()
const openai = ref<OpenAIApi>()
const prompts = ref<string[]>([])
const loading = ref(false)
const error = ref()

onMounted(async () => {
	openai.value = new OpenAIApi(new Configuration(store.configuration))
})

const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

const generate = async () => {
	error.value = undefined
	loading.value = true

	try {
		const res = await openai.value?.createChatCompletion({
			model: "gpt-4",
			messages: [
				{"role": "system", "content": `Describe in a full, clear sentence a creative work with the following characteristics: ${Object.keys(store.params).join(', ')}.\n\nYou will be given some characteristics in the form of a list. Imagine the missing ones yourself creatively if there are any. Make sure it is in a descriptive sentence.`},
				{"role": "user", "content": Object.entries(store.params).toString()}
			],
			n: 3,
			temperature: Number(store.temperature)
		})
		
		prompts.value = res?.data.choices.map(c => c.message?.content?.toString() ?? '') ?? []
	} catch(err: any) {
		error.value = err.response.data.error.message
	}
		
	loading.value = false
}
</script>

<template>
	<div class="flex gap-1.5 max-w-screen-lg w-full">
		<form class="box flex flex-col gap-3 w-full h-full" @submit.prevent="generate">
			<div class="grid grid-cols-2 gap-x-1.5">
				<template v-for="key in Object.keys(store.params)" v-key="key">
					<div class="form-control">
						<label class="label">
							<span class="label-text">{{ capitalize(key) }}</span>
						</label>
						<input type="input" class="input input-bordered input-xs" v-model="store.params[key]" />
					</div>
				</template>
			</div>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Temperature: {{ store.temperature }}</span>
				</label>
				<input type="range" class="range range-xs" min="0" max="1" step="0.1" v-model="store.temperature" />
				<div class="w-full flex justify-between text-xs">
					<span>0.0</span>
					<span>0.5</span>
					<span>1.0</span>
				</div>
			</div>
			<button class="btn btn-primary btn-outline" :disabled="loading" type="submit"><span class="loading" v-if="loading"/>Generate</button>
			<span class="text-error" v-if="error">
				{{error}}
			</span>
		</form>
		<div class="box flex flex-col gap-3 max-w-xl w-full">
			<template v-for="i in 3">
				<div class="form-control h-full">
					<label class="label">
						<span class="label-text">
							Prompt {{ i }}
						</span>
					</label>
					<span class="textarea textarea-bordered h-28 overflow-y-auto break-words" :class="{'textarea-disabled': loading}">
						{{ prompts[i - 1] }}
					</span>
				</div>
			</template>
		</div>
	</div>
</template>