<script setup lang="ts">
import router from '@/router';
import { useStore } from '@/store';
import { onMounted, ref } from 'vue';

const apiKeyRegex: RegExp = /^sk-[A-Za-z0-9]+$/;

const store = useStore()
const apiKey = ref()

const submit = () => {
	store.configuration.apiKey = apiKey.value
	router.push('/prompt')
}

onMounted(() => {
	apiKey.value = store.configuration.apiKey?.toString()
})
</script>

<template>
	<div class="box">
		<form class="flex flex-col gap-3" @submit.prevent="submit">
			<div class="form-control">
				<label class="label">
					<span class="label-text">OpenAI API Key</span>
				</label>
				<input class="input input-bordered" type="password" placeholder="Enter your key here" v-model="apiKey" />
			</div>
			<button type="submit" class="btn btn-secondary btn-outline" :disabled="!apiKeyRegex.test(apiKey)">Continue</button>
		</form>
	</div>
</template>