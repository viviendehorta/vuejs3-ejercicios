import { shallowMount } from "@vue/test-utils";
import Logo from "@/components/Logo.vue";

describe("Logo.vue", () => {
  it("renders h1 text", () => {
    const wrapper = shallowMount(Logo);
    expect(wrapper.text()).toMatch("ToDo List");
  });
});
