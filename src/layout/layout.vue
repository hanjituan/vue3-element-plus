<script lang="tsx">

import Header from './header.vue';
import Footer from './footer.vue';
import SideMenu from './SideMenu.vue';
import Setting from './setting.vue';
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'Layout',
	setup() {
		return () => (
			<div class="h-full w-full overflow-hidden flex flex-wrap ">
				<Header class="w-full h-60px shadow z-1" />
				<SideMenu class=" h-[calc(100%-60px)] overflow-auto bg-white"  />
				<div class="main relative flex-1 h-[calc(100%-60px)] overflow-auto border bg-[#f3f3f3]">
					<router-view />
					<Footer class="absolute bottom-0 left-0 border-t bg-white w-full h-50px flex justify-center items-center" />
				</div>

				<Setting class="fixed right-4 bottom-1/2 z-2" />
			</div>
		);
	}
})
</script>
