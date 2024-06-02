export const useSubscriptionStore = defineStore("subscription", () => {
	const subscriptions = ref<{ [key: string]: () => void }>({});

	function addSubscription(key: string, subscription: () => void) {
		subscriptions.value[key] = subscription;
	}

	function unsubscribe(key: string) {
		if (subscriptions.value[key]) {
			subscriptions.value[key]();
			delete subscriptions.value[key];
		}
	}

	function unsubscribeAll() {
		Object.keys(subscriptions.value).forEach((key) => {
			subscriptions.value[key]();
		});
		subscriptions.value = {};
	}

	return { subscriptions, addSubscription, unsubscribe, unsubscribeAll };
});
