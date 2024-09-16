<script lang="tsx">

import Header from './header.vue';
import Footer from './footer.vue';
import Setting from './setting.vue';
import { defineComponent } from 'vue';
import SideMenu from './SideMenu.vue';
import { useWebCache } from '../hooks/useWebCache';

export default defineComponent({
	name: 'Layout',
	setup() {
		const { setCache, getCache } = useWebCache();
		console.log(getCache('theme'));
		console.log(setCache('theme'));
		return () => (
			<div class="h-full w-full overflow-hidden flex flex-wrap ">
				<Header class="w-full h-60px shadow z-1 dark:(bg-[#1d1d1d] text-white)" />

				<SideMenu class="h-[calc(100%-60px)] overflow-auto bg-white dark:(bg-[#1d1d1d] text-white)" />
				<div class="main relative flex-1 h-[calc(100%-60px)] overflow-auto border bg-[#f3f3f3] dark:(bg-[#1d1d1d] text-white)">
					<router-view />
					<Footer class="absolute bottom-0 left-0 border-t bg-white dark:(bg-[#1d1d1d] text-white) w-full h-50px flex justify-center items-center" />
				</div>

				<Setting class="fixed right-4 bottom-1/2 z-2" />
			</div>
		);
	}
})
</script>
