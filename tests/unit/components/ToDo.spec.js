import { mount } from '@vue/test-utils';
import ToDo from '@/components/ToDo.vue';
// import { nextTick } from 'vue';
const getWrapper = options => {
  let obj = {
    global: {
      stubs: ['font-awesome-icon']
    }
  };
  if (options) {
    Object.assign(obj, options);
  }
  return mount(ToDo, obj);
};
describe('ToDo.vue', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = getWrapper();
  });
  it('have a checkbox and a span', () => {
    expect(wrapper.findAll('[data-test="checkbox"]')).toHaveLength(1);
    expect(wrapper.findAll('[data-test="span"]')).toHaveLength(1);
  });
  it('when checkbox is checked it should emit todoDone', async () => {
    const checkbox = wrapper.get('[data-test="checkbox"]');
    await checkbox.setValue(true);
    expect(wrapper.emitted('todoDone')[0]).toEqual([true]);
  });
  it('should print text prop', () => {
    wrapper = getWrapper({
      props: {
        text: 'a todo',
        done: false
      }
    });
    expect(wrapper.get('[data-test="span"]').text()).toBe('a todo');
  });
  it('should render when todo is completed', () => {
    wrapper = getWrapper({
      props: {
        text: 'a todo',
        done: true
      }
    });
    const text = wrapper.get('[data-test="span"]');
    const checkbox = wrapper.get('[data-test="checkbox"]');
    expect(checkbox.element.checked).toBe(true);
    expect(text.attributes().style).toBe('text-decoration: line-through;');
  });
});
