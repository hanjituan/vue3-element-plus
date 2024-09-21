import { createPinia } from "pinia";
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Create a pinia instance
export const pinia = createPinia();

pinia.use(piniaPluginPersistedstate)

// Export the pinia instance
export default pinia;
