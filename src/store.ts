import { defineStore } from 'pinia'
import { type ConfigurationParameters } from "openai"

interface State {
	configuration: ConfigurationParameters
	temperature: number
	params: Record<string, string>
}

export const useStore = defineStore<'store', State>('store', {
	state: () => ({
		configuration: {
			apiKey: ''
		},
		temperature: 0.7,
		params: {
			'artist': '',
			'camera': '',
			'colors': '',
			'style': '',
			'mood': '',
			'subject': '',
			'lighting': '',
			'year of creation': '',
			'perspective': '',
			'artwork title': '',
			'materials': '',
			'other': '',
		}
	})
})