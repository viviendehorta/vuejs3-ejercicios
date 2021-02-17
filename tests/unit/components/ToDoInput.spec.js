import { mount } from "@vue/test-utils";
import ToDoInput from "@/components/ToDoInput.vue";

describe("ToDoInput.vue", () => {
  it("renders an input and a label", () => {
    const wrapper = mount(ToDoInput);
    const input = wrapper.get("input");
    const label = wrapper.get("label");
    expect(input.attributes().id).toMatch("todo-input");
    expect(input.attributes().type).toMatch("text");
    expect(label.attributes().for).toMatch("todo-input");
  });

  it("type enter should emit add event and remove input text", async () => {
    const wrapper = mount(ToDoInput);
    const input = wrapper.get("input");
    await input.setValue("un todo de ejemplo");
    expect(input.element.value).toBe("un todo de ejemplo");
    await input.trigger("keyup.enter");
    expect(input.element.value).toBe("");
    expect(wrapper.emitted()).toHaveProperty("add");
  });

  it("type enter with empty input should not emit add event", async () => {
    const wrapper = mount(ToDoInput);
    const input = wrapper.get("input");
    await input.setValue("");
    await input.trigger("keyup.enter");
    expect(input.element.value).toBe("");
    expect(wrapper.emitted()).not.toHaveProperty("add");
  });
});
