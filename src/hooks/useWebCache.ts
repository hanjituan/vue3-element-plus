import WebStorageCache from "web-storage-cache";


// console.log(useWebCache);
export const useWebCache = () => {

	var cache = new WebStorageCache();

	const setCache = (key: string, value: any) => {
		cache.set(key, value);
	}
	const getCache = (key: string) => {
		return cache.get(key);
	}
	const deleteCache = (key: string) => {
		cache.delete(key);
	}

	return {
		cache,
		setCache,
		getCache,
		deleteCache
	}
}
